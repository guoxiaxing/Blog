---
slug: 调和与fiber
title: 调和与fiber
tags: [掘金小册, React进阶实践指南, 调和与fiber]
---

### 什么是 fiber?

fiber 在 React 中是最小粒度的执行单元

### 为什么使用 fiber？

在 Reactv15 以及之前的版本，React 对于虚拟 DOM 是采用递归方式遍历更新的，比如一次更新，就会从应用根部递归更新，递归一旦开始，中途无法中断，随着项目越来越复杂，层级越来越深，导致更新的时间越来越长，给前端交互上的体验就是卡顿。

引入 fiber 就是来解决 react 更新卡顿的问题，那么为什么它可以解决卡顿呢？

更新 fiber 的过程叫做 Reconciler（调和器），每一个 fiber 都可以作为一个执行单元来处理，所以每一个 fiber 可以根据自身的过期时间 expirationTime（ v17 版本叫做优先级 lane ）来判断是否还有时间执行更新，如果没有时间更新，就要把主动权交给浏览器去渲染，这样就能给用户感觉不是很卡。然后等浏览器空余时间，在通过 scheduler （调度器），再次恢复执行单元上来，这样就能本质上中断了渲染，提高了用户体验。

### React.element、fiber、dom 三者之间的关系

- element 是 React 视图层到代码层的表现
- DOM 元素
- fiber 可以说是是 element 和真实 DOM 之间的交流枢纽站，一方面每一个类型 element 都会有一个与之对应的 fiber 类型，element 变化引起更新流程都是通过 fiber 层面做一次调和改变，然后对于元素，形成新的 DOM 做视图渲染。

