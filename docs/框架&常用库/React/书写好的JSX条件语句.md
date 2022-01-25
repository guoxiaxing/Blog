---
slug: jsx-conditionals
title: 写好 JSX 条件语句的几个建议
tags: [React, JSX]
---

## 小心 0

如果我们渲染的是一个列表，可能列表里的数据不为空的时候我们才会进行渲染，我们可能会写出下面的判断代码

```jsx
{
  data.length && <div>{data.map(d => d)}</div>;
}
```

但是，如果 data 数组是空的，我们会在界面上看到一个 0。

如果你要使用 && ，永远让左侧的值是个 Boolean 值：

```jsx
data.length > 0 && jsx;

!!data.length && jsx;

Boolean(data.length) && jsx;
```

你也可以用三元运算符：

```jsx
{
  data.length ? <div>{data.map(d => d)}</div> : null;
}
```

## 注意优先级

&& 运算符比 || 具有更高的优先级，这就意味着你得小心处理同时包含这两种运算符的 jsx 语句

```jsx
(data.a || data.b) && <div className="error" />;
```

## 三运算符嵌套地狱

三元运算符可以帮助我们很好的切换两个 JSX，但是一旦超过两个，你的逻辑很快就会进入嵌套地狱：

```jsx
{
  isEmoji ? (
    <EmojiButton />
  ) : isCoupon ? (
    <CouponButton />
  ) : (
    isLoaded && <ShareButton />
  );
}
```

这时候，回到原始的 if / else 是个不错的选择，建议封装个函数：

```jsx
const getButton = () => {
  if (isEmoji) return <EmojiButton />;
  if (isCoupon) return <CouponButton />;
  return isLoaded ? <ShareButton /> : null;
};
```

## 不要用 JSX 用作判断条件

通过 props 传递的 React 元素能不能用作条件判断呢?

```jsx
const Wrap = props => {
  if (!props.children) return null;
  return <div>{props.children}</div>;
};
```

最好不要这样做，因为 props.children 可能有几种不同的情况。

- props.children 可能是一个空数组，例如 `<Wrap>{[].map(e => <div />)}</Wrap>`。

- 那用 children.length 来判断？也不严谨，因为 children 也可能是单个元素：`<Wrap><div /></Wrap>`。

所以，为了避免出错，最好还是不要用了 ...

## 重新挂载还是更新？

使用用单独的三元运算符分支编写的 JSX 感觉就像是完全独立的代码：

```jsx
{
  hasItem ? <Item id={1} /> : <Item id={2} />;
}
```

你觉得 hasItem 变化时会发生啥？我的猜测是首先 `<Item id={1} />`卸载，然后 `<Item id={2} />` 装载，因为我写了两个个单独的 JSX 标签。

然而，React 并不知道也不关心我写了啥，它所看到的只是 Item 相同位置的元素，所以它依然会保留挂载的实例，然后更新 props。上面的代码实际上等价于 `<Item id={hasItem ? 1 : 2} />`。

:::info

当分支包含不同的组件时，比如 `{hasItem ? <Item1 /> : <Item2 />}`，React 会重新挂载，因为 Item1 无法更新为 Item2 。

:::

如果是非受控组件，可能问题就大了

```jsx
{
  mode === "name" ? (
    <input placeholder="name" />
  ) : (
    <input placeholder="phone" />
  );
}
```

如果 mode 属性变化了，你会发现之前在 name 输入框输入的信息还在 ...

通常的解决方案是使用 key，它会告诉 React 这是两个完全不一样的元素：

```jsx
// remounts on change
{
  mode === "name" ? (
    <input placeholder="name" key="name" />
  ) : (
    <input placeholder="phone" key="phone" />
  );
}
```

或者，使用 && 替代三元运算符可能会更清晰一点：

```jsx
{
  mode === "name" && <input placeholder="name" />;
}
{
  mode !== "name" && <input placeholder="phone" />;
}
```

如果你在同一个逻辑元素上的条件 props 不太一样，你可以将条件分支拆分为两个单独的 JSX 标签来提高可读性

```jsx
// messy
<Button aria-busy={loading} onClick={loading ? null : submit}>
  {loading ? <Spinner /> : "submit"}
</Button>;
// maybe try:
{
  loading ? (
    <Button aria-busy>
      <Spinner />
    </Button>
  ) : (
    <Button onClick={submit}>submit</Button>
  );
}
// or even
{
  loading && (
    <Button key="submit" aria-busy>
      <Spinner />
    </Button>
  );
}
{
  !loading && (
    <Button key="submit" onClick={submit}>
      submit
    </Button>
  );
}
// ^^ bonus: _move_ the element around the markup, no remount
```

## 总结

- `{number && <JSX />}` 会把 0 渲染出来，可以改为 `{number > 0 && <JSX />}`

- 时刻记得 || 条件周围的括号：`{(cond1 || cond2) && <JSX />}`

- 三元运算符不要扩展到超过 2 个分支，建议使用 if / else，重构

- 不要使用 props.children 进行条件判断

- `{condition ? <Tag props1 /> : <Tag props2 />}` 不会重新挂载 Tag 组件，如果你想重新挂载，请使用唯一 key 或单独的 && 分支。
