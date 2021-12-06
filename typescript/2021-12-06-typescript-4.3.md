---
slug: typescript-4.3
title: Typescript 4.3 常用新特性
tags: [typescript]
---

## override 和 --noImplicitOverride 标志

当一个方法被标记为 override 时，TypeScript 将始终确保基类中存在一个具有相同名称的方法。

```typescript
class SomeComponent {
  setVisible(value: boolean) {
    // ...
  }
}
class SpecializedComponent extends SomeComponent {
  override show() {
  // ~~~~~~~~
  // Error! This method can't be marked with 'override' because it's not declared in 'SomeComponent'.
  // ...
  }
  // ...
}
```

TypeScript 4.3 还提供了一个新的 --noImplicitOverride 标志。启用此选项时，除非你显式使用一个 override 关键字，否则重写一个超类中的任何方法将生成错误。

## 永远 truthy 的 promise 检查

在 strictNullChecks 下，检查一个条件中的一个 Promise 是否“真实”会触发错误。

```typescript
async function foo(): Promise<boolean> {
  return false;
}
async function bar(): Promise<string> {
  if (foo()) {
    // ~~~~~
    // Error!
    // This condition will always return true since
    // this 'Promise<boolean>' appears to always be defined.
    // Did you forget to use 'await'?
    return "true";
  }
  return "false";
}
```

## static 索引签名

索引签名使我们可以在一个值上设置比一个类型显式声明更多的属性。

```typescript
class Foo {
  hello = "hello";
  world = 1234;
  // This is an index signature:
  [propName: string]: string | number | undefined;
}
let instance = new Foo();
// Valid assigment
instance["whatever"] = 42;
// Has type 'string | number | undefined'.
let x = instance["something"];
```

之前，索引签名只能在类的实例侧声明。现在我们可以将索引签名声明为 static。

```typescript
class Foo {
  static hello = "hello";
  static world = 1234;
  static [propName: string]: string | number | undefined;
}
// Valid.
Foo["whatever"] = 42;
// Has type 'string | number | undefined'
let x = Foo["something"];
```
