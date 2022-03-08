---
slug: options-request
title: 为什么会有OPTIONS请求
tags: [网络, http, tcp]
---

Options 请求，我所了解的就是在发起跨域的非简单请求时，会先发起一个 options 预检请求（浏览器是自动发起的），去检测目标服务器是支持跨域请求。

## 什么是 Options 请求？

1. 获取服务器支持的 http 请求方法

响应报文包含一个 `Allow` 首部字段，该字段的值表明了服务器支持的所有 HTTP 方法

2. 跨域请求的预检请求

## Options 预检请求

在 CORS 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。

### 关键请求头

Options 请求会携带几个关键的 Request Header

| Request Header                 | 作用                                     |
| ------------------------------ | ---------------------------------------- |
| Access-Control-Request-Method  | 告诉服务器实际请求所使用的 HTTP 方法     |
| Access-Control-Request-Headers | 告诉服务器实际请求所携带的自定义首部字段 |
| Origin                         | 发起请求的域名 （协议、域名、端口号）    |

服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

### 关键响应头

预检响应头 response header 的关键字段

| response header                  | 作用                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| Access-Control-Allow-Methods     | 返回了服务端允许的请求，包含 GET/HEAD/PUT/PATCH/POST/DELETE  |
| Access-Control-Allow-Credentials | 允许跨域携带 cookie（跨域请求要携带 cookie 必须设置为 true） |
| Access-Control-Allow-Origin      | 允许跨域请求的域名，这个可以在服务端配置一些信任的域名白名单 |
|                                  |
| Access-Control-Allow-Headers     | 客户端请求所携带的自定义首部字段                             |

此次 OPTIONS 请求返回了响应头的内容，但没有返回响应实体 response body 内容。

### Options 请求后的第二次请求

这个才是我们真正要发送的请求

## 关于 Options 请求

### Options 请求是浏览器自动发起的

跨域请求触发了浏览器自动发起 OPTIONS 请求。

### 跨域请求时，OPTIONS 请求触发条件

跨域的非简单请求会触发预检请求

那么满足哪些条件的请求是非简单请求呢？

1. 使用了下面任意一个请求方法

PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH

2. 人为设置了以下集合之外首部字段

Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width

3. Content-Type 的值不属于下列之一:

application/x-www-form-urlencoded、multipart/form-data、text/plain

## 优化 Options 请求

可见一旦达到触发条件，跨域请求便会一直发送 2 次请求，这样增加的请求数是否可优化呢？答案是可以，OPTIONS 预检请求的结果可以被缓存。

> Access-Control-Max-Age 这个响应首部表示 preflight request （预检请求）的返回结果（即 Access-Control-Allow-Methods 和 Access-Control-Allow-Headers 提供的信息） 可以被缓存的最长时间，单位是秒。

如果值为 -1，则表示禁用缓存，每一次请求都需要提供预检请求，即用 OPTIONS 请求进行检测。

## 总结

OPTIONS 请求即预检请求，可用于检测服务器允许的 http 方法。当发起跨域请求时，由于安全原因，触发一定条件时浏览器会在正式请求之前自动先发起 OPTIONS 请求，即 CORS 预检请求，服务器若接受该跨域请求，浏览器才继续发起正式请求。
