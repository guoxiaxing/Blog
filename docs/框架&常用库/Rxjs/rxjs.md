---
slug: rxjs-basic
title: rxjs 基础概念
tags: [Rxjs]
---

## Rxjs 是什么？

RxJS 是一个库，它通过使用 observable 序列来编写异步和基于事件的程序。它提供了一个核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects) 和操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理。

> 可以把 RxJS 当做是用来处理事件的 Lodash。

## 特点

- 纯净性：使用纯函数来产生值，不需要借助外部变量
- 流动性：RxJS 提供了一整套操作符来帮助你控制事件如何流经 observables 。
- 值：可以对流经 observable 的值进行转换

## Rxjs Observables vs Promise

### 多值 vs 单值

一个 Promise 只能产生一个值/错误，之后的值或者错误都会被忽略。这也就是 Promise 的状态只能改变一次，一旦改变就不会再变。

```javascript
const numberPromise = new Promise(resolve => {
  resolve(5);
  resolve(10); // 不生效
});

numberPromise.then(value => console.log(value));

// 输出 只会有 5
```

再看看 Observable

```javascript
const Observable = require("rxjs/Observable").Observable;

const numberObservable = new Observable(observer => {
  observer.next(5);
  observer.next(10);
});

numberObservable.subscribe(value => console.log(value));

// 输出 5 10
```

Observable 是可以产生多个值的，这一点和 promise 的差别很大。平常我们可能遇到的大多数情况都是一个请求对应一个响应，但是我们也会有产生多个值的情况：

- 定时器
- DOM 事件

### 代码执行

```javascript
// Promise构造函数内部的逻辑是同步执行的
const promise = new Promise(resolve => {
  console.log("promise call");
  resolve(1);
  console.log("promise end");
});

// 执行这段代码 promise call 和 promise end 会立即执行
const observable = new Observable(() => {
  console.log("I was called!");
});

// 此时并没有console

// 只有 observable.subscribe(); 这个时候 I was called！才会被打印出来。
```

上面的代码我们可以发现 observable 是 lazy 的，只有在订阅的时候代码才会被执行

###  能取消 vs 不能取消

promise 默认是不能取消的，一旦创建就会被执行。

```javascript
const Observable = require("rxjs/Observable").Observable;

const observable = new Observable(observer => {
  let i = 0;
  const token = setInterval(() => {
    observer.next(i++);
  }, 1000);

  return () => clearInterval(token);
});

const subscription = observable.subscribe(value => console.log(value + "!"));

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

// 结果

// 0!
// 1!
// 2!
// 3!
```

observable 是可以被取消的，可以使用 subscribe 返回的值，一个 Subscription 对象的 unsubscribe 方法来取消订阅。

**new Observable 传入的函数的返回值会在 unsubscribe 调用的时候被执行，所以我们可以进行一些清理操作。需要注意的是我们取消的是对这个 observable 的订阅，但是原来的 new Observable 中的定时器依旧在执行，只是该定时器发的值，没有被订阅而已。所以我们需要执行`() => clearInterval(token)`清除该定时器**

### 多个订阅 vs 单个订阅

一个 promise 被创建的时候，他就已经执行了，并且不能重复的被执行了。

```javascript
let time;
const waitOneSecondPromise = new Promise(resolve => {
  console.log("promise call");
  time = new Date().getTime();
  setTimeout(() => resolve("hello world"), 1000);
});

waitOneSecondPromise.then(value => {
  console.log("第一次", value, new Date().getTime() - time);
});

setTimeout(() => {
  waitOneSecondPromise.then(value => {
    console.log("第二次", value, new Date().getTime() - time);
  });
}, 5000);

// 输出结果是 promise call
// 第一次 hello world 1007
// 第二次 hello world 5006
```

第一个 then 会在 1s 后输出值，第二个 then 会在 5s 后立即输出值，因为第二个 then 方法执行的时候 promise 的状态已经改变，所以它可以直接拿到 promise resolve 的值，不需要再等待 1s 了

