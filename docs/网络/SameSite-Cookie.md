---
slug: SameSite-Cookie
title: Cookie 的 SameSite 属性
tags: [Cookie, SameSite]
---

## 背景

我最近看到了 CSRF 攻击，然后说设置了 Cookie 的 SameSite 属性可以一定程度上防止 CSRF 攻击，让我想了解一下这个 SameSite 属性

## SameSite 属性

Cookie 的 SameSite 属性用来限制第三方 Cookie，从而减少安全风险。

它可以设置三个值。

- Strict

- None

- Lax（默认值）

### Strict

Strict 最为严格，Cookies 只会在第一方上下文中发送，不会与第三方网站发起的请求一起发送。换言之，只有**当前网页的 URL 与 Cookie 的 domain 一致时**，才会带上 Cookie（但是 Cookie 也需要满足一定的条件[http 请求什么情况下会携带 cookie](https://guoxiaxing.github.io/Blog/docs/网络/http-request-cookie)）。

```text
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
```

### Lax（默认值）

Lax 规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

```text
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
```

导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。详见下表。

| 请求类型  | 示例                                 | 没有设置 SameSite | Lax         |
| --------- | ------------------------------------ | ----------------- | ----------- |
| 链接      | `<a href="..."></a>`                 | 发送 Cookie       | 发送 Cookie |
| 预加载    | `<link rel="prerender" href="..."/>` | 发送 Cookie       | 发送 Cookie |
| GET 表单  | `<form method="GET" action="...">`   | 发送 Cookie       | 发送 Cookie |
| POST 表单 | `<form method="POST" action="...">`  | 发送 Cookie       | 不发送      |
| iframe    | `<iframe src="..."></iframe>`        | 发送 Cookie       | 不发送      |
| AJAX      | `$.get("...")`                       | 发送 Cookie       | 不发送      |
| Image     | `<img src="...">`                    | 发送 Cookie       | 不发送      |

设置了 Strict 或 Lax 以后，基本就杜绝了 CSRF 攻击。当然，前提是用户浏览器支持 SameSite 属性。

### None

网站可以选择显式关闭 SameSite 属性，将其设为 None。不过，前提是必须同时设置 Secure 属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

- 无效设置

```text
Set-Cookie: widget_session=abc123; SameSite=None
```

- 有效设置

```text
Set-Cookie: widget_session=abc123; SameSite=None; Secure
```

## 补充

### 同源和同站的区别

- 同源：协议（scheme）+ 主机名（hostname）+ 端口号（port） 完全一致。
- 同站：eTLD（有效顶级域名）+1 （二级域名）完全一致。

以 `https://www.example.com:443` 为例，下面给出了一系列的网址是否与其同源或同站的解释：

| 对比网址                        | 是否同源               | 是否同站             |
| ------------------------------- | ---------------------- | -------------------- |
| `https://www.other.com:443`     | 否，域名不一致         | 否，二级域名不一致   |
| `https://example.com:443`       | 否，域名不一致         | **是，子域名不影响** |
| `https://login.example.com:443` | 否，域名不一致         | **是，子域名不影响** |
| `http://www.example.com:443`    | 否，协议不一致         | **是，协议不影响**   |
| `https://www.example.com:80`    | 否，因为 port 不同     | **是，端口号不影响** |
| `https://www.example.com:443`   | **是，完全一致**       | **是**               |
| `https://www.example.com`       | **是，默认端口号 443** | **是**               |

### 第一方 Cookie 和第三方 Cookie

第一方 Cookie 是由地址栏中列出的网站域设置的 Cookie，即 Cookie 设置的 domain 和当前网站的域名相同或者是当前网站的域名的二级域名，而第三方 Cookie 来自非当前网站域设置的 Cookie

#### Cookie 的同源策略

Cookie 中的同源只关注域名（有效二级域名相同即可），忽略协议和端口。

所以`https://localhost:8080/`和`http://localhost:8081/`的 Cookie 是共享的。
