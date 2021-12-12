---
slug: about-yarn
title: 关于 yarn 你需要知道的
tags: [yarn]
---

**重要：永远不要手动去修改 yarn.lock 文件**

**重要：永远不要手动去修改 package.json 文件，如果你需要使用一个包的最新版本，可以使用 `yarn upgrade` 命令来去升级该 package，它会自动安装最新版本并且更新 yarn.lock 文件**

**重要：永远不要随便的就去删除 node_modules 文件和 yarn.lock 文件去重新 install，因为它可能会更新一些你并不想更新的包，而带来一些难以预料的问题**

## registry

其实就是查询下载每个模块的源。

当我们执行 `yarn install` 时候，就是去 `registry` 查询得到 package 压缩包地址进行下载的。

```bash
yarn config get registry # 查看当前使用的源
```

```bash
yarn config set registry url # 设置源
```

## 依赖版本

yarn 的包遵守语义化版本，格式为

```text
X.Y.Z（主版本号.次版本号.修订号）：
X.主版本号：进行不向下兼容的修改时，递增主版本号
Y.次版本号: 做了向下兼容的新增功能或修改
Z.修订号：做了向下兼容的问题修复
```

### 版本号：~version

表示主版本号和次版本号相同，修订号取最新

| 表示   | 含义                       |
| ------ | -------------------------- |
| ~3.1.4 | >=3.1.4 <3.2.0             |
| ~3.1   | 3.1.x 或 > = 3.1.0 < 3.2.0 |
| ~3     | 3.x 或 > = 3.0.0 < 4.0.0   |

### 版本号：^version

表示主版本号相同，取最新版本

使用 `yarn add package`时，默认使用的是 ^ 范围。

## 依赖类型

### dependencies

代码运行时所需要的依赖，比如 vue，vue-router。

### devDependencies

开发依赖，就是那些只在开发过程中需要，而运行时不需要的依赖，比如 babel，webpack。

### peerDependencies

同伴依赖，它用来告知宿主环境需要什么依赖以及依赖的版本范围。如果宿主环境没有对应版本的依赖，在安装依赖时会报出警告。

### optionalDependencies

可选依赖，这种依赖即便安装失败，Yarn 也会认为整个依赖安装过程是成功的。可选依赖适用于那些即便没有成功安装可选依赖，也有后备方案的情况。

### bundledDependencies

打包依赖，在发布包时，这个数组里的包都会被打包打包到最终的发布包里，需要注意 `bundledDependencies` 中的包必须是在 `devDependencies` 或 `dependencies` 声明过的。

## 缓存

`yarn` 会将安装过的包缓存下来，**这样再次安装相同包的时候，就不需要再去下载，而是直接从缓存文件中直接 copy 进来**。

可以通过命令 `yarn cache dir` 查看 yarn 的全局缓存目录。

yarn 会将不通版本解压后的包存放在不同目录下，目录以

```text
npm-[package name]-[version]-[shasum]`
```

`shasum`是一个 hash 值，在 lock 和缓存时会使用到。

我们可以通过命令查看已经缓存过的包。

```bash
yarn cache list    列出已缓存的每个包

yarn cache list --pattern <pattern>  列出匹配指定模式的已缓存的包
```

## yarn.lock

`yarn.lock` 中会准确的存储每个依赖的具体版本信息，以保证在不同机器安装可以得到相同的结果。

### yarn.lock 的作用

不要轻易的删除 yarn.lock 文件。

把 yarn.lock 删掉后，原本锁住的版本都放开了，执行 yarn install 的时候会根据 package.json 里定义的版本区间去找最新版。所以，可能会造成你预期外的依赖也被更新了，不幸的话可能会引入 bug。

**锁定唯一版本**

- package.json 里定义的是版本区间，如^1.0.0
- 而 yarn.lock 里的 version 字段是唯一的版本号，如 1.0.0

```text
ajax-hook@^2.0.3:
  version "2.0.3"
  resolved "http://npm.zhenguanyu.com/ajax-hook/download/ajax-hook-2.0.3.tgz#e9ceced02f940f6223123c7dc90fe2062d417c18"
  integrity sha1-6c7O0C+UD2IjEjx9yQ/iBi1BfBg=

"@utilts/z@^0.2.57", "@utilts/z@^0.2.58":
  version "0.2.58"
  resolved "http://npm.zhenguanyu.com/@utilts/z/download/@utilts/z-0.2.58.tgz#df1ad9c27734e4efd18095d49239dede266bea1f"
  integrity sha1-3xrZwnc05O/RgJXUkjne3iZr6h8=
  dependencies:
    "@utilts/zdata" "^0.2.58"
    lodash-es "^4.17.21"
    query-string "^6.11.1"
    rxjs "^6.6.7"