observable：

```javascript
const Observable = require("rxjs/Observable").Observable;

let time;
const waitOneSecondObservable = new Observable(observer => {
  console.log("I was called");
  time = new Date().getTime();
  setTimeout(() => observer.next("hey girl"), 1000);
});

waitOneSecondObservable.subscribe(value => {
  console.log("第一次", value, new Date().getTime() - time);
});

setTimeout(() => {
  waitOneSecondObservable.subscribe(value => {
    console.log("第二次", value, new Date().getTime() - time);
  });
}, 5000);

// 输出
// I was called
// 第一次 hey girl 1003
// I was called
// 第二次 hey girl 1003
```

对于 observable，这里其实是(Cold Observable)他们每次被 subscribe 都是一次新的订阅，observable 会被重新执行。所以无论 observable 何时被 subscribe 产生的值都是一样的

但是有时候我们不希望每次 subscribe 都重新订阅，我们希望它可以共享前面的订阅，也就是不希望这个 observable 被重新在执行一遍，多用于 http 请求的场景。在 http 请求中，我们可能希望只发一次请求，但是结果被多个订阅者共用。 Observable 本身没有提供这个功能，我们可以用 RxJS 这个库来实现，它有一个 share 的 operator。其实这就是将一个 Cold Observable 变为了 Hot Observable。

```javascript
const waitOneSecondObservable = new Observable(observer => {
  // 发送http请求
});

const sharedWaitOneSecondObservable = waitOneSecondObservable.share();

sharedWaitOneSecondObservable.subscribe(doSomething);

sharedWaitOneSecondObservable.subscribe(doSomethingElse);

// 使用了share，虽然subscribe了多次，但是仅发送一次请求，share了结果。
```

### 可能是异步 vs 一直是异步

promise 中同步的 resolve 了一个值，但是它还是会异步执行。

```javascript
const promise = new Promise(resolve => {
  resolve(5);
});

promise.then(value => console.log(value + "!"));

console.log("And now we are here.");

// And now we are here.
// 5!
```

promise 一直是异步， Observables 则比较灵活，是否为异步得根据自己的函数来定，这点也比较危险。rxjs 中有一些操作符可以让监听强制为异步的方式，例如 observeOn。

```javascript
const Observable = require("rxjs/Observable").Observable;

const observable = new Observable(observer => {
  observer.next(5);
  setTimeout(() => {
    observer.next(6);
  });
});

observable.subscribe(value => console.log(value + "!"));
console.log("And now we are here.");

// 5!
// And now we are here.
// 6!
```

## Observable

可观察对象

- **可以是异步的，也可以是同步的**
- 是一个是多个值的惰性推送集合。可以产生值。
- Observable 可以随着时间的推移 “返回” 多个值
- 在 Observable 执行中, 可能会发送零个到无穷多个 "Next" 通知。如果发送的是 "Error" 或 "Complete" 通知的话，那么之后不会再发送任何通知了。

### Cold Observable

单播的 observable
**只有被 Observer 订阅了才会开始产生值。**有多少个订阅就会生成多少个订阅的实例，每个订阅都是从第一个产生的值开始接收值，所以每个订阅接收到的值都是一样的。
每个普通的 Observables 实例都只能被一个观察者订阅，当它被其他观察者订阅的时候会产生一个新的实例。也就是普通 Observables 被不同的观察者订阅的时候，会有多个实例，不管观察者是从何时开始订阅，每个实例都是从头开始把值发给对应的观察者。

### Hot Observable

不管有没有订阅都会产生值。是多播的，多个订阅会共享同一个实例。是从订阅开始接收值，每个订阅接收到的值都是不同的，取决于他们什么时候订阅。

#### 怎么创建 Hot Observable

##### multicast + Subject

multicast 操作符的工作原理：观察者订阅一个基础的 Subject，然后 Subject 订阅源 Observable 。

