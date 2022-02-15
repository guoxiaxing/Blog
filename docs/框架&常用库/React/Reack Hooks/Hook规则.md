---
slug: hooks-rules
title: Hook 规则
tags: [React Hooks]
---

Hook 本质其实就是函数，但是我们在使用他们的时候需要遵守两条规则：

- 只能在函数组件/自定义 Hook 中使用 Hook

- 只能在函数组件或者自定义 Hook 的最顶层或者是 return 语句之前使用 Hook，不能在子函数、循环或者条件语句中使用 Hook，遵守这条规则，你就**能确保 Hook 在每一次渲染中都按照同样的顺序被调用**。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

## eslint 插件

`eslint-plugin-react-hooks` 这个 ESLint 插件来强制执行这两条规则。

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```json
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```

## 为什么保证顺序很重要

我们可以在单个组件中使用多个 State Hook 或 Effect Hook

```jsx
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}
```

那么 React 怎么知道哪个 state 对应哪个 useState？答案是 React 靠的是 Hook 调用的顺序。

因为我们的示例中，Hook 的调用顺序在每次渲染中都是相同的，所以它能够正常工作：

```text
// ------------
// 首次渲染
// ------------
useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect(updateTitle)     // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
useEffect(persistForm)     // 2. 替换保存 form 的 effect
useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
useEffect(updateTitle)     // 4. 替换更新标题的 effect

// ...
```

只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。但如果我们将一个 Hook (例如 persistForm effect) 调用放到一个条件语句中会发生什么呢？

```jsx
// 🔴 在条件语句中使用 Hook 违反第一条规则
if (name !== "") {
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });
}
```

在第一次渲染中 name !== '' 这个条件值为 true，所以我们会执行这个 Hook。但是下一次渲染时我们可能清空了表单，表达式值变为 false。此时的渲染会跳过该 Hook，Hook 的调用顺序发生了改变：

```text
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)  // 🔴 此 Hook 被忽略！
useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
```

React 不知道第二个 useState 的 Hook 应该返回什么。React 会以为在该组件中第二个 Hook 的调用像上次的渲染一样，对应的是 persistForm 的 effect，但并非如此。从这里开始，后面的 Hook 调用都被提前执行，导致 bug 的产生。

**这就是为什么 Hook 需要在我们组件的最顶层调用。**如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部：

```jsx
useEffect(function persistForm() {
  // 👍 将条件判断放置在 effect 中
  if (name !== "") {
    localStorage.setItem("formData", name);
  }
});
```

## 小结

- Hook 规则

- 为什么 Hook 必须在最顶层调用

原因是：React 靠的是 Hook 调用的顺序，来寻找每次组件调用时变量的对应关系。
