---
slug: 起源Component
title: 起源 Component
tags: [掘金小册, React进阶实践指南, 起源 Component]
---

组件本质上就是类和函数，但是与常规的类和函数不同的是，**组件承载了渲染视图的 UI 和更新视图的 setState 、 useState 等方法。**React 在底层逻辑上会像正常实例化类和正常执行函数那样处理的组件。

React 对组件的处理流程。

对于类组件的执行:

```js
function constructClassInstance(
  workInProgress, // 当前正在工作的 fiber 对象
  ctor, // 我们的类组件
  props // props
) {
  /* 实例化组件，得到组件实例 instance */
  const instance = new ctor(props, context);
}
```

对于函数组件的执行

```js
function renderWithHooks(
  current, // 当前函数组件对应的 `fiber`， 初始化
  workInProgress, // 当前正在工作的 fiber 对象
  Component, // 我们函数组件
  props, // 函数组件第一个参数 props
  secondArg, // 函数组件其他参数
  nextRenderExpirationTime //下次渲染过期时间
) {
  /* 执行我们的函数组件，得到 return 返回的 React.element对象 */
  let children = Component(props, secondArg);
}
```

类组件的定义：

```js
function Component(props, context, updater) {
  this.props = props; //绑定props
  this.context = context; //绑定context
  this.refs = emptyObject; //绑定ref
  this.updater = updater || ReactNoopUpdateQueue; //上面所属的updater 对象
}
/* 绑定setState 方法 */
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
/* 绑定forceupdate 方法 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
```

:::info

问：如果没有在 constructor 的 super 函数中传递 props，那么接下来 constructor 执行上下文中就获取不到 props ，这是为什么呢

```js

/* 假设我们在 constructor 中这么写 */
constructor(){
    super()
    console.log(this.props) // 打印 undefined 为什么?
}

```

答案很简单，刚才的 Component 源码已经说得明明白白了，绑定 props 是在父类 Component 构造函数中，执行 super 等于执行 Component 函数，此时 props 没有作为第一个参数传给 super() ，在 Component 中就会找不到 props 参数，从而变成 undefined ，在接下来 constructor 代码中打印 props 为 undefined 。

```js
/* 解决问题 */
constructor(props){
    super(props)
}

```

:::

```jsx
class Index extends React.Component {
  constructor(...arg) {
    super(...arg); /* 执行 react 底层 Component 函数 */
  }
  state = {}; /* state */
  static number = 1; /* 内置静态属性 */
  handleClick = () =>
    console.log(111); /* 方法： 箭头函数方法直接绑定在this实例上 */
  componentDidMount() {
    /* 生命周期 */
    console.log(Index.number, Index.number1); // 打印 1 , 2
  }
  render() {
    /* 渲染函数 */
    return (
      <div style={{ marginTop: "50px" }} onClick={this.handerClick}>
        hello,React!
      </div>
    );
  }
}
Index.number1 = 2; /* 外置静态属性 */
Index.prototype.handleClick = () =>
  console.log(222); /* 方法: 绑定在 Index 原型链的 方法*/
```

:::info

问：上述绑定了两个 handleClick ，那么点击 div 之后会打印什么呢？

答：结果是 111 。**因为在 class 类内部，箭头函数是直接绑定在实例对象上的**，而第二个 handleClick 是绑定在 prototype 原型链上的，它们的优先级是：实例对象上方法属性 > 原型链对象上方法属性。

:::

**不要尝试给函数组件 prototype 绑定属性或方法，即使绑定了也没有任何作用，因为通过上面源码中 React 对函数组件的调用，是采用直接执行函数的方式，而不是通过 new 的方式。**

那么，函数组件和类组件本质的区别是什么呢？

**对于类组件来说，底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每一次更新只需要调用 render 方法以及对应的生命周期就可以了。但是在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明。**

为了能让函数组件可以保存一些状态，执行一些副作用钩子，React Hooks 应运而生，它可以帮助记录 React 中组件的状态，处理一些额外的副作用。

## 组件通信方式

React 一共有 5 种主流的通信方式：

- props 和 callback 方式 - 常用
- ref 方式。
- React-redux 或 React-mobx 状态管理方式。
- context 上下文方式。
- event bus 事件总线。 - 不推荐，on、emit、off 方法来监听、触发、解绑事件

## 组件的强化方式

### 类组件继承

我们从上面不难发现这个继承增强效果很优秀。它的优势如下：

- 可以控制父类 render，还可以添加一些其他的渲染内容；
- 可以共享父类方法，还可以添加额外的方法和属性。

### 函数组件自定义 Hooks

### HOC 高阶组件
