---
slug: CSS-Module
title: CSS Module
tags: [css]
---

## 什么是 CSS Module？

CSS Modules 不是官方规范或浏览器中的实现，而是构建步骤中的一个过程（在 Webpack 或 Browserify 的帮助下），它改变了类名和选择器的作用域（即有点像命名空间）。

:::info 目的

**解决 CSS 中全局作用域的问题**

:::

## 开启 CSS Module

在 React 中默认开启了 CSS Module，样式表文件需要以 `xxx.module.sass/less/css` 命名

我们也可以通过配置 webpack 来开启 CSS Module

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: "[name]_[local]__[hash:base64:5]"
        }
      }
    ]
  }
};
```

`localIdentName` 可以定义生产的哈希类名，默认是 `[hash:base64]`

详细配置见: [css-loader](https://webpack.docschina.org/loaders/css-loader/)

`localIdentName`选项的占位符有：

```text
 [name] 源文件名称 (样式文件的文件名)
 [folder] 文件夹相对于 compiler.context 或者 modules.localIdentContext 配置项的相对路径。
 [path] 源文件相对于 compiler.context 或者 modules.localIdentContext 配置项的相对路径。
 [file] - 文件名和路径。
 [ext] - 文件拓展名。
 [hash] - 字符串的哈希值。基于 localIdentHashSalt、localIdentHashFunction、localIdentHashDigest、localIdentHashDigestLength、localIdentContext、resourcePath 和 exportName 生成。
 [<hashFunction>:hash:<hashDigest>:<hashDigestLength>] - 带有哈希设置的哈希。
 [local] - 原始类名。
```

## 局部作用域

### 没有 CSS Module 的组件样式

默认 CSS 的规则是全局生效的，任何一个组件下的 CSS 样式，都会影响其他组件中使用相同类名的地方。

style.css

```CSS
.title {
  color: red;
}
```

App.js

```javascript
import "./styles.css";

export default function App() {
  return (
    <div className="title">
      <h1>Hello World</h1>
    </div>
  );
}
```

Header.css

```css
.title {
  color: green;
}
```

Header.js

```javascript
import "./Header.css";

export default function Header() {
  return <h2 className="title">Header 组件</h2>;
}
```

index.js

```javascript
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Header from "./Header";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>,
  rootElement
);
```

此时我们的页面上展示的就是绿色的 `Header 组件` 和 `Hello World`

因为定义了两个相同的 title class，虽然是在不同的组件中导入，但是他们的类名是一样的，最终都会在全局作用域下生效，因为这两个组件都渲染在了页面上。  
至于为什么会显示成绿色，因为 Header 组件是后导入的，所以 Header 的 title 样式就覆盖了 App 的 title 样式，这就是 CSS 层叠样式的概念了，此处不再赘述。（如果导入顺序换一下，那么就是红色了）

### CSS Module 是怎么局部作用 CSS 样式的？

**答案：**产生局部作用域的唯一方法，就是使用一个独一无二的 class 的名字，不会与其他选择器重名。这就是 CSS Modules 的做法。

这里就拿 React 项目来进行解释

在 React 中，默认是开启 CSS Module 的。但是对于样式表文件的命名一个约束。需要以`.module.less/css/sass`结尾

随意我们就可以这样改造一下 Header 组件，来使用 CSS Module 的功能。

1. 重命名：Header.css -> Header.module.css

```css
.title {
  color: green;
}
```

2. 修改 Header.js 中的导入

```javascript
import styles from "./Header.module.css";

export default function Header() {
  return <h2 className={styles.title}>Header 组件</h2>;
}
```

效果： `Header 组件` 展示为绿色；`Hello World`展示为红色。可以看到 Header 中相同类名的样式并没有影响到我们的 App 组件

此时在控制台中查看 HTML，发现我们 Header 组件中的 h2 标签上的 class 类名变成了`<h2class="_src_Header_module__title">Header 组件</h2>`

同理在样式表文件中也变成了

```css
._src_Header_module__title {
  color: green;
}
```

App 组件

```html
<div class="title"><h1>Hello World</h1></div>
```

```css
.title {
  color: red;
}
```

:::info 随机的 className 是可以配置的

通过 webpack.config.js 中配置 css-loader 的 localIdentName 选项来定义生成的随机类名

:::

## 全局作用域(:global)

通常在我们的日常开发中有这种场景：  
我们有一个自己的组件，但是这个组件使用了一些第三方的组件库，对于我们使用的第三方组件我们又想修改一下它的样式。

如果此时，我们直接在当前组件的样式文件中，通过定义一个和第三方组件相同类名的类（比如说 antd button 的 antdr-btn 类），然后写自己的样式：

Button.module.css

```css
.antdr-btn {
  color: pink;
}
```

然后我在组件中导入

Button.js

```javascript
import styles from "./Button.module.css";
```

此时我们会发现我们的修改并没有生效，为什么呢？原因就是最后我们导入的类名会被 css-loader 处理成一个随机的值，所以导致不再是`antdr-btn`。

那么我们如何实现在自定义组件中修改第三方组件的样式呢？

**需要不对第三方组件的类名进行哈希，保留原始类名，才能起到样式覆盖的作用`:global`**

```css
:global(.antdr-btn) {
  color: red;
}
```

:global(.className)那么此时这个 className 即使是在组件的样式表中定义的也不会被添加 hash 值，所以就可以影响全局所有类名为 className 的样式

:::tip 注意

此时组件中对该类的样式修改会影响全局所有使用该类名的地方，所以为了将样式修改限制到本组件，一般推荐将:global 使用在组件自定义类名范围下，然后添加这个自定义类名到组件中

```sass
.Header {
  padding-bottom: 20px;
  /* stylelint-disable-next-line selector-class-pattern */
  :global(.antdr-tabs-nav) {
    padding: 0;
    background: #ffffff;
  }

}
```

:::

CSS Modules 还提供一种显式的局部作用域语法:local(.className)，等同于.className（直接在样式文件中写.className）该类名在编译后会被添加 hash 值

## class 的组合

在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，这称为"组合"。

在 Header.module.css 中，让.title 继承.back 。

Header.module.css

```css
.back {
  background-color: blue;
}
.title {
  composes: back;
  color: green;
}
```

Header.js

```javascript
import styles from "./Header.module.css";

export default function Header() {
  return <h2 className={styles.title}>Header 组件</h2>;
}
```

编译后

CSS

```css
._src_Header_module__back {
  background-color: blue;
}
._src_Header_module__title {
  color: green;
}
```

HTML

```html
<h2 class="_src_Header_module__title _src_Header_module__back">Header 组件</h2>
```

## 继承其他模块

选择器也可以继承其他 CSS 文件里面的规则。

other.module.css

```css
.other {
  background-color: chartreuse;
}
```

Header.module.css

```css
.title {
  composes: other from "./other.module.css";
  color: green;
}
```

:::tip 注意

导入的类名需要和被导入文件中的类名相同

:::

编译之后的效果和 composes 同一个文件中的 class 效果相同
