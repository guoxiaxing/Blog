---
slug: hooks-custom
title: 自定义 Hook
tags: [React Hooks]
---

**自定义 Hook 解决了 class 组件复用状态逻辑困难的问题**

**自定义 hook 使用 use 开头，可以在自定义 hook 中使用其他的 hook**

## 两个组件中使用相同的自定义 Hook 会共享其 state 吗？

不会。自定义 Hook 是一种重用状态逻辑的机制，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。
