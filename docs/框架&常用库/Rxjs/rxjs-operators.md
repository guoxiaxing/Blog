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

## 创建

### of

```typescript
of(...values, scheduler: Scheduler): Observable
```

按照顺序发出任意数量的值，立即依次发出

```javascript
// RxJS v6+
import { of } from "rxjs";
// 出任意类型值
const source = of(
  { name: "Brian" },
  [1, 2, 3],
  function hello() {
    return "Hello";
  },
  2,
  3,
  4
);
// 输出: {name: 'Brian}, [1,2,3], function hello() { return 'Hello' }, 2, 3, 4
const subscribe = source.subscribe(val => console.log(val));
```

### from

```typescript
from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable
```

传入一个具有 Iterator 接口的对象，将其每一个元素依次发出。例如说：数组的每个元素、字符串的每一个字符...

将数组、promise 或迭代器转换成 observable 。

**对于数组和迭代器，所有包含的值都会被作为序列发出！**

**此操作符也可以用来将字符串作为字符的序列发出！**

#### 数组

```typescript
// RxJS v6+
import { from } from "rxjs";

// 将数组作为值的序列发出
const arraySource = from([1, 2, 3, 4, 5]);
// 输出: 1,2,3,4,5
const subscribe = arraySource.subscribe(val => console.log(val));
```

#### 字符串

```typescript
// RxJS v6+
import { from } from "rxjs";

// 将字符串作为字符序列发出
const source = from("Hello World");
// 输出: 'H','e','l','l','o',' ','W','o','r','l','d'
const subscribe = source.subscribe(val => console.log(val));
```

#### 集合

```typescript
// RxJS v6+
import { from } from "rxjs";

// 使用 js 的集合
const map = new Map();
map.set(1, "Hi");
map.set(2, "Bye");

const mapSource = from(map);
// 输出: [1, 'Hi'], [2, 'Bye']
const subscribe = mapSource.subscribe(val => console.log(val));
```

#### Promise

```typescript
// RxJS v6+
import { from } from "rxjs";

// 发出 promise 的结果
const promiseSource = from(new Promise(resolve => resolve("Hello World!")));
// 输出: 'Hello World'
const subscribe = promiseSource.subscribe(val => console.log(val));
```

### formEvent

```typescript
fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable
```

通过 observable 的形式来给指定的元素绑定事件

将事件转换成 observable 序列。

```typescript
// RxJS v6+
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

// 创建发出点击事件的 observable
const source = fromEvent(document, "click");
// 映射成给定的事件时间戳
const example = source.pipe(map(event => `Event time: ${event.timeStamp}`));
// 输出 (示例中的数字以运行时为准): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));
```

### formPromise

```typescript
fromPromise(promise: Promise, scheduler: Scheduler): Observable
```

创建由 promise 转换而来的 observable，并发出 promise 的结果。也可以使用 from 来达到相同的效果

```typescript
import { of } from "rxjs/observable/of";
import { fromPromise } from "rxjs/observable/fromPromise";
import { mergeMap, catchError } from "rxjs/operators";

// 基于输入来决定是 resolve 还是 reject 的示例 promise
const myPromise = willReject => {
  return new Promise((resolve, reject) => {
    if (willReject) {
      reject("Rejected!");
    }
    resolve("Resolved!");
  });
};
// 先发出 true，然后是 false
const source = of(true, false);
const example = source.pipe(
  mergeMap(val =>
    fromPromise(myPromise(val)).pipe(
      // 捕获并优雅地处理 reject 的结果
      catchError(error => of(`Error: ${error}`))
    )
  )
);
// 输出: 'Error: Rejected!', 'Resolved!'
const subscribe = example.subscribe(val => console.log(val));
```

### interval

```typescript
interval(period: number, scheduler: Scheduler): Observable
```

类似于 setInterval，用于指定一个时间间隔来发出值，从 0 开始，每次递增 1。0, 1, 2....

**传入的时间单位是 ms**

```typescript
// RxJS v6+
import { interval } from "rxjs";

// 每1秒发出数字序列中的值
const source = interval(1000);
// 数字: 0,1,2,3,4,5....
const subscribe = source.subscribe(val => console.log(val));
```

### timer

传入两个参数，第一个参数是发出第一个值要等的 ms 数，第二个参数是：发出第一个值之后每个多少 ms 就发出一个值，也是从 0 开始递增

```typescript
timer(initialDelay: number | Date, period: number, scheduler: Scheduler): Observable
```

#### 1s 之后发出一个值然后 complete

```typescript
// RxJS v6+
import { timer } from "rxjs";

// 1秒后发出0，然后结束，因为没有提供第二个参数
const source = timer(1000);
// 输出: 0
const subscribe = source.subscribe(val => console.log(val));
```

#### 1 秒后发出值，然后每 2 秒发出值

```typescript
// RxJS v6+
import { timer } from "rxjs";

/*
  timer 接收第二个参数，它决定了发出序列值的频率，在本例中我们在1秒发出第一个值，
  然后每2秒发出序列值
*/
const source = timer(1000, 2000);
// 输出: 0,1,2,3,4,5......
const subscribe = source.subscribe(val => console.log(val));
```

### empty

```typescript
empty(scheduler: Scheduler): Observable
```

不发出任何值，直接 complete

**创建一个直接 complete 的 observable，不发出任何值**

```typescript
// RxJS v6+
import { empty } from "rxjs";

// 输出: 'Complete!'
const subscribe = empty().subscribe({
  next: () => console.log("Next"),
  complete: () => console.log("Complete!")
});
```

### create

```typescript
create(subscribe: function)
```

传入一个函数，函数有一个参数，就是 observer，我们可以调用他的 next、error、complete 方法

#### 同步的发出值

```typescript
// RxJS v6+
import { Observable } from "rxjs";
/*
  创建在订阅函数中发出 'Hello' 和 'World' 的 observable 。
*/
const hello = Observable.create(function(observer) {
  observer.next("Hello");
  observer.next("World");
});

// 输出: 'Hello'...'World'
const subscribe = hello.subscribe(val => console.log(val));
```

#### 异步的发出多个值