```javascript
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// 在底层使用了 `subject.subscribe({...})`:
multicasted.subscribe({
  next: v => console.log("observerA: " + v)
});
multicasted.subscribe({
  next: v => console.log("observerB: " + v)
});

// 在底层使用了 `source.subscribe(subject)`:
multicasted.connect();
```

multicast 返回的是 ConnectableObservable，它只是一个有 connect() 方法的 Observable 。

connect() 方法十分重要，它决定了何时启动共享的 Observable 执行。因为 connect() 方法在底层执行了 source.subscribe(subject)，所以它返回的是 Subscription，你可以取消订阅以取消共享的 Observable 执行。

> ConnectableObservable: ConnectableObservable 是多播的共享 Observable，可以同时被多个 observers 共享订阅，它是 Hot Observables。ConnectableObservable 是订阅者和真正的源头 Observables 的中间人，ConnectableObservable 从源头 Observables 接收到值然后再把值转发给订阅者。

##### refCount()

ConnectableObservable 的 refCount() 方法(引用计数)，这个方法返回 Observable，这个 Observable 会追踪有多少个订阅者。当订阅者的数量从 0 变成 1，它会调用 connect() 以开启共享的执行。当订阅者数量从 1 变成 0 时，它会完全取消订阅，停止进一步的执行。

**refCount 的作用是，当有第一个订阅者时，多播 Observable 会自动地启动执行，而当最后一个订阅者离开时，多播 Observable 会自动地停止执行。**

##### publish()

等价于 multicast(new Subject())

这个操作符可以将 cold observable 转换为 ConnectableObservable，而不需要我们使用的创建 Subject 实例

```javascript
let obs$ = interval(1000).pipe(publish(), refCount());
```

**publish(xxx).refCount()在源 observable 完成的时候再出现订阅者时，不会重新订阅源 observable**

**重新订阅已完成的 observables**

综上所述，根据示例我们可以发现 publish 以及它的变种:

- 当源 observable 完成时，负责多播基础结构的 subject 也会完成，而且这会阻止对源 observable 的重新订阅。

- 当 publish 和 publishBehavior 与 refCount 一起使用时，后来的订阅者只会收到 complete 通知，这似乎并不是我们想要的效果。

- 当 publishReplay 和 publishLast 与 refCount 一起使用时，后来的订阅者会收到预期的通知。

**重新订阅未完成的 observable**

当对未完成的源 observable 使用 refCount 时，publish、publishBehavior 和 publishReplay 的行为都如预期一般（当订阅者的数量从 0 变成 1，它会调用 connect() 以开启共享的执行。当订阅者数量从 1 变成 0 时，它会完全取消订阅，停止进一步的执行），会重新订阅源 observable

- publishReplay vs publishBehavior

**已完成的 ReplaySubject 将通知重放给后来的订阅者，所以 b 能收到重放的 next 通知和 complete 通知。但是 publishBehavior 在源 observable complete 之后，后面订阅的 observer 将不会再收到最新值**

##### share()

等价于 publish() + refCount()

但是，share 传给 multicast 的是工厂函数，这意味着在引用计数为 0 之后发生订阅的话，会创建一个新的 Subject 来订阅源 observable 。

```javascript
let obs$ = interval(1000).pipe(share());
```

> publishReplay、shareReplay、publishBehavior、publishLast 都可以将单播的 Observable 转换为多播的 Observable，只不过底层使用了不同类型的 Subject

与 share 类似， shareReplay 传给 multicast 操作符的也是 subject 的工厂函数。这意味着当重新订阅源 observable 时，会使用工厂函数来创建出一个新的 subject 。但是，只有**当前一个被订阅 subject 未完成**的情况下，工厂函数才会返回新的 subject 。

publishReplay 传给 multicast 操作符的是 ReplaySubject 实例，而不是工厂函数，这是影响行为不同的原因。

对调用了 publishReplay().refCount() 的 observable 进行重新订阅，subject 会一直重放它的可重放通知。但是，对调用了 shareReplay() 的 observable 进行重新订阅，行为未必如前者一样，如果 subject 还未完成，会创建一个新的 subject 。(如果 subject 已完成，则和 publishReplay().refCount()的效果相同，不会重新创建一个新的 subject)所以区别在于，使用调用了 shareReplay() 的 observable 的话，当引用计数归零时，如果 subject 还未完成的话，可重放的通知会被冲洗掉。

