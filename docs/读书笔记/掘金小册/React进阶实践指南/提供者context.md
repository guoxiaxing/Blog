---
slug: 提供者context
title: 提供者context
tags: [掘金小册, React进阶实践指南, 提供者context]
---

## context 基本使用

直接用 createContext 创建出一个 context 上下文对象，context 对象提供两个组件，Provider 和 Consumer 作为提供者和消费者

### createContext

```js
const ThemeContext = React.createContext(null); //
const ThemeProvider = ThemeContext.Provider; //提供者
const ThemeConsumer = ThemeContext.Consumer; // 订阅消费者
```

createContext 接受一个参数，作为初始化 context 的内容，返回一个 context 对象，Context 对象上的 Provider 作为提供者，Context 对象上的 Consumer 作为消费者。

### 提供者

```jsx
const ThemeProvider = ThemeContext.Provider; //提供者
export default function ProviderDemo() {
  const [contextValue, setContextValue] = React.useState({
    color: "#ccc",
    background: "pink",
  });
  return (
    <div>
      <ThemeProvider value={contextValue}>
        <Son />
      </ThemeProvider>
    </div>
  );
}
```

provider 作用有两个：

- value 属性传递 context，供给 Consumer 使用。
- **value 属性改变，ThemeProvider 会让消费 Provider value 的组件重新渲染。**

### 消费者

React 提供了 3 种形式，接下来一一介绍这三种方式。

#### 类组件之 contextType 方式

contextType 静态属性，用来获取上面 Provider 提供的 value 属性

```jsx
const ThemeContext = React.createContext(null);
// 类组件 - contextType 方式
class ConsumerDemo extends React.Component {
  render() {
    const { color, background } = this.context;
    return <div style={{ color, background }}>消费者</div>;
  }
}
ConsumerDemo.contextType = ThemeContext;

const Son = () => <ConsumerDemo />;
```

- 类组件的静态属性上的 contextType 属性，指向需要获取的 context（ demo 中的 ThemeContext ），就可以方便获取到最近一层 Provider 提供的 contextValue 值。
- 这种方式只适用于类组件。

#### 函数组件之 useContext 方式

```jsx
const ThemeContext = React.createContext(null);
// 函数组件 - useContext方式
function ConsumerDemo() {
  const contextValue = React.useContext(ThemeContext); /*  */
  const { color, background } = contextValue;
  return <div style={{ color, background }}>消费者</div>;
}
const Son = () => <ConsumerDemo />;
```

useContext 接受一个参数，就是想要获取的 context ，返回一个 value 值，就是最近的 provider 提供 contextValue 值。

#### 订阅者之 Consumer 方式

```jsx
const ThemeConsumer = ThemeContext.Consumer; // 订阅消费者

function ConsumerDemo(props) {
  const { color, background } = props;
  return <div style={{ color, background }}>消费者</div>;
}
const Son = () => (
  <ThemeConsumer>
    {/* 将 context 内容转化成 props  */}
    {(contextValue) => <ConsumerDemo {...contextValue} />}
  </ThemeConsumer>
);
```

Consumer 订阅者采取 `render props` 方式，接受最近一层 provider 中 value 属性，作为 render props 函数的参数，可以将参数取出来，作为 props 混入 ConsumerDemo 组件，说白了就是 context 变成了 props。

### 动态 context

其实就是将 state 作为 Context.Provider 的 value

```jsx
function ConsumerDemo() {
  const { color, background } = React.useContext(ThemeContext);
  return <div style={{ color, background }}>消费者</div>;
}
const Son = React.memo(() => <ConsumerDemo />); // 子组件

const ThemeProvider = ThemeContext.Provider; //提供者
export default function ProviderDemo() {
  const [contextValue, setContextValue] = React.useState({
    color: "#ccc",
    background: "pink",
  });
  return (
    <div>
      <ThemeProvider value={contextValue}>
        <Son />
      </ThemeProvider>
      <button
        onClick={() => setContextValue({ color: "#fff", background: "blue" })}
      >
        切换主题
      </button>
    </div>
  );
}
```

Provider 模式下 context 有一个显著的特点，**就是 Provder 的 value 改变，会使所有消费 value 的组件重新渲染**，如上通过一个 useState 来改变 contextValue 的值，contextValue 改变，会使 ConsumerDemo 自动更新，注意这个更新并不是由父组件 son render 造成的，因为给 son 用 memo 处理过，这种情况下，Son 没有触发 render，而是 ConsumerDemo 自发的 render。

