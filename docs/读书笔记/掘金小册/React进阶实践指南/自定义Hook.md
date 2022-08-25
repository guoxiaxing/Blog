---
slug: 自定义Hook
title: 优化-细节
tags: [掘金小册, React进阶实践指南, 自定义Hook]
---

## 驱动条件

**自定义 hooks 驱动本质上就是函数组件的执行**

自定义 hooks 驱动条件：

- props 改变带来的函数组件执行。
- useState | useReducer 改变 state 引起函数组件的更新。

## 顺序原则

**那么自定义 hooks 也要遵循 hooks 的规则，不能放在条件语句中，而且要保持执行顺序的一致性。**

## 条件限定

一段不好的代码：

```js
function useXXX() {
  const value = React.useContext(defaultContext);
  /* .....用上下文中 value 一段初始化逻辑  */
  const newValue = initValueFunction(
    value
  ); /* 初始化 value 得到新的 newValue  */
  /* ...... */
  return newValue;
}
```

不好在哪里 👇：

每一次函数组件更新，就会执行此自定义 hooks ，那么就会重复执行初始化逻辑，重复执行 initValueFunction ，每一次都会得到一个最新的 newValue 。 如果 newValue 作为 useMemo 和 useEffect 的 deps ，或者作为子组件的 props ，那么子组件的浅比较 props 将失去作用，那么会带来一串麻烦。

应该怎么定义？

```js
function useXXX() {
  const newValue = React.useRef(null); /* 创建一个 value 保存状态。  */
  const value = React.useContext(defaultContext);
  if (!newValue.current) {
    /* 如果 newValue 不存在 */
    newValue.current = initValueFunction(value);
  }
  return newValue.current;
}
```

## 考虑可变性

可变性：**就是考虑一些状态值发生变化，是否有依赖于当前值变化的执行逻辑或执行副作用。**

比如上面的例子中，如果 defaultContext 中的 value 是可变的，那么如果还像上述用 useRef 这么写，就会造成 context 变化，得不到最新的 value 值的情况发生。

对于可变性如何处理：

- 对于依赖于可变性状态的执行逻辑，可以用 useMemo 来处理。
- 对于可变性状态的执行副作用，可以用 useEffect 来处理。
- 对于依赖可变性状态的函数或者属性，可以用 useCallback 来处理。

```js
function useXXX() {
  const value = React.useContext(defaultContext);
  const newValue = React.useMemo(() => initValueFunction(value), [value]);
  return newValue;
}
```

## 闭包效应

函数组件更新就是函数本身执行，一次更新所有含有状态的 hooks （ useState 和 useReducer ）产生的状态 state 是重新声明的。但是如果像 useEffect ， useMemo ，useCallback 等，它们内部如果引用了 state 或 props 的值，而且这些状态最后保存在了函数组件对应的 fiber 上，那么此次函数组件执行完毕后，这些状态就不会被垃圾回收机制回收释放。这样造成的影响是，上述 hooks 如果没有把内部使用的 state 或 props 作为依赖项，那么内部就一直无法使用最新的 props 或者 state 。

### 思考：如何分清楚依赖关系呢？

- 第一步：找到 hooks 内部可能发生变化的状态 ， 这个状态可以是 state 或者 props。
- 第二步：分析 useMemo 或者 useCallback 内部是否使用上述状态，或者是否关联使用 useMemo 或者 useCallback 派生出来的状态（ 比如上述的 value ，就是 useMemo 派生的状态 ） ，如果有使用，那么加入到 deps 。
- 第三步：分析 useEffect ，useLayoutEffect ，useImperativeHandle 内部是否使用上述两个步骤产生的值，而且还要这些值做一些副作用，如果有，那么加入到 deps 。