```typescript
// RxJS v6+
import { Observable } from "rxjs";

/*
  每秒自增值并且只发出偶数
*/
const evenNumbers = Observable.create(function(observer) {
  let value = 0;
  const interval = setInterval(() => {
    if (value % 2 === 0) {
      observer.next(value);
    }
    value++;
  }, 1000);

  return () => clearInterval(interval);
});
// 输出: 0...2...4...6...8
const subscribe = evenNumbers.subscribe(val => console.log(val));
// 10秒后取消订阅
setTimeout(() => {
  subscribe.unsubscribe();
}, 10000);
```

### range

```typescript
range(start: number, count: number, scheduler: Scheduler): Observable
```

给定一个初始值（包含初始值），以及增加的数量，按每次递增一发出值，直到发出的值的个数等于我们传递的 count 的值

依次发出给定区间内的数字。

第一个是起始值，包含起始值，第二个是数量，下一个在上一个的基础上加一。

```typescript
import { range } from "rxjs";

range(2, 5).subscribe(val => console.log(val)); // 2 3 4 5 6
```

### throwError

```typescript
throwError(error: any, scheduler: Scheduler): Observable
```

发出一个错误的 observable

```typescript
// RxJS v6+
import { throwError } from "rxjs";

// 在订阅上使用指定值来发出错误
const source = throwError("This is an error!");
// 输出: 'Error: This is an error!'
const subscribe = source.subscribe({
  next: val => console.log(val),
  complete: () => console.log("Complete!"),
  error: val => console.log(`Error: ${val}`)
});
```

## 错误处理

### catchError

```typescript
catchError(project : function): Observable
```

处理 observable 序列中的错误

**catchError 需要返回一个 observable**

#### 捕获 observable 中的错误

```typescript
// RxJS v6+
import { throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";
// 发出错误
const source = throwError("This is an error!");
// 优雅地处理错误，并返回带有错误信息的 observable
const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
// 输出: 'I caught: This is an error'
const subscribe = example.subscribe(val => console.log(val));
```

#### 捕获拒绝的 Promise

```typescript
// RxJS v6+
import { timer, from, of } from "rxjs";
import { mergeMap, catchError } from "rxjs/operators";

// 创建立即拒绝的 Promise
const myBadPromise = () =>
  new Promise((resolve, reject) => reject("Rejected!"));
// 1秒后发出单个值
const source = timer(1000);
// 捕获拒绝的 promise，并返回包含错误信息的 observable
const example = source.pipe(
  mergeMap(_ =>
    from(myBadPromise()).pipe(catchError(error => of(`Bad Promise: ${error}`)))
  )
);
// 输出: 'Bad Promise: Rejected'
const subscribe = example.subscribe(val => console.log(val));
```

### retry

```typescript
retry(number: number): Observable
```

当上游的 observable 发生错误时，按照指定的次数重新执行上游的 observable

```typescript
// RxJS v6+
import { interval, of, throwError } from "rxjs";
import { mergeMap, retry } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
const example = source.pipe(
  mergeMap(val => {
    // 抛出错误以进行演示
    if (val > 5) {
      return throwError("Error!");
    }
    return of(val);
  }),
  // 出错的话可以重试2次
  retry(2)
);
/*
  输出:
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  "Error!: Retried 2 times then quit!"
*/
const subscribe = example.subscribe({
  next: val => console.log(val),
  error: val => console.log(`${val}: Retried 2 times then quit!`)
});
```

### retryWhen

```typescript
retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable
```

当发生错误时，基于自定义的标准(传入一个函数，函数返回一个 observable，这个 observable complete 的时候就会重试)来重试 observable 序列。

```typescript
// RxJS v6+
import { timer, interval } from "rxjs";
import { map, tap, retryWhen, delayWhen } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
const example = source.pipe(
  map(val => {
    if (val > 5) {
      // 错误将由 retryWhen 接收
      throw val;
    }
    return val;
  }),
  retryWhen(errors =>
    errors.pipe(
      // 输出错误信息
      tap(val => console.log(`Value ${val} was too high!`)),
      // 6秒后重启
      delayWhen(val => timer(val * 1000))
    )
  )
);
/*
  输出:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --等待6秒后然后重复此过程
*/
const subscribe = example.subscribe(val => console.log(val));
```

## 多播

### multicast

```typescript
multicast(selector: Function): ConnectableObservable
```

使用提供 的 Subject 来共享源 observable

#### 使用 Subject 进行 multicast

```typescript
// RxJS v6+
import { Subject, interval } from "rxjs";
import { take, tap, multicast, mapTo } from "rxjs/operators";

// 每2秒发出值并只取前5个
const source = interval(2000).pipe(take(5));

const example = source.pipe(
  // 因为我们在下面进行了多播，所以副作用只会调用一次
  tap(() => console.log("Side Effect #1")),
  mapTo("Result!")
);

// 使用 subject 订阅 source 需要调用 connect() 方法
const multi = example.pipe(multicast(() => new Subject()));
/*
  多个订阅者会共享 source 
  输出:
  "Side Effect #1"
  "Result!"
  "Result!"
  ...
*/
const subscriberOne = multi.subscribe(val => console.log(val));
const subscriberTwo = multi.subscribe(val => console.log(val));
// 使用 subject 订阅 source
multi.connect();
```

#### 使用 ReplaySubject 进行 multicast

```typescript
// RxJS v6+
import { interval, ReplaySubject } from "rxjs";
import { take, multicast, tap, mapTo } from "rxjs/operators";

// 每2秒发出值并只取前5个
const source = interval(2000).pipe(take(5));

// 使用 ReplaySubject 的示例
const example = source.pipe(
  // 因为我们在下面进行了多播，所以副作用只会调用一次
  tap(_ => console.log("Side Effect #2")),
  mapTo("Result Two!")
);
// 可以使用任何类型的 subject
const multi = example.pipe(multicast(() => new ReplaySubject(5)));
// 使用 subject 订阅 source
multi.connect();

setTimeout(() => {
  /*
   因为使用的是 ReplaySubject，订阅者会接收到 subscription 中的之前所有值。
   */
  const subscriber = multi.subscribe(val => console.group(val));
}, 5000);
```

