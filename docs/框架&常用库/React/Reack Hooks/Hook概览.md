---
slug: hooks-overview
title: Hook 概览
tags: [React Hooks]
---

## 📌State Hook

```javascript
import React, { useState } from "react";

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

useState 就是一个 Hook。通过在函数组件里调用它来给组件添加一些内部 state。**React 会在组件重新渲染的时候保留这个 state。**

useState 会返回一对值：**当前状态和一个让你更新它的函数**，你可以在事件处理函数中或其他一些地方调用这个函数。**它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。**

useState 唯一的参数就是初始 state。

值得注意的是，不同于 this.state，这里的 state 不一定要是一个对象 —— 如果你有需要，它也可以是。**这个初始 state 参数只有在第一次渲染时会被用到。**

### 在组件中声明多个 state

你可以在一个组件中多次使用 State Hook:

```javascript
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
  // ...
}
```

React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。(也就是说 Hook 必须用在函数组件的最顶层，不能声明在条件语句和循环语句中)

### 什么是 Hook？

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

## ⚡️Effect Hook

我们会在 React 组件中执行获取数据、事件监听、修改 DOM 等操作。我们统一将这些操作成为副作用。

useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。

下面这个组件在 React 更新 DOM 后会设置一个页面标题

```javascript
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
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

当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改以及页面渲染之后运行你的“副作用”函数。

由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。

默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。（会在每次执行副作用函数之前先执行这个清除函数）

可以在组件中多次使用 useEffect

通过使用 Hook，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里。

## ✌️Hook 使用规则

Hook 的本质就是 JS 函数，但是他有两个规则：

- 只能在函数式组件或者是自定义 Hook 中使用 Hook

- Hook 只能用在函数式组件或自定义 Hook 的最顶层，不能在循环、子函数或者条件中使用 Hook（❗️ 因为 Hook 的顺序很重要）

## 💡 自定义 Hook

想要在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：高阶组件和 render props。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。

**自定义 Hook 需要以 use 开头**

每个组件间的 state 是完全独立的。Hook 是一种复用状态逻辑的方式，它不复用 state 本身。事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

## 📝 总结

- state hook

- effect hook

- hook 规则

- 自定义 hook
