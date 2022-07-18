---
slug: 玄学state
title: 玄学state
tags: [掘金小册, React进阶实践指南, 玄学state]
---

:::info

问：state 到底是同步还是异步的?

批量更新

在 React 自己的生命周期、事件处理函数中是批量更新的；在浏览器的异步事件中（定时器、异步请求、promise、addEventListener 添加的事件处理函数中、**流**）是同步的

:::

## 类组件中的 state

### setState

React 项目中 UI 的改变来源于 state 改变，类组件中 setState 是更新组件，渲染视图的主要方式。

假如一次事件中触发一次如上 setState ，在 React 底层主要做了那些事呢？

- 首先，setState 会产生当前更新的优先级（老版本用 expirationTime ，新版本用 lane ）。
- 接下来 React 会从 fiber Root 根部 fiber 向下调和子节点，调和阶段将对比发生更新的地方，更新对比 expirationTime ，找到发生更新的组件，合并 state，然后触发 render 函数，得到新的 UI 视图层，完成 render 阶段。
- 接下来到 commit 阶段，commit 阶段，替换真实 DOM ，完成此次更新流程。
- 此时仍然在 commit 阶段，会执行 setState 中 callback 函数,到此为止完成了一次 setState 全过程。

**render 阶段: render 函数执行 -> commit 阶段真实 DOM 替换 -> setState 回调函数执行 callback。**

### 类组件如何限制 state 更新视图

- pureComponent 可以对 state 和 props 进行浅比较，如果没有发生变化，那么组件不更新
- shouldComponentUpdate

### setState 原理揭秘

类组件初始化过程中绑定了负责更新的 Updater 对象，对于如何调用 setState 方法，实际上是 React 底层调用 Updater 对象上的 enqueueSetState 方法。

因为要弄明白 state 更新机制，所以接下来要从两个方向分析。

1. 是揭秘 enqueueSetState 到底做了些什么？
2. 是 React 底层是如何进行批量更新的？

```javascript title=react-reconciler/src/ReactFiberClassComponent.js

enqueueSetState(){
     /* 每一次调用`setState`，react 都会创建一个 update 里面保存了 */
     const update = createUpdate(expirationTime, suspenseConfig);
     /* callback 可以理解为 setState 回调函数，第二个参数 */
     callback && (update.callback = callback)
     /* enqueueUpdate 把当前的update 传入当前fiber，待更新队列中 */
     enqueueUpdate(fiber, update);
     /* 开始调度更新 */
     scheduleUpdateOnFiber(fiber, expirationTime);
}

```

enqueueSetState 作用实际很简单，**就是创建一个 update ，然后放入当前 fiber 对象的待更新队列中，最后开启调度更新，进入上述讲到的更新流程。**

React 的 batchUpdate 批量更新是什么时候加上去的呢？

正常 state 更新、UI 交互，都离不开用户的事件，比如点击事件，表单输入等，React 是采用事件合成的形式，每一个事件都是由 React 事件系统统一调度的，那么 State 批量更新正是和事件系统息息相关的。

```javascript title=react-dom/src/events/DOMLegacyEventPluginSystem.js
function dispatchEventForLegacyPluginEventSystem() {
  // handleTopLevel 事件处理函数
  batchedEventUpdates(handleTopLevel, bookKeeping);
}
```

```javascript title=react-dom/src/events/ReactDOMUpdateBatching.js
function batchedEventUpdates(fn, a) {
  /* 开启批量更新  */
  isBatchingEventUpdates = true;
  try {
    /* 这里执行了的事件处理函数， 比如在一次点击事件中触发setState,那么它将在这个函数内执行 */
    return batchedEventUpdatesImpl(fn, a, b);
  } finally {
    /* try 里面 return 不会影响 finally 执行  */
    /* 完成一次事件，批量更新  */
    isBatchingEventUpdates = false;
  }
}
```

React 事件执行之前通过 isBatchingEventUpdates=true 打开开关，开启事件批量更新，当该事件结束，再通过 isBatchingEventUpdates = false; 关闭开关，然后在 scheduleUpdateOnFiber 中根据这个开关来确定是否进行批量更新。

如何在如上异步环境下，继续开启批量更新模式呢？

React-Dom 中提供了批量更新方法 unstable_batchedUpdates，可以去手动批量更新，可以将上述 setTimeout 里面的内容做如下修改

```javascript
import ReactDOM from "react-dom";
const { unstable_batchedUpdates } = ReactDOM;

setTimeout(() => {
  unstable_batchedUpdates(() => {
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
  });
});
```

打印： 0 , 0 , 0 , callback1 1 , callback2 1 ,callback3 1

**unstable_batchedUpdates 可以用于 Ajax 数据交互之后，合并多次 setState，或者是多次 useState 。原因很简单，所有的数据交互都是在异步环境下，如果没有批量更新处理，一次数据交互多次改变 state 会促使视图多次渲染。**

#### 那么如何提升更新优先级呢？

React-dom 提供了 flushSync ，flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中。React 设定了很多不同优先级的更新任务。如果一次更新任务在 flushSync 回调函数内部，那么将获得一个较高优先级的更新。

