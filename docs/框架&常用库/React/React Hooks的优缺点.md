---
slug: think-about-react-hooks
title: React Hooks的优缺点
tags: [React, React Hook]
---

## 为什么要有 Hooks（Hooks 的优点）

- class 组件状态逻辑复用困难。只能通过 HOC 或者 render props。需要我们改造我们的组件来使用这些模式，而且也会增加组件层级可能会导致嵌套地狱。但是 hooks 可以让我们在不修改自己组件的逻辑的情况下复用状态

- class 的复杂组件难以理解。同一个生命周期中的逻辑互不相关，而相互关联的逻辑却被放在不同的生命周期中。useEffect Hook 可以让我们将相互管理的逻辑写在一起

- 类组件需要理解 class 和 this

- class 组件继承 React.Compoment 默认就会添加很多的生命周期方法

## 缺点

- useEffect 的闭包问题

函数的运行是独立的，每个函数都有一份独立的作用域。函数的变量是保存在运行时的作用域里面。函数组件每次渲染都有特定的 effect 函数、state、props、事件处理函数等。而 useEffect 如果我们没有设置正确的依赖，很有可能拿不到我们想要的 state 和 props

解决方法：

1. 设置正确的依赖项

2. useRef - 相当于 class 组件中的 this，可以在组件的更新期间保证拿到的引用都是同一个

3. eslint-plugin-react-hooks 插件
