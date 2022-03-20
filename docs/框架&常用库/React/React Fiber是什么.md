---
slug: react-fiber
title: React Fiber是什么
tags: [React, Fiber]
---

## 什么是 Fiber？

Fiber就是一个类似双向链表的数据结构。是React Fiber中一个最小工作单元。

## React Fiber

React Fiber就是React 16实现的一种新的更新机制，让react的更新变得可控，避免了之前采用递归需要一气呵成影响性能的做法。

React Fiber 是一种基于浏览器的单线程调度算法。

## React Fiber 为什么会出现？

### React15 中的问题

React的更新是同步的。JS的执行和浏览器渲染页面这两个操作是互斥的。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。

## 问题的解决

时间分片

将一个耗时很长的任务分成很多小片，维护每一个分片的数据结构，就是Fiber。

解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的 requestIdleCallback 这一 API。

## React Fiber 的机制

React 框架内部的运作可以分为 3 层：

- Virtual DOM 层，描述页面长什么样。
- Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等。
- Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative。

而 React Fiber中改动最大的就是Reconciler层。他有一个新名字 Fiber Reconciler。

Fiber 其实指的是一种数据结构，它可以用一个纯 JS 对象来

```javascript
const fiber = {
    stateNode,    // 节点实例
    child,        // 子节点
    sibling,      // 兄弟节点
    return,       // 父节点
}
```

为了加以区分，以前的 Reconciler 被命名为Stack Reconciler。Stack Reconciler 运作的过程是不能被打断的。

而 Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器。

在React Fiber中，一次更新过程会分成多个分片完成，所以完全有可能一个更新任务还没有完成，就被另一个更高优先级的更新过程打断，这时候，优先级高的更新任务会优先处理完，而低优先级更新任务所做的工作则会完全作废，然后等待机会重头再来。

为了达到这种效果，就需要有一个调度器 (Scheduler) 来进行任务优先级分配。

因为一个更新过程可能被打断，所以React Fiber一个更新过程（Reconciler阶段）被分为两个阶段(Phase)：第一个阶段Reconciliation Phase和第二阶段Commit Phase。

- 在第一阶段Reconciliation Phase，React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的；

- 但是到了第二阶段Commit Phase，那就一鼓作气把DOM更新完，绝不会被打断。

以render函数为界，第一阶段可能会调用下面这些生命周期函数，说是“可能会调用”是因为不同生命周期调用的函数不同。

- componentWillMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate


下面这些生命周期函数则会在第二阶段调用。

- componentDidMount
- componentDidUpdate
- componentWillUnmount

![](/img/3697464995-5c6f9e186579e_fix732.png)

因为第一阶段的过程会被打断而且“重头再来”，就会造成意想不到的情况。

比如说，一个低优先级的任务A正在执行，已经调用了某个组件的componentWillUpdate函数，接下来发现自己的时间分片已经用完了，于是冒出水面，看看有没有紧急任务，哎呀，真的有一个紧急任务B，接下来React Fiber就会去执行这个紧急任务B，任务A虽然进行了一半，但是没办法，只能完全放弃，等到任务B全搞定之后，任务A重头来一遍，注意，是重头来一遍，不是从刚才中段的部分开始，也就是说，componentWillUpdate函数会被再调用一次。

在现有的React中，每个生命周期函数在一个加载或者更新过程中绝对只会被调用一次；**在React Fiber中，不再是这样了，第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用！**

## Fiber树

Fiber Reconciler 在阶段一进行 Diff 计算的时候，会生成一棵 Fiber 树。这棵树是在 Virtual DOM 树的基础上增加额外的信息来生成的，它本质来说是一个链表。

Fiber 树在首次渲染的时候会生成一次。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程

如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

在构造 Fiber 树的过程中，Fiber Reconciler 会将需要更新的节点信息保存在Effect List当中，在阶段二执行的时候，会批量更新相应的节点。

## Fiber的工作原理

React的组件更新采用的是双缓存技术。即在更新的时候React存储了两个fiber tree

![](/img/1635679058557-f197af09-1bf8-4b1b-83c1-eff9d9e462a7.png)

rootFiber是react应用，footFiberNode是应用挂在的节点，current指向的fiber是渲染在页面中的fiber(即出现在屏幕中的视图)，我们称它未current fiber，current fiber的每一个fiber节点都有一个alternate指向另一个棵树的相同fiber节点，我们称这个fiber为workInProgress fiber。
在react v16 diff算法是将React Element和current fiber 对比生成workInProgress fiber，然后将current指针指向workInProgress fiber（即将workInProgress fiber赋值给current fiber），渲染新的视图。跟current fiber进行diff生成workInProgress fiber的算法是在内存中进行的，即使被中断也对现有视图不产生影响。






