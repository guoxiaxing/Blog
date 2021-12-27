---
slug: typescript-4.0
title: Typescript 4.0 常用新特性
tags: [typescript]
---

## 写在前面

并不是所有的新新特性，只是罗列一些重点的

## 可变元祖类型

### 元组类型语法中的 spread 现在可以泛型

```typescript
function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr;
  return rest;
}
const myTuple = [1, 2, 3, 4] as const;
const myArray = ["hello", "world"];
// type [2, 3, 4]
const r1 = tail(myTuple);
// type [2, 3, ...string[]]
const r2 = tail([...myTuple, ...myArray] as const);
```

### rest 元素可以出现在元组中的任何位置，而不仅仅是在结尾

```typescript
type Strings = [string, string];
type Numbers = [number, number];
// [string, string, number, number]
type StrStrNumNum = [...Strings, ...Numbers];
```

当我们在没有已知长度的类型中 spread 时，结果类型也将变得不受限制，并且后面的所有元素都会变为结果的 rest 元素类型。

```typescript
type Strings = [string, string];
type Numbers = number[];
// [string, string, ...Array<number | boolean>]
type Unbounded = [...Strings, ...Numbers, boolean];
```

## 标记的元组元素

```typescript
type Range = [start: number, end: number];
```

**标记元组使用时有些规则，其中一条是：在标记一个元组元素时，还必须标记元组中的所有其他元素。**

## 构造器的类属性推断

```typescript
class Square {
  // Previously: implicit any!
  // Now: inferred to `number`!
  area;
  sideLength;
  constructor(sideLength: number) {
    this.sideLength = sideLength;
    this.area = sideLength ** 2;
  }
}
```

如果构造器的路径并非都分配给一个实例成员，则该属性可能被认为是 undefined 的。

```javascript
class Square {
  sideLength;
  constructor(sideLength: number) {
    if (Math.random()) {
      this.sideLength = sideLength;
    }
  }
  get area() {
    return this.sideLength ** 2;
    //     ~~~~~~~~~~~~~~~
    // error! Object is possibly 'undefined'.
  }
}
```

当你处于 strictPropertyInitialization 中时，需要使用显式类型注释以及明确的赋值断言（!）。

```typescript
class Square {
  // definite assignment assertion
  //        v
  sideLength!: number;
  //         ^^^^^^^^
  // type annotation
  constructor(sideLength: number) {
    this.initialize(sideLength);
  }
  initialize(sideLength: number) {
    this.sideLength = sideLength;
  }
  get area() {
    return this.sideLength ** 2;
  }
}
```

## 短路赋值运算符

JavaScript 中有很多运算符都有对应的赋值运算符！但是有三个值得注意的例外：逻辑和（&&），逻辑或（||）和空值合并（??）。

所以 TypeScript 4.0 支持了一个新的 ECMAScript 特性，添加了三个新的赋值运算符：&&=，||=和??=。

这些运算符非常适合替换下面这种代码示例：

```typescript
a = a && b;
a = a || b;
a = a ?? b;
```

**需要注意的是这些运算符仅在必要时执行赋值。从这个意义上讲，"短路"的不仅是运算符的右侧，赋值本身也短路了**
**也就是说当左侧的值是假值，赋值一定会执行，左侧是真的值是，并不会赋值**

```typescript
obj.prop ||= foo();
// roughly equivalent to either of the following
obj.prop || (obj.prop = foo());
if (!obj.prop) {
    obj.prop = foo();
}
```

## catch 子句绑定支持 unknown

自 TypeScript 诞生以来，catch 子句变量始终按 any 类型化。这意味着 TypeScript 允许你对它们进行任何操作。
因此，TypeScript 4.0 现在允许你将 catch 子句变量的类型指定为 unknown。unknown 比 any 更安全，因为它会在我们操作值之前提醒我们执行某种类型检查。

## 属性重写访问器（反之亦然）是错误

以前，只有在使用 useDefineForClassFields 时，属性重写访问器或访问器重写属性是一个错误；但现在，在派生类中声明一个将重写基类中的 getter 或 setter 的属性时总是发出错误。

```typescript
class Base {
  get foo() {
    return 100;
  }
  set foo() {
    // ...
  }
}
class Derived extends Base {
  foo = 10;
  //  ~~~
  // error!
  // 'foo' is defined as an accessor in class 'Base',
  // but is overridden here in 'Derived' as an instance property.
}
```

```typescript
class Base {
  prop = 10;
}
class Derived extends Base {
  get prop() {
    //  ~~~~
    // error!
    // 'prop' is defined as a property in class 'Base', but is overridden here in 'Derived' as an accessor.
    return 100;
  }
}
```

## delete 的操作数必须是可选的

在 strictNullChecks 中使用 delete 运算符时，操作数现在必须为 any、unknown、never 或为可选（因为它在类型中包含 undefined）。否则，使用 delete 运算符是错误的。

```typescript
interface Thing {
  prop: string;
}
function f(x: Thing) {
  delete x.prop;
  //     ~~~~~~
  // error! The operand of a 'delete' operator must be optional.
}
```
