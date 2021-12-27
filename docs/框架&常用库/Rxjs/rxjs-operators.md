---
slug: rxjs-operators
title: rxjs 操作符
tags: [Rxjs]
---

## 条件

### every

```typescript
every(predicate: function, thisArg: any): Observable
```

类似于数组的 every 方法，判断流**完成时**发出的所有值是否满足传入的回调函数的条件，从而返回 true/false
如果**完成时**所有的值都能通过断言，那么发出 true，否则发出 false 。类似于数组的 every 方法

```typescript
// RxJS v6+
import { every } from "rxjs/operators";
import { of } from "rxjs";

// 发出5个值
const source = of(1, 2, 3, 4, 5);
const example = source.pipe(
  // 每个值都是偶数吗？
  every(val => val % 2 === 0)
);
// 输出: false
const subscribe = example.subscribe(val => console.log(val));
```

### defaultIfEmpty

```typescript
aultIfEmpty(defaultValue: any): Observable
```

如果流在**完成**时没有发出任何值，则发出 defaultIfEmpty 中的值

```typescript
// RxJS v6+
import { defaultIfEmpty } from "rxjs/operators";
import { of } from "rxjs";

// 当源 observable 为空时，发出 'Observable.of() Empty!'，否则发出源的任意值
const exampleOne = of().pipe(defaultIfEmpty("Observable.of() Empty!"));
// 输出: 'Observable.of() Empty!'
const subscribe = exampleOne.subscribe(val => console.log(val));
```

## 组合

### combineLastest

是一个 creator

```typescript
combineLatest(observables: ...Observable, project: function): Observable
```

传入的 observables 都需要至少发出一个值，它才会发出值；然后就是任意一个 observable 发出值都会和其他的 observable 的最新值组合成一个数组发出。

发出的值是一个数组，数组的每个值时当前的所有 observable 的最新值，当最后一个 observable complete 的时候整体才会 complete

#### 使用场景

当有多个长期活动的 observables 且它们依靠彼此来进行一些计算或决定时，此操作符是最适合的。

```typescript
// RxJS v6+
import { timer, combineLatest } from "rxjs";

// timerOne 在1秒时发出第一个值，然后每4秒发送一次
const timerOne = timer(1000, 4000);
// timerTwo 在2秒时发出第一个值，然后每4秒发送一次
const timerTwo = timer(2000, 4000);
// timerThree 在3秒时发出第一个值，然后每4秒发送一次
const timerThree = timer(3000, 4000);

// combineLatest 还接收一个可选的 projection 函数
const combinedProject = combineLatest(
  timerOne,
  timerTwo,
  timerThree,
  (one, two, three) => {
    return `Timer One (Proj) Latest: ${one},
              Timer Two (Proj) Latest: ${two},
              Timer Three (Proj) Latest: ${three}`;
  }
);
// 输出值
// 组合的结果在3s之后发出第一个值
const subscribe = combinedProject.subscribe(latestValuesProject =>
  console.log(latestValuesProject)
);
```

### withLatestFrom

是一个 operator，解决的问题：防止同源干扰

```typescript
withLatestFrom(other: Observable, project: Function): Observable
```

还提供另一个 observable 的最新值。由源 observable 控制发出值的速率（当两个 observable 都发出值后），源 observable 每次发出值的时候，将源 observable 发出的值和 other 的最新值合并为一个数组发出
两个 observable 在发出值前要确保至少都有 1 个值，也就是说初始值需要等到两个 observable 都发出值。

发出的值时两个 observable 的最新值组成的数组

#### 源 observable 速率慢

```typescript
// RxJS v6+
import { withLatestFrom, map } from "rxjs/operators";
import { interval } from "rxjs";

// 每5秒发出值
const source = interval(5000);
// 每1秒发出值
const secondSource = interval(1000);
const example = source.pipe(
  withLatestFrom(secondSource),
  map(([first, second]) => {
    return `First Source (5s): ${first} Second Source (1s): ${second}`;
  })
);
/*
  输出:
  "First Source (5s): 0 Second Source (1s): 4"
  "First Source (5s): 1 Second Source (1s): 9"
  "First Source (5s): 2 Second Source (1s): 14"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```

