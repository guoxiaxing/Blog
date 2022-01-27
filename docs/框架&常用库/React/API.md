---
slug: api
title: API
tags: [React]
---

## React

React 是 React 库的顶层 API，可以使用以下几个方式引入

- 使用 script 标签引入的组件库，全局有一个 React 的对象

- 使用 ES6 和 npm 的时候，可以通过编写 `import React from 'react'` 来进行引入

- ES5 与 npm 时，则可以通过编写 `var React = require('react')` 来引入它们

### React.memo

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用

**React.memo 仅检查 props 变更。**

如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做**浅层对比**，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

```jsx
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

### React.Children

React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。

### React.forwardRef

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。

在以下两种场景中特别有用：

- 转发 refs 到 DOM 组件

- 在高阶组件中转发 refs

React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

## React.Component

class 组件中必须定义 render 方法，其他都是可选的

### 常用的生命周期方法

#### render()

render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

如需与浏览器进行交互，请在 componentDidMount() 或其他生命周期方法中执行你的操作。

#### constuctor(props)

**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

在 constructor() 函数中**不要调用 setState() 方法**。如果你的组件需要使用内部 state，请直接在**构造函数中为 this.state 赋值初始 state**：

#### componentDidMount()

**componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用**。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

你可以在 componentDidMount() 里直接调用 setState()。**它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前**。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。

#### componentDidUpdate(prevProps, prevState, snapshot)

**你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，否则会导致死循环。**

它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。 变化更新到 DOM 但是渲染到页面之前

#### componentWillUnmount()

componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作

### 不常用的生命周期方法

#### shouldComponentUpdate(nextProps, nextState)

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。

- true - 重新渲染

- false - 不重新渲染（会跳过当前组件以及其子组件的渲染，类似于 Angular 的 ChangeDetectionStrategy.OnPush）

如果你需要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与 nextState 进行比较，并返回 false 以告知 React 可以跳过更新。**返回 false 并不会阻止子组件在 state 更改时重新渲染。**

#### static getDerivedStateFromProps(props, state)

会在 shouldComponentUpdate 之前调用。返回一个对象来更新 state，如果返回 null 则不更新任何内容。

**此方法无权访问组件实例**

#### getSnapshotBeforeUpdate(prevProps, prevState)

在 render 之后，componentDidUpdate 之前调用

### Error Boundary

#### static getDerivedStateFromError(error)

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

:::danger

getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。

:::

#### componentDidCatch(error, info)

componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。

### 其他 API

#### setState(updater, [callback])

setState() 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。

React 会延迟调用它，然后通过一次传递更新多个组件。React 并不会保证 state 的变更会立即生效。

setState() 并不总是立即更新组件。它会批量推迟更新。

- 请使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)）来获取最新的 state，这两种方式都可以保证在应用更新后触发。

- 基于之前的 state 来设置当前的 state，可以给 setState 的第一个参数传递一个函数，函数有两个参数（state 和 props）都代表最新的 state 和 props。updater 函数中接收的 state 和 props 都保证为最新。updater 的返回值会与 state 进行浅合并。

**React 会按照调用 setState 的顺序更新状态**

**无论您在 React 事件处理程序 setState()中调用多少组件，它们都只会在事件结束时产生一次重新渲染。**

```jsx
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { a: false, b: false };
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.a.toString() + " " + this.state.b.toString()}
      </button>
    );
  }

  handleClick = () => {
    // 点击按钮之后a、b都是true
    this.setState({ a: true });
    this.setState({ b: true });
  };
}
```

解释一下：

setState()调用都发生在 React 事件处理程序中。因此，它们总是在事件结束时一起刷新（并且您看不到中间状态）

更新总是按照它们发生的顺序进行浅层合并。所以如果第一次更新是{a: 10}，第二次是{b: 20}，第三次是{a: 30}，渲染状态将是{a: 30, b: 20}。对同一状态键的最新更新（例如 a 在我的示例中）总是“获胜”。

但是在下面的这种情况中，当一个新的 state 依赖于之前的 state 的时候，结果可能与我们想象的不一致

```jsx
// assuming this.state = { value: 0 };
this.setState({ value: this.state.value + 1 });
this.setState({ value: this.state.value + 1 });
this.setState({ value: this.state.value + 1 });
// 最后 this.state.value 为 1
```

此时推荐使用韩式

```jsx
// assuming this.state = { value: 0 };
this.setState(state => ({ value: state.value + 1 }));
this.setState(state => ({ value: state.value + 1 }));
this.setState(state => ({ value: state.value + 1 }));
// 最后 this.state.value 为 3
```

:::danger

1. 何时以及为什么 setState 会批量执行？

- 何时：setState 的异步更新是在 React 的生命周期函数以及 React 的事件处理函数中，除此之外的场景（定时器、ajax 请求、Promise 中、addEventListener 绑定的事件处理函数中都是同步执行的）

- 为什么：优化性能

:::

### 实例属性

#### state

组件中的 state 包含了随时可能发生变化的数据。state 由用户自定义，它是一个普通 JavaScript 对象。

如果某些值未用于渲染或数据流（例如，计时器 ID），则不必将其设置为 state。此类值可以在组件实例上定义。

**永远不要直接改变 this.state，因为后续调用的 setState() 可能会替换掉你的改变。请把 this.state 看作是不可变的。**

## ReactDOM

- script 标签引入的，全局有一个 ReactDOM

- ES6 和 npm，通过 `import ReactDOM form 'react-dom'` 来使用 ReactDOM

- 使用 npm 和 ES5，你可以用 `var ReactDOM = require('react-dom')`。

### ReactDOM.render(element, container[, callback])

在提供的 container 里渲染一个 React 元素，并返回对该组件的引用

**ReactDOM.render() 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。**

### ReactDOM.unmountComponentAtNode(container)

从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。

## DOM 元素

React 实现了一套独立于浏览器的 DOM 系统，兼顾了性能和跨浏览器的兼容性。

### 属性差异

#### checked

当 `<input>` 组件的 type 类型为 checkbox 或 radio 时，组件支持 checked 属性。你可以使用它来设置组件是否被选中。这对于构建受控组件很有帮助。而 defaultChecked 则是非受控组件的属性，用于设置组件首次挂载时是否被选中。

#### className

className 属性用于指定 CSS 的 class

**React 中使用 Web Components（这是一种不常见的使用方式），请使用 class 属性代替。**

#### dangerouslySetInnerHTML

类似于 HTML 中的 innerHTML 属性

可以直接在 React 中设置 HTML，但当你想设置 dangerouslySetInnerHTML 时，需要向其传递包含 key 为 \_\_html 的对象，以此来警示你

#### htmlFor

由于 for 在 JavaScript 中是保留字，所以 React 元素中使用了 htmlFor 来代替。

#### onChange

onChange 事件与预期行为一致：每当表单字段变化时，该事件都会被触发。

#### selected

如果要将 `<option>` 标记为已选中状态，请在 select 的 value 中引用该选项的值。

#### style

style 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串。

```jsx
const divStyle = {
  color: "blue",
  backgroundImage: "url(" + imgUrl + ")"
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

**React 会自动添加 ”px” 后缀到内联样式为数字的属性后。如需使用 ”px” 以外的单位，请将此值设为数字与所需单位组成的字符串。**

#### value

`<input>`、`<select>` 和 `<textarea>` 组件支持 value 属性。你可以使用它为组件设置 value。这对于构建受控组件是非常有帮助。defaultValue 属性对应的是非受控组件的属性，用于设置组件第一次挂载时的 value。

## 合成事件

SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()。

使用 nativeEvent 属性来获取浏览器的底层事件。

事件处理函数在冒泡阶段被触发。如需注册捕获阶段的事件处理函数，则应为事件名添加 Capture。例如，处理捕获阶段的点击事件请使用 onClickCapture，而不是 onClick。
