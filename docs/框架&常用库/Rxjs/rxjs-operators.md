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
