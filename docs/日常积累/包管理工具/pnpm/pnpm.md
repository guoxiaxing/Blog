---
slug: pnpm
title: pnpm又是什么？
tags: [包管理工具]
---

## 先聊聊 yarn

yarn 的出现，主要有以下几个优化点：

- npm 实在是太慢了，每次执行 npm install 都会将 node_modules 全删了，重新安装了一遍全部依赖。这时间我可等不起。yarn 缓存一来，舒服了，未发生改变的文件命中缓存，改变的文件 diff 出来安装。这过程属实快了不少，甚至通过缓存支持了离线模式，不像 npm 每次走网络请求。(yarn 安装是会有缓存的，如果命中缓存，则直接使用缓存。但即使是命中了缓存，yarn 在项目中也会存在一个备份，所以，这个过程是拷贝过程。内存空间会随拷贝数线性递增。)

- 在 npm5 之前是没有 package-lock.json 文件的，这样我们在不同的宿主环境中，安装的依赖可能是不同的。有时候本地跑起来没问题，上到服务器就挂了。而 yarn 生来支持 yarn-lock 文件，目录也更为清晰易读。再也不用担心上到服务器就挂了。

- yarn workspaces，现代开发中我们更多采用了 mono-repo 的组织方式，即将多个项目放在一个 repo 下面管理。在 npm 下，如何管理每个项目的 node_modules 成了个大问题。 只能是在每个项目里安装其单独的依赖。而有了 yarn，我们可以通过它提供的 workspaces 帮我们构建依赖关系，在顶层维护通用的 node_modules，而项目之前不同的部分，才在各自的 node_modules 生成。

**需要注意是 npm 现在也是会对包进行缓存，也会扁平化依赖，也有了 lock 文件，也有了完整性校验**

**yarn 和 npm 的扁平化：假如说项目中的某个依赖它的依赖值被它自己使用到了，但是此时还是会讲它的这个依赖提升到顶层的 node_modules**