:::warning

**在 Provider 里 value 的改变，会使引用 contextType,useContext 消费该 context 的组件重新 render ，同样会使 Consumer 的 children 函数重新执行，与前两种方式不同的是 Consumer 方式，当 context 内容改变的时候，不会让引用 Consumer 的父组件重新更新。**

:::

#### 暴露问题

上述的 demo 暴露出一个问题，就是在上述 son 组件是用 memo 处理的，如果没有 memo 处理，useState 会让 ProviderDemo 重新 render ，此时 son 没有处理，就会跟随父组件 render ，问题是如果 son 还有很多子组件，那么全部 render 一遍。**那么如何阻止 Provider value 改变造成的 children （ demo 中的 Son ）不必要的渲染？**

- 第一种就是利用 memo，pureComponent 对子组件 props 进行浅比较处理。

```jsx
const Son = React.memo(() => <ConsumerDemo />);
```

- 第二种就是 React 本身对 React element 对象的缓存。React 每次执行 render 都会调用 createElement 形成新的 React element 对象，如果把 React element 缓存下来，下一次调和更新时候，就会跳过该 React element 对应 fiber 的更新。

```jsx
<ThemeProvider value={contextValue}>
  {React.useMemo(
    () => (
      <Son />
    ),
    []
  )}
</ThemeProvider>
```

### 其他 api

#### displayName

context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

```javascript

const MyContext = React.createContext(/* 初始化内容 */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中

```

:::info

问：context 与 props 和 react-redux 的对比？

答： context 解决了：

- 解决了 props 需要每一层都手动添加 props 的缺陷。

- 解决了改变 value ，组件全部重新渲染的缺陷。（context 改变 value 只需要消费 context 的组件更新。不需要像props那样，更新组件树）

react-redux 就是通过 Provider 模式把 redux 中的 store 注入到组件中的。

:::

## context 高阶用法

### 嵌套 Provider

```jsx
const ThemeContext = React.createContext(null); // 主题颜色Context
const LanContext = React.createContext(null); // 主题语言Context

function ConsumerDemo() {
  return (
    <ThemeContext.Consumer>
      {(themeContextValue) => (
        <LanContext.Consumer>
          {(lanContextValue) => {
            const { color, background } = themeContextValue;
            return (
              <div style={{ color, background }}>
                {" "}
                {lanContextValue === "CH"
                  ? "大家好，让我们一起学习React!"
                  : "Hello, let us learn React!"}{" "}
              </div>
            );
          }}
        </LanContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

const Son = memo(() => <ConsumerDemo />);
export default function ProviderDemo() {
  const [themeContextValue] = React.useState({
    color: "#FFF",
    background: "blue",
  });
  const [lanContextValue] = React.useState("CH"); // CH -> 中文 ， EN -> 英文
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LanContext.Provider value={lanContextValue}>
        <Son />
      </LanContext.Provider>
    </ThemeContext.Provider>
  );
}
```

### 逐层传递 Provider

```jsx
// 逐层传递Provder
const ThemeContext = React.createContext(null);
function Son2() {
  return (
    <ThemeContext.Consumer>
      {(themeContextValue2) => {
        const { color, background } = themeContextValue2;
        return (
          <div className="sonbox" style={{ color, background }}>
            {" "}
            第二层Provder{" "}
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}
function Son() {
  const { color, background } = React.useContext(ThemeContext);
  const [themeContextValue2] = React.useState({
    color: "#fff",
    background: "blue",
  });
  /* 第二层 Provder 传递内容 */
  return (
    <div className="box" style={{ color, background }}>
      第一层Provder
      <ThemeContext.Provider value={themeContextValue2}>
        <Son2 />
      </ThemeContext.Provider>
    </div>
  );
}

export default function Provider1Demo() {
  const [themeContextValue] = React.useState({
    color: "orange",
    background: "pink",
  });
  /* 第一层  Provider 传递内容  */
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Son />
    </ThemeContext.Provider>
  );
}
```

#### Provider 特性总结：

- Provider 作为提供者传递 context ，provider 中 value 属性改变会使所有消费 context 的组件重新更新。

- Provider 可以逐层传递 context，下一层 Provider 会覆盖上一层 Provider。(也就是组件的context的取值是离组件最近的provider的value)
