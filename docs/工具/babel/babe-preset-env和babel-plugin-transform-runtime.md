---
slug: babe-preset-env和babel-plugin-transform-runtime
title: "@babel/preset-env和@babel/plugin-transform-runtime"
tags: [babel]
---

两者都可以实现 polyfill，那么它俩有什么区别呢？以及有什么不同的使用场景。

### 区别

- preset-env：在不使用 polyfill 的功能的情况下，默认只做语法转化（语法降级）- 适用于应用

  - 缺点：开启 polyfill 功能时，默认时注入全局的 polyfill（所以会导致全局环境污染），对于 helper 函数也会被重复定义，导致最后打包体积增大。
  - 优点：它会解析代码的语法并结合我们配置的 targets 来实现 polyfill

- plugin-transform-runtime - 适用于库

  - 缺点：首先他不会读取 targets，它会根据代码引入对应的 polyfill（会导致引入一些没有必要的 polyfill-因为可能使用的浏览器已经支持了这些语法和函数）
  - 优点：
    - 不会引入全局的 polyfill，不会污染全局环境
    - helper 辅助函数的引入全部指向 @babel/runtime/helpers 这个 module 当中的辅助函数

### 如何配置

#### preset-env

```json title='.babelrc.json'
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 指定兼容的浏览器版本
        "targets": {
          "ie": "11"
        },
        // 基础库 core-js 的版本，一般指定为最新的大版本
        "corejs": 3,
        // Polyfill 注入策略，后文详细介绍
        "useBuiltIns": "usage",
        // 不将 ES 模块语法转换为其他模块语法
        "modules": false
      }
    ]
  ]
}
```

`useBuiltIns` 他决定了是否添加 polyfill，默认值是 false，即不添加任何的 polyfill，可以手动将值设置为 `usage` 或者 `entry`，两者的区别是：

- usage：按需导入，不需要手动在入口文件引入 polyfill，Babel 将会根据我们的代码使用情况自动注入 polyfill，如此一来在打包的时候将会相对地减少打包体积。

- entry：将会根据浏览器目标环境(targets)的配置，引入全部浏览器暂未支持的 polyfill 模块，无论在项目中是否使用到。需要在入口文件中手动导入 polyfill。

##### entry

需要先安装

:::danger 注意

@babel/polyfill 从 7.4.0 版本开始就被弃用了，因此推荐直接配置 corejs 选项，并在项目当中直接安装 core-js

:::

```bash
yarn add core-js@3 regenerator-runtime
```

使用 entry 选项的时候需要在入口文件中手动导入

```js title='入口文件'
import "core-js/stable";
import "regenerator-runtime/runtime";
```

babel 会根据目标平台，例如 target 当中的配置，或者是 .browserlistrc 等来引入对应平台所需要的 polyfill

:::tip

entry 配置以及我们注入的`import "core-js/stable";import "regenerator-runtime/runtime";`其实是起到占位作用，由 @babel/preset-env 再去根据不同的目标平台去引入对应所需要的 polyfill 文件

:::

##### usage

只需要设置 `useBuiltIns` 的值为 usage，Babel 将会自动将代码里已使用到的、且 browserslist 环境不支持的，自动注入 polyfill，如此一来在打包的时候将会相对地减少打包体积。

:::danger useBuiltIns=usage 可能会导致的问题

因为我们会在 babel 处理的文件里排除 node_modules 下面的文件，所以如果我们使用的第三方依赖没有做好 polyfill，就会导致项目在运行的时候报错。

:::

#### core.js

corejs 的配置选项需要搭配着 useBuiltIns: usage 或 useBuiltIns: entry 来使用。默认情况下，被注入的 polyfill 都是稳定的已经被纳入 ECMAScript 规范当中的特性。如果你需要使用一些 proposals 当中的 feature 的话，那么需要配置：

```json title='.babelrc.json'
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 指定兼容的浏览器版本
        "targets": {
          "ie": "11"
        },
        // 基础库 core-js 的版本，一般指定为最新的大版本
        "core.js": {
          "version": 3,
          "proposals": true
        },
        // Polyfill 注入策略，后文详细介绍
        "useBuiltIns": "usage",
        // 不将 ES 模块语法转换为其他模块语法
        "modules": false
      }
    ]
  ]
}
```

#### @babel/plugin-transform-runtime

安装依赖

```bash

yarn add @babel/runtime-corejs3 // 默认 corejs为 false，如果使用 core-js v3 的 runtime，则需要安装 @babel/runtime-corejs3
yarn add -D babel-plugin-transform-runtime

```

配置方式

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

默认情况下，@babel/plugin-transform-runtime 是不会引入对于 proposals 的 polyfill 的，如果你是使用 corejs: 3 的话，可以通过配置 proposal: true 来开启这个功能。

### 推荐配置

#### 应用

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 指定兼容的浏览器版本
        "targets": {
          "ie": "11"
        },
        // 基础库 core-js 的版本，一般指定为最新的大版本
        "corejs": {
          "version": 3, // 使用core-js@3
          "proposals": true
        },
        // Polyfill 注入策略，后文详细介绍
        "useBuiltIns": "entry",
        // 不将 ES 模块语法转换为其他模块语法
        "modules": false,
        "debug": true // 日志
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false // 解决 helper 函数重复引入 需要 yarn add @babel/runtime
      }
    ]
  ]
}
```

#### 第三方库

```js
module.exports = {
  presets: [["@babel/preset-env", { modules: false }]],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      { corejs: { version: 3, proposals: true }, useESModules: true }
    ]
  ]
};
```
