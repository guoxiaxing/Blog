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
