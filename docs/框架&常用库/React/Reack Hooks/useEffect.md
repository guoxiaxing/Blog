---
slug: hooks-effect
title: Effect Hook
tags: [React Hooks]
---

## useEffect 的作用

可以让我们在函数组件中执行副作用

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

数据获取、事件监听以及修改 DOM 都属于副作用操作。

> 使用 useEffect 可以代替 class 组件中的 componentDidMount、componentDidUpdate、componentWillUnmount 这三个生命周期

## useEffect 做了什么？

通过这个 hook，我们可以告诉 React 需要在每次组件更新之后都要做些什么。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。

## 为什么要将 useEffect 放在组件的内部？

因为这样可以这接访问到组件的 state 和 props。

## useEffect 会在每次渲染后都执行吗？

是的。默认情况下会在组件每次渲染之后都执行。包括第一次渲染

我们可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。**React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。**

**某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。**

:::info

与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。

:::

## 我们怎么实现副作用的清除

useEffect 传入的 effect 函数可以返回一个函数（清除函数），这个函数会在组件下次 effect 执行之前先执行这个清除函数。

**React 何时清除 effect？** React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。

**使用 Hook 其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。**

## 如何实现在某些更新时跳过 effect 执行

传递数组作为 useEffect 的第二个可选参数，数组中的任意一个元素发生变化的时候才会执行 effect 函数，采用的比较方式是 `===`

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

:::danger

- 如果你要使用此优化方式，请确保数组中**包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。

- 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。**如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。**

- React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect

- 推荐启用 eslint-plugin-react-hooks 中的 exhaustive-deps 规则。会自动检测 effect 的依赖。

:::

## 小结

- useEffect 的基本使用以及执行时机

答：useEffct 传入一个 effect 函数。每次组件重新渲染时都会调用，包括第一次渲染。

**effect 函数的执行不会阻塞页面渲染，会在浏览器渲染完页面之后在异步调用**

- useEffect 解决了 class 组件的什么问题？

答：相关逻辑分散于不同的生命周期中，不相关的逻辑却出现在同一个生命周期中

- 怎么清除副作用

答： useEffect 传入的 effect 函数可以返回一个清除函数，会在执行当前的 effect 之前先调用这个清除函数

- 怎么在某些更新中跳过 effect 的执行？

答： 传递一个依赖数组，仅仅会在依赖数组中的任意一个元素发生变化的时候执行 effect 函数
