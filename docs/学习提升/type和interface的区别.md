---
slug: type-interface-diff
title: type和interface的区别
tags: [typescript]
---

## 相同点

- 都可以用来定义接口，即定义对象或者函数的形状

```typescript
interface Example {
  name: string;
  age: number;
}
interface ExampleFunc {
  (name: string, age: number): void;
}

type Example = {
  name: string;
  age: number;
};
type Example = (name: string, age: number) => void;
```

- 都可以实现继承，也可以相互继承，只不过形式不一样

type 是通过 `&` （交叉类型）实现，而 interface 是通过 extends 实现

```typescript
type Type1 = {
  name: string;
};
interface Interface1 {
  name: string;
}

type Type2 = Type1 & {
  age: number;
};
type Type2 = Interface1 & {
  age: number;
};
interface Interface2 extends Type1 {
  age: number;
}
interface Interface2 extends Interface1 {
  age: number;
}
```

## 区别

### type can but interface can't

- type - 类型别名，可以为原始类型重命名，而 interface 不可以 type A = number;

- type 定义的类型可以使用一些操作符，但是 interface 不行 type A = typeof obj / type A = keyof obj

- type 可以定义元组类型 type A = [number, string]

- type 可以使用交叉类型和联合类型 type A = A1 | A2 / type B = B1 & B2

### interface can but type can't

- interface 可以重复定义会进行声明合并，但是 type 不可以

```typescript
interface Test {
  name: string;
}
interface Test {
  age: number;
}

/*
        Test实际为 {
            name: string
            age: number
        }
    */
```