### publish

```typescript
publish() : ConnectableObservable
```

等价于 multicast(new Subject())

共享源 observable 并通过调用 connect 方法使其变成 Hot Observable。

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { publish, tap } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
const example = source.pipe(
  // 副作用只会执行1次
  tap(_ => console.log("Do Something!")),
  // 不会做任何事直到 connect() 被调用
  publish()
);

/*
  source 不会发出任何值直到 connect() 被调用
  输出: (5秒后)
  "Do Something!"
  "Subscriber One: 0"
  "Subscriber Two: 0"
  "Do Something!"
  "Subscriber One: 1"
  "Subscriber Two: 1"
*/
const subscribe = example.subscribe(val =>
  console.log(`Subscriber One: ${val}`)
);
const subscribeTwo = example.subscribe(val =>
  console.log(`Subscriber Two: ${val}`)
);

// 5秒后调用 connect，这会使得 source 开始发出值
setTimeout(() => {
  example.connect();
}, 5000);
```

如果没有 publish，则输出是这样的

```typescript
// 每1秒发出值
const source = interval(1000).pipe(take(5));
const example = source.pipe(tap(_ => console.log("Do Something!")));

const subscribe = example.subscribe(val =>
  console.log(`Subscriber One: ${val}`)
);
const subscribeTwo = example.subscribe(val =>
  console.log(`Subscriber Two: ${val}`)
);
// Do Something!
// Subscriber One: 0
// Do Something!
// Subscriber Two: 0
// Do Something!
// Subscriber One: 1
// Do Something!
// Subscriber Two: 1
// Do Something!
// Subscriber One: 2
// Do Something!
// Subscriber Two: 2
// Do Something!
// Subscriber One: 3
// Do Something!
// Subscriber Two: 3
// Do Something!
// Subscriber One: 4
// Do Something!
// Subscriber Two: 4
```

### share

```typescript
share(): Observable
```

等价于

multicast(() => new Subject()).pipe(refCount())

当原来订阅的 observer 为 0，在有新的 observer 来订阅的时候会重新订阅 source（因为 refCount 会在 observer 为 0 的时候取消订阅，再有新的 observer 的时候又会重新订阅）；否则的话就共享 source。当源 complete/error 的时候再有新的 observer 也会导致源重新执行

在多个订阅者间共享源 observable 。

```typescript
// RxJS v6+
import { timer } from "rxjs";
import { tap, mapTo, share } from "rxjs/operators";

// 1秒后发出值
const source = timer(1000);
// 输出副作用，然后发出结果
const example = source.pipe(
  tap(() => console.log("***SIDE EFFECT***")),
  mapTo("***RESULT***")
);

/*
  ***不共享的话，副作用会执行两次***
  输出: 
  "***SIDE EFFECT***"
  "***RESULT***"
  "***SIDE EFFECT***"
  "***RESULT***"
*/
const subscribe = example.subscribe(val => console.log(val));
const subscribeTwo = example.subscribe(val => console.log(val));