#### other 速率慢

```typescript
// RxJS v6+
import { withLatestFrom, map } from "rxjs/operators";
import { interval } from "rxjs";

// 每5秒发出值
const source = interval(5000);
// 每1秒发出值
const secondSource = interval(1000);
// withLatestFrom 的 observable 比源 observable 慢
const example = secondSource.pipe(
  // 两个 observable 在发出值前要确保至少都有1个值 (需要等待5秒)
  withLatestFrom(source),
  map(([first, second]) => {
    return `Source (1s): ${first} Latest From (5s): ${second}`;
  })
);
/*
  "Source (1s): 4 Latest From (5s): 0"
  "Source (1s): 5 Latest From (5s): 0"
  "Source (1s): 6 Latest From (5s): 0"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```

### zip

```typescript
zip(observables: *): Observable
```

将所有 observable 的第 i 个元素组成数组发出，发出第一个值的前提时所有 observable 都需要发出至少一个值。
任意一个 observable complete，则 zip 组合得到的 observable 就 complete
zip 操作符会订阅所有内部 observables，然后等待每个发出一个值。一旦发生这种情况，将发出具有相应索引的所有值。这会持续进行，直到至少一个内部 observable 完成。

> 与 interval 或 timer 进行组合, zip 可以用来根据另一个 observable 进行定时输出！

```typescript
// RxJS v6+
import { take } from "rxjs/operators";
import { interval, zip } from "rxjs";

// 每1秒发出值
const source = interval(1000);
// 当一个 observable 完成时，便不会再发出更多的值了
const example = zip(source, source.pipe(take(2)));
// 输出: [0,0]...[1,1]
const subscribe = example.subscribe(val => console.log(val));
```

### forkJoin

```typescript
forkJoin(...args, selector : function): Observable
```

**注意：接收的参数可以是一个数组，也可以是多个 observable，Promise.all 接收的是一个数组**

类似于 Promise.all，并发执行，结果是每个 observable 发出的最新值组合成的数组，**需要等所有的 observable 都完成之后，将每个 observable 的最新值组成一个数组发出**
⚠️**如果内部 observable 不完成的话，forkJoin 永远不会发出值！**

#### 使用场景

当有一组 observables，但你只关心每个 observable 最后发出的值时，此操作符是最适合的。此操作符的一个常见用例是在页面加载(或其他事件)时你希望发起多个请求，并在所有请求都响应后再采取行动。
注意，如果任意作用于 forkJoin 的内部 observable 报错的话，对于那些在内部 observable 上没有正确 catch 错误，从而导致完成的 observable 将丢失它们的值，**即一个失败，整体失败**

#### 外部处理错误

```typescript
// RxJS v6+
import { delay, catchError } from "rxjs/operators";
import { forkJoin, of, throwError } from "rxjs";

/*
  当所有 observables 完成时，将每个 observable 
  的最新值作为数组发出
*/
const example = forkJoin(
  // 立即发出 'Hello'
  of("Hello"),
  // 1秒后发出 'World'
  of("World").pipe(delay(1000)),
  // 抛出错误
  _throw("This will error")
).pipe(catchError(error => of(error)));
// 输出: 'This will Error'
const subscribe = example.subscribe(val => console.log(val));
```

#### 内部处理错误

```typescript
// RxJS v6+
import { delay, catchError } from "rxjs/operators";
import { forkJoin, of, throwError } from "rxjs";

/*
  当所有 observables 完成时，将每个 observable 
  的最新值作为数组发出
*/
const example = forkJoin(
  // 立即发出 'Hello'
  of("Hello"),
  // 1秒后发出 'World'
  of("World").pipe(delay(1000)),
  // 抛出错误
  _throw("This will error").pipe(catchError(error => of(error)))
);
// 输出: ["Hello", "World", "This will error"]
const subscribe = example.subscribe(val => console.log(val));
```

### race

```typescript
race(...args): Observable
```

**注意：接收的参数可以是一个数组，也可以是多个 observable，Promise.race 接收的是一个数组**

