---
slug: http-request-cookie
title: http请求什么情况下会携带cookie
tags: [网络, http, cookie]
---

## 前置知识

Set-Cookie 响应头字段（Response header）是服务器发送到浏览器或者其他客户端的一些信息，一般用于登陆成功的情况下返回给客户端的凭证信息，然后下次请求时会带上这个 cookie，这样服务器端就能知道是来自哪个用户的请求了。

Cookie 请求头字段是客户端发送请求到服务器端时发送的信息（满足一定条件下浏览器自动完成，无需前端代码辅助）

## 条件

如果满足下面几个条件：

1. 浏览器端某个 Cookie 的 domain（.a.com） 字段等于请求的域名或者是请求的父域名，请求的域名需要是 a.com/b.a.com 才可以
2. 都是 http 或者 https，或者不同的情况下 Secure 属性为 false（即 secure 是 true 的情况下，只有 https 请求才能携带这个 cookie）
3. 要发送请求的路径，跟浏览器端 Cookie 的 path 属性必须一致，或者是浏览器端 Cookie 的 path 的子目录，比如浏览器端 Cookie 的 path 为 /test，那么请求的路径必须为/test 或者/test/xxxx 等子目录才可以

**上面 3 个条件必须同时满足，否则该请求就不能自动带上浏览器端已存在的 Cookie**