// 在多个订阅者间共享 observable
const sharedExample = example.pipe(share());
/*
   ***共享的话，副作用只执行一次***
  输出:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
const subscribeThree = sharedExample.subscribe(val => console.log(val));
const subscribeFour = sharedExample.subscribe(val => console.log(val));
```

### shareReplay

```typescript
shareReplay(bufferSize?: number, windowTime?: number, scheduler?I IScheduler): Observable
```

共享源 observable 并重放指定次数的发出。

- shareReplay 只会在源 observable complete/error 的时候才自动取消对源 observable 的订阅，后来的订阅者共享我们设置的 bufferSize 的值，并且不会再重新订阅源 observable

- 对于源 observable 没有 complete/error 的情况，那么始终共享源 observable，无论 observer 的个数如何

#### 为什么使用 shareReplay？

通常啊，当有副作用或繁重的计算时，你不希望在多个订阅者之间重复执行时，会使用 shareReplay 。 当你知道流的后来订阅者也需要访问之前发出的值，shareReplay 在这种场景下也是有价值的。 这种在订阅过程中重放值的能力是区分 share 和 shareReplay 的关键。

例如，加入你有一个发出最后访问 url 的 observable 。 在第一个示例中，我们将使用 share:

```typescript
// 使用 subject 模拟 url 的变化
const routeEnd = new Subject<{ data: any; url: string }>();

// 提取 url 并与后来订阅者共享
const lastUrl = routeEnd.pipe(pluck("url"), share());

// 起始订阅者是必须的
const initialSubscriber = lastUrl.subscribe(console.log);

// 模拟路由变化
routeEnd.next({ data: {}, url: "my-path" });

// 没有任何输出 原因是：源 observable 并没有 complete，所以也不会在又有新的observer的时候重新订阅源，所以就收不到值
const lateSubscriber = lastUrl.subscribe(console.log);
```

上面的示例中，lateSubscriber 订阅源 observable 后没有任何输出。 现在我们想要访问订阅中的最新发出值，可以通过 shareReplay 来完成:

```typescript
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { pluck, share, shareReplay, tap } from "rxjs/operators";

// 使用 subject 模拟 url 的变化
const routeEnd = new Subject<{ data: any; url: string }>();

// 提取 url 并与后来订阅者共享
const lastUrl = routeEnd.pipe(
  tap(_ => console.log("executed")),
  pluck("url"),
  // 默认为所有值，因此我们将其设置为仅保留并重放最后一个值
  shareReplay(1)
);

// 起始订阅者是必须的
const initialSubscriber = lastUrl.subscribe(console.log);

// 模拟路由变化
// 输出: 'executed', 'my-path'
routeEnd.next({ data: {}, url: "my-path" });

// 输出: 'my-path'
const lateSubscriber = lastUrl.subscribe(console.log);
```

## 过滤

### first

```typescript
first(predicate: function, select: function)
```

**发出第一个值或第一个通过给定表达式的值。**

> first 和 take(1)的区别：如果数据源返回空，如果使用 first 则会报错，而 take(1)会返回空值

```typescript
of()
  .pipe(first())
  .subscribe(
    () => console.log(123),
    e => console.log(e) // Error {}
  );
```

#### 发出序列中的第一个值

```typescript
// RxJS v6+
import { from } from "rxjs";
import { first } from "rxjs/operators";

const source = from([1, 2, 3, 4, 5]);
// 没有参数则发出第一个值
const example = source.pipe(first());
// 输出: "First value: 1"
const subscribe = example.subscribe(val => console.log(`First value: ${val}`));
```

#### 发出序列中第一个通过条件函数的值

```typescript
// RxJS v6+
import { from } from "rxjs";
import { first } from "rxjs/operators";

const source = from([1, 2, 3, 4, 5]);
// 发出通过测试的第一项
const example = source.pipe(first(num => num === 5));
// 输出: "First to pass test: 5"
const subscribe = example.subscribe(val =>
  console.log(`First to pass test: ${val}`)
);
```

#### 设置默认值

```typescript
// RxJS v6+
import { from } from "rxjs";
import { first } from "rxjs/operators";

const source = from([1, 2, 3, 4, 5]);
// 没有值通过的话则发出默认值
const example = source.pipe(first(val => val > 5, "Nothing"));
// 输出: 'Nothing'
const subscribe = example.subscribe(val => console.log(val));
```

### last

```typescript
last(predicate: function): Observable
```

根据提供的表达式，在源 observable **完成**时发出它的最后一个值/满足表达式条件的最后一个值。

#### 序列中的最后一个值

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { last } 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
// 没有参数则发出最后一个值
const example = source.pipe(last());
// 输出: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
```

#### 序列中最后一个满足条件的值

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { last } 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
// 发出最后一个偶数
const exampleTwo = source.pipe(last(num => num % 2 === 0));
// 输出: "Last to pass test: 4"
const subscribeTwo = exampleTwo.subscribe(val =>
  console.log(`Last to pass test: ${val}`)
);
```

#### 可以设置默认值

```typescript
// RxJS v6+
import { from } from 'rxjs';
import { last } 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
// 没有值通过的话则发出默认值
const exampleTwo = source.pipe(last(v => v > 5, 'Nothing!'));
// 输出: 'Nothing!'
const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
```

### filter

```typescript
filter(select: Function, thisArg: any): Observable
```

发出符合给定条件的值。类似于数组的 filter

```typescript
// RxJS v6+
import { from } from "rxjs";
import { filter } from "rxjs/operators";

// 发出 (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
// 过滤掉奇数
const example = source.pipe(filter(num => num % 2 === 0));
// 输出: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));
```

### distinctUntilChanged

```typescript
distinctUntilChanged(compare: function): Observable
```

当前值和前一个值不同时才发出当前值。

**distinctUntilChanged 默认使用 === 进行比较, 对象引用必须匹配！**

#### 对基础值使用 distinctUntilChanged

```typescript
// RxJS v6+
import { from } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

// 基于最新发出的值进行比较，只输出不同的值
const myArrayWithDuplicatesInARow = from([1, 1, 2, 2, 3, 1, 2, 3]);

const distinctSub = myArrayWithDuplicatesInARow
  .pipe(distinctUntilChanged())
  // 输出: 1,2,3,1,2,3
  .subscribe(val => console.log("DISTINCT SUB:", val));

const nonDistinctSub = myArrayWithDuplicatesInARow
  // 输出 : 1,1,2,2,3,1,2,3
  .subscribe(val => console.log("NON DISTINCT SUB:", val));
```

#### 对对象使用 distinctUntilChanged

```typescript
// RxJS v6+
import { from } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

const sampleObject = { name: "Test" };
// 对象必须有相同的引用
const myArrayWithDuplicateObjects = from([
  sampleObject,
  sampleObject,
  sampleObject
]);
// 基于最新发出的值进行比较，只输出不同的对象
const nonDistinctObjects = myArrayWithDuplicateObjects
  .pipe(distinctUntilChanged())
  // 输出: 'DISTINCT OBJECTS: {name: 'Test'}
  .subscribe(val => console.log("DISTINCT OBJECTS:", val));
```

### ignoreElements

```typescript
ignoreElements(): Observable
```

忽略发出的值，仅仅发出 error/complete

#### 只显示 complete

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { take, ignoreElements } from "rxjs/operators";

// 每100毫秒发出值
const source = interval(100);
// 略所有值，只发出 complete
const example = source.pipe(take(5), ignoreElements());
// 输出: "COMPLETE!"
const subscribe = example.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log("COMPLETE!")
);
```

#### 只显示 error

```typescript
// RxJS v6+
import { interval, throwError, of } from "rxjs";
import { mergeMap, ignoreElements } from "rxjs/operators";

// 每100毫秒发出值
const source = interval(100);
// 忽略所有值，只发出 error
const error = source.pipe(
  mergeMap(val => {
    if (val === 4) {
      return throwError(`ERROR AT ${val}`);
    }
    return of(val);
  }),
  ignoreElements()
);
// 输出: "ERROR: ERROR AT 4"
const subscribe = error.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log("SECOND COMPLETE!")
);
```

### sample

```typescript
sample(sampler: Observable): Observable
```

对源 observable 进行取样，当传入的 observable 发出值的时候，发出源 observable 的值。

#### 每 2 秒对源 observable 取样

```typescript
// RxJS v6+
import { interval } from 'rxjs';
import { sample } 'rxjs/operators';

// 每1秒发出值
const source = interval(1000);
// 每2秒对源 observable 最新发出的值进行取样
const example = source.pipe(sample(interval(2000)));
// 输出: 2..4..6..8..
const subscribe = example.subscribe(val => console.log(val));
```

#### 区分拖拽和点击

```typescript
// RxJS v6+
import { fromEvent, merge } from "rxjs";
import { sample, mapTo } from "rxjs/operators";

const listener = merge(
  fromEvent(document, "mousedown").pipe(mapTo(false)),
  fromEvent(document, "mousemove").pipe(mapTo(true))
)
  .pipe(sample(fromEvent(document, "mouseup")))
  .subscribe(isDragging => {
    console.log("Were you dragging?", isDragging);
  });
```

### single

```typescript
single(a: Function): Observable
```

发出通过表达式的单一项。**发出满足表达式的第一个值，然后 complete**

#### 发出通过断言的第一个数字

```typescript
// RxJS v6+
import { from } from "rxjs";
import { single } from "rxjs/operators";

// 发出 (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
// 发出匹配断言函数的一项
const example = source.pipe(single(val => val === 4));
// 输出: 4
const subscribe = example.subscribe(val => console.log(val));
```

### debounce

```typescript
debounce(durationSelector: function): Observable
```

根据一个选择器函数，舍弃掉在两次输出之间小于指定时间的发出值。

传入一个函数，该函数返回接受的参数就是上游的 observable 发出的值，然后这个函数返回的是一个 observable

如果在源 observable 发出下一个值之前，内部函数返回的 observable 没有发出值，则发出该值，否则不发出当前值

**内部的 observable 发出值的时候如果源 observable 的下一个值还没有发出，则源 observable 发出的下一个值会被发出。**

```typescript
// RxJS v6+
import { of, timer } from "rxjs";
import { debounce } from "rxjs/operators";

// 发出四个字符串
const example = of("WAIT", "ONE", "SECOND", "Last will display");
/*
  只有在最后一次发送后再经过一秒钟，才会发出值，并抛弃在此之前的所有其他值
*/
const debouncedExample = example.pipe(debounce(() => timer(1000)));
/*
    在这个示例中，所有的值都将被忽略，除了最后一个
    输出: 'Last will display'
*/
const subscribe = debouncedExample.subscribe(val => console.log(val));
```

### debounceTime

```typescript
debounceTime(dueTime: number, scheduler: Scheduler): Observable
```

**舍弃掉在两次输出之间小于指定时间的发出值**

```typescript
// RxJS v6+
import { fromEvent, timer } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

