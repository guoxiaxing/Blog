---
slug: typescript-4.2
title: Typescript 4.2 常用新特性
tags: [typescript]
---

## 元组类型中的前导 / 中间剩余元素

每个元组只有一个剩余元素，并且剩余元素后面不能有可选元素。

```typescript
interface Clown {
  /*...*/
}
interface Joker {
  /*...*/
}
let StealersWheel: [...Clown[], "me", ...Joker[]];
// ~~~~~~~~~~ Error!
// A rest element cannot follow another rest element.
let StringsAndMaybeBoolean: [...string[], boolean?];
// ~~~~~~~~ Error!
// An optional element cannot follow a rest element.
```

这些没有后缀的剩余元素可以被用来对采用任意数量的前导参数（后面跟几个固定参数）的函数进行建模。

```typescript
declare function doStuff(...args: [...names: string[], shouldCapitalize: boolean]): void;
doStuff(/*shouldCapitalize:*/ false)
doStuff("fee", "fi", "fo", "fum", /*shouldCapitalize:*/ true);
```

## 针对 in 操作符的更严格的检查

在 JavaScript 中，在 in 操作符右侧使用一个非对象类型是一个运行时错误。TypeScript 4.2 确保这可以在设计时发现这个错误。

```typescript
"foo" in 42;
// ~~
// error! The right-hand side of an 'in' expression must not be a primitive.
```

## 解构变量可以显式标记为未使用

你现在可以通过在解构变量前增加一个下划线（\_字符），来将解构变量标记为未使用。

```typescript
let [_first, second] = getValues();
```

以前，如果\_first 以后从未使用过，TypeScript 会报一个 noUnusedLocals 错误。现在，TypeScript 将意识到，\_first 是故意用下划线命名的，因为没有使用它的意图。

## 可选属性和字符串索引符号之间的宽松规则

TypeScript 的早期版本认为对象的可选属性不能用兼容索引符号赋值。TypeScript 4.2 允许这种赋值。
下面的代码在 4.2 版本中可以正常运行

```typescript
type WesAndersonWatchCount = {
  "Fantastic Mr. Fox"?: number;
  "The Royal Tenenbaums"?: number;
  "Moonrise Kingdom"?: number;
  "The Grand Budapest Hotel"?: number;
};
declare const wesAndersonWatchCount: WesAndersonWatchCount;
const movieWatchCount: { [key: string]: number } = wesAndersonWatchCount;
// ~~~~~~~~~~~~~~~ error!
// Type 'WesAndersonWatchCount' is not assignable to type '{ [key: string]: number; }'.
// Property '"Fantastic Mr. Fox"' is incompatible with index signature.
// Type 'number | undefined' is not assignable to type 'number'.
// Type 'undefined' is not assignable to type 'number'. (2322)
```

然而，4.2 版本中字符串索引类型不允许对类型中 undefined 的非可选属性进行赋值，也不允许将 undefined 写到特定键：

```typescript
type BatmanWatchCount = {
  "Batman Begins": number | undefined;
  "The Dark Knight": number | undefined;
  "The Dark Knight Rises": number | undefined;
};
declare const batmanWatchCount: BatmanWatchCount;
// Still an error in TypeScript 4.2.
// `undefined` is only ignored when properties are marked optional.
const movieWatchCount: { [key: string]: number } = batmanWatchCount;
// Still an error in TypeScript 4.2.
// Index signatures don't implicitly allow explicit `undefined`.
movieWatchCount["It's the Great Pumpkin, Charlie Brown"] = undefined;
```

新规则也不适用于数字索引符号，因为它们被假定为类似数组且密集的：

```typescript
declare let sortOfArrayish: { [key: number]: string };
declare let numberKeys: { 42?: string };
// Error! Type '{ 42?: string | undefined; }' is not assignable to type '{ [key: number]: string; }'.
sortOfArrayish = numberKeys;
```