类似于 Promise.race
使用首先发出值的 observable 。无论他的状态是什么

```typescript
// RxJS v6+
import { mapTo } from "rxjs/operators";
import { interval } from "rxjs/observable/interval";
import { race } from "rxjs/observable/race";

// 接收第一个发出值的 observable
const example = race(
  // 每1.5秒发出值
  interval(1500),
  // 每1秒发出值
  interval(1000).pipe(mapTo("1s won!")),
  // 每2秒发出值
  interval(2000),
  // 每2.5秒发出值
  interval(2500)
);
// 输出: "1s won!"..."1s won!"...etc
const subscribe = example.subscribe(val => console.log(val));
```

```typescript
// RxJS v6+
import { delay, map } from "rxjs/operators";
import { of, race } from "rxjs";

// 抛出错误并忽略其他的 observables 。
const first = of("first").pipe(
  delay(100),
  map(_ => {
    throw "error";
  })
);
const second = of("second").pipe(delay(200));
const third = of("third").pipe(delay(300));
// error
race(first, second, third).subscribe(
  val => console.log(val),
  err => console.log(err)
);
```

### pairwise()

```typescript
pairwise(): Observable<Array>
```

将前一个值和当前值组成的数组发出，所以第一个值发出的时候上游的 observable 已经发出了两个值

```typescript
// RxJS v6+
import { pairwise, take } from "rxjs/operators";
import { interval } from "rxjs";

// 返回: [0,1], [1,2], [2,3], [3,4], [4,5]
// [0, 1] 在两秒后发出，后面的值则是每隔一秒发出
interval(1000)
  .pipe(pairwise(), take(5))
  .subscribe(console.log);
```

### concat()

```typescript
concat(observable1,observable2,....)
```

将多个 observables 转换成单个 observable 。
把传入的每一个 observable 串联起来，依次订阅。

**按照顺序，前一个 observable 完成了再订阅下一个 observable 并发出值。当前一个 observable 没有完成的时候，后面的 observable 永远不会被订阅**

与 concatAll 的区别是，concatAll 是一个 observable 里面又包裹了一个或者多个 observable，然后依次订阅 observable 里面包裹的 observable，它不接受参数，相当于，去掉一层 observable 然后对里面的 observables 进行 concat 操作

#### 作为操作符

```typescript
// RxJS v6+
import { concat } from "rxjs/operators";
import { of } from "rxjs";

// 发出 1,2,3
const sourceOne = of(1, 2, 3);
// 发出 4,5,6
const sourceTwo = of(4, 5, 6);
// 先发出 sourceOne 的值，当完成时订阅 sourceTwo
const example = sourceOne.pipe(concat(sourceTwo));
// 输出: 1,2,3,4,5,6
const subscribe = example.subscribe(val =>
  console.log("Example: Basic concat:", val)
);
```

#### 作为 creator

```typescript
// RxJS v6+
import { of, concat } from "rxjs";

// 发出 1,2,3
const sourceOne = of(1, 2, 3);
// 发出 4,5,6
const sourceTwo = of(4, 5, 6);

// 作为静态方法使用
const example = concat(sourceOne, sourceTwo);
// 输出: 1,2,3,4,5,6
const subscribe = example.subscribe(val => console.log(val));
```

### merge()

```typescript
merge(input: Observable): Observable
```

将多个 observables 转换成单个 observable 。
用法和 concat 类似，区别就是 concat 是顺序的，merge 则是按照合并的 observable 发出值的顺序将值发出，所有 observable 一起执行

#### 作为 operator

```typescript
// RxJS v6+
import { merge } from "rxjs/operators";
import { interval } from "rxjs";

// 每2.5秒发出值
const first = interval(2500);
// 每1秒发出值
const second = interval(1000);
// 作为实例方法使用
const example = first.pipe(merge(second));
// 输出: 0,1,0,2....
const subscribe = example.subscribe(val => console.log(val));
```

#### 作为 creator

