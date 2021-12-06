---
slug: typescript-4.5
title: Typescript 4.5 常用新特性
tags: [typescript]
---

## Awaited 类型与 Promise 改进

TypeScript 4.5 引入了一种新的实用程序类型： Awaited 类型，获取 promise 的返回值类型

- 递归解包
- 不依赖 PromiseLike 更稳健
- 利用 `Awaited<T>` ，为 `Promise.all` 、 `Promise.race` 、 `Promise.allSettled` 和 `Promise.any` 增加重载

```typescript
// type is string
type basic = Awaited<Promise<string>>;
// type is string
type recursive = Awaited<Promise<Promise<string>>>;
// type is boolean
type nonThenObj = Awaited<boolean>;
// type is string | Date
type unions = Awaited<Date | Promise<Promise<string>>>;
type FakePromise = { then: () => string };
// type is never
type fake = Awaited<FakePromise>;
```

## 其他新特性

- 引入 es2022 模块：TypeScript 现在支持一个新的模块设置：es2022。es2022 模块的主要功能是顶层 await，意味着开发者可以在 async 函数之外使用 await。这在模块 esnext（以及现在的模块 nodenext）中已经得到支持，但 es2022 是这个功能的第一个稳定目标。
- 支持 import 断言：TypeScript 4.5 支持 ECMAScript 关于导入断言的提议，这是运行时使用的一种语法，以确保导入有一个预期的格式。

- 私有字段检查：开发人员现在可以编写一个具有 #private 字段成员的类，并使用 in 运算符查看另一个对象是否具有相同的字段，以用于检查对象上是否具有私有字段。
