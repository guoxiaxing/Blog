---
slug: beginWork和render
title: beginWork和render
tags: [掘金小册, React进阶实践指南, beginWork和render]
---

:::info

fiber 调和更新执行的就是 beginWork;但是 beginWork 和 render 并不等价，render 一定会导致 beginWork 的执行，但是 beginWork 执行并不一定会导致组件重新 render.

:::

:::danger

在 React 中，组件更新有以下几种可能：

- state 发生改变
- props 发生改变
- context 改变

而且只有组件才能触发更新，比如 div 元素 hostComponent 类型的 fiber，它是无法独立的自我更新的，只能依赖于父类的组件更新 state，但是在调和阶段，它也会作为一个任务单元进入到 workLoop 中，所以可以得到下面的结论

- **fiber 是调和过程中的最小单元，每一个需要调和的 fiber 都会进入 workLoop 中。**

- **而组件（函数/类）是最小的更新单元，React 的更新源于数据层 state 的变化。**

:::

## beginWork - 调和源泉

类组件在 render 阶段一个重要的作用就是产生新的 children。每一个需要更新的 fiber 都要经历一个过程叫做 beginWork。

:::info

对于组件类型的 fiber，进入到 workLoop 中就一定会 rerender 吗？

no!

:::

### demo

```jsx
/* 子组件2 */
function Child2() {
  return <div>子组件 2</div>;
}
/* 子组件1 */
function Child1() {
  const [num, setNumber] = React.useState(0);
  return (
    <div>
      子组件 {num}
      <button onClick={() => setNumber(num + 1)}>按钮1</button>
    </div>
  );
}
/* 父组件 */
export default function Index() {
  const [num, setNumber] = React.useState(0);
  return (
    <div>
      <p>父组件 {num} </p>
      <Child1 />
      <Child2 />
      <button onClick={() => setNumber(num + 1)}>按钮2</button>
    </div>
  );
}
```

- 场景一：当点击 Child1 的 按钮 1 的时候，Child1 会渲染，那么 Child1 自然会进入到 beginWork 流程中，那么疑问来了：

  - 问题一：父组件 Index 没有更新，会 rerender 吗？那么有会进入 beginWork 流程吗 ？
  - 问题二：Child2 会进入 beginWork 流程吗 ？
  - 问题三：如果 Index 会 beginWork，那么 React 从 Root fiber 开始调和的时候，是如何找到更新的事发点 Index 的呢？

- 场景二：当点击 Index 中的 按钮 2 的时候：

  - 问题四：Index 因为本身的 state 改变会更新，那么 Child1 和 Child2 为什么会跟着更新。

:::danger

答一： 不会 rerender；会 beginWork

答二：Child2 会进入 beginWork 流程（原因是父组件进入了 beginWork）

答三：不知道 😭

答四：因为父组件 rerender 了

:::

:::info

更新优先级：

- lane ： 更新优先级。（在一次更新任务中，将赋予给更新的 fiber 的一个更新优先级 lane。）
- childLanes：children 中更新优先级。（如果当前 fiber 的 child 中有高优先级任务，那么当前 fiber 的 childLanes 等于当前优先级）。

:::

## state 改变的时候组件如何更新

- 获取到 state 发生改变的组件的 fiber 和 lane，调用 scheduleUpdateOnFiber

- 把当前 fiber 到 rootFiber 的父级链表上的所有优先级都给更新了；如果当前 root fiber 确定更新，那么会调用 ensureRootIsScheduled ，

  - 优先级更新方法：首先会更新当前 fiber 上的更新优先级，还要更新当前 fiber 的缓冲树 alternate 上的优先级；然后会递归向上把父级链上的 childLanes 都更新，更新成当前的任务优先级

:::info

**为什么向上递归更新父级的 childLanes？**

- 所有的 fiber 是通过一颗 fiber 树关联到一起的，如果组件 A 发生一次更新，React 是从 root 开始深度遍历更新 fiber 树。

- 那么更新过程中需要深度遍历整个 fiber 树吗？，当然也不是，那么只有一个组件更新，所有的 fiber 节点都调和无疑是性能上的浪费

- 既然要从头更新，又不想调和整个 fiber 树，那么如何找到更新的组件 A 呢？？**这个时候 childLanes 就派上用场了，如果 A 发生了更新，那么先向上递归更新父级链的 childLanes，接下来从 Root Fiber 向下调和的时候，发现 childLanes 等于当前更新优先级 updateLanes，那么说明它的 child 链上有新的更新任务，则会继续向下调和，反之退出调和流程。**（问题三的答案 - Root Fiber 是通过 childLanes 逐渐向下调和找到需要更新的组件的**要更新的组件的 lane === updateLane**）

:::

![1](/img/React进阶实践指南/2421bbf350134d438f1bdc12b2882974_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

- 第一阶段是发生更新，那么产生一个更新优先级 lane 。
- 第二阶段向上标记 childLanes 过程。
- 第三阶段是向下调和过程，有的同学会问，为什么 A 会被调和，原因是 A 和 B 是同级，如果父级元素调和，并且向下调和，那么父级的第一级子链上的 fiber 都会进入调和流程。从 fiber 关系上看，Root 先调和的是 child 指针上的 A ，然后 A 会退出向下调和，接下来才是 sibling B，接下来 B 会向下调和，通过 childLanes 找到当事人 F，然后 F 会触发 render 更新。这也就解决问题 2，Child2 的调和问题。

还有一个问题，就是 B，E 会向下调和，如果它们是组件，那么会 render 么，答案是否定的，要记住的是调和过程并非 render 过程，调和过程有可能会触发 render 函数，也有可能只是继续向下调和，而本身不会执行 render

## render 阶段

```js title=react-reconciler/src/ReactFiberWorkLoop.new.js -> renderRootSync
function renderRootSync(root, lanes) {
  workLoopSync();
  /* workLoop完毕后，证明所有节点都遍历完毕，那么重置状态，进入 commit 阶段 */
  workInProgressRoot = null;
  workInProgressRootRenderLanes = NoLanes;
}
```

可以把 workLoopSync 当作一个循环运作的加工器，每一个需要调和的 fiber 可以当作一个零件，每一个零件都需要进入加工器，如果没有待加工的零件，那么加工器才停止运转。

```js title=react-reconciler/src/ReactFiberWorkLoop.new.js -> workLoopSync
function workLoopSync() {
  /* 循环执行 performUnitOfWork ，一直到 workInProgress 为空 */
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
```

![2](/img/React进阶实践指南/99afa68f8ab94c93be41df70db0ae488_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)