[npm 嵌套和扁平化](https://npm.github.io/how-npm-works-docs/npm3/how-npm3-works.html)

[npm vs pnpm vs yarn](https://zhuanlan.zhihu.com/p/137535779)

**yarn 有 resolutions 选项，可以在项目的 package.json 中配置；npm 本身没有提供 resolution 机制，但是可以通过 npm-froce-resolution 这个库实现类似机制**

## npm 的缓存

在执行 npm install 或 npm update 命令下载依赖后，除了将依赖包安装在 node_modules 目录下外，还会在本地的缓存目录缓存一份。

通过 npm config get cache 命令可以查询到：在 Linux 或 Mac 默认是用户主目录下的 .npm/\_cacache 目录。

在这个目录下又存在两个目录：content-v2、index-v5，content-v2 目录用于存储 tar 包的缓存，而 index-v5 目录用于存储 tar 包的 hash。

npm 在执行安装时，可以根据 package-lock.json 中存储的 integrity、version、name 生成一个唯一的 key 对应到 index-v5 目录下的缓存记录，从而找到 tar 包的 hash，然后根据 hash 再去找缓存的 tar 包直接使用。

存在缓存：将缓存按照依赖结构解压到 node_modules

## 为什么有 pnpm？

### 节约磁盘空间并提升安装速度 ​

当使用 npm 或 Yarn 时，如果你有 100 个项目使用了某个依赖，就会有 100 份该依赖的副本保存在硬盘上。 对于 pnpm ，依赖项将存储在一个内容可寻址的仓库中(pnpm.store 中存的是我们所有安装的依赖的 hard links，而在硬盘唯一位置储存所有依赖包。在我们执行 pnpm i 时，一旦我们的 store 中能够找到这家伙，我们就直接提供地址指向这块存储空间。这样，依赖安装甚至不是拷贝而是创建一个硬链接，速度当然会快的不行)因此：

- 如果你用到了某依赖项的不同版本，那么只会将有差异的文件添加到仓库。 例如，如果某个包有 100 个文件，而它的新版本只改变了其中 1 个文件。那么 pnpm update 时只会向存储中心额外添加 1 个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。

- 所有文件都会存储在硬盘上的某一位置。 当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。 这允许你跨项目地共享同一版本的依赖。

### 创建非扁平化的 node_modules 文件夹 ​

当使用 npm 安装依赖时，所有的依赖都会被提升到模块的根目录。 因此，项目可以访问到未被添加进当前项目的依赖。

pnpm 使用软链的方式将项目的直接依赖添加进模块文件夹的根目录。

## 依赖管理

### hard link 机制

hard link 使得用户可以通过不同的路径引用方式去找到某个文件。pnpm 会在**全局的 store 目录里存储项目 node_modules 文件的 hard links** 。

所以全局的 store 中存放的是我们所有项目依赖的包的信息的 hard links，用于在二次下载的时候进行版本的检测

关于什么是硬连接和软链接，可以看看我的另一篇文章：[硬链接和符号链接](https://guoxiaxing.github.io/Blog/blog/hard-link-and-symbolic-link)

### Store 目录

一般 store 目录默认是设置在 \${os.homedir}/.pnpm-store 这个目录下
当然用户也可以在 .npmrc 设置这个 store 目录位置，不过一般而言 store 目录对于用户来说感知程度是比较小的。
因为这样一个机制，导致每次安装依赖的时候，如果是个相同的依赖，有好多项目都用到这个依赖，那么这个依赖实际上最优情况(即版本相同)只用安装一次。
如果是 npm 或 yarn，那么这个依赖在多个项目中使用，在每次安装的时候都会被重新下载一次。
pnpm 对项目安装依赖的时候，如果某个依赖在 sotre 目录中存在了话，那么就会直接从 store 目录里面去 hard-link，避免了二次安装带来的时间消耗，如果依赖在 store 目录里面不存在的话，就会去下载一次。

### node_modules 结构

pnpm 目前的 node_modules 的一些文件结构，例如在项目中使用 pnpm 安装了一个叫做 express 的依赖，那么最后会在 node_modules 中形成这样两个目录结构:

```text
node_modules/express/...
node_modules/.pnpm/express@4.17.1/node_modules/xxx
```

其中第一个路径是 nodejs 正常寻找路径会去找的一个目录，如果去查看这个目录下的内容，会发现里面连个 node_modules 文件都没有：

```text
▾ express
    ▸ lib
      History.md
      index.js
      LICENSE
      package.json
      Readme.md
```

实际上这个文件只是个软连接，它会形成一个到第二个目录的一个软连接(类似于软件的快捷方式)，这样 node 在找路径的时候，最终会找到 .pnpm 这个目录下的内容。
其中这个 .pnpm 是个虚拟磁盘目录，然后 **express 这个依赖的一些依赖**会被平铺到 .pnpm/express@4.17.1/node_modules/ 这个目录下面（包括 express 本身），这样保证了依赖能够 require 到，同时也不会形成很深的依赖层级。在保证了 nodejs 能找到依赖路径的基础上，同时也很大程度上保证了依赖能很好的被放在一起。
**.pnpm 下的以依赖的命名方式，所以对于同一个包的不同版本也还是可以扁平的存放在.pnpm 目录下的。都是`<package-name>@version/node_modules/<package-name>`这种目录结构。**
**也就是说项目依赖的包的依赖包只会在.pnpm/包名/node_modules/下（但是还是只会安装一份，只要是多个依赖包的依赖是版本相同的，只会安装一个包，每个.pnpm/包名/node_modules/存放的其实是一个全局 store 中对应包源代码的 hard link），不会再被扁平化到根 node_modules 下，避免了一个不是项目显示依赖的包但是我们却可以使用的问题（即幽灵依赖）**

**总结一下：✏️ 对于 pnpm 的 node_modules 下的包名下存放的其实是一个软链接，连接到 node_modules 下的.pnpm/包名/node_modules/xxx 该目录下存放的是该依赖包的依赖以及该依赖包本身，每个包里面都存放了一个全局 store 中对应包源代码的 hard link。每个项目的 node_modules 下都存放的是一些 link**

### symlink 和 hard link 机制

在前面知道了 pnpm 是通过 hardlink 在全局里面搞个 store 目录来存储 node_modules 依赖里面的 hard link 地址，然后在引用依赖的时候则是通过 symlink 去找到对应虚拟磁盘目录下(.pnpm 目录)的依赖地址。
pnpm 的 node_modules 布局使用符号链接来创建依赖项的嵌套结构。
node_modules 中每个包的每个文件都是来自内容可寻址存储的硬链接。
假设您安装了依赖于 bar@1.0.0 的 foo@1.0.0。 pnpm 会将两个包硬链接到 node_modules 如下所示：
foo 将被符号链接至根目录的 node_modules 文件夹，因为 foo 是项目的依赖项

[链接过程](https://pnpm.io/zh/symlinked-node-modules-structure)

```text
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar
```

让我们添加 qar@2.0.0 作为 bar 和 foo 的依赖项。 这是新的结构的样子：

```text
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       ├── bar -> <store>/bar
    │       └── qar -> ../../qar@2.0.0/node_modules/qar
    ├── foo@1.0.0
    │   └── node_modules
    │       ├── foo -> <store>/foo
    │       ├── bar -> ../../bar@1.0.0/node_modules/bar
    │       └── qar -> ../../qar@2.0.0/node_modules/qar
    └── qar@2.0.0
        └── node_modules
            └── qar -> <store>/qar
```

而这些真实依赖则是通过 hard link 存储到全局的 store 目录中。

### .pnpm 是什么

.pnpm 是一个虚拟磁盘，用于扁平化存放依赖。在 node_modules 中的依赖符号链接的形式链接到虚拟磁盘中，虚拟磁盘则以硬链接到真实的 依赖存储空间中：

```text
node_modules
|__package A -> 软链接
|__package C -> 软链接
|__.pnpm
   |__package A/node_modules/package B -> 硬链接
   |__package C/node_modules/package B -> 硬链接
   |__package B@1.0 -> 硬链接
```

在这样的结构中，.pnpm 平铺了一份全部依赖，也在单独的项目里有自身的依赖，而且所有的依赖都是通过硬链接到一块内存地址的。实现了只下载一次，没有幽灵依赖和二重身问题。

## 兼容问题

像 hard link 和 symlink 这种方式在所有的系统上都是兼容的吗？

实际上 hard link 在主流系统上(Unix/Win)使用都是没有问题的，但是 symlink 即软连接的方式可能会在 windows 存在一些兼容的问题，但是针对这个问题，pnpm 也提供了对应的解决方案，这里不做叙述。

## Monorepo 支持

### 痛点解决

#### 幽灵依赖

解释起来很简单，即某个包没有被安装(package.json 中并没有，但是用户却能够引用到这个包)。

引发这个现象的原因一般是因为 node_modules 结构所导致的，例如使用 yarn 对项目安装依赖，依赖里面有个依赖叫做 foo，foo 这个依赖同时依赖了 bar，yarn 会对安装的 node_modules 做一个扁平化结构的处理(npm v3 之后也是这么做的)，会把依赖在 node_modules 下打平，这样相当于 foo 和 bar 出现在同一层级下面。那么根据 nodejs 的寻径原理，用户能 require 到 foo，同样也能 require 到 bar。

```text
package.json -> foo(bar 为 foo 依赖)
node_modules
  /foo
  /bar -> 幽灵依赖
```

那么这里这个 bar 就成了一个幽灵依赖，如果某天某个版本的 foo 依赖不再依赖 bar 或者 foo 的版本发生了变化，那么 require bar 的模块部分就会抛错。

还有一种场景就是在 lerna + yarn workspace 的项目里面，因为 yarn 中提供了 hoist 机制(即一些底层子项目的依赖会被提升到顶层的 node_modules 中)，这种 幽灵依赖 会更多，一些底层的子项目经常会去 require 一些在自己里面没有引入的依赖，而直接去找顶层 node_modules 的依赖(nodejs 这里的寻径是个递归上下的过程)并使用。

而根据前面提到的 pnpm 的 node_modules 依赖结构，这种现象是显然不会发生的，因为被打平的依赖会被放到 .pnpm 这个虚拟磁盘目录下面去，用户通过 require 是根本找不到的。

> 值得一提的是，pnpm 本身其实也提供了将依赖提升并且按照 yarn 那种形式组织的 node_modules 结构的 Option，作者将其命名为 --shamefully-hoist ，即 "羞耻的 hoist".....

#### NPM doppelgangers（分身）

这个问题其实也可以说是 hoist 导致的，这个问题可能会导致有大量的依赖的被重复安装，举个例子:

例如有个 package，下面依赖有 lib_a、lib_b、lib_c、lib_d，其中 a 和 b 依赖 util_e@1.0.0，而 c 和 d 依赖 util_e@2.0.0。

```text
- package
- package.json
- node_modules
- lib_a
  - node_modules <- util_e@1.0.0
- lib_b
  - node_modules <- util_e@1.0.0
_ lib_c
  - node_modules <- util_e@2.0.0
- lib_d
  - node_modules <- util_e@2.0.0
```

这样必然会导致很多依赖被重复安装，于是就有了 hoist 和打平依赖的操作:

```text
- package
- package.json
- node_modules
- util_e@1.0.0
- lib_a
- lib_b
_ lib_c
  - node_modules <- util_e@2.0.0
- lib_d
  - node_modules <- util_e@2.0.0
```

但是这样也只能提升一个依赖，如果两个依赖都提升了会导致冲突，这样同样会导致一些不同版本的依赖被重复安装多次，这里就会导致使用 npm 和 yarn 的性能损失。

如果是 pnpm 的话，这里因为依赖始终都是存在 store 目录下的 hard links ，一份不同的依赖始终都只会被安装一次，因此这个是能够被彻彻底底的消除的。
