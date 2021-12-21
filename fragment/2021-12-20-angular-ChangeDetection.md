---
slug: angular-ChangeDetection
title: Angular ChangeDetection
tags: [angular]
---

## ChangeDetection 是什么

数据驱动的 UI，我们期望的是只需要改变 component 里的数据，然后 template 里的 UI 元素就魔法般地自动变成最新的展现了。ChangeDetection 就是 Angular 实现数据驱动 UI 的方式。

## ChangeDetectionStrategy.Default

这是默认的魔法方案，省心省事儿，能把事情办好，我们啥也不用管。

## detectChange 实现

任何数据改变，Angular 都能发现并更新 UI。这是因为 Angular 会在合适时机运行 detectChange，并重新获取一遍数据数据绑定的值，并与上一次的值进行对比。如果不一样的话就会进行 UI 改变。

Angular 对 Object 的检测只是简单检查是否是同一个实例，改变 object.count 不会触发 child 的 inObj 的变化，但是 detectChange 也会 detect 所有 child 组件的变化。于是 child 组件也会再检查一遍。

\*ngFor 这种东西自己内部会在每次 detectChange 的时候对比 array 的新增、减少、调序。

## detectChange 时机

但是 Angular 比较机智的是，它会在一些事件完成的时候自动触发 detectChange。这些包括：

- 所有浏览器事件（click、keyup、mouseover 等）
- 所有 addEventListener 的 callback 完成后
- 所有 Ajax 请求后
- 所有的 setTimeout 和 setInterval 的回调触发后
- （浏览器自带的）Websockets 的各事件（onclose、onopen、onmessage 等）
- Promise（resolve、reject...）
- NgZone.run、NgZone.runTask...
- ...

这些事情发生的时候，都是有比较大的概率会引起 UI 改变的。比如 click 驱使的改变、新网络请求数据驱使的改变之类之类。

Angular 底层的 ngZone 通过 zone.js 来对浏览器的 addEventListener 等方法做 patch，从而监听这些事件的触发时机而运行 detectChange

Angular 这些 detectChange 的调用都是从 root node 调用的，所以会检查整个应用的绑定值

## DetectionStrategy.OnPush

虽然 Default 的策略很美好，Angular 的 detectChanges 的性能也不错，但是对于大一些的应用来说，每一个事件都检查整个组件树还是会有性能问题的。可以减少不必要的检测从而提高性能

OnPush 虽然需要我们主动调用 markForCheck，但是有三种情况 Angular 会自动帮我们调用：

- @Input
- AsyncPipe
- Browser 事件

OnPush 相关的两个接口:

- markForCheck - 标记为 dirty。下次有 detectChange 的时候更新 UI
- detectChange - 立即对当前组件进行 detectChange，即使组件运行在 ngZone 之外，同步更新 UI

### OnPush 主要原则

其主要原则就是没有被标记 markForCheck 的组件在 changeDetection 时会被直接跳过

举个例子，setTimeout、setInterval、网络请求之类的事件后，Angular 会从 root 发起 detectChange，但是遇到 onPush 时，如果没有被 markForCheck，就会跳过这整个节点以及其子节点（子节点无论是 OnPush 策略还是 Default 策略都会被跳过）

所以，当我们知道需要更新 UI 的时候，我们需要更新 UI 时，需要调用 markForCheck()

经过 markForCheck 标记后的 OnPush 组件，会把自己所有 OnPush 的父组件都标记为 dirty，下次执行 detectChange 的时候就会把需要检查的都搞定。
稍微有几个细节：

- 自己的子组件如果是 Default 的话，会在自己运行 detectChange 的时候也检查一遍
- 如果自己的子组件是 OnPush 并且子组件自己没有 markForCheck，那么 detectChange 就会被跳过
- 如果 OnPush 没有被 markForCheck，那么即使自己的子组件是 Default，也不会被检查

在一些情况下 Angular 会自动给我们的 OnPush 组件标记 markForCheck。

### @Input 属性发生改变的时候

当给子组件绑定的@Input 值发生改变的时候，Angular 会自动给子组件标记 markForCheck，并在 detectChange 的时候更新 UI，不需要我们手动调用 markForCheck。

但是需要注意几个细节：

#### 不会进行深度检查

上面提到过，Angular 的 changeDetection 对 Object 只检查是不是同一个对象，不会进行深度检查。所有改变任何 Object 内嵌的值，或者给 array.push 之类的操作，都不会自动触发 markForCheck。

```html
<app-child [inCount]="count" [inObj]="obj" [inArr]="array"> </app-child>
```

```typescript
public count: number = 0;
public obj: { count: number; other: number } = { count: 0, other: 4 }
public array: number[] = [];

// will trigger mark
this.count = 2;
this.obj = {...obj, count: 2};
this.array = [];
this.array = [...this.array];
this.array = this.array.slice(0);

// will not trigger mark
this.obj.count = 6;
this.array.push(1);
this.array.length = 0;
```

#### 父组件是 OnPush

