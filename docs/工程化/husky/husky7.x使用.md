---
slug: husky
title: husky 7.x 使用
tags: [husky]
---

## 我为什么想用 husky？

我想再提交代码的时候将我项目的一个文件拷贝一份然后一起提交，所以我需要在 commit 之前执行该操作，然后将拷贝后的文件也一起`git add`到我的项目中，然后一起 commit，那么什么东西是可以监听到我的 commit 操作的呢？并且还可以在 commit 之前先执行一些自定义的操作？然后我的脑子里就闪现了 husky 这个工具 🐶

## husky 是什么？

Husky 是一种工具：让我们可以轻松地接入 Git hooks ，并在我们需要的某些阶段运行脚本。

## git hooks 又是什么？

Git hooks 是可以设置在 Git 生命周期的在某些事件下运行的脚本。 这些事件包括提交的不同阶段，例如在提交之前（pre-commit,提交之后（post-commit）。

这些功能非常有用，因为它们允许开发人员运行自定义代码任务，甚至运行其他自动化脚本来执行合适的代码规范及标准。

## 那么怎么用？

husky 7 的初始化推荐用他们官方提供的姿势，放到 prepare scripts 中。

### 安装

```bash
yarn add husky -D
```

### 修改 package.json

```json
{
  "script": {
    "prepare": "husky install",
    "cp": "node cp.js"
  }
}
```

### 执行一下 prepare 脚本

```bash
npm run prepare
```

### 添加 hook

```bash
npx husky add .husky/pre-commit "npm run cp && git add ."
```

> 注意：我这里用的是 && 而不是 &，因为我发现我使用 & 的时候 cp.js 脚本执行完毕之后我的终端并不会退出 🤦‍♀️，而且偶尔还会出现`git add .`并没有将文件添加到暂存区的情况出现

原因可以看看我下面的这篇文章 👇

[Shell 多个命令间隔符号;、&、&&、| 和 || 区别](https://guoxiaxing.github.io/Blog/docs/日常积累/Linux/shell分隔符)

### 执行 git 操作

```
git add .husky/pre-commit
git commit -m 'ADD: husky pre-commit hook'
```

### 效果

执行了我的`cp.js`文件（这个文件里面的代码就是实现我前面所说的复制文件的功能）并且将新生成的 copy 后的新文件也 add 进来一起提交。

注意 ⚠️：如果这里没有执行`git add .`则每次执行完`cp.js`后修改的文件都不会被提交进来，导致我们每次提交完代码之后都有一个修改的文件还在工作区，但是这不是我想要的。我希望的是：执行完`cp.js`脚本后生成/修改的文件都可以算在本次提交内一起提交，所以我需要在我的`pre-commit`的 hooks 里面`&& git add .`这样在执行`git commit`的时候就可以一起提交了 ✌️
