---
slug: react-diff
title: React Diff 过程
tags: [React, Diff]
---

## Diff 的作用

React Diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染

## Diff 策略

- 只对同级的元素进行 diff（同一个父节点下的所有子节点），如果某一个节点在一次更新中跨了层级，React 就不会复用该节点，而是重新创建生成新的节点
- 两个不同类型的元素会产生不同的树，如果 div 变成了 p，那么 React 会销毁 div 元素及其子孙节点，创建 p 元素及其子孙节点
- 对于兄弟元素，开发者可以通过 key 来暗示哪些元素在不同的渲染下可以保持稳定

基于以上三个前提策略，React 分别对 tree diff、component diff 以及 element diff 进行算法优化

## tree diff

对树进行分层比较，两棵树只会对同一层次的节点进行比较。即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。

如果出现了 DOM 节点跨层级的移动操作，React diff 会有怎样的表现呢？销毁原来的节点，重新创建新的节点

## component diff

- 如果是同一类型的组件（引用一致），按照原策略继续比较 virtual DOM tree。

- 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。

- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。

当 component D 改变为 component G 时，即使这两个 component 结构相似，一旦 React 判断 D 和 G 是不同类型的组件，就不会比较二者的结构，而是直接删除 component D，重新创建 component G 以及其子节点。

## element diff

当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。

- INSERT_MARKUP，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。

- MOVE_EXISTING，新老集合中的 component 类型相同

- REMOVE_NODE，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

### 移动

首先对新集合的节点进行循环遍历，for (name in nextChildren)，通过唯一 key 可以判断新老集合中是否存在相同的节点，if (prevChild === nextChild)，如果存在相同节点，则进行移动操作，但在移动前需要将当前节点在老集合中的位置与 lastIndex（初始值为 0） 进行比较，if (child.\_mountIndex < lastIndex)，则进行节点移动操作，否则不执行该操作。这是一种顺序优化手段，lastIndex 一直在更新，表示访问过的节点在老集合中最右的位置（即最大的位置），如果新集合中当前访问的节点比 lastIndex 大，说明当前访问节点在老集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，不执行移动操作，只有当访问的节点比 lastIndex 小时，才需要进行移动操作。

## 参考文章

[React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)
