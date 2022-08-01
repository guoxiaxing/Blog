---
slug: 模块化css
title: 模块化 css
tags: [掘金小册, React进阶实践指南, 模块化 css]
---

模块化的目的：防止全局污染，样式被覆盖

模块化的方式：

- css module

依赖于 webpack 构建和 css-loader 等 loader 处理，将 css 交给 js 来动态加载。

- css in js

## CSS Module

css Modules ，使得项目中可以像加载 js 模块一样加载 css ，本质上通过一定自定义的命名规则生成唯一性的 css 类名，从根本上解决 css 全局污染，样式覆盖的问题。对于 css modules 的配置，推荐使用 css-loader，因为它对 CSS Modules 的支持最好，而且很容易使用。

```js title=webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: true,
        },
      },
    ],
  },
};
```

### css 文件

```css
.text {
  color: blue;
}
```

### js 文件

```jsx
import style from "./style.css";
export default () => (
  <div>
    <div className={style.text}>验证 css modules </div>
  </div>
);
```

css-loader 会将`style.text`编译为一个随机字符串，这样有效的避免了样式冲突，全局类名污染的情况。

### 自定义命名规则

```js title=webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
          },
        },
      },
    ],
  },
};
```

### 全局变量

一旦经过 css modules 处理的 css 文件类名 ，再引用的时候就已经无效了。因为声明的类名，比如如上的 .text 已经被处理成了哈希形式。那么怎么样快速引用声明好的全局类名呢？CSS Modules 允许使用 :global(.className) 的语法，声明一个全局类名。凡是这样声明的 class ，都不会被编译成哈希字符串。

```css
.text {
  color: blue;
}
:global(.text_bg) {
  background-color: pink;
}
```

CSS Modules 还提供一种显式的局部作用域语法:local(.text)，等同于.text。

```css
.text {
  color: blue;
}
/* 等价于 */
:local(.text_bg) {
  background-color: pink;
}
```

### CSS Modules 总结

首先 CSS Modules 优点：

- CSS Modules 的类名都有自己的私有域的，可以避免类名重复/覆盖，全局污染问题。
- 引入 css 更加灵活，css 模块之间可以互相组合。
- class 类名生成规则配置灵活，方便压缩 class 名

CSS Modules 的注意事项：

- 仅用 class 类名定义 css ，不使用其他选择器。
- 不要嵌套 css .a{ .b{} } 或者重叠 css .a .b {} 。

## CSS IN JS

### style-components