const input = document.getElementById("example");

// 对于每次键盘敲击，都将映射成当前输入值
const example = fromEvent(input, "keyup").pipe(map(i => i.currentTarget.value));

// 在两次键盘敲击之间等待0.5秒方才发出当前值，
// 并丢弃这0.5秒内的所有其他值
const debouncedInput = example.pipe(debounceTime(500));

// 输出值
const subscribe = debouncedInput.subscribe(val => {
  console.log(`Debounced Input: ${val}`);
});
```

源 observable 发出的相邻的两个值之前的时间间隔大于我们设置的时间的才会发出下一个值

### throttle

```typescript
throttle(durationSelector: function(value): Observable | Promise): Observable
```

以某个时间间隔为阈值，在 durationSelector 完成前将抑制新值的发出

在传入的第二个 observable 发出值时发出上游的 observable 的最新值

源 observable 发出一个值之后，在传入的函数返回的 observable 发出值之前忽略源 observable 发出的值，当传入的 observable 发出值之后，再发出此时之后源 observable 发出的第一个值。

#### 节流 2 秒，时间由第 2 个 observable 决定

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { throttle } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
// 节流2秒后才发出最新值
const example = source.pipe(throttle(val => interval(2000)));
// 输出: 0...3...6...9
const subscribe = example.subscribe(val => console.log(val));
```

#### 使用 promise 进行节流

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { throttle, map } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
// 基于 source 自增地增加解析的时间
const promise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Resolved: ${val}`), val * 100)
  );
// 当 promise 解析时发出 source 的项
const example = source.pipe(
  throttle(promise),
  map(val => `Throttled off Promise: ${val}`)
);

const subscribe = example.subscribe(val => console.log(val));
```

### throttleTime

```typescript
throttleTime(duration: number, scheduler: Scheduler): Observable
```

**当指定的持续时间经过后发出源 observable 发出的第一个值。**

#### 每 5 秒接收最新值

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { throttleTime } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
/*
  节流5秒
  节流结束前发出的最后一个值将从源 observable 中发出
*/
const example = source.pipe(throttleTime(5000));
// 输出: 0...6...12
const subscribe = example.subscribe(val => console.log(val));
```

#### 对合并的 observable 节流

```typescript
// RxJS v6+
import { interval, merge } from "rxjs";
import { throttleTime, ignoreElements } from "rxjs/operators";

const source = merge(
  //  每0.75秒发出值
  interval(750),
  // 每1秒发出值
  interval(1000)
);
// 在发出值的中间进行节流
const example = source.pipe(throttleTime(1200));
// 输出: 0...1...4...4...8...7
const subscribe = example.subscribe(val => console.log(val));
```

### take

```typescript
take(count: number): Observable
```

发出上游的前 count 个值，然后 complete 该流

当只对开头的一组值感兴趣时，你想要的便是 take 操作符。

如果想基于某个逻辑或另一个 observable 来取任意数量的值，你可以 takeUntil 或 takeWhile！

take 与 skip 是相反的，它接收起始的 N 个值，而 skip 会跳过起始的 N 个值。

#### 从源 observable 中取前 5 个值

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { take } from "rxjs/operators";

// 每1秒发出值
const interval$ = interval(1000);
// 取前5个发出的值
const example = interval$.pipe(take(5));
// 输出: 0,1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```

#### 取得首次点击的坐标

```html
<div id="locationDisplay">
  Where would you click first?
</div>
```

```typescript
// RxJS v6+
import { fromEvent } from "rxjs";
import { take, tap } from "rxjs/operators";

const oneClickEvent = fromEvent(document, "click").pipe(
  take(1),
  tap(v => {
    document.getElementById(
      "locationDisplay"
    ).innerHTML = `Your first click was on location ${v.screenX}:${v.screenY}`;
  })
);

const subscribe = oneClickEvent.subscribe();
```

### takeUntil

```typescript
takeUntil(notifier: Observable): Observable
```

上游的 observable 一直可以发出值，直到内部传入的 observable 发出值，则上游的 observable 完成

#### 取值直到 timer 发出

```typescript
// RxJS v6+
import { interval, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
// 5秒后发出值
const timer$ = timer(5000);
// 当5秒后 timer 发出值时， source 则完成
const example = source.pipe(takeUntil(timer$));
// 输出: 0,1,2,3
const subscribe = example.subscribe(val => console.log(val));
```

