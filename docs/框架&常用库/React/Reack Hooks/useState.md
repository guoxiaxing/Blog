---
slug: hooks-state
title: State Hook
tags: [React Hooks]
---

## Hook 是什么？

Hook 是一个函数，可以让你在函数组件中使用一些 React 的特性（state/生命周期），它们通常以`use`开头。

## 声明 state 变量

类组件中：

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
```

函数组件中：

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

**那么调用 useState 的时候做了什么？**它定义一个 “state 变量”。我们的变量叫 count， 但是我们可以叫他任何名字。这是一种在函数调用时保存变量的方式 —— useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。也就是说每次组件重新渲染 state 会保留上次的状态。

**useState 接收的参数**useState() 方法里面唯一的参数就是初始 state。

**useState 方法的返回值是什么？** 返回值为：当前 state 以及更新 state 的函数。

我们声明了一个叫 count 的 state 变量，然后把它设为 0。React 会在重复渲染时记住它当前的值，并且提供最新的值给我们的函数。我们可以通过调用 setCount 来更新当前的 count。

## 读取 state

class 组件：`this.state.xxx`

hook： 直接通过 useState 返回的元组的第一个元素来获取

## 更新 state

class 组件： this.setState

hook: setState 函数（即 useState 返回的元组的第二个元素）

**然而，不像 class 中的 this.setState，更新 state 变量总是替换它而不是合并它。**

## 总结

1. 怎么使用 hook 在函数组件中创建 state

2. 怎么使用 hook 在函数组件中读取 state

3. 怎么使用 hook 在函数组件中更新 state

4. hook 是什么？
