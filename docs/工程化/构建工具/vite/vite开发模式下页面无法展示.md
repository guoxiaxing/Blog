---
slug: vite-dev-error
title: vite开发模式下页面无法展示
tags: [vite]
---

## 背景

数据站在本地开发时，运行 `yarn dev` 打开页面白屏，并有 http 报错

本地访问的 url

https://local.zhenguanyu.com:3000/#/user-stat/video?_tab=user-stat&activate_status=68995&chapterType=musicVideo&courseType=episode&detail_page=episode&episodeId=68297&nav_activate_status=68297&nav_courseType=episode&nav_detail_page=musicVideo&nav_episodeId=68297&nav_objectId=68297&nav_resource_name=musicVideo&nav_subject=music&objectId=68995&roomTemplateId&subject=music

![](/img/vite/16717eaf3383aae8_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0.jpg)

控制台报错

![](/img/vite/1668694296098-8bfdcad7-05d6-4bbd-a654-afd42b700262.png)

很多资源加载失败，报错：GET https://local.zhenguanyu.com:3000/node_modules/.vite/chunk-X3GOEXF3.js?v=e8cf7525 net::ERR_HTTP2_PROTOCOL_ERROR

需要连续刷新五六七八次才可以...

:::caution 注意

- vite 中的类型必须使用 import type 的方式导入

- 仅仅在 chrome 下有问题，在火狐浏览器下是 ok 的，其实不是的，火狐在禁止缓存的情况下也是必现

- vite 在开启 https 选项的时候，采用的是 TLS+HTTP2，但是当配置了 proxy 的时候就会变为 TLS+http1.1(https://vitejs.dev/config/server-options.html#server-https)

:::

```js title="vite源码"
if (proxy) {
  // #484 fallback to http1 when proxy is needed.
  return require("https").createServer(httpsOptions, app);
} else {
  return require("http2").createSecureServer(
    {
      ...httpsOptions,
      allowHTTP1: true,
    },
    app
  );
}
```

## 原因

要想解决问题就要找到导致这个问题的原因

在 github 上找到一个表现相同的 issue：https://github.com/vitejs/vite/issues/4403

- 请求过多，没有被用到的组件和路由也被加载了

```typescript title='app.routing.ts'
import { NotFoundPage } from "@rr/components/not-found-page";
import { AutoRedirect } from "@rr/pages/auto-redirect/auto-redirect";
import { ZdtNotFoundNavigationPage } from "@yuanfudao/zdt-react";
import { Route, Routes } from "react-router-dom";
import { UrlConfig } from "./config/url-config";
import { AudioLibraryRouting } from "./pages/module-audio-library/audio-library-routing";
import { DevToolRouting } from "./pages/module-dev-tool/dev-tool-routing";
import { UserStatManagerRouting } from "./pages/module-user-stat-manager/user-stat-manager-routing";
import { UserStatRouting } from "./pages/module-user-stat/user-stat-routing";

export const AppRouting = () => (
  <Routes basename={UrlConfig.baseName}>
    <Route path="/" element={<AutoRedirect />} />
    <Route path="/dev-tool/*" element={<DevToolRouting />} />
    <Route path="/manager/*" element={<UserStatManagerRouting />} />
    <Route path="/audio-library/*" element={<AudioLibraryRouting />} />
    <Route path="/user-stat/*" element={<UserStatRouting />} />
    <Route
      path="/not-found-navigation"
      element={<ZdtNotFoundNavigationPage />}
    />
    <Route path="/*" element={<NotFoundPage />} />
  </Routes>
);
```

访问的 url:

https://local.zhenguanyu.com:3000/#/user-stat/video?_tab=user-stat&activate_status=68995&chapterType=musicVideo&courseType=episode&detail_page=episode&episodeId=68297&nav_activate_status=68297&nav_courseType=episode&nav_detail_page=musicVideo&nav_episodeId=68297&nav_objectId=68297&nav_resource_name=musicVideo&nav_subject=music&objectId=68995&roomTemplateId&subject=music

现在请求的 path 为 user-stat，那么应该只需要加在 UserStatRouting 组件以及它下面的组件，但是现状是，还加载了其他无用的组件。

![](/img/vite/1668694488324-9a7b7da7-319f-40ab-8c5e-2836aaa3fdf1.png)

- 第三方依赖没有走缓存，而是重新请求服务器（原因是 chrome 对于 https 请求，如果证书是用户自己创建的，那么请求是不会被缓存的，即使设置了缓存头）

![](/img/vite/1668695140501-25a4de00-40e4-4968-84b0-754ca512669d.png)

- 即使是请求多，但是也是在用 http2，所以并发的请求也应该是没有问题的，为什么会 net::ERR_HTTP2_PROTOCOL_ERROR（ENHANCE_YOUR_CALM 这个 http error 导致的）呢？ - 暂时未解（其实可以观察第一张图可以看到，通常是大资源之后的请求会失败）

所以，可以发现，将协议退回到 http1.1 可以解决请求失败的问题

```js title='vite.config.js'

// 关闭http2 (https://vitejs.dev/config/server-options.html#server-https)
server: {
      https: {
        key: fs.readFileSync(path.join(__dirname, './local.zhenguanyu.com-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, './local.zhenguanyu.com.pem')),
      },
      port: 3000,
      strictPort: true,
      proxy: {
        'https://localhost:3000': 'https://localhost:3000',
      },
    },
```

- 在特大 module 的请求后面的请求会失败 https://github.com/vitejs/vite/pull/6207

![](/img/vite/1668695225600-ce3096b4-c308-4e8b-98a5-78576041b605.png)

## 证实自己的猜测

验证方式

参考文档：https://www.qiniu.com/qfans/qnso-58215104

使用 chrome://net-export/ 来记录网络请求 - 使用方式：https://www.chromium.org/for-testers/providing-network-details/

记录的结果是一个 json 文件

![](/img/vite/1668695265178-f88837fc-576a-4f10-9704-2db43a714127.png)

可以看到 ERR_HTTP2_PROTOCOL_ERROR 的描述是 Server reset stream，error_code: ENHANCE_YOUR_CALM
解决

## 解决问题

参考文档：https://github.com/vitejs/vite/pull/6207，https://github.com/vitejs/vite/pull/3895

1. vite 内部通过 http2.createSecureServer 来创建了 https 服务器，有一个配置项 maxSessionMemory 用来 http2Session 可以使用的最大内存，默认是 10MB，显然我们请求的文件已经超过了这个默认值，所以可以通过设置 server.https.maxSessionMemory 来解决这个问题

2. 升级到 vite3（vite3 内部配置了 server.https.maxSessionMemory = 1000） （https://github.com/vitejs/vite/pull/6207/commits/5e4ad8d5ea2ba4cd700d7a655879035f3cbeb550 ）
