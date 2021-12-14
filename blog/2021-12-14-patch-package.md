---
slug: patch-package
title: 如何优雅的修改第三方包
tags: [patch-package]
---

## 官方介绍

patch-package 给开发者提供了通过打“补丁”的方式，使得重新安装依赖包时能够保留之前对第三方依赖包的修改的一种解决方案。

## 应用场景

我们在使用第三方依赖包时如果遇到了 bug，通常解决的方式都是绕过这个问题，使用其他方式解决，较为麻烦。或者给作者提个 issue 或者 PR，然后等待作者的修复。等待的时间不可控，此时就可以借助 patch-package 自己动手去修复该 bug，感觉是不是很棒。并且还可以在第三方依赖包上，根据业务需求扩展能力。

> 最好还是扩展一些通用性比较高的能力，如果是比较通用且该能力大多数开发者都有这种诉求的话可以给第三方依赖包提个 PR。

## 使用方法

### 安装

都是在项目里自行安装

#### npm

```bash
npm i patch-package
```

#### yarn

```bash
yarn add patch-package postinstall-postinstall
```

#### 为什么 yarn 要添加 postinstall-postinstall 包

yarn 在 yarn、yarn install 和 yarn add <package> 之后运行 postinstall 脚本，但在 yarn remove <package> 之后不运行。如果您将此包添加到您的项目中，即使在 yarn remove <package> 之后，它也会执行您项目的 postinstall 钩子。这需要你的 postinstall 脚本是幂等的，因为它会为 yarn、yarn install 和 yarn add <package> 运行两次

### 修改 package.json

依赖包在安装完之后会执行 postinstall 命令

```json
"scripts": {
    ***,
+   "postinstall": "patch-package"
}
```

### 修改依赖包源码

![]('../static/img/2021-12-14-patch-package-1.png')

### 生成补丁

```bash
yarn patch-package package-name(修改的包名)
# 或者
npx patch-package package-name（npm版本 > 5.2）
```

执行`yarn patch-package antd`结果

```bash
[guoxx03@MacBook-Pro:~/working/conan-xross-web → feature/knowledge-write]$ yarn patch-package antd
yarn run v1.22.4
$ /Users/guoxx03/working/conan-xross-web/node_modules/.bin/patch-package antd
patch-package 6.4.7
patch-package: you have both yarn.lock and package-lock.json
Defaulting to using npm
You can override this setting by passing --use-yarn or deleting
package-lock.json if you don't need it

• Creating temporary folder
• Installing antd@4.6.4 with npm
• Diffing your files with clean files
⁉️  Not creating patch file for package 'antd'
⁉️  There don't appear to be any changes.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
