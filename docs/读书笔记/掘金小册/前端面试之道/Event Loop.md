---
slug: event-loop
title: Event Loop
tags: [掘金小册, 前端面试之道, Event Loop]
---

## 进程和线程

> 进程与线程区别？JS 单线程带来的好处？

两个名词都是 CPU 工作时间片的一个描述。

进程：放在应用上来说就代表了一个程序。线程是进程中的更小单位，描述了执行一段指令所需的时间。

拿到浏览器中来说，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。

JS 引擎线程和渲染线程，大家应该都知道，在 JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是互斥的。这其中的原因是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI。

得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题的好处。

## 执行栈

> 什么是执行栈？

可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。

## 浏览器中的 Event Loop

> 异步代码执行顺序？解释一下什么是 Event Loop ？

:::info

**宏任务**

- 一整段的js代码
- setTimeout
- setInterval
- I/O
- UI渲染
- setImmediate

**微任务**

- Promise
- Mutation Observer
- async/await
- Process.nextTick (与普通微任务有区别，在微任务队列执行之前执行)

:::

我们执行 JS 代码的时候其实就是往执行栈中放入函数，那么遇到异步代码的时候该怎么办？其实当遇到异步的代码时，会被挂起并在需要执行的时候加入到 Task（有多种 Task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task。下面来看以下代码的执行顺序

```javascript
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')

// 正确答案：script start -> async2 end -> Promise -> script end -> async1 end ->  promise1 -> promise2 -> setTimeout
```
首先先来解释下上述代码的 async 和 await 的执行顺序。当我们调用 async1 函数时，会马上输出 async2 end，并且函数返回一个 Promise，将后面的代码作为微任务放入微任务队列，会让出线程开始执行 async1 外的同步代码，所以我们完全可以把 await 看成是让出线程的标志。

上面的async代码相当于

```javascript
new Promise((resolve, reject) => {
  console.log('async2 end')
  // Promise.resolve() 将代码插入微任务队列尾部
  // resolve 再次插入微任务队列尾部
  resolve(Promise.resolve())
}).then(() => {
  console.log('async1 end')
})

```

所以 Event Loop 执行顺序如下所示：

- 首先执行同步代码，这属于宏任务
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务队列中的下一个宏任务，也就是 setTimeout 中的回调函数

这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来执行微任务队列中的所有的微任务，期间产生的微任务添加到微任务队列中，在本轮时间循环中执行。

## Node 中的 Event Loop

> Node 中的 Event Loop 和浏览器中的有什么区别？process.nexttick 执行顺序？

Node 的 Event Loop 分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

### timer

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。

同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行。

这个下限时间有个范围：[1, 2147483647]，如果设定的时间不在这个范围，将被设置为1。

## I/O

I/O 阶段会处理一些上一轮循环中的少数未执行的 I/O 回调（读写文件的回调）

### poll

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情:

- 回到 timer 阶段执行回调
- 执行 I/O 回调

如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。--- 这个的前提是在timers阶段注册的定时器，在poll阶段会检查是否可以执行

并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
    - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
    - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

**setImmediate()具有最高优先级，只要poll队列为空，代码被setImmediate()，无论是否有timers达到下限时间，setImmediate()的代码都先执行。**

### check

check 阶段执行 setImmediate

> 比较重要的阶段依次为：timers、I/O、poll、check

首先在有些情况下，定时器的执行顺序其实是随机的

```javascript
setTimeout(() => {
    console.log('setTimeout')
}, 0)
setImmediate(() => {
    console.log('setImmediate')
})
```
对于以上代码来说，setTimeout 可能执行在前，也可能执行在后

- 首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的
- 进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
- 那么如果准备时间花费小于 1ms，那么就是 setImmediate 回调先执行了

当然在某些情况下，他们的执行顺序一定是固定的，比如以下代码：

```javascript
const fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
```

在上述代码中，setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。

### setTimout和setImmediate

setImmediate() 和 setTimeout()是相似的，区别在于什么时候执行回调：

- setImmediate()被设计在 poll 阶段结束后立即执行回调；
- setTimeout()被设计在指定下限时间到达后执行回调。

**回调执行总结**
- 如果两者都在主模块中调用，那么执行先后取决于进程性能，也就是随机。
- 如果两者都不在主模块调用（被一个异步操作包裹），那么setImmediate的回调永远先执行。

上面介绍的都是 macrotask 的执行情况，对于 microtask 来说，它会在以上每个阶段完成前清空 microtask 队列，下图中的 Tick 就代表了 microtask

```javascript
setTimeout(() => {
  console.log('timer21')
}, 0)

Promise.resolve().then(function() {
  console.log('promise1')
})
```
对于以上代码来说，其实和浏览器中的输出是一样的，microtask 永远执行在 macrotask 前面。

最后我们来讲讲 Node 中的 process.nextTick，这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

```javascript
setTimeout(() => {
 console.log('timer1')

 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)

process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
```

对于以上代码，大家可以发现无论如何，永远都是先把 nextTick 全部打印出来。

