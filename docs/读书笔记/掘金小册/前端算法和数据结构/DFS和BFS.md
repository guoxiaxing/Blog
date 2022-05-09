---
slug: DFS和BFS
title: DFS和BFS
tags: [掘金小册, 前端算法和数据结构, DFS和BFS]
---

DFS（深度优先搜索）和 BFS（广度优先搜索）。这两种算法和栈、队列有着千丝万缕的关系

## 深度优先搜索思想：不撞南墙不回头的“迷宫游戏” - 栈

> 只要没有碰壁，就决不选择其它的道路，而是坚持向当前道路的深处挖掘——像这样将“深度”作为前进的第一要素的搜索方法，就是所谓的“深度优先搜索”。

> 深度优先搜索的核心思想，是试图穷举所有的完整路径。

### 深度优先搜索的本质——栈结构

DFS 涉及到前进，发现走不通就后退重新选择，这些前进、后退的操作，其实和栈结构的入栈、出栈过程非常相似。走的节点入栈，发现是死胡同时就把刚才入栈的节点出栈，继续尝试下一种可能。最后找到出口时栈中的元素就是路线

现在大家知道了深度优先搜索的过程可以转化为一系列的入栈、出栈操作。那么深度优先搜索在编码上一般会如何实现呢？这里，就需要大家回忆一下第 5 节的内容了——DFS 中，我们往往使用递归来模拟入栈、出栈的逻辑。

### DFS 与二叉树的遍历

            A
        B       C
    D       E       F

E 是 B 的右子节点；C 没有左子节点

从 A 结点出发，访问左侧的子结点；如果左子树同样存在左侧子结点，就头也不回地继续访问下去。一直到左侧子结点为空时，才退回到距离最近的父结点、再尝试去访问父结点的右侧子结点——这个过程，和走迷宫是何其相似！事实上，在二叉树中，结点就好比是迷宫里的坐标，图中的每个结点在作为父结点时无疑是岔路口，而空结点就是死胡同。我们回顾一下二叉树先序遍历的编码实现：

```javascript
function preOrderTrans(root) {
  // 根左右
  const result = [];
  function dfs(root) {
    if (root) {
      result.push(root.value);
      if (root.left) dfs(root.left);
      if (root.right) dfs(root.right);
    }
  }
  dfs(root);
  return result;
}

// 根左右
function preOrderTrans(root) {
  const stack = [];
  const result = [];
  if (root) {
    stack.push(root);
    while (stack.length) {
      const node = stack.pop();
      result.push(node.value);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
}
```

在这个递归函数中，递归式用来先后遍历左子树、右子树（分别探索不同的道路），递归边界在识别到结点为空时会直接返回（撞到了南墙）。因此，我们可以认为，递归式就是我们选择道路的过程，而递归边界就是死胡同。二叉树的先序遍历正是深度优先搜索思想的递归实现。可以说深度优先搜索过程就类似于树的先序遍历、是树的先序遍历的推广。

## 广度优先搜索思想——找到迷宫出口的另一种思路 - 队列

与深度优先搜索不同的是，广度优先搜索（BFS）并不执着于“一往无前”这件事情。它关心的是眼下自己能够直接到达的所有坐标，其动作有点类似于“扫描”

广度优先搜索每次以“广度”为第一要务、雨露均沾，一层一层地扫描，最后也能够将所有的坐标扫描完全

在分层遍历的过程中，大家会发现两个规律：

- 每访问完毕一个坐标，这个坐标在后续的遍历中都不会再被用到了，也就是说它可以被丢弃掉。
- 站在某个确定坐标的位置上，我们所观察到的可直接抵达的坐标，是需要被记录下来的，因为后续的遍历还要用到它们。

丢弃已访问的坐标、记录新观察到的坐标，这个顺序毫无疑问符合了“先进先出”的原则，因此整个 BFS 算法的实现过程，和队列有着密不可分的关系。

```javascript
function BFS(入口坐标) {
    const queue = [] // 初始化队列queue
    // 入口坐标首先入队
    queue.push(入口坐标)
    // 队列不为空，说明没有遍历完全
    while(queue.length) {
        const top = queue[0] // 取出队头元素

        访问 top // 此处是一些和 top 相关的逻辑，比如记录它对应的信息、检查它的属性等等

        // 注意这里也可以不用 for 循环，视题意而定
        for(检查 top 元素出发能够遍历到的所有元素)  {
            queue.push(top能够直接抵达的元素)
        }

        queue.shift() // 访问完毕。将队头元素出队
    }
}
```

注意，理论上来说只要我们拿到了 top，那么就不再关心队头元素了。因此这个 shift 出队的过程，其实是比较灵活的。一般只要我们拿到了 top，就可以执行 shift 了。一些同学习惯于把 top 元素的访问和出队放在一起来做：

```javascript
const top = queue.shift();
```

这样做也是没问题的

### BFS 实战：二叉树的层序遍历

```javascript
function levelOrderTrans(root) {
  const queue = [];
  const result = [];
  if (root) {
    queue.push(root);
    while (queue.length) {
      const curLevel = [];
      const len = queue.length;
      for (let i = 0; i < len; i++) {
        const node = queue.shift();
        curLevel.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      result.push(curLevel);
    }
  }
  return result;
}
```
