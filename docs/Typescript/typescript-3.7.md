---
slug: typescript-3.7
title: Typescript 3.7 常用新特性
tags: [typescript]
---

## 写在前面

不是完整的版本新特性，这里只写出了我觉得常用的新特性

## 可选链式运算符 ?.

js 也支持了这个特性

`obj?.prop` 当 obj 为 null/undefined 式直接返回 undefined，可以用来代替`obj && obj.prop`

```typescript
// Before
if (foo && foo.bar && foo.bar.baz) {
  // ...
}

// After-ish
if (foo?.bar?.baz) {
  // ...
}
```

- 可以用于访问数组或者式对象索引

```typescript
arr?.[1];
const name = "name";
obj?.[name];
```

- 可以用于函数调用

```typescript
obj.func?.(123);
```

## 空合并运算符 ??

`a ?? b` 当 a 为 null/undefined 的时候返回 b，其余返回 a

### ?? 和 && 的区别

`&&`运算符当前面的变量式假值（false/0/null/undefined/NaN/''）式都会返回后面的变量，有时候这可能不是我们想要的；`??`则只会过滤 null 和 undefined

## type 的扩展使用

- type 类型定义时可以使用自己

```typescript
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];
```

## 断言扩展

throw 如果发生意外情况，则有一组特定的函数会出错。它们被称为“断言”功能。例如，Node.js 为此有一个专用功能 assert。

```javascript
assert(someValue === 42);
```

在此示例中，如果 someValue 不等于 42，assert 则将抛出 AssertionError。

JavaScript 中的断言通常用于防止传入不正确的类型。例如:

```javascript
function multiply(x, y) {
  assert(typeof x === "number");
  assert(typeof y === "number");

  return x * y;
}
```

TypeScript 3.7 引入了一个称为“断言签名”的新概念，可以对这些断言函数进行建模。
确保在包含范围的其余部分中，无论检查什么条件都必须为真。

```typescript
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new TypeError(msg);
  }
}
```

```typescript
function yell(str) {
  assert(typeof str === "string");

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new TypeError(msg);
  }
}
```

断言签名的另一种类型不检查条件，而是告诉 TypeScript 特定的变量或属性具有不同的类型。其余范围内 val 一定是 string，类似于类型守卫

```typescript
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new TypeError("Not a string!");
  }
}
```
