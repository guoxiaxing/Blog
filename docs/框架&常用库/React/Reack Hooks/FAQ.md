---
slug: hooks-faq
title: FAQ
tags: [React Hooks]
---

## useState 相关

- 如果我们依赖于之前的 state 来更新 state，那么给 setState 传入一个 update 的函数

- 如果 setState 更新的 state 和当前的 state 相同，那么 React 会跳过组件的重新渲染，以及其子组件的重新渲染和 effect 执行。**需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。**

- useState 的 setState 函数，不会进行 state 合并，而是直接使用新的 state 覆盖旧的 state

- useState 的初始值也可以接受一个函数

## useEffect

**在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。**

- effect 的执行时机：与 componentDidMount、componentDidUpdate 不同的是，传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用。不会阻塞浏览器对屏幕的更新

## useContext

```javascript
const value = useContext(MyContext);
```

接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 value prop 决定。

**当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。**

:::info

useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件提供 context。

:::

## useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

## useCallback

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

## useMemo

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作**

## useRef

**它类似于类组件中的 this**

```javascript
const refContainer = useRef(initialValue);
```

useRef 返回一个可变的 ref 对象（这个可变不是指 ref 的引用会在组件更新的过程中改变，指的是我们可以修改 ref 的 current 属性），其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

**本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。**

**而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。**

**当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。**

## React 是如何将 Hook 和当前组件关联起来的？

每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 useState() 调用一个 Hook 的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。