```javascript

handerClick=()=>{
    setTimeout(()=>{
        this.setState({ number: 1  })
    })
    this.setState({ number: 2  })
    ReactDOM.flushSync(()=>{
        this.setState({ number: 3  })
    })
    this.setState({ number: 4  })
}
render(){
   console.log(this.state.number)
   return ...
}
```

打印 3 4 1

- 首先 flushSync this.setState({ number: 3 })设定了一个高优先级的更新，所以 2 和 3 被批量更新到 3 ，所以 3 先被打印。
- 更新为 4。
- 最后更新 setTimeout 中的 number = 1。

:::info

flushSync 补充说明：flushSync 在同步条件下，会合并之前的 setState | useState，可以理解成，如果发现了 flushSync ，就会先执行更新，如果之前有未更新的 setState ｜ useState ，就会一起合并了，所以就解释了如上，2 和 3 被批量更新到 3 ，所以 3 先被打印。

综上所述， React 同一级别更新优先级关系是:

flushSync 中的 setState > 正常执行上下文中 setState > setTimeout ，Promise 中的 setState。

:::

## 函数组件中的 state

### useState 的用法

#### 如何监听 state 变化？

类组件 setState 中，有第二个参数 callback 或者是生命周期 componentDidUpdate 可以检测监听到 state 改变或是组件更新。

**那么在函数组件中，如何怎么监听 state 变化呢？这个时候就需要 useEffect 出场了，通常可以把 state 作为依赖项传入 useEffect 第二个参数 deps ，但是注意 useEffect 初始化会默认执行一次。**

**useState 有一点值得注意，就是当调用改变 state 的函数 dispatch，在本次函数执行上下文中，是获取不到最新的 state 值的**

```javascript

import * as React from 'react';
import ReactDOM = require('react-dom');
import './style.css';

export default function App() {
  const [number, setNumber] = React.useState(0);
  /* 监听 number 变化 */
  React.useEffect(() => {
    console.log('监听number变化，此时的number是:  ' + number);
  }, [number]);
  const handleClick = () => {
    ReactDOM.flushSync(() => {
      setNumber(2);
      console.log(number, 'flushSync');
    });
    setNumber(1);
    console.log(number, 'setNumber');
    setTimeout(() => {
      setNumber(3);
      console.log(number, 'setTimeout');
    });
  };
  return (
    <div>
      <span> {number}</span>
      <button onClick={handleClick}>number++</button>
    </div>
  );
}
```

输出结果

```text

0 flushSync
监听number变化，此时的number是: 2
0 setNumber
监听number变化，此时的number是: 1
0 setTimeout
监听number变化，此时的number是: 3

```

函数组件更新就是函数的执行，在函数一次执行过程中，函数内部所有变量重新声明，所以改变的 state ，只有在下一次函数组件执行时才会被更新。所以在如上同一个函数执行上下文中，number 一直为 0，无论怎么打印，都拿不到最新的 state 。

#### useState 注意事项

- 在使用 useState 的 dispatchAction 更新 state 的时候，记得不要传入相同的 state，这样会使视图不更新。

```js
export default function Index() {
  const [state, dispatchState] = useState({ name: "alien" });
  const handleClick = () => {
    // 点击按钮，视图没有更新。
    state.name = "Alien";
    dispatchState(state); // 直接改变 `state`，在内存中指向的地址相同。
  };
  return (
    <div>
      <span> {state.name}</span>
      <button onClick={handleClick}>changeName++</button>
    </div>
  );
}
```

在 useState 的 dispatchAction 处理逻辑中，会浅比较两次 state ，发现 state 相同，不会开启更新调度任务； demo 中两次 state 指向了相同的内存空间，所以默认为 state 相等，就不会发生视图更新了。

:::warning

问：setState 和 useState 的异同点？

相同点：都会触发视图的更新。

不同点：

- 如果类组件没有继承 pureComponent，那么 setState 不会浅比较两次 state 的值，只要调用 setState，在没有其他优化手段的前提下，就会执行更新。但是 useState 中的 dispatchAction 会默认比较两次 state 是否相同，然后决定是否更新组件。

- setState 在底层处理逻辑上主要是和老 state 进行合并处理，而 useState 更倾向于重新赋值。

- setState 有专门监听 state 变化的回调函数 callback，可以获取最新state；但是在函数组件中，只能通过 useEffect 来执行 state 变化引起的副作用。

## 一个奇怪的现象

```jsx
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState();
  const [count1, setCount1] = useState();
  useEffect(() => {
    console.log("count: ", count);
    console.log("count1: ", count1);
  }, [count, count1]);

  console.log("yan1", count);
  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(1);
          setCount1(2);
        }}
      >
        set 1
      </button>
    </div>
  );
}
```

我以为：

点击按钮：会输出

因为有两次setState，第一次count发生变化，所以组件重新渲染，useEffect执行一次；第二次count1发生变化，所以组件重新渲染useEffect执行一次。

```text

yan1 1
count:  1
count1:  undefined


yan1 1
count:  1
count1:  2

```

但是事实是

```text
yan1 1
count:  1
count1:  2
```

点击按钮，组件渲染了一次，useEffect也只执行了一次。why???

难道与useEffect的执行时机有关系。useEffect执行的时候count已经变成了1，count1已经变成了2所以只执行一次？？？