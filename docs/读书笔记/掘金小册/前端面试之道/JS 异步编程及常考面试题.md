---
slug: JS异步编程及常考面试题
title: JS 异步编程及常考面试题
tags: [掘金小册, 前端面试之道, JS 异步编程及常考面试题]
---

## 并发和并行

并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。

并行是微观概念，假设 CPU 中存在两个内核，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。


## 回调函数

> 涉及面试题：什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

回调函数：到达某个时机是执行的函数。事件处理函数，ajax

缺点：回调地狱

```javascript
ajax(url, () => {
    // 处理逻辑
    ajax(url1, () => {
        // 处理逻辑
        ajax(url2, () => {
            // 处理逻辑
        })
    })
})
```

解决回调地狱：Promise、Async/Await、Generator

:::info

回调地狱的根本问题就是：

1. 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
2. 嵌套函数一多，就很难处理错误

:::

## Promise

> 涉及面试题：Promise 的特点是什么，分别有什么优缺点？什么是 Promise 链？Promise 构造函数执行和 then 函数执行有什么区别？

### 特点

- 链式调用

Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装

```javascript
Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })
```

- 状态一旦改变，就不会再变，无论何时获取都是一样的
```javascript
new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})
```
- 三个状态：pending、resolved、rejected。状态只能由pending->resolved/pending->rejected
- Promise一旦定义内部代码就会立即执行
```javascript
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
```

Promise 也很好地解决了回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

```javascript
ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
```

### 缺点

无法取消。错误需要通过回调函数捕获。（Promise内部产生的错误无法被外部捕获（window.onerror），会一直向下传递，知道被then的第二个回调函数捕获/catch捕获）

## Async/Await

> 涉及面试题：async 及 await 的特点，它们的优点和缺点分别是什么？await 原理是什么？

generator函数的语法糖

### 特点

- 让我们的异步代码可以像同步代码那样执行。

- await关键字只能用在async函数中。

- 一个函数如果加上 async ，那么该函数就会返回一个 Promise。async 就是将函数返回值使用 Promise.resolve() 包裹了下，和 then 中处理返回值一样

```javascript
async function test() {
  return "1"
}
console.log(test()) // -> Promise {<resolved>: "1"}
```

> async 和 await 可以说是异步终极解决方案了，相比直接使用 Promise 来说，优势在于处理 then 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 then 也很恶心，并且也能优雅地解决回调地狱问题。当然也存在一些缺点，因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。

```javascript
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url)
  await fetch(url1)
  await fetch(url2)
}
```

下面来看一个使用 await 的例子：

```javascript
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```

结果

```text
'1' 1
'2' 10 ??? 
```

- 首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，**generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来**
- 因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 0 + 10

上述解释中提到了 await 内部实现了 generator，其实 await 就是 generator 加上 Promise 的语法糖，且内部实现了自动执行 generator。

## Generator

> 涉及面试题：你理解的 Generator 是什么？

答：可以中断和继续执行的函数

Generator 最大的特点就是**可以控制函数的执行。**

```javascript
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```
- 首先 Generator 函数调用和普通函数不同，它会返回一个迭代器
- 当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6
- 当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8
- 当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42

我们可以通过 Generator 函数解决回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

```javascript
function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```
## 常用定时器函数

> 涉及面试题：setTimeout、setInterval、requestAnimationFrame 各有什么特点？

### setTimeout

很多人认为 setTimeout 是延时多久，那就应该是多久后执行。(setTimeout会在指定的时间到达后才会将回调函数添加到执行栈)

其实这个观点是错误的，因为 JS 是单线程执行的，如果前面的代码影响了性能，就会导致 setTimeout 不会按期执行。当然了，我们可以通过代码去修正 setTimeout，从而使定时器相对准确

### setInterval

接下来我们来看 setInterval，其实这个函数作用和 setTimeout 基本一致，只是该函数是每隔一段时间执行一次回调函数。

通常来说不建议使用 setInterval。第一，多个定时器的代码执行时间可能会比预期小。第二，他可能会存在忽略某些回调的情况。第三，setInterval调用的代码中会出现一个错误，但是代码并不会中止执行而是继续执行错误的代码。

setInterval会在js主程序空闲时候，执行代码队列里面的代码的时候，如果此时候我们有一个问题，定时器是等到回调执行完，才开始计时进行下次循环呢？还是只要一次计时完毕，插入回调之后不管回调执不执行就开始计时呢？答案显然是后者。这就会出现一种情况，当我们插入回调的时候前队列有别的代码在执行，这时候回调肯定是不会执行的，因此如果这个时候限定时时间到了会再次插入回调，这个时候如果发现队列中的第一次回调没有执行，那么再次插入的回调浏览器就默认取消，（这是以防出现回调连续执行多次的情况）就会导致setInterval的某些回调无法执行

所以我们经常是通过setTimeout来实现setInterval

```javascript

function mySetInterval(fn, interval,...args) {
   (function inner() {
       const timer = setTimeout(() => {
            fn(...args);
            clearTimeout(timer);
            inner();
       },interval)
   })()
}
```