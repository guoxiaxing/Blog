---
slug: tcp-sticky-package-and-unpacking
title: tcp的粘包拆包及其解决方式
tags: [tcp, 粘包, 拆包]
---

## 什么是粘包拆包？

假设客户端向服务端连续发送了两个数据包，用 packet1 和 packet2 来表示，那么服务端收到的数据可以分为三种，现列举如下

第一种：服务端正常接收到这两个数据包 package1 和 package2

https://cloud.tencent.com/developer/article/1897195

https://zhuanlan.zhihu.com/p/41709589