### takeWhile

```typescript
takeWhile(predicate: function(value, index): boolean): Observable
```

发出值，直到提供的表达式结果为 false 。

#### takeWhile 和 filter 的区别

```typescript
// RxJS v6+
import { of } from "rxjs";
import { takeWhile, filter } from "rxjs/operators";

// 发出 3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3
const source = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);

// 允许值通过直到源发出的值不等于3，然后完成
// 输出: [3, 3, 3]
source
  .pipe(takeWhile(it => it === 3))
  .subscribe(val => console.log("takeWhile", val));

// 输出: [3, 3, 3, 3, 3, 3, 3]
source
  .pipe(filter(it => it === 3))
  .subscribe(val => console.log("filter", val));
```

### skip

```typescript
skip(the: Number): Observable
```

跳过上游 observable 发出的前 n 个值

```typescript
// RxJS v6+
import { from } from "rxjs";
import { skip, filter } from "rxjs/operators";

const numArrayObs = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 3,4,5...
const skipObs = numArrayObs.pipe(skip(2)).subscribe(console.log);

// 3,4,5...
const filterObs = numArrayObs
  .pipe(filter((val, index) => index > 1))
  .subscribe(console.log);

// 同样的输出！
```

### skipUntil

```typescript
skipUntil(the: Observable): Observable
```

跳过源 observable 发出的值，直到传入的 observable 发出第一个值之后，源 observable 之后发出的值才会被发出

```typescript
// RxJS v6+
import { interval, timer } from "rxjs";
import { skipUntil } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
// 跳过源 observable 发出的值，直到内部 observable 发出值 (6s后)
const example = source.pipe(skipUntil(timer(6000)));
// 输出: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

### skipWhile

```typescript
skipUntil(the: Observable): Observable
```

跳过源 observable 发出的值，直到传入的表达式为 false，源 observable 之后发出的值都会被发出

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { skipWhile } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);
// 当源 observable 发出的值小于5的时候，则跳过该值
const example = source.pipe(skipWhile(val => val < 5));
// 输出: 5...6...7...8........
const subscribe = example.subscribe(val => console.log(val));
```

## 转换

### map

```typescript
map(project: Function, thisArg: any): Observable
```

将源 observable 发出的值通过传入的函数进行转换，类似于数组的 map 操作

```typescript
// RxJS v6+
import { from } from "rxjs";
import { map } from "rxjs/operators";

// 发出 (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
// 每个数字加10
const example = source.pipe(map(val => val + 10));
// 输出: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```

### mapTo

```typescript
mapTo(value: any): Observable
```

将源 observable 发出的所有值都转换为传入的 value 值发出

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { mapTo } from "rxjs/operators";

// 每2秒发出值
const source = interval(2000);
// 将所有发出值映射成同一个值
const example = source.pipe(mapTo("HELLO WORLD!"));
// 输出: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
const subscribe = example.subscribe(val => console.log(val));
```

### reduce

```typescript
public reduce(accumulator: function(acc: R, value: T, index: number): R, seed: R): Observable<R>
```

类似于数组的 reduce 函数

在源 Observalbe 上应用 accumulator (累加器) 函数，然后当源 Observable 完成时，返回 累加的结果，可以提供一个可选的 seed 值(初始值)。
使用 accumulator (累加器) 函数将源 Observable 所发出的所有值归并在一起， 该函数知道如何将新的源值纳入到过往的累加结果中。

**注意，reduce 只会发出一个值， 并且是当源 Observable 完成时才发出。它等价于使用 scan 操作符后面再跟 last 操作符。**

```typescript
// RxJS v6+
import { of } from "rxjs";
import { reduce } from "rxjs/operators";

const source = of(1, 2, 3, 4);
const example = source.pipe(reduce((acc, val) => acc + val));
// 输出: Sum: 10'
const subscribe = example.subscribe(val => console.log("Sum:", val));
```

### scan

```typescript
public scan(accumulator: function(acc: R, value: T, index: number): R, seed: T | R): Observable<R>
```

会将 accumulator 函数每次累加的结果都发出，也就是说该操作符发出值的速率和源 observable 发出值的速率相同

类似于 reduce，但是 reduce 值发出最终的结果，但是 scan 每次 accumulator 函数的返回值都会被发出

```typescript
// RxJS v6+
import { Subject } from "rxjs";
import { scan } from "rxjs/operators";

const subject = new Subject();
// scan 示例，随着时间的推移构建对象
const example = subject.pipe(
  scan((acc, curr) => Object.assign({}, acc, curr), {})
);
// 输出累加值
const subscribe = example.subscribe(val =>
  console.log("Accumulated object:", val)
);
// subject 发出的值会被添加成对象的属性
// {name: 'Joe'}
subject.next({ name: "Joe" });
// {name: 'Joe', age: 30}
subject.next({ age: 30 });
// {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
subject.next({ favoriteLanguage: "JavaScript" });
```

### pluck

```typescript
public pluck(properties: ...string): Observable
```

从源 observable 发出的对象中挑出指定的属性

将每个源值(对象)映射成它指定的嵌套属性。

类似于 map，但仅用于选择每个发出对象的某个嵌套属性。

```typescript
// RxJS v6+
import { from } from "rxjs";
import { pluck } from "rxjs/operators";

const source = from([
  { name: "Joe", age: 30, job: { title: "Developer", language: "JavaScript" } },
  // 当找不到 job 属性的时候会返回 undefined
  { name: "Sarah", age: 35 }
]);
// 提取 job 中的 title 属性
const example = source.pipe(pluck("job", "title"));
// 输出: "Developer" , undefined
const subscribe = example.subscribe(val => console.log(val));
```

### partition

```typescript
public partition(predicate: function(value: T, index: number): boolean, thisArg: any): [Observable<T>, Observable<T>]
```

将源 Observable 一分为二，一个是所有满足 predicate 函数的值，另一个是所有 不满足 predicate 的值。

它很像 filter，但是返回两个 Observables ： 一个像 filter 的输出， 而另一个是所有不符合条件的值。

```typescript
// RxJS v6+
import { from, merge } from "rxjs";
import { partition, map } from "rxjs/operators";