**publishReplay().refCount() vs shareReplay() 对于当前 subject 完成的情况**

```javascript
function instrument<T>(source: Observable<T>) {
      return Observable.create((observer: Observer<T>) => {
        console.log("source: subscribing");
        const subscription = source
          .pipe(tap((value) => console.log(`source: ${value}`)))
          .subscribe(observer);
        return () => {
          subscription.unsubscribe();
          console.log("source: unsubscribed");
        };
      }) as Observable<T>;
    }

    function observer<T>(name: string) {
      return {
        next: (value: T) => console.log(`observer ${name}: ${value}`),
        complete: () => console.log(`observer ${name}: complete`)
      };
    }
    const source = instrument(timer(100));
    const counted = source.pipe(shareReplay(1));
    const a = counted.subscribe(observer("a"));
    setTimeout(() => a.unsubscribe(), 110);
    setTimeout(() => counted.subscribe(observer("b")), 120);
```

输出

```text
source: subscribing
source: 0
observer a: 0
observer a: complete
source: unsubscribed
observer b: 0
observer b: complete
```

**publishReplay().refCount() vs shareReplay() 订阅未完成的 observable 情况**

```javascript
const source = instrument(interval(1000));
const counted = source.pipe(publishReplay(1), refCount());
const a = counted.subscribe(observer("a"));
setTimeout(() => a.unsubscribe(), 1100);
setTimeout(() => counted.subscribe(observer("b")), 2000);
```

输出

```text
source: subscribing
source: 0
observer a: 0
source: unsubscribed
observer b: 0
source: subscribing
source: 0
observer b: 0
source: 1
observer b: 1
source: 2
observer b: 2
```

```javascript
const source = instrument(interval(1000));
const counted = source.pipe(shareReplay(1));
const a = counted.subscribe(observer("a"));
setTimeout(() => a.unsubscribe(), 1100);
setTimeout(() => counted.subscribe(observer("b")), 2000);
```

输出

```text
source: subscribing
source: 0
observer a: 0
source: 1
observer b: 1
source: 2
observer b: 2
source: 3
observer b: 3
source: 4
observer b: 4
```

**对于 shareReplay 的话，并不会在订阅者为 0 的时候取消对源 observable 的订阅并且重新订阅**
**shareReplay 只会在源 observable complete 或 error 时才会取消订阅，当引用计数归零时，操作符不再取消源 observable 的订阅。**

- 如果源 observable 报错，publishReplay().refCount() 返回的 observable 的任何后来订阅者都将收到错误。
- 但是，shareReplay 返回的 observable 的任何后来订阅者都将产生一个源 observable 的新订阅。

**但是对于 share 来说，则总会在重新订阅的时候生成一个新的 subject，并且重新订阅源 observable，不论当前的 subject 是否完成**

```javascript
function instrument<T>(source: Observable<T>) {
      return Observable.create((observer: Observer<T>) => {
        console.log("source: subscribing");
        const subscription = source
          .pipe(tap((value) => console.log(`source: ${value}`)))
          .subscribe(observer);
        return () => {
          subscription.unsubscribe();
          console.log("source: unsubscribed");
        };
      }) as Observable<T>;
    }

    function observer<T>(name: string) {
      return {
        next: (value: T) => console.log(`observer ${name}: ${value}`),
        complete: () => console.log(`observer ${name}: complete`)
      };
    }
    const source = instrument(timer(100));
    const counted = source.pipe(share());
    const a = counted.subscribe(observer("a"));
    setTimeout(() => a.unsubscribe(), 110);
    setTimeout(() => counted.subscribe(observer("b")), 120);
```

输出

```text
source: subscribing
source: 0
observer a: 0
source: unsubscribed
observer a: complete
source: subscribing
source: 0
observer b: 0
source: unsubscribed
observer b: complete
```

