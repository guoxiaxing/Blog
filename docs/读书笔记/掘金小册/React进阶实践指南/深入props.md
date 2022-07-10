---
slug: 深入props
title: 深入props
tags: [掘金小册, React进阶实践指南, 深入props]
---

## React 如何定义 props？

### 在 React 组件层级 props 充当的角色

一方面父组件 props 可以把数据层传递给子组件去渲染消费。另一方面子组件可以通过 props 中的 callback ，来向父组件传递信息。还有一种可以将**视图容器**作为 props 进行渲染。

### 从 React 更新机制中 props 充当的角色

在 React 中，props 在组件更新中充当了重要的角色，在 fiber 调和阶段中，diff 可以说是 React 更新的驱动器，熟悉 vue 的同学都知道 vue 中基于响应式，数据的变化，就会颗粒化到组件层级，通知其更新，**但是在 React 中，无法直接检测出数据更新波及到的范围，props 可以作为组件是否更新的重要准则，变化即更新**，于是有了 PureComponent ，memo 等性能优化方案。（即 props 变化组件更新）

### 从 React 插槽层面 props 充当的角色

React 可以把组件的闭合标签里的插槽，转化成 Children 属性。

## 监听 props 改变

### 类组件中

**componentWillReceiveProps** 可以作为监听 props 的生命周期，但是 React 已经不推荐使用 componentWillReceiveProps ，未来版本可能会被废弃，因为这个生命周期超越了 React 的可控制的范围内，可能引起多次执行等情况发生。于是出现了这个生命周期的替代方案 getDerivedStateFromProps

### 函数式组件

useEffect（但是 useEffect 初始化会默认执行一次）

```js

React.useEffect(()=>{
    // props 中number 改变，执行这个副作用。
    console.log('props改变：' ，props.number  )
},[ props.number ])

```

## props children 模式

props + children 模式 在 React 中非常常用，尤其对一些优秀开源组件库。比如 react-router 中的 Switch 和 Route ， antd 中的 Form 和 FormItem。

### props 插槽组件

```jsx
<Container>
    <Children>
</Container>
```

上述可以在 Container 组件中，通过 props.children 属性访问到 Children 组件，为 React element 对象。

作用：

1. 可以根据需要控制 Children 是否渲染。

2. 像上一节所说的， Container 可以用 React.cloneElement 强化 props (混入新的 props )，或者修改 Children 的子元素。

### render props 模式

```jsx
<Container>{(ContainerProps) => <Children {...ContainerProps} />}</Container>
```

这种情况，在 Container 中， props.children 属性访问到是函数，并不是 React element 对象，针对这种情况，像下面这种情况下 children 是不能直接渲染的，直接渲染会报错。

```jsx
function Container(props) {
  const ContainerProps = {
    name: "alien",
    mes: "let us learn react",
  };
  return props.children(ContainerProps);
}
```

这种方式作用是：

1. 根据需要控制 Children 渲染与否。
2. 可以将需要传给 Children 的 props 直接通过函数参数的方式传递给执行函数 children 。

### 混合模式

如果 Container 的 Children 既有函数也有组件，这种情况应该怎么处理呢？

```jsx
<Container>
  <Children />
  {(ContainerProps) => <Children {...ContainerProps} name={"haha"} />}
</Container>
```

```jsx
const Children = (props) => (
  <div>
    <div>hello, my name is {props.name} </div>
    <div> {props.mes} </div>
  </div>
);

function Container(props) {
  const ContainerProps = {
    name: "alien",
    mes: "let us learn react",
  };
  return props.children.map((item) => {
    if (React.isValidElement(item)) {
      // 判断是 react elment  混入 props
      return React.cloneElement(
        item,
        { ...ContainerProps },
        item.props.children
      );
    } else if (typeof item === "function") {
      return item(ContainerProps);
    } else return null;
  });
}

const Index = () => {
  return (
    <Container>
      <Children />
      {(ContainerProps) => <Children {...ContainerProps} name={"haha"} />}
    </Container>
  );
};
```

这种情况需要先遍历 children ，判断 children 元素类型：

1. 针对 element 节点，通过 cloneElement 混入 props ；
2. 针对函数，直接传递参数，执行函数。

## 操作 props 小技巧

### 抽象 props

抽象 props 一般用于跨层级传递 props ，一般不需要具体指出 props 中某个属性，而是将 props 直接传入或者是抽离到子组件中。

#### 混入 props

```jsx
function Son(props) {
  console.log(props);
  return <div> hello,world </div>;
}
function Father(props) {
  const fatherProps = {
    mes: "let us learn React !",
  };
  return <Son {...props} {...fatherProps} />;
}
function Index() {
  const indexProps = {
    name: "alien",
    age: "28",
  };
  return <Father {...indexProps} />;
}
```

#### 抽离 props

有的时候想要做的恰恰和上面相反，比如想要从父组件 props 中抽离某个属性，再传递给子组件

```jsx
function Son(props) {
  console.log(props);
  return <div> hello,world </div>;
}

function Father(props) {
  const { age, ...fatherProps } = props;
  return <Son {...fatherProps} />;
}
function Index() {
  const indexProps = {
    name: "alien",
    age: "28",
    mes: "let us learn React !",
  };
  return <Father {...indexProps} />;
}
```

### 注入 props

#### 显式注入 props

显式注入 props ，就是能够直观看见标签中绑定的 props 。

```jsx
function Son(props) {
  console.log(props); // {name: "alien", age: "28"}
  return <div> hello,world </div>;
}
function Father(prop) {
  return prop.children;
}
function Index() {
  return (
    <Father>
      <Son name="alien" age="28" />
    </Father>
  );
}
```

如上向 Son 组件绑定的 name 和 age 是能直观被看见的。

#### 隐式注入 props

这种方式，一般通过 `React.cloneElement` 对 `props.chidren` 克隆再混入新的 props 。

```jsx
function Son(props) {
  console.log(props); // {name: "alien", age: "28", mes: "let us learn React !"}
  return <div> hello,world </div>;
}
function Father(prop) {
  return React.cloneElement(prop.children, { mes: "let us learn React !" });
}
function Index() {
  return (
    <Father>
      <Son name="alien" age="28" />
    </Father>
  );
}
```

将 mes 属性，隐式混入到了 Son 的 props 中。

## 进阶实践-实现一个简单的 `<Form>` `<FormItem>`嵌套组件

要过滤掉除了 FormItem 元素之外的其他元素，那么怎么样知道它是不是 FormItem，**这里教大家一种方法，可以给函数组件或者类组件绑定静态属性来证明它的身份，然后在遍历 props.children 的时候就可以在 React element 的 type 属性(类或函数组件本身)上，验证这个身份，在这个 demo 项目，给函数绑定的 displayName 属性，证明组件身份**。

```js

if(child.type.displayName === 'formItem')

```