```typescript
// RxJS v6+
import { mapTo } from "rxjs/operators";
import { interval, merge } from "rxjs";

// 每2.5秒发出值
const first = interval(2500);
// 每2秒发出值
const second = interval(2000);
// 每1.5秒发出值
const third = interval(1500);
// 每1秒发出值
const fourth = interval(1000);

// 从一个 observable 中发出输出值
const example = merge(
  first.pipe(mapTo("FIRST!")),
  second.pipe(mapTo("SECOND!")),
  third.pipe(mapTo("THIRD")),
  fourth.pipe(mapTo("FOURTH"))
);
// 输出: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe(val => console.log(val));
```

### concatAll()

```typescript
concatAll(): Observable
```

#### 打平 observable

```typescript
// RxJS v6+
import { map, concatAll } from "rxjs/operators";
import { of, interval } from "rxjs";

// 每2秒发出值
const source = interval(2000);
const example = source.pipe(
  // 为了演示，增加10并作为 observable 返回
  // source 每次发出值都会被转换为一个observable(value+10)如果没有concatAll，则subscribe打印出的则是一个observable
  map(val => of(val + 10)),
  // 合并内部 observables 的值
  concatAll()
);
// 输出: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
const subscribe = example.subscribe(val =>
  console.log("Example with Basic Observable:", val)
);
```

#### 依次订阅 observable

```typescript
// RxJS v6+
import { interval, of } from "rxjs";
import { take, concatAll } from "rxjs/operators";

const obs1 = interval(1000).pipe(take(5));
const obs2 = interval(500).pipe(take(2));
const obs3 = interval(2000).pipe(take(1));
// 发出3个 observables
const source = of(obs1, obs2, obs3);
// 按顺序订阅每个内部 obserable，前一个完成了再订阅下一个
const example = source.pipe(concatAll());
/*
  输出: 0,1,2,3,4,0,1,0
  怎么运行的...
  订阅每个内部 observable 并发出值，当一个完成了才订阅下一个
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe(val => console.log(val));
```

### mergeAll()

```typescript
mergeAll(concurrent: number): Observable
```

类似于 concatAll，打平外层的 observable，使用 merge 的方式合并内部的 observables 为单个 observable 来发出值
收集并订阅所有的 observables 。

#### 并发控制的 mergeAll

```typescript
// RxJS v6+
import { take, map, delay, mergeAll } from "rxjs/operators";
import { interval } from "rxjs";

const source = interval(500).pipe(take(5));

/*
  interval 每0.5秒发出一个值。这个值会被映射成延迟1秒的 interval 。mergeAll 操作符接收一个可选参数
  以决定在同一时间有多少个内部 observables 可以被订阅。其余的 observables 会先暂存以等待订阅。
*/
const example = source
  .pipe(
    map(val => source.pipe(delay(1000), take(3))),
    mergeAll(2)
  )
  .subscribe(val => console.log(val));
/*
  一旦操作符发出了所有值，则 subscription 完成。
*/
```

### startWith()

```typescript
startWith(an: Values): Observable
```

初始化流，给流一个初始值，也可以给多个初始值
发出给定的第一个值，该流立即发出我们给的值，类似于 BehaviorSubject

```typescript
// RxJS v6+
import { startWith, scan } from "rxjs/operators";
import { of } from "rxjs";

// 发出 ('World!', 'Goodbye', 'World!')
const source = of("World!", "Goodbye", "World!");
// 以 'Hello' 开头，后面接当前字符串
const example = source.pipe(
  startWith("Hello"),
  scan((acc, curr) => `${acc} ${curr}`)
);
/*
  输出:
  "Hello"
  "Hello World!"
  "Hello World! Goodbye"
  "Hello World! Goodbye World!"
*/
const subscribe = example.subscribe(val => console.log(val));
```

#### 可以初始化多个值

```typescript
// RxJS v6+
import { startWith } from "rxjs/operators";
import { interval } from "rxjs";

// 每1秒发出值
const source = interval(1000);
// 以 -3, -2, -1 开始
const example = source.pipe(startWith(-3, -2, -1));
// 输出: -3, -2, -1, 0, 1, 2....
const subscribe = example.subscribe(val => console.log(val));
```
