---
slug: useEvent
title: useEvent解决React Hooks的闭包陷阱
tags: [React Hooks]
---

## useEvent

他用于定义一个函数，这个函数有 2 个特性：

（参数是一个函数，返回值是一个缓存之后的函数）

- 在组件多次 render 时保持引用一致

- 函数内始终能获取到最新的 props 与 state

```jsx
function Chat() {
  const [text, setText] = useState("");

  const onClick = useEvent(() => {
    sendMessage(text);
  });

  return <SendButton onClick={onClick} />;
}
```

在 Chat 组件多次 render 时，onClick 始终指向同一个引用。

并且 onClick 触发时始终能获取到 text 的最新值。

之所以叫 useEvent，是因为 React 团队认为这个 Hook 的主要应用场景是：**「封装事件处理函数」**。

## useEvent 的实现

```javascript
function useEvent(handler) {
  const handlerRef = useRef(null);

  // DOM更新之后，视图渲染完成后之前更新`handlerRef.current`指向
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  // 用useCallback包裹，使得render时返回的函数引用一致
  return useCallback((...args) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
}
```

1. 返回一个没有依赖项的 useCallback，使得每次 render 时函数的引用一致

```javascript
useCallback((...args) => {
  const fn = handlerRef.current;
  return fn(...args);
}, []);
```

2. 在合适的时机更新 handlerRef.current，使得实际执行的函数始终是最新的引用

## 与开源 Hooks 的差异

很多开源 Hooks 库已经实现类似功能（比如 ahooks 中的 useMemoizedFn）

useEvent 与这些开源实现的差异主要体现在：

useEvent 定位于 **「处理事件回调函数」** 这一单一场景，而 useMemoizedFn 定位于 **「缓存各种函数」**。

那么问题来了，既然功能类似，那 useEvent 为什么要限制自己的使用场景呢？

答案是：为了更稳定。

useEvent 能否获取到最新的 state 与 props 取决于 handlerRef.current 更新的时机。

在上面模拟实现中，useEvent 更新 handlerRef.current 的逻辑放在 useLayoutEffect 回调中进行。

这就保证了 handlerRef.current 始终在 **「会在所有的 DOM 变更之后，视图完成渲染」** 之前更新

```javascript
useLayoutEffect(() => {
  handlerRef.current = handler;
});
```

> useLayoutEffect: 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

> useLayoutEffect 和 useEffect 的区别：useLayoutEffect 更“快”！这个“块”不是速度更快，而是他“抢跑”了。useLayoutEffect 是在 render 之前同步执行，useEffect 在 render 之后异步执行，这里就是保证 useLayoutEffect 里的回调肯定比 useEffect 更早前被调用、被执行。

而 **「事件回调」** 触发的时机显然在 **「视图完成渲染」** 之后，所以能够稳定获取到最新的 state 与 props。

再来看看 ahooks 中的 useMemoizedFn，fnRef.current 的更新时机是「useMemoizedFn 执行时」（即「组件 render 时」）：

```javascript
function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  // 更新fnRef.current
  fnRef.current = useMemo(() => fn, [fn]);

  // ...省略代码
}
```

当 React18 启用「并发更新」后，组件 render 的次数、时机并不确定。

所以 useMemoizedFn 中 fnRef.current 的更新时机也是不确定的。

这就增加了在「并发更新」下使用时潜在的风险。

可以说，useEvent 通过限制 handlerRef.current 更新时机，进而限制应用场景，最终达到稳定的目的。

## 总结

useEvent 当前还处于 RFC（Request For Comments）[1]阶段。
