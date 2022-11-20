---
slug: angular-web-components
title: 将 angular 组件打包为 webComponents
tags: [angular, webComponent]
---

## 背景

在迁移 React 的过程中需要使用英语科目的题目弹窗，但是迁移这个弹窗需要花费大量的时间还需要堆一百多个题型进行回测，成本太高，所以希望有一种方式可以在 React 页面中使用 angular 组件。

## 这么实现在 React 页面中使用 angular 组件呢？

angular 这个框架本身支持了将 angular 组件打包为一个 element 来使用，那么 let's do it!!!

## 实现

参考 demo：https://github.com/phodal/wc-angular-demo

1. 新建一个 angular 项目

2. 将所需要的组件拷贝到新的项目中（这里只需要拷贝需要打包为webComponent的组件并且在module中进行声明，为了让解释更清晰，称这个module为AModule-因为我们需要对其的入参进行改造，而它所依赖的组件必须在AModule中进行声明（导入的目录可以继续从原项目（micro-angular）中导入，因为我们的项目使用的是monorepo的形式，所以可以直接导入原本angular项目（micro-angualar）的组件（**这些组件必须被micro-angular中声明他们的模块导出才可以**）））