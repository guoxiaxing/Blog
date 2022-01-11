---
slug: peerDependencies
title: peerDependencies
tags: [包管理工具]
---

## 为什么会研究这个 peerDependencies？

因为我在我们的组的组件库的`package.json`中看到了这个，然后我就发现这里面的依赖都是在我们项目中中也需要使用的。
而且我们的组件库是基于 angular 的，但是它并没有将 angular 作为 dependencies。
然后我又去看了看一些第三方的组件库或者是插件，我发现他们都没有将一些核心库（react、vue、angular、jquery）作为直接依赖，而是只是将他们添加到了 peerDependencies 中，这让我想知道，peerDependencies 到底是干什么的？

## 我们希望我们使用的插件或者是第三方库对于和项目中共同的依赖有什么表现呢？

在我开发的 packageA 里面依赖的 react 和 react-dom 的版本号应该和主系统中安装的 react 和 react-dom 的版本号保持一致，并且 packageA 被安装到主系统中之后，就应该依赖于主系统中的 react 和 react-dom。

## 说说 peerDependencies

同等依赖，或者叫同伴依赖，用于指定当前包（也就是你写的包）兼容的宿主版本。用于解决插件与所依赖包不一致的问题。

`peerDependencies` 在我们进行一些插件开发的时候会经常用到，比如 antd 的开发依赖于 React

总结一下特点：

- 插件正确运行的前提是，核心依赖库必须先下载安装，不能脱离核心依赖库而被单独依赖并引用；

- 插件入口 api 的设计必须要符合核心依赖库的规范；

- 插件的核心逻辑运行在依赖库的调用中；

- 在项目实践中，同一插件体系下，核心依赖库版本最好是相同的；

听起来可能没有那么好理解，举个例子来说明下。antd 只是提供了一套基于 react 的 ui 组件库，但它要求宿主环境需要安装指定的 react 版本，所以你可以看到 node_modules 中 antd 的 package.json 中有这么一项配置:

```json
"peerDependencies": {
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
},
```

它要求宿主环境安装大于等于 16.0.0 版本的 react，也就是 antd 的运行依赖宿主环境提供的该范围的 react 安装包。

> 在安装插件的时候，peerDependencies 在 npm 2.x 和 npm 3.x 中表现不一样。npm2.x 会自动安装同等依赖，npm3.x 不再自动安装，会产生警告！手动在 package.json 文件中添加依赖项可以解决。

当别人使用我们的插件时，`peerDependencies`就会告诉明确告诉使用方，你需要安装该插件哪个宿主版本。
通常情况下，我们会在一个项目里使用一个宿主（比如 gulp）的很多插件，如果相互之间存在宿主不兼容，在执行`npm install`时，cli 会抛出错误信息来告诉我们，比如：

```text
npm ERR! peerinvalid The package gulp does not satisfy its siblings' peerDependencies requirements!
npm ERR! peerinvalid Peer gulp-cli-config@0.1.3 wants gulp@~3.1.9
npm ERR! peerinvalid Peer gulp-cli-users@0.1.4 wants gulp@~2.3.0
```

当你安装一个包时，其 dependencies 和 devDependencies 会被 npm 自动安装。

peerDependencies 则有所不同，它们不会被自动安装。

当一个依赖项 c 被列在某个包 b 的 peerDependency 中时，它就不会被自动安装。取而代之的是，包含了 b 包的代码库 a 则必须将对应的依赖项 c 包含为其依赖。

### 举例说说

假设现在有一个 `helloWorld` 工程,已经在其 `package.json` 的 `dependencies` 中声明了 `packageA`，有两个插件 `plugin1` 和 `plugin2` 他们也依赖 `packageA`，如果在插件中使用 `dependencies` 而不是 `peerDependencies` 来声明 `packageA`，那么 `$ npm install` 安装完 `plugin1` 和 `plugin2` 之后的依赖图是这样的：(前提是依赖的 packageA 的版本都不同)

```text
.
├── helloWorld
│   └── node_modules
│       ├── packageA
│       ├── plugin1
│       │   └── nodule_modules
│       │       └── packageA
│       └── plugin2
│       │   └── nodule_modules
│       │       └── packageA
```

从上面的依赖图可以看出，`helloWorld` 本身已经安装了一次`packageA`，但是因为因为在
`plugin1` 和 `plugin2` 中的 `dependencies` 也声明了 `packageA`，所以最后 `packageA` 会被安装三次，有两次安装是冗余的。

**需要注意的是 npm 现在对于依赖版本相同的包会在 install 的时候自动扁平化（npm v3 之后是这么做的），也就是说，当多个 package 依赖了相同的包且他们的版本也相同的时候，仅仅会在项目的根 node_modules 下安装一份**

而 `peerDependency` 就可以避免类似的**核心依赖库**被重复下载的问题。

如果在 `plugin1` 和 `plugin2` 的 `package.json` 中使用 `peerDependency` 来声明核心依赖库，例如：

plugin1/package.json

```json
{
  "peerDependencies": {
    "packageA": "1.0.1"
  }
}
```

plugin2/package.json

```json
{
  "peerDependencies": {
    "packageA": "1.0.1"
  }
}
```

在主系统中声明一下 packageA:

helloWord/package.json

```json
{
  "dependencies": {
    "packageA": "1.0.1"
  }
}
```

此时在主系统中执行 `$ npm install` 生成的依赖图就是这样的：

```text
.
├── helloWorld
│   └── node_modules
│       ├── packageA
│       ├── plugin1
│       └── plugin2
```

可以看到这时候生成的依赖图是扁平的，packageA 也只会被安装一次。

总结下在插件使用 `peerDependency` 声明依赖库的特点：

- 如果用户显式依赖了核心库，则可以忽略各插件的 `peerDependency` 声明；
- 如果用户没有显式依赖核心库，则按照插件 `peerDependencies` 中声明的版本将库安装到项目根目录中；
- 当用户依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复；