```

- 第一行 `ajax-hook@^2.0.3` 包的 name 和语义化版本号，这些都来自 package.json 中的定义。也被称为 `Identifier(s)`，多个 Identifier 最终可能都指向同一个版本

- version 记录的是一个确定的版本，也就是实际安装的版本

- resolved 字段记录的是包的 URL 地址。其中 hash 值，即上文的`shasum`

- integrity 是对 resolved 下载下来的文件进行完整性校验。如果出现 diff，说明同一个下载链接对应的文件被修改过。

- dependencies 字段记录的是当前包的依赖，即当前包在自己的 package.json 的 dependencies 字段中的所有依赖。

Yarn 在安装期间，只会使用当前项目的 yarn.lock 文件，会忽略任何依赖里面的 yarn.lock 文件。在顶级 yarn.lock 中包含需要锁定的整个依赖树里全部包版本的所有信息。

**yarn.lock 文件是在安装期间，由 Yarn 自动生成的，并且由 yarn 来管理，不应该手动去更改，更不应该删除 yarn.lock 文件，且要提交到版本控制系统中，以免因为不同机器安装的包版本不一致引发问题。**

我们的常规操作(yarn add / yarn upgrade)都会自动更新 package.json 和 yarn.lock

### package.json 中的 resolutions 选项

**通过这个选项可以修改 yarn.lock 中某个 package 的版本**

假如你的项目依赖了 foo,foo 依赖了 bar@^1.0.0。假设 bar 现在有两个版本 1.0.0 和 1.1.0。很不幸，bar 在发布 1.1.0 的时候没有做好向后兼容。导致 foo 和 bar@1.1.0 不能搭配使用。如果你可以等：

- 要么等 foo 把依赖 bar 锁成 1.0.0 并重新发版
- 要么等 bar 修复兼容问题后重新发版

那如果你等不了呢，你已知 foo 和 bar@1.0.0 可以正常工作。如果你能锁住 foo 对 bar 的依赖就好了，但是这定义在 foo 的 packge.json 里，你总不能去改 node_modules/foo/package.json 吧？这不合适。resolutions 可以解决你的问题，只要在你自己项目的 package.json 里定义：

```json
"resolutions": {
  "foo/bar": "1.0.0"
}
```

这里的 key"foo/bar"表示 foo 的直接依赖 bar，把版本区间重写成 1.0.0。如果 foo 不是直接依赖的 bar（foo -> ... -> bar），我还需要把中间的链路都捋清楚吗？不用那么麻烦！

```json
"resolutions": {
  "foo/**/bar": "1.0.0"
}
```

如果你的项目里有很多依赖直接/间接的依赖了 bar，每个定义的版本区间可能有差别，你知道某个版本可以让他们都能正常工作，而不用安装多个版本。也可以不用声明前缀部分，只写包名 bar。这样不管是哪里依赖到了 bar 都会指向你声明的哪个版本。

```json
"resolutions": {
  "bar": "1.0.0"
}
```

执行 yarn install 后，在 yarn.lock 里搜索 bar@：

```text
bar@^1.0.0 bar@1.1.0 bar@^2.0.0:
  version "1.0.0"
  ...
```

**可以看到，resolutions 可以违背版本区间的限制，比如上例中 Identifiers 里的 bar@1.1.0``bar@^2.0.0。**

### yarn --frozen-lockfile / npm ci

即使有 lock file 的存在，也无法保证在持续集成环境中每次安装依赖都和开发时一致，因为可能存在 package.json 和 lockfile 版本号不匹配并需要更新依赖版本的情况。可以使用--frozen-lockfile 来避免。

这两个命令的作用类似，必须存在 lock file 且依赖版本和 package.json 匹配时才会安装依赖，否则报错。如此可强制开发者在持续集成前先在本地解决依赖版本的一致性问题。

## yarn install 的过程

首次执行 yarn install 安装，会按照 package.json 中的语义化版本，去向 registry 进行查询，并获取到符合版本规则的最新的依赖包进行下载，并构建构建依赖关系树。 比如在 package.json 中指定 react 的版本为 ^2.0.0，就会获取符合 2.x.x
的最高版本的包。然后自动生成 yarn.lock 文件，并生成缓存。

之后再执行 yarn install，会对比 package.json 中依赖版本范围和 yarn.lock 中版本号是否匹配。

- 版本号匹配：会根据 yarn.lock 中的 resolved 字段去查看缓存， 如果有缓存，直接 copy，没有缓存则按照 resolved 字段的 url 去下载包。

- 版本号不匹配：根据 package.json 中的版本范围去 registry 查询，下载符合版本规则最新的包，并更新至 yarn.lock 中。

## 模块扁平化

假设我项目的首层依赖(即当前项目的 dependence 和 devDependences 中的依赖，不包括依赖的依赖)中有 A，B，C 三个包，A 和 B 包同时依赖了相同版本范围的 D 包。那么这部分的依赖关系树是这样的：

```text
├── A
│ └── D
├── B
│ └── D
├── C
```

如果按照这样的依赖关系树直接安装的话，D 模块会在 A 包和 B 包的 node_modules 中都安装，这样会导致模块冗余。

为了保证依赖关系树中没有大量重复模块，yarn 在安装时会做 dedupe（去重）操作，它会遍历所有节点，逐个将模块放在根节点下面，也就是当前项目的 node-modules 中。当发现有相同的模块时，会判断当前模块指定的版本范围是否交集，如果有，则只保留兼容版本，如果没有则在当前的包的 node-modules 下安装。

所以上面的说的情况，最终安装完成是下面这样的，A，B，C，D 包都会安装在第一层 node-modules 下（在依赖的 D 版本兼容的情况下）。

```text
├── A
├── B
├── C
├── D
```

如果 A 包和 B 包依赖的是不兼容的版本，假设 A 包依赖的是 D@1 版本的包，B 包依赖的是 D@2 版本。则最终安装的结果如下：

```text
├── A
├── B
│ └── D@2
├── C
├── D@1
```

至于是 D 的那个版本被安装在根目录的 node_modules 下，取决的是模块解析的顺序，先解析到的 D 的指定版本会被安装到根 node_modules，后解析到的 D 且不兼容已有版本时，会被安装到对应模块的 node_modules 下