```javascript
const source = instrument(interval(1000));
const counted = source.pipe(share());
const a = counted.subscribe(observer("a"));
setTimeout(() => a.unsubscribe(), 1500);
setTimeout(() => counted.subscribe(observer("b")), 2000);
```

输出

```text
source: 0
observer a: 0
source: unsubscribed
source: subscribing
source: 0
observer b: 0
source: 1
observer b: 1
source: 2
observer b: 2
```

## Observer

观察者

### 什么是观察者？

定义对于 observable 该如何处理

观察者是 Observable 发送的值的消费者。观察者只是一组回调函数的集合，每个回调函数对应一种 Observable 发送的通知类型：next、error 和 complete 。

```javascript
var observer = {
  next: x => console.log("Observer got a next value: " + x),
  error: err => console.error("Observer got an error: " + err),
  complete: () => console.log("Observer got a complete notification")
};
```

要使用观察者，需要把它提供给 Observable 的 subscribe 方法：

```javascript
observable.subscribe(observer);
```

**观察者只是有三个回调函数的对象，每个回调函数对应一种 Observable 发送的通知类型。**
观察者也可以是部分的

## Subscription

订阅

当你订阅了 Observable，你会得到一个 Subscription ，**它表示进行中的执行**。只要调用 unsubscribe() 方法就可以取消执行。

## Subject

主体。是一种特殊的 observable（Hot Observable），它允许将值多播给多个观察者，所以 Subject 是多播的，而普通的 Observables 是单播的(每个已订阅的观察者都拥有 Observable 的独立执行)。

- **每个 Subject 都是 Observable。** -对于 Subject，你可以提供一个观察者并使用 subscribe 方法，就可以开始正常接收值。从观察者的角度而言，它无法判断 Observable 执行是来自普通的 Observable 还是 Subject 。

在 Subject 的内部，subscribe 不会调用发送值的新执行。它只是将给定的观察者注册到观察者列表中。也就是说这个新的观察者并不一定能收到 Subject 发出的所有值，它可以收到的值取决于它何时订阅。

- **每个 Subject 都是观察者。** Subject 是一个有如下方法的对象： next(v)、error(e) 和 complete() 。要给 Subject 提供新值，只要调用 next(theValue)，它会将值多播给已注册监听该 Subject 的观察者们。

- Subject 不可重用：也就是说，当一个 Subject 完成或者出错时，就不能再使用了。

```javascript
// The death of a Subject
const subject = new Subject();
subject.subscribe(x => console.log(x));
subject.next(1); // 1
subject.next(2); // 2
subject.complete();
subject.next(3); // silently ignored
subject.unsubscribe();
subject.next(4); // Unhandled ObjectUnsubscribedError
```

在内部，每个 Subject 都维护着一个观察者注册表（作为一个数组）。简而言之，这就是 Subject 在内部的工作方式：

- 每次有新的观察者订阅时，Subject 都会将观察者存储在观察者的数组中

- 当发出一个新值（即 next()调用该方法）时，Subject 将循环遍历观察者并向它们中的每一个发出相同的值（多播）。错误或完成时也会发生同样的情况

- 当一个 Subject 完成时，所有的观察者都会自动取消订阅

- 相反，当一个 Subject 被取消订阅时，订阅将仍然有效。观察者的数组被取消，但不会取消订阅它们。如果您尝试从未订阅的 Subject 发出值，它实际上会引发错误。最好的行动方案应该是在您需要处理它们及其观察者时完成您的 Subject ？？（没太懂这句话）

- 当其中一个观察者取消订阅时，它将从注册表中删除

```javascript
const subject = new Subject();
// add observer1 to the list of observers
const sub1 = subject.subscribe(observer1);
// add observer2 to the list of observers
const sub2 = subject.subscribe(observer2);
// notify all observers in the list with "hi there"
subject.next("hi there");
// remove observer1 from the list
sub1.unsubscribe();
```

### BehaviorSubject

