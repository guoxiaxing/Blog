---
slug: typescript-4.1
title: Typescript 4.1 常用新特性
tags: [typescript]
---

## 模版字面量类型

```typescript
type World = "world";
type Greeting = `hello ${World}`;
// same as
//   type Greeting = "hello world";
```

在替代位置有联合类型呢？它会生成可以由每个联合成员表示的所有可能的字符串字面量的集合。

```typescript
type Color = "red" | "blue";
type Quantity = "one" | "two";
type SeussFish = `${Quantity | Color} fish`;
// same as
//   type SeussFish = "one fish" | "two fish"
//                  | "red fish" | "blue fish";5
```

## 映射类型中加入键重映射

TypeScript 4.1 允许你使用新的 as 子句重新映射映射类型中的键。

```typescript
type MappedTypeWithNewKeys<T> = {
    [K in keyof T as NewKeyType]: T[K]
    //            ^^^^^^^^^^^^^
    //            This is the new syntax!
}
```

有了这个新的 as 子句，你可以利用模板字面量类型之类的特性，轻松地基于旧名称创建属性名称。

```typescript
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};
interface Person {
    name: string;
    age: number;
    location: string;
}
type LazyPerson = Getters<Person>
// type LazyPerson = {
//     getName: () => string;
//     getAge: () => number;
//     getLocation: () => string;
// }
```

```typescript
// Remove the 'kind' property
type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K]
};


interface Circle {
    kind: "circle";
    radius: number;
}


type KindlessCircle = RemoveKindField<Circle>;
// same as
//   type KindlessCircle = {
//       radius: number;
//   }
```

## 递归条件类型

在 TypeScript 4.1 中，条件类型现在可以立即在其分支中引用自身，这样我们就更容易编写递归类型别名了
如果我们想编写一个类型来获取嵌套数组的元素类型，则可以编写以下 deepFlatten 类型。

```typescript
type ElementType<T> = T extends ReadonlyArray<infer U> ? ElementType<U> : T;

function deepFlatten<T extends readonly unknown[]>(x: T): ElementType<T>[] {
  throw "not implemented";
}

// All of these return the type 'number[]':
deepFlatten([1, 2, 3]);
deepFlatten([[1], [2, 3]]);
deepFlatten([[1], [[2]], [[[3]]]]);
```

## any/unknown 在 falsy 位置传播

以前，对于像 foo && somethingElse 这样的表达式，foo 的类型是 any 或 unknown 的，整个表达式的类型将是 somethingElse 的类型。

```typescript
declare let foo: unknown;
declare let somethingElse: { someProp: string };
let x = foo && somethingElse; // { someProp: string }
```

但在 TypeScript 4.1 中，我们会更谨慎地确定这种类型。由于对 && 左侧的类型一无所知，因此我们将向外传播 any 和 unknown，而不是将右侧的类型传播出去。

```typescript
declare let foo: unknown;
declare let somethingElse: { someProp: string };
let x = foo && somethingElse; // unknown
```

## 条件 spread 创建可选属性

在 JavaScript 中，对象 spread（例如{ ...foo }）不会对虚假值起作用。因此，在类似{ ...foo }的代码中，如果 foo 为 null 或 undefined，则会跳过 foo。

```typescript
interface Person {
    name: string;
    age: number;
    location: string;
}
interface Animal {
    name: string;
    owner: Person;
}
function copyOwner(pet?: Animal) {
    return {
        ...(pet && pet.owner),
        otherStuff: 123
    }
}
// We could also use optional chaining here:
function copyOwner(pet?: Animal) {
    return {
        ...(pet?.owner),
        otherStuff: 123
```

在这里，如果定义了 pet，则 pet.owner 的属性将被 spread 进去；否则，不会将任何属性 spread 到返回的对象中。
copyOwner 的返回类型以前是基于每个 spread 的联合类型：

```typescript
{ otherStuff: number } | { otherStuff: number, name: string, age: number, location: string }
```

在 TypeScript 4.1 中，返回的类型改为使用 all-optional 属性。

```typescript
{
    otherStuff: number;
    name?: string;
    age?: number;
    location?: string;
}
```

## 在 Promise 中，resolve 的参数不再可选

但有时确实需要在没有参数的情况下调用 resolve()。在这些情况下，我们可以给 Promise 一个显式的 void 泛型类型参数（即将其写为 `Promise<void>`）。这利用了 TypeScript 4.1 中的新功能，其中可能是 void 的尾随参数可以变为可选。

```typescript
new Promise<void>(resolve => {
  //     ^^^^^^
  doSomethingAsync(() => {
    doSomething();
    resolve();
  });
});
```