![1](/img/React进阶实践指南/0a90368f24f0477aaf0d446a8f6736db_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

### fiber 上保存的信息

```js title=react-reconciler/src/ReactFiber.js
function FiberNode() {
  this.tag = tag; // fiber 标签 证明是什么类型fiber。
  this.key = key; // key调和子节点时候用到。
  this.type = null; // dom元素是对应的元素类型，比如div，组件指向组件对应的类或者函数。
  this.stateNode = null; // 指向对应的真实dom元素，类组件指向组件实例，可以被ref获取。

  this.return = null; // 指向父级fiber
  this.child = null; // 指向子级fiber
  this.sibling = null; // 指向兄弟fiber
  this.index = 0; // 索引

  this.ref = null; // ref指向，ref函数，或者ref对象。

  this.pendingProps = pendingProps; // 在一次更新中，代表element创建
  this.memoizedProps = null; // 记录上一次更新完毕后的props
  this.updateQueue = null; // 类组件存放setState更新队列，函数组件存放
  this.memoizedState = null; // 类组件保存state信息，函数组件保存hooks信息，dom元素为null
  this.dependencies = null; // context或是时间的依赖项

  this.mode = mode; //描述fiber树的模式，比如 ConcurrentMode 模式

  this.effectTag = NoEffect; // effect标签，用于收集effectList
  this.nextEffect = null; // 指向下一个effect

  this.firstEffect = null; // 第一个effect
  this.lastEffect = null; // 最后一个effect

  this.expirationTime = NoWork; // 通过不同过期时间，判断任务是否过期， 在v17版本用lane表示。

  this.alternate = null; //双缓存树，指向缓存的fiber。更新阶段，两颗树互相交替。
}
```

### 每个 fiber 是怎么关联起来的

- child：指向子 Fiber 节点。
- sibling： 指向兄弟 Fiber 节点。
- return：指向父 Fiber 节点。

比如下面这个例子：

```jsx
export default class Index extends React.Component {
  state = { number: 666 };
  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  };
  render() {
    return (
      <div>
        hello，world
        <p> 《React进阶实践指南》 {this.state.number} 👍 </p>
        <button onClick={this.handleClick}>点赞</button>
      </div>
    );
  }
}
```

![2](/img/React进阶实践指南/5251e320a99f468ca3b46030febaa6b5_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

### Fiber 更新机制

#### 第一步：创建 fiberRoot 和 rootFiber

- fiberRoot：首次构建应用， 创建一个 fiberRoot ，作为整个 React 应用的根基。
- rootFiber： 通过 ReactDOM.render 渲染出来的，一个 React 应用可以有多 ReactDOM.render 创建的 rootFiber ，但是只能有一个 fiberRoot（应用根节点）。

第一次挂载的过程中，会将 fiberRoot 和 rootFiber 建立起关联。

```js title=react-reconciler/src/ReactFiberRoot.js
function createFiberRoot(containerInfo, tag) {
  /* 创建一个root */
  const root = new FiberRootNode(containerInfo, tag);
  const rootFiber = createHostRootFiber(tag);
  root.current = rootFiber;
  return root;
}
```

#### 第二步：workInProgress 和 current

- workInProgress 是：正在内存中构建的 Fiber 树称为 workInProgress Fiber 树。在一次更新中，所有的更新都是发生在 workInProgress 树上。在一次更新之后，workInProgress 树上的状态是最新的状态，那么它将变成 current 树用于渲染视图。
- current：正在视图层渲染的树叫做 current 树。

接下来会到 rootFiber 的渲染流程，首先会复用当前 current 树（ rootFiber ）的 alternate 作为 workInProgress ，如果没有 alternate （初始化的 rootFiber 是没有 alternate ），那么会创建一个 fiber 作为 workInProgress 。会用 alternate 将新创建的 workInProgress 与 current 树建立起关联。这个关联过程只有初始化第一次创建 alternate 时候进行。

```js
currentFiber.alternate = workInProgressFiber;
workInProgressFiber.alternate = currentFiber;
```

#### 第三步：深度调和子节点，渲染视图

接下来会按照上述第二步，在新创建的 alternates 上，完成整个 fiber 树的遍历，包括 fiber 的创建

![3](/img/React进阶实践指南/cda0522c0c85435494ccf3a3ea587baa_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

最后会以 workInProgress 作为最新的渲染树，fiberRoot 的 current 指针指向 workInProgress 使其变为 current Fiber 树。到此完成初始化流程。

##### 更新

如果对于上述 demo ，开发者点击一次按钮发生更新，接下来会发生什么呢? 首先会走如上的逻辑，重新创建一颗 workInProgresss 树，复用当前 current 树上的 alternate ，作为新的 workInProgress ，由于初始化 rootfiber 有 alternate ，所以对于剩余的子节点，React 还需要创建一份，和 current 树上的 fiber 建立起 alternate 关联。渲染完毕后，workInProgresss 再次变成 current 树。

![3](/img/React进阶实践指南/ff00ce5f2db0430c841ea3a01754542e_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

##### 双缓冲树

React 用 workInProgress 树(内存中构建的树) 和 current (渲染树) 来实现更新逻辑。双缓存一个在内存中构建，一个渲染视图，两颗树用 alternate 指针相互指向，在下一次渲染的时候，直接复用缓存树做为下一次渲染树，上一次的渲染树又作为缓存树，这样可以防止只用一颗树更新状态的丢失的情况，又加快了 DOM 节点的替换与更新。

### 两大阶段：render 和 commit

整个 fiber 的遍历开始—— workLoop

#### render 阶段

```js title=react-reconciler/src/ReactFiberWorkLoop.js
function workLoop() {
  while (workInProgress !== null) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

每一个 fiber 可以看作一个执行的单元，在调和过程中，每一个发生更新的 fiber 都会作为一次 workInProgress 。那么 workLoop 就是执行每一个单元的调度器，如果渲染没有被中断，那么 workLoop 会遍历一遍 fiber 树。 performUnitOfWork 包括两个阶段 beginWork 和 completeWork 。

```js title=react-reconciler/src/ReactFiberWorkLoop.js
function performUnitOfWork() {
  next = beginWork(current, unitOfWork, renderExpirationTime);
  if (next === null) {
    next = completeUnitOfWork(unitOfWork);
  }
}
```

- beginWork：是向下调和的过程。就是由 fiberRoot 按照 child 指针逐层向下调和，期间会执行函数组件，实例类组件，diff 调和子节点，打不同 effectTag。

- completeUnitOfWork：是向上归并的过程，如果有兄弟节点，会返回 sibling 兄弟，没有返回 return 父级，一直返回到 fiebrRoot ，期间可以形成 effectList，对于初始化流程会创建 DOM ，对于 DOM 元素进行事件收集，处理 style，className 等。

这么一上一下，构成了整个 fiber 树的调和。

##### 向下调和 beginWork

```js title=react-reconciler/src/ReactFiberBeginWork.js

function beginWork(current,workInProgress){

    switch(workInProgress.tag){
       case IndeterminateComponent:{// 初始化的时候不知道是函数组件还是类组件
           //....
       }
       case FunctionComponent: {//对应函数组件
           //....
       }
       case ClassComponent:{  //类组件
           //...
       }
       case HostComponent:{
           //...
       }
       ...
    }
}
```

beginWork 作用如下：

- 对于组件，执行部分生命周期，执行 render ，得到最新的 children 。
- 向下遍历调和 children ，复用 oldFiber ( diff 算法)。
- 打不同的副作用标签 effectTag ，比如类组件的生命周期，或者元素的增加，删除，更新。

###### reconcileChildren

调和子节点：

```js title=react-reconciler/src/ReactFiberBeginWork.js
function reconcileChildren(current, workInProgress) {
  if (current === null) {
    /* 初始化子代fiber  */
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderExpirationTime
    );
  } else {
    /* 更新流程，diff children将在这里进行。 */
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderExpirationTime
    );
  }
}
```

EffectTag 我列举几个常用的 effectTag 。

```js
export const Placement = /*             */ 0b0000000000010; // 插入节点
export const Update = /*                */ 0b0000000000100; // 更新fiber
export const Deletion = /*              */ 0b0000000001000; // 删除fiebr
export const Snapshot = /*              */ 0b0000100000000; // 快照
export const Passive = /*               */ 0b0001000000000; // useEffect的副作用
export const Callback = /*              */ 0b0000000100000; // setState的 callback
export const Ref = /*                   */ 0b0000010000000; // ref
```

##### 向上归并 completeUnitOfWork

completeUnitOfWork 的流程是自下向上的，那么 completeUnitOfWork 过程主要做写什么呢？

- 首先 completeUnitOfWork 会将有 effectTag 的 Fiber 节点会被保存在一条被称为 effectList 的单向链表中。在 commit 阶段，将不再需要遍历每一个 fiber ，只需要执行更新 effectList 就可以了。
- completeUnitOfWork 阶段对于组件处理 context ；对于元素标签初始化，会创建真实 DOM ，将子孙 DOM 节点插入刚生成的 DOM 节点中；会触发 diffProperties 处理 props ，比如事件收集，style，className 处理。

##### 调和顺序

那么上述写的 demo 片段，在初始化或者一次更新中调和顺序是怎样的呢？

- beginWork -> rootFiber
- beginWork -> Index fiber
- beginWork -> div fiber
- beginWork -> hello,world fiber
- completeWork -> hello,world fiber (completeWork 返回 sibling)
- beginWork -> p fiber
- completeWork -> p fiber
- beginWork -> button fiber
- completeWork -> button fiber (此时没有 sibling，返回 return)
- completeWork -> div fiber
- completeWork -> Index fiber
- completeWork -> rootFiber (完成整个 workLoop)

#### commit 阶段

- 一方面是对一些生命周期和副作用钩子的处理，比如 componentDidMount ，函数组件的 useEffect ，useLayoutEffect ；

- 另一方面就是在一次更新中，添加节点（ Placement ），更新节点（ Update ），删除节点（ Deletion ），还有就是一些细节的处理，比如 ref 的处理。

commit 细分可以分为：

- Before mutation 阶段（执行 DOM 操作前）；
- mutation 阶段（执行 DOM 操作）；
- layout 阶段（执行 DOM 操作后）

##### Before mutation

```js title=react-reconciler/src/ReactFiberWorkLoop.js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;
    if ((effectTag & Snapshot) !== NoEffect) {
      const current = nextEffect.alternate;
      // 调用getSnapshotBeforeUpdates
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }
    if ((effectTag & Passive) !== NoEffect) {
      scheduleCallback(NormalPriority, () => {
        flushPassiveEffects();
        return null;
      });
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```

Before mutation 阶段做的事主要有以下内容：

- 因为 Before mutation 还没修改真实的 DOM ，是获取 DOM 快照的最佳时期，如果是类组件有 getSnapshotBeforeUpdate ，那么会执行这个生命周期。
- 会异步调用 useEffect ，在生命周期章节讲到 useEffect 是采用异步调用的模式，其目的就是防止同步执行时阻塞浏览器做视图渲染。

##### Mutation

```js
function commitMutationEffects() {
  while (nextEffect !== null) {
    if (effectTag & Ref) {
      /* 置空Ref */
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }
    switch (primaryEffectTag) {
      case Placement: {
      } //  新增元素
      case Update: {
      } //  更新元素
      case Deletion: {
      } //  删除元素
    }
  }
}
```

mutation 阶段做的事情有：

- 置空 ref ，在 ref 章节讲到对于 ref 的处理。
- 对新增元素，更新元素，删除元素。进行真实的 DOM 操作。

##### Layout

```js
function commitLayoutEffects(root) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;
    commitLayoutEffectOnFiber(
      root,
      current,
      nextEffect,
      committedExpirationTime
    );
    if (effectTag & Ref) {
      commitAttachRef(nextEffect);
    }
  }
}
```

Layout 阶段 DOM 已经更新完毕，Layout 做的事情有：

- commitLayoutEffectOnFiber 对于类组件，会执行生命周期，setState 的 callback，对于函数组件会执行 useLayoutEffect 钩子。
- 如果有 ref ，会重新赋值 ref 。

**commit 阶段：主要做的事就是执行 effectList，更新 DOM，执行生命周期，获取 ref 等操作。**
