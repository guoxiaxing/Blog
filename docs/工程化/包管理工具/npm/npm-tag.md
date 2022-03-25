---
slug: npm-tag
title: npm tag
tags: [npm-tag]
---

[npm 发包必读](https://juejin.cn/post/6844903870678695943#heading-3)

## npm 的 tag

我们可以通过 `npm dist-tag ls [<pkg>]` 来查看一个包的 tag，一般来说我们至少会有三种类型的标签。

- latest：最后版本，npm install 的就是这个
- beta：测试版本，一般内测使用，需要指定版本号 install，例如 3.1.0-beta.0
- next: 先行版本，npm install foo@next 安装，例如 3.0.2-alpha.0

如果我们需要发布一个测试版本，在发布的时候需要执行

```bash
npm publish --tag beta
```

如果你直接执行 `npm publish` ，那么即使你的版本号是 `-beta.n` ，默认会打上 `latest` 的标签，别人 `install` 的时候也会下载到。这个时候需要我们只要改一下 `tag`：

```bash
// 不小心发错了
latest: 1.0.1-beta.0
// 将1.0.1-beta.0设置为beta
npm dist-tag add my-package@1.0.1-beta.0 beta
npm dist-tag add my-package@1.0.0 latest
```

## 发布一个包的方法

```bash
$ yarn test
$ yarn build
$ npx lerna version --no-git-tag-version # 仅修改version
$ npx lerna publish from-package --dist-tag next # 发布next包，根据包本身的package.json文件中的版本号 需要手动package.json中的修改版本号
$ npx lerna publish from-package # 发布正式包 latest版本
```

```bash
$ yarn test
$ yarn build
$ npx lerna publish --dist-tag next # 发布next包，需要选择对应的 alpha 版本号，会直接修改package.json中的版本号然后commit再push
$ npx lerna publish # 发布正式包
```

**所以，如果不是发布一个 latest 的包，就不要直接使用 publish**