const source = from([1, 2, 3, 4, 5, 6]);
// 第一个值(events)返回 true 的数字集合，第二个值(odds)是返回 false 的数字集合
const [evens, odds] = source.pipe(partition(val => val % 2 === 0));
/*
  输出:
  "Even: 2"
  "Even: 4"
  "Even: 6"
  "Odd: 1"
  "Odd: 3"
  "Odd: 5"
*/
const subscribe = merge(
  evens.pipe(map(val => `Even: ${val}`)),
  odds.pipe(map(val => `Odd: ${val}`))
).subscribe(val => console.log(val));
```

### groupBy

```typescript
public groupBy(keySelector: function(value: T): K, elementSelector: function(value: T): R, durationSelector: function(grouped: GroupedObservable<K, R>): Observable<any>): Observable<GroupedObservable<K, R>>
```

根据指定条件将源 Observable 发出的值进行分组，并将这些分组作为 GroupedObservables 发出，每一个分组都是一个 GroupedObservable 。

**在源 observable complete 的时候会将分组的结果依次发出**

> GroupedObservable: 该 Observable 表示因具有共同的键而属于同一个组的值 。由 GroupedObservable 发出的值 来自于源 Observable 。共同的键可作为 GroupedObservable 实例上的 key 字段。

```typescript
// RxJS v6+
import { from } from "rxjs";
import { groupBy, mergeMap, toArray } from "rxjs/operators";

const people = [
  { name: "Sue", age: 25 },
  { name: "Joe", age: 30 },
  { name: "Frank", age: 25 },
  { name: "Sarah", age: 35 }
];
// 发出每个 people
const source = from(people);
// 根据 age 分组
const example = source.pipe(
  groupBy(person => person.age),
  // 为每个分组返回一个数组
  mergeMap(group => group.pipe(toArray()))
);
/*
  输出:
  [{age: 25, name: "Sue"},{age: 25, name: "Frank"}]
  [{age: 30, name: "Joe"}]
  [{age: 35, name: "Sarah"}]
*/
const subscribe = example.subscribe(val => console.log(val));
```

### expand

```typescript
public expand(project: function(value: T, index: number), concurrent: number): Observable
```

类似于 mergeMap，但是传入函数的返回值会递归该函数函数

返回的 Observable 基于应用一个函数来发送项，该函数提供给源 Observable 发出的每个项， 并返回一个 Observable，然后合并这些作为结果的 Observable，并发出本次合并的结果。 expand 会重新发出在输出 Observable 上的每个源值。然后，将每个输出值传给投射函数， 该函数返回要合并到输出 Observable 上的内部 Observable 。由投影产生的那些输出值也会 被传给投射函数以产生新的输出值。这就是 expand 如何进行递归的。

```typescript
// RxJS v6+
import { interval, of } from "rxjs";
import { expand, take } from "rxjs/operators";

// 发出 2
const source = of(2);
const example = source.pipe(
  // 递归调用提供的函数
  expand(val => {
    // 2,3,4,5,6
    console.log(`Passed value: ${val}`);
    // 3,4,5,6
    return of(1 + val);
  }),
  // 用5次
  take(5)
);
/*
    "RESULT: 2"
    "Passed value: 2"
    "RESULT: 3"
    "Passed value: 3"
    "RESULT: 4"
    "Passed value: 4"
    "RESULT: 5"
    "Passed value: 5"
    "RESULT: 6"
    "Passed value: 6"
*/
// 输出: 2,3,4,5,6
const subscribe = example.subscribe(val => console.log(`RESULT: ${val}`));
```

### concatMap

```typescript
public concatMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
```

将值映射成内部 observable，并按顺序订阅和发出。

所以最后发出的值是内部 observable 产生的值。

**如果源值不断的到达并且速度快于内部 Observables 完成的速度, 它会导致内存问题， 因为内部的 Observable 在无限制的缓冲区中聚集，以等待轮流订阅。所以内部的 observable 是一个可以完成的 observable**

#### concatMap 和 mergeMap 之间的区别

注意 concatMap 和 mergeMap 之间的区别。 因为 concatMap 之前前一个内部 observable 完成后才会订阅下一个， source 中延迟 2000ms 值会先发出。 对比的话， mergeMap 会立即订阅所有内部 observables， 延迟少的 observable (1000ms) 会先发出值，然后才是 2000ms 的 observable 。

```typescript
// RxJS v6+
import { of } from "rxjs";
import { concatMap, delay, mergeMap } from "rxjs/operators";

