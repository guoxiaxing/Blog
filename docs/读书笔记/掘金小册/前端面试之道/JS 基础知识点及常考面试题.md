---
slug: javascript
title: JS 基础知识点及常考面试题
tags: [掘金小册, 前端面试之道, JS基础知识点及常考面试题]
---

## 原始(Primitive)类型

- number
- string
- boolean
- null
- undefined
- symbol
- bigint

其中 `null` 和 `undefined` 是没有对应的包装类型的，其他原始值都有

原始值是没有属性和方法可以调用的。但是我们还是会发现我们可以在原始值上访问属性和执行方法，原因是 JS 会自动为我们进行装箱，转换为对应的包装对象（一个临时对象，在调用完方法或者访问完属性之后就会立即被销毁）

:::info

但是对于原始值访问属性/方法是有一个值不同的，那就是**number**

因为 number 是有浮点数的，所以 JS 是不知道我们是要调用方法/访问属性，还是这就是一个浮点数，所以对于 number 的方法调用我们需要把这个原始值现转化为一个表达式

```js
1.toString(); // 报错
(1).toString(); // '1'
```

:::

:::warning

关于 typeof null 为何为 object？

这个是 JS 底层的一个 bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object

:::