它有一个“当前值”的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”。
BehaviorSubject 必须传入一个初始化的值

### ReplaySubject

ReplaySubject 类似于 BehaviorSubject，它可以发送旧值给新的订阅者，但它还可以记录 Observable 执行的一部分。

**ReplaySubject 记录 Observable 执行中的多个值并将其回放给新的订阅者。**

ReplaySubject 在实例化的时候接受两个参数，第一个表示缓冲数量，第二个表示 window time (以毫秒为单位)来确定多久之前的值可以记录.

### AsyncSubject

只有当 Observable 执行完成时(执行 complete())，它才会将执行的最后一个值发送给观察者。

## Scheduler (调度器)

调度器控制着何时启动 subscription 和何时发送通知
目前还没有使用到过

> 调度器可以让你规定 Observable 在什么样的执行上下文中发送通知给它的观察者。

[调度器相关](https://cn.rx.js.org/manual/overview.html#h17)

## Q&A

1. multicast(new Subject()) 和 multicast(()=>new Subject())的区别

前者将一个冷的 observable 转化为一个热的 observable；后者实际上每次都会生成一个新的 Subject，在有新的订阅者来临时（在和 refCount 配合使用时，因为 refCount 会在有新的订阅者出现时使用 connect 开始共享的执行），如果前一个 subject 已经 complete 的话，那么就会重新生成一个 Subject，所以后者还是会接收到值。因此后者还是一个冷的 observable，多播一般使用前者。

口说无凭，看例子

- multicast(new Subject())

```javascript
var source = from([1, 2, 3]);
var multicasted = source.pipe(multicast(new Subject()), refCount());

// 在底层使用了 `subject.subscribe({...})`:
multicasted.subscribe({
  next: v => console.log("observerA: " + v)
});
setTimeout(() => {
  multicasted.subscribe({
    next: v => console.log("observerB: " + v)
  });
}, 200);

// multicasted.connect()
```

上面这种写法，无论是使用 refCount 还是手动 connect 结果都一样

```text
observerA: 1
observerA: 2
observerA: 3
```

- multicast(()=>new Subject()) + refCount() === share()

```javascript
var source = from([1, 2, 3]);
var multicasted = source.pipe(
  multicast(() => new Subject()),
  refCount()
);

// 在底层使用了 `subject.subscribe({...})`:
multicasted.subscribe({
  next: v => console.log("observerA: " + v)
});
setTimeout(() => {
  multicasted.subscribe({
    next: v => console.log("observerB: " + v)
  });
}, 200);
```

结果

```text

observerA: 1
observerA: 2
observerA: 3
observerB: 1
observerB: 2
observerB: 3
```

- multicast(()=>new Subject()) + 手动 connect

```javascript
var source = from([1, 2, 3]);
var multicasted = source.pipe(multicast(() => new Subject()));

// 在底层使用了 `subject.subscribe({...})`:
multicasted.subscribe({
  next: v => console.log("observerA: " + v)
});
setTimeout(() => {
  multicasted.subscribe({
    next: v => console.log("observerB: " + v)
  });
}, 200);
multicasted.connect();
```

结果

```text
observerA: 1
observerA: 2
observerA: 3
```

2. publish().refCount() 或 share()的效果

同时接通的多个订阅者不会重复触发上游的逻辑；但全部取消订阅之后再接通，就会再走一遍上游 (重订阅)； 因此并不是严格意义上的“缓存”

## 推荐阅读

- [rxjs-subjects-in-depth](https://blog.bitsrc.io/rxjs-subjects-in-depth-56dcfc1dc858)
- [how to use Subjects](https://www.digitalocean.com/community/tutorials/rxjs-subjects)
- [关于 RxJS Subject 一些误用场景的介绍](https://benlesh.medium.com/on-the-subject-of-subjects-in-rxjs-2b08b7198b93)
- [如何使用 refCount](https://zhuanlan.zhihu.com/p/33621290)
- [publish 和 share](https://zhuanlan.zhihu.com/p/33225623)