// 发出延迟值
const source = of(2000, 1000);
// 将内部 observable 映射成 source，当前一个完成时发出结果并订阅下一个
const example = source.pipe(
  concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
// 输出: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
const subscribe = example.subscribe(val =>
  console.log(`With concatMap: ${val}`)
);

// 展示 concatMap 和 mergeMap 之间的区别
const mergeMapExample = source
  .pipe(
    // 只是为了确保 meregeMap 的日志晚于 concatMap 示例
    delay(5000),
    mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe(val => console.log(`With mergeMap: ${val}`));
```

### mergeMap

```typescript
public mergeMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any, concurrent: number): Observable
```

将源 observable 发出的值 映射成 observable 并发出值。这些内部的 observable 会被同时订阅。

**当想要打平内部 observable 并手动控制内部订阅数量时，此操作符是最适合的。**

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

// 每1秒发出值
const source = interval(1000);

const example = source.pipe(
  mergeMap(
    //project
    val => interval(5000).pipe(take(2)),
    //resultSelector
    (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
    //concurrent
    2
  )
);
/*
        输出:
        [0, 0, 0, 0] <--第一个内部 observable
        [1, 1, 0, 0] <--第二个内部 observable
        [0, 0, 1, 1] <--第一个内部 observable
        [1, 1, 1, 1] <--第二个内部 observable
        [2, 2, 0, 0] <--第三个内部 observable
        [3, 3, 0, 0] <--第四个内部 observable
*/
const subscribe = example.subscribe(val => console.log(val));
```

### switchMap

如果源 observable 的下一个值发出的时候，前一个 observable 映射成的内部 observable 还没有 complete，那么就会退订这个内部的 observable，订阅这个新的 observable

```typescript
public switchMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
```

**switchMap 和其他打平操作符的主要区别是它具有取消效果。在每次发出时，会取消前一个内部 observable (你所提供函数的结果) 的订阅，然后订阅一个新的 observable 。你可以通过短语切换成一个新的 observable 来记忆它。**

返回的 Observable 基于应用一个函数来发送项，该函数提供给源 Observable 发出的每个项， 并返回一个(所谓的“内部”) Observable 。每次观察到这些内部 Observables 的其中一个时， 输出 Observable 将开始发出该内部 Observable 所发出的项。当发出一个新的内部 Observable 时，switchMap 会停止发出先前发出的内部 Observable 并开始发出新的内部 Observable 的值。后续的内部 Observables 也是如此。

```typescript
// RxJS v6+
import { interval, fromEvent } from "rxjs";
import { switchMap, mapTo } from "rxjs/operators";

// 发出每次点击
const source = fromEvent(document, "click");
// 如果3秒内发生了另一次点击，则消息不会被发出
const example = source.pipe(
  switchMap(val => interval(3000).pipe(mapTo("Hello, I made it!")))
);
// (点击)...3s...'Hello I made it!'...(点击)...2s(点击)...
const subscribe = example.subscribe(val => console.log(val));
```

### exhaustMap

与 switchMap 正好相反,映射成内部 observable，忽略其他值直到该 observable 完成。

```typescript
public exhaustMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
```

返回的 Observable 基于应用一个函数来发送项，该函数提供给源 Observable 发出的每个项， 并返回一个(所谓的“内部”) Observable 。当它将源值投射成 Observable 时，输出 Observable 开始发出由投射的 Observable 发出的项。然而，如果前一个投射的 Observable 还未完成的话， 那么 exhaustMap 会忽略每个新投射的 Observable 。一旦完成，它将接受并打平下一个 内部 Observable ，然后重复此过程。

```typescript
// RxJS v6+
import { interval } from "rxjs";
import { exhaustMap, tap, take } from "rxjs/operators";

const firstInterval = interval(1000).pipe(take(10));
const secondInterval = interval(1000).pipe(take(2));

const exhaustSub = firstInterval
  .pipe(
    exhaustMap(f => {
      console.log(`Emission Corrected of first interval: ${f}`);
      return secondInterval;
    })
  )
  /*
    当我们订阅第一个 interval 时，它开始发出值(从0开始)。
    这个值会映射成第二个 interval，然后它开始发出值(从0开始)。
    当第二个 interval 出于激活状态时，第一个 interval 的值会被忽略。
    我们可以看到 firstInterval 发出的数字为3，6，等等...

    输出:
    Emission of first interval: 0
    0
    1
    Emission of first interval: 3
    0
    1
    Emission of first interval: 6
    0
    1
    Emission of first interval: 9
    0
    1
*/
  .subscribe(s => console.log(s));
```

### concatMapTo

```typescript
public concatMapTo(innerObservable: ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
```

就像是 concatMap, 但是将每个值总是映射为同一个内部 Observable。所以 concatMapTo 内部返回的 observable 是同一个 observable

```typescript
// RxJS v6+
import { of, interval } from "rxjs";
import { concatMapTo, delay, take } from "rxjs/operators";

// 每2秒发出值
const sampleInterval = interval(500).pipe(take(5));
const fakeRequest = of("Network request complete").pipe(delay(3000));
// 前一个完成才会订阅下一个
const example = sampleInterval.pipe(concatMapTo(fakeRequest));
// 结果
// 输出: Network request complete...3s...Network request complete'
const subscribe = example.subscribe(val => console.log(val));
```

### buffer

```typescript
buffer(closingNotifier: Observable): Observable
```

收集输出值，直到提供的 observable 发出值才将收集到的值作为数组发出。

### bufferTime

```typescript
bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler: Scheduler): Observable
```

收集发出的值，直到经过了提供的时间才将其作为数组发出。

### bufferCount

```typescript
bufferCount(bufferSize: number, startBufferEvery: number = null): Observable
```

收集发出的值，直到收集完提供的数量的值才将其作为数组发出。

### bufferWhen

```typescript
bufferWhen(closingSelector: function): Observable
```

收集值，直到关闭选择器发出值才发出缓冲的值。传入的参数是一个函数，该函数返回值是一个 observable

### bufferToggle

```typescript
bufferToggle(openings: Observable, closingSelector: Function): Observable
```

开启开关以捕获源 observable 所发出的值，关闭开关以将缓冲的值作为数组发出。

### window

```typescript
public window(windowBoundaries: Observable<any>): Observable<Observable<T>>
```

每当 windowBoundaries 发出项时，将源 Observable 的值分支成嵌套的 Observable 。

> 就像是 buffer, 但发出的是嵌套的 Observable ，而不是数组。

### windowCount

```typescript
windowCount(windowSize: number, startWindowEvery: number): Observable
```

将源 Observable 的值分支成多个嵌套的 Observable ，每个嵌套的 Observable 最多发出 windowSize 个值。

### windowTime

```typescript
windowTime(windowTimeSpan: number, windowCreationInterval: number, scheduler: Scheduler): Observable
```

在每个提供的时间跨度内，收集源 obsercvable 中的值的 observable 。

### windowWhen

```typescript
public windowWhen(closingSelector: function(): Observable): Observable<Observable<T>>
```

将源 Observable 的值分支成嵌套的 Observable ，通过使用关闭 Observable 的工厂函数来决定何时开启新的窗口。
于 window 的区别就是它传递的是一个函数，该函数返回一个 observable

### windowToggle

```typescript
public windowToggle(openings: Observable<O>, closingSelector: function(value: O): Observable): Observable<Observable<T>>
```

以 openings 发出为起始，以 closingSelector 发出为结束，收集并发出源 observable 中的值的 observable 。

> 就像是 bufferToggle, 但是发出的是嵌套 Observable 而不是数组。
