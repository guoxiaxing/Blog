---
slug: typescript-4.4
title: Typescript 4.4 常用新特性
tags: [typescript]
---

## 用于 Aliased 条件的控制流分析

```typescript
function foo(arg: unknown) {
  if (typeof arg === "string") {
    // We know this is a string now.
    console.log(arg.toUpperCase());
  }
}
```

在这个例子中，我们检查了 arg 是否是一个 string。TypeScript 识别了 typeof arg === "string"这个检查，认为它是一个类型保护，并且能够确定 arg 应该是 if 块主体中的一个 string。但是，如果我们将条件移出为一个常量会发生什么？

```typescript
function foo(arg: unknown) {
  const argIsString = typeof arg === "string";
  if (argIsString) {
    console.log(arg.toUpperCase());
    //              ~~~~~~~~~~~
    // Error! Property 'toUpperCase' does not exist on type 'unknown'.
  }
}
```

在以前的 TypeScript 版本中，这将抛出一个错误——即使 argIsString 被分配了类型保护的值也是如此，TypeScript 把这些信息丢掉了。这会很麻烦，因为我们可能想在多个位置重复使用相同的检查。为了解决这个问题，用户往往需要重复自己做过的事情或使用类型断言（cast）。在 TypeScript 4.4 中情况不再如此了。上面的例子不会再抛出错误！当 TypeScript 看到我们正在测试一个常量值时，它会做一些额外的工作来看看它是否包含类型保护。如果这个类型保护对 const、readonly 属性或未修改的参数进行操作，则 TypeScript 能够适当地缩小该值。
新版保留了各种类型保护条件——不仅仅是 typeof 检查。例如，可辨识联合类型现在很容易检查了。

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number };

function area(shape: Shape): number {
  const isCircle = shape.kind === "circle";
  if (isCircle) {
    // We know we have a circle here!
    return Math.PI * shape.radius ** 2;
  } else {
    // We know we're left with a square here!
    return shape.sideLength ** 2;
  }
}
```

## 符号和模板字符串模式索引签名

索引签名非常有用,然而到目前为止，它们仅限于 string 和 number 键（并且 string 索引签名有一个人为的怪癖，它们可以接受 number 键，因为无论如何它们都会被强制转换为字符串）。这意味着 TypeScript 不允许使用 symbol 键索引对象。TypeScript 也无法对某些 string 键的子集建模索引签名
TypeScript 4.4 解决了这些限制，并允许 symbol 和模板字符串模式的索引签名。

```typescript
interface Colors {
  [sym: symbol]: number;
}
const red = Symbol("red");
const green = Symbol("green");
const blue = Symbol("blue");
let colors: Colors = {};
colors[red] = 255; // Assignment of a number is allowed
let redVal = colors[red]; // 'redVal' has the type 'number'
colors[blue] = "da ba dee"; // Error: Type 'string' is not assignable to type 'number'.
```

类似地，我们可以使用模板字符串模式类型编写索引签名。这种做法的一种可能用途是从 TypeScript 的多余属性检查中排除以 data-开头的属性。

```typescript
interface Options {
    width?: number;
    height?: number;
}
let a: Options = {
    width: 100,
    height: 100,
    "data-blah": true, // Error! 'data-blah' wasn't declared in 'Options'.
};
interface OptionsWithDataProps extends Options {
    // Permit any property starting with 'data-'.
    [optName: `data-${string}`]: unknown;
}
let b: OptionsWithDataProps = {
    width: 100,
    height: 100,
    "data-blah": true,       // Works!
    "unknown-property": true,  // Error! 'unknown-property' wasn't declared in 'OptionsWithDataProps'.
};
```

关于索引签名最后还要提一下，它们现在允许联合类型：

- string
- number
- symbol
- 模板字符串模式（例如 hello-\${string}）

如果一个索引签名的参数是这些类型的联合，它将扁平化为几个不同的索引签名。

```typescript
interface Data {
  [optName: string | symbol]: any;
}
// Equivalent to
interface Data {
  [optName: string]: any;
  [optName: symbol]: any;
}
```

## 精确的可选属性类型（--exactOptionalPropertyTypes）

```typescript
interface Person {
  name: string;
  age?: number;
}
```

等价于

```typescript
interface Person {
  name: string;
  age: number | undefined;
}
```

这意味着用户可以显式用 undefined 代替 age。

```typescript
const p: Person = {
  name: "Daniel",
  age: undefined // This is okay by default.
};
```

在 TypeScript 4.4 中新加入的标志--exactOptionalPropertyTypes 指定了可选属性类型应完全按照编写的方式来解释，这意味着|undefined 不会添加到类型中：

```typescript
// With 'exactOptionalPropertyTypes' on:
const p: Person = {
  name: "Daniel",
  age: undefined // Error! undefined isn't a number
};
```

这个标志不是--strict 系列的一部分，如果你想要这种行为，需要显式打开它。它还需要启用--strictNullChecks。

## 抽象属性不允许初始化

```typescript
abstract class C {
  abstract prop = 1;
  //       ~~~~
  // Property 'prop' cannot have an initializer because it is marked abstract.
}
```

相反，你只能为这个属性指定一个类型：

```typescript
abstract class C {
  abstract prop: number;
}
```
