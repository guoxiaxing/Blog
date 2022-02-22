---
slug: http-headers
title: HTTP Headers字段以及作用
tags: [网络, http header]
---

## 分类

- General Headers：通用头信息，同时适用于请求头和响应头，但与最终消息传输的数据无关的消息头。

- Request Headers：从客户端向服务器发送请求报文时使用的首部。

  - 作用：是请求报文特有的，为服务器提供了一些额外信息，比如客户端希望接收什么类型的数据，如 Accept 头部。补充了请求的附加内容、客户端信息、响应内容相关优先级等信息。

- Response Headers：从服务器端向客户端返回响应报文时使用的首部。

  - 作用：便于客户端提供信息。客服端在与哪种类型的服务器进行交互，如 Server 头部。补充了响应时的附加内容，也会要求客户端附加额外的内容信息。

- Entity Headers：包含有关实体主体的更多信息，比如主体长(Content-Length)度或其 MIME 类型。

一个完整的请求头/响应头，应该除了自身，还包括 General Headers 和 Entity Headers。

### General Headers

| 首部字段          | 说明                                                                     |
| ----------------- | ------------------------------------------------------------------------ |
| Connection        | 连接管理                                                                 |
| Cache-Control     | 强缓存                                                                   |
| Date              | 创建报文的日期                                                           |
| Pragma            | 报文指令，控制缓存（no-cache）在 Http1.1 之前，效果与 Cache-Control 相同 |
| Transfer-Encoding | 指定报文传输主体的编码方式                                               |
| Upgrade           | 升级为其他协议                                                           |
| Via               | 代理服务器的相关信息                                                     |
| Warning           | 警告信息                                                                 |
| Keep-Alive        | 用来设置超时时长和最大请求数                                             |

### Request Headers

| 首部字段            | 说明                                                                                                                  | 示例                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Accept              | 用户代理可以处理的媒体类型                                                                                            | text/html                      |
| Accept-Charset      | 优先的字符集                                                                                                          |                                |
| Accept-Encoding     | 优先的内容编码。浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法                        | Accept-Encoding: gzip, deflate |
| Accept-Language     | 客户端可以理解的自然语言                                                                                              |                                |
| Authorization       | 认证信息                                                                                                              |                                |
| If-Modified-Since   | 比较资源的更新时间                                                                                                    |
| If-Unmodified-Since |                                                                                                                       |                                |  |  |
| If-None-Match       | 比较实体标记（ETag）                                                                                                  |
| If-Match            |                                                                                                                       |                                |  |  |
| Range               | 实体的字节范围请求                                                                                                    |                                |
| Referer             | 当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 请求头识别访问来源 |                                |
| TE                  | 指定用户代理希望使用的传输编码类型                                                                                    |                                |
| User-Agent          | HTTP 客户端程序的信息                                                                                                 |                                |
| Cookie              | 通过 Set-Cookie 设置的值                                                                                              |                                |
| Host                | 请求资源所在服务器                                                                                                    |                                |
| Origin              | 表明了请求来自于哪个站点                                                                                              |                                |

```http
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```

### Response Headers

| 首部字段           | 说明                                                       | 示例       |
| ------------------ | ---------------------------------------------------------- | ---------- |
| Accept-Ranges      | 标识自身支持范围请求。字段的具体值用于定义范围请求的单位。 | bytes/none |
| Age                | 推算资源创建经过的时间(单位 s)                             |            |
| ETag               | 协商缓存，请求资源的唯一标识                               |            |
| Location           | 重定向的 URL                                               |            |
| Proxy-Authenticate | 代理服务器对客户端的认证信息                               |            |
| WWW-Authenticate   | 服务器对客户端的认证信息                                   |            |
| Server             | HTTP 服务器的安装信息                                      |            |
| Vary               | 代理服务器的管理信息                                       |            |
| Set-Cookie         | 服务器端向客户端发送 cookie                                |            |

### Entity Headers

| 首部字段         | 说明                   |
| ---------------- | ---------------------- |
| Allow            | 资源可支持的 HTTP 方法 |
| Content-Encoding | 实体主体适用的编码方式 |
| Content-Language | 实体主体的自然语言     |
| Content-Length   | 实体主体的大小         |
| Content-Location | 替代对应资源的 URI     |
| Content-Range    | 实体主体的位置范围     |
| Content-Type     | 实体主体的媒体类型     |
| Expires          | 实体主体过期的日期时间 |
| Last-Modified    | 资源的最后修改日期时间 |
