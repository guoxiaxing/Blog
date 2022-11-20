---
slug: vite2-upgrade
title: vite2升级
tags: [vite]
---

## 升级背景

- 解决 [vite 开发模式下页面无法展示](https://guoxiaxing.github.io/Blog/docs/工程化/构建工具/vite/vite-dev-error) 问题

- vite3 的优势

  - 在开发环境下减少 reload 页面的次数

:::tip 关于 vite 预构建

在服务器已经启动之后，并不能一次扫描完所有的依赖（比如说懒加载的模块只有代码执行的时候才知道加载哪些依赖），加载一个页面的时候，如果遇到一个新的依赖关系导入，而这个依赖关系还没有在缓存中，Vite 将重新运行依赖构建进程并重新加载页面

之前在使用 Vite 的时候，经常会遇到这种情况：项目启动以后，不管是首屏还是页面懒加载，如果发现有未进行预构建的第三方依赖，那么 Vite 就会重新预构建，然后触发页面的 reload。

最新发布的 3.x 版本对此问题做了部分优化，即首屏期间，即使有未进行预构建的第三方依赖，也不会发生页面 reload。

原理：

3.0 版本对第三方依赖的请求和业务代码的请求有不同的处理逻辑。当浏览器请求业务代码时，dev server 只要完成源代码转换并收集到依赖模块的 url，就会给浏览器发送 response。而第三方依赖请求则不同，dev server 会等首屏期间涉及的所有模块的依赖关系全部解析完毕以后，才会给浏览器发送 response。这就导致了，**如果发现有未预构建的第三方依赖，第三方依赖的请求会一直被阻塞，直到二次预构建完成为止。**

=> 所以

3.0 对二次预构建的优化，其实是以消耗首屏性能来优化 reload 交互体验

:::

## 升级步骤

```bash
yarn upgrade vite@latest
```

会升级 vite 到最新版本，并且升级对应的依赖

## vite2 vs vite3

https://local.zhenguanyu.com:3000/#/user-stat/video?_tab=user-stat&activate_status=68995&chapterType=musicVideo&courseType=episode&detail_page=episode&episodeId=68297&nav_activate_status=68297&nav_courseType=episode&nav_detail_page=musicVideo&nav_episodeId=68297&nav_objectId=68297&nav_resource_name=musicVideo&nav_subject=music&objectId=68995&roomTemplateId&subject=music

### 冷加载（运行 yarn dev 后的第一次加载页面）

3.2.3 版本

![](/img/vite/1668695478334-63abf2f5-de79-4d17-a5de-0b7751160f1a.png)

2.7.13

![](/img/vite/1668695490145-87169a3a-f13f-4035-8a51-2c018f03a057.png)

### 再次刷新页面

3.2.3 版本

![](/img/vite/1668695537822-c01ca593-a713-41ab-98c8-e10fcf0676ae.png)

2.7.13

![](/img/vite/1668695549704-9a37f78f-a020-43cd-85c8-10141a48ba63.png)

**可以看到 vite3 不论是加载资源大小还是页面加载时间的表现都比 vite2 更优**

## 疑问

:::danger

- 再次刷新对于第三方依赖应该是走缓存的，为什么在浏览器的 size 里面显示的不是 memory cache/disk cache

- 再次刷新的耗时确实比首次加载要少很多

答：见 issuehttps://github.com/vitejs/vite/issues/2725

对于 chrome 浏览器

https://helpx.adobe.com/hk_zh/experience-manager/kb/cache-problems-on-chrome-with-SSL-certificate-errors.html

在开发中，使用的是无效的或自签名的 SSL 证书。当通过 HTTPS 访问站点时，来自 Web 服务器的任何响应都不会被缓存在 Chrome 浏览器中。

即使设置了缓存控制：Max-AGE=...。Header 和 Last-Modify Header 存在，仍然没有观察到任何缓存。此外，当再次加载相同的文件时，不会从 Chrome 浏览器发送 If-Modify-Since 请求标头。

:::