检查上述@Input 绑定值是否变化的逻辑不在子组件里，而是在父组件 detectChange 时判定的。 也就是说，只要父组件没有触发 detectChange，子组件既不会 markForCheck，也不会改变@Input 的值。虽然 Angular 会监听很多相关方法，并自动触发 detectChange，但是还是需要注意一些特殊情况的：

```html
<app-child [inCount]="count"></app-child>
```

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements OnInit {
  public count: number = 0;

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.count++; // will not trigger cd for child
    });
  }
}
```

因为检查@Input 绑定值的变化是在父组件里做的，所以如果父组件是 OnPush 并且没有标记 markForCheck，那么子组件也不会触发 cd。

这里虽然每次触发 interval 后都会有 detectChange 发生，但是因为父组件是 OnPush 并且没有被 markForCheck，所以会直接跳过。

#### ngZone 之外的事件

Angular 自动触发 detectChange 都是 ngZone 里的事件触发的，如果事件不在 ngZone 里的话，就不会自动触发 detectChange。
例子：

```typescript
import { Component, OnInit, NgZone } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.Default
})
export class ParentComponent implements OnInit {
  public count: number = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // the interval is outside ngZone thus it will not
    // trigger change detection and ui will not update
    this.ngZone.runOutsideAngular(() => {
      interval(1000).subscribe(() => {
        this.count++; // will not trigger cd for child
      });
    });
  }
}
```

上面唯一区别就是用来 ngZone.runOutsideAngular 这个方法把 interval 的创建丢在的 Angular 的 Zone 之外。这样 Angular 就没有 patch 这个 interval，也不会在 interval 触发的时候调用 detectChange 了。

注意这里是直接不调用 detectChange。所以即使 OnPush 的组件调用了 markForCheck 也不会更新 UI。甚至 ChangeDetectionStrategy.Default 的组件也不会有 UI 更新。必须等有其他事件发生，触发 detectChange 后，UI 才会刷新。

### Async Pipe

Angular 除了在@Input 值改变的时候会内部帮我们 markForCheck，还有 Asyc Pipe 发射新值得时候会帮我们 markForCheck。

#### markForCheck on next

v9.x 的表现是只要 Observable 有触发了 next， 绑定了这个 Observable 的 OnPush 组件就会被 markForCheck。不会检查发出的值是不是和以前的不一样。

例子：
child 组件：

```html
<p>count {{ (inObj$ | async)?.count }}</p>
```

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input()
  inObj$: Observable<{ count: number }>;
}
```

parent 组件：

```html
<app-child [inObj$]="obj$"></app-child>
```

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.Default
})
export class ParentComponent implements OnInit {
  private obj = { count: 1 };
  private _obj$ = new BehaviorSubject(this.obj);
  public obj$ = this._obj$.asObservable();

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.obj.count++;
      this._obj$.next(this.obj); // Child component will update
    });
  }
}
```

这里要注意的是，即使 obj 的实例不变，只要调用了 async pipe 的 next 被调用了，Angular 就会帮我们调用那个 OnPush 组件的 markForCheck。这个表现在 v10.0.0 里有改变，但是我没有去自己测。

#### 直接改变原对象的嵌套值不会触发

这里只是提一下，v9.x 的 async pipe 只是监听 next，所以直接改变实例里面的值的话是不会 markForCheck 的

```typescript
// ...
ngOnInit() {
  interval(1000).subscribe(() => {
    // will not trigger mark for check
    this.obj.count++;
  });
}
// ...
```

### Browser 事件

即使你的组件用了 OnPush，它的监听的 Browser 事件（click、mouseover、mouseleave 等）触发的时候，Angular 都会帮你调用 markForCheck。

```html
<span>count is: {{count}}</span>
<button (click)="addOneClicked()">Increment</button>
```

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  public count: number = 0;

  public addOneClicked(): void {
    // does not need to call markForCheck if
    // invoked from click handler
    this.count++;
  }
}
```

## NgZone

推荐一篇详细讲 NgZone 的[文章](https://medium.com/reverse-engineering-angular/angular-deep-dive-zone-js-how-does-it-monkey-patches-various-apis-9cc1c7fcc321)

Angular 在 bootstrap 的时候首先创建了一个叫 ngZone 的 zone。ngZone 的作用就是，在这个 zone 里运行的代码被 Angular monkey patch 掉了，加上了 Angular 自己的包括 changeDetection 在内的一些处理。开头说的 Angular 监听 timeout、interval、click 之类的东西，就是通过 ngZone 来监听的。

Angular 通过 ngZone 来 patch 这些方法，反过来也就是说，如果在 ngZone 之外调用 setInterval、addEventListener 之类的东西的话，用的方法就不是 Angular patch 过的版本，也就不会触发 detectChange 了。

### UI 刷新不及时

上面提到  不在 NgZone 里创建 setInterval 之类的东西，Angular 就不会帮我们自动触发 detectChange。我们 UI 更新不及时的问题基本都是这个造成的。下面列一些常见的在 ngZone 之外运行的原因。

#### 其他第三方 npm 库

Angular 对第三方库是无感知的，所以如果第三方库底层用了 C++ 回调的话，我们就有可能在不知情的情况下跑出 NgZone 了。需要注意。但是 Promise 的事情在这里也适用，如果第三方库是用 Promise 的话，十有八九是没问题的。因为 Angular 把 Promise 给 patch 了。

#### NgZone 之外创建的组件

这个是比较隐晦的一个情况。上面讲 OnPush 的时候做的一大个假设是 click 等浏览器事件发生的时候 Angular 会自动调用 detectChange 来刷新 UI。但是这个是在组件在 NgZone 里创建的前提下才成立的。

```html
<button (click)="onClick()"></button>
```

上面的这种 template，在创建这个 button 的时候，Angular 会调用 addEventListener 来帮我们把该做的事情搞定。然后再回顾一下之前之前讲的，Angular 是通过 NgZone，把 addEventListener 等方法 patch 了，才达到自动 detectChange 的效果的。那么如果这个 button 是在 ngZone 之外创建的，那调用的 addEventListener 就是没有被 patch 过的版本，点击后也就不会主动触发 detectChange。（自动的 markForCheck 还会进行，这个功能是 Angular 解析 template 的一部分，不是 patch 出来的）

要怎么在 ngZone 之外创建组件？`*ngIf`、`*ngFor` 等 directive 配合在 zone 之外手动调用 detectChange 就会发生。

例子：

```html
<p>count is: {{count}}</p>
<div *ngIf="enable">
  <button (click)="onCreatedButtnClick()">
    Created
  </button>
</div>
```

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements OnInit {
  public count: number = 0;
  public enable: boolean = false;

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      interval(1000).subscribe(() => {
        this.enable = true;

        // we are outside ngZone, so we have to manually
        // call detectChanges so angular can create button
        this.cd.detectChanges();
      });
    });
  }

  onCreatedButtnClick(): void {
    // UI will not update until detectChange is triggered
    // by network or some other component. This is because
    // the button was created outside of angular zone and
    // will not automatically call detectChanges on click
    this.count++;
    this.cd.markForCheck();
  }
}
```

### runOutsideAngular 性能优化

性能差：

```html
<span>time is: {{time}}</span>
```

```typescript
public time: number = 0;

constructor(private ngZone: NgZone, private cd:ChangeDetectorRef) {}

public ngOnInit(): void {
  interval(100).subscribe(_ => {
    this.time++;
    this.cd.markForCheck(); // 通常情况下不需要，在OnPush策略下需要加
  });
}
```

上面这种写法，根据情况，可能会有很糟糕的性能。原因是 ngZone 把 setInterval 给 patch 了。所以 setInterval 的每次回调后，都会触发源于 root node 的 detectChange。会把整个应用都检查一次。

虽然 OnPush 的组件会被跳过，但是 markForCheck 会把自己所有父亲组件都给标记为 dirty。如果自己的父组件里有很多数据绑定的话，也会有性能问题。更何况我们代码里还有不少组件还是 Default 的 cd 策略...

性能优化：

```typescript
public time: number = 0;

constructor(private ngZone: NgZone, private cd:ChangeDetectorRef) {}

public ngOnInit(): void {
  this.ngZone.runOutsideAngular(() => {
    interval(100).subscribe(_ => {
      this.time++;
      this.cd.detectChanges();
    }
  });
}
```

像这样在 ngZone 之外创建 interval 的话，用的就不是 Angular 打过猴子补丁的版本了。所以触发的时候不会对整个应用进行 cd。

因为没有 angular 的 cd，我们必须自己手动调用一下 detectChanges()。这个方法只作用于当前 node 以及其子组件。所以像一个简单的 timer 这样可以确定不会影响应用其他部分状态的组件，可以放心地只对它进行 cd。

当然这个的前提是不影响应用其他地方。如果要展示时间，但是每 10s dispatch 一个 action 的话，应该把这个 action 丢回 AngularZone 里面来 dispatch，以触发一次全局的 cd。

```typescript
public ngOnInit(): void {
  this.ngZone.runOutsideAngular(() => {
    interval(100).subscribe(_ => {
      this.time++;
      this.cd.detectChanges();

      if (this.time % 100 === 0) {
        // NgZone.run会触发一次源于root node的detectChange
        this.ngZone.run(() => {
          this.store.dispatch(new Action());
        });
      }
    }
  });
}
```

**如果 ngZone 外触发的 detectChange 触发了\*ngIf 之类的 directive 创建新元素的话，创建的组件的 click 等 handler 都会在 ngZone 之外执行，并且不会触发 detectChange。所以要注意**

## ChangeDetectorRef.detach 的骚操作

## Q&A

- detectChange 和 markForCheck 的区别？

markForCheck 只是标记 dirty，自身其实只是把一个值设置为 true。实际进行数据对比、UI 更新、元素创建的是 detectChange。

- 业务组件最佳实践？onPush + markForCheck/detectChange 组合？

最好是尽可能多的组件使用 onPush + markForCheck。detectChange 是在绝大多数情况下是不需要的。detectChange 的一种合理的使用场景是上面提到的 runOutsideAngular 的性能优化。相对独立的组件但是需要频繁更新。
