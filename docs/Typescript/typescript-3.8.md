---
slug: typescript-3.8
title: Typescript 3.8 常用新特性
tags: [typescript]
---

## 类型限制的导入导出方法 (Type-Only Imports and Export)

TypeScript 3.8 为仅类型导入和导出添加了新语法。此时导入、导出的变量只能作为类型使用

```typescript
import type { SomeThing } from "./some-module.js";

export type { SomeThing };
```

```typescript
import type { Component } from "react";

interface ButtonProps {
    // ...
}

class Button extends Component<ButtonProps> {
    //               ~~~~~~~~~
    // error! 'Component' only refers to a type, but is being used as a value here.

    // ...
}
```

## ECMAScript 提案的私有字段（ECMAScript Private Fields）

### Private Fields 的基本特性

- js 中已经有提案，但是浏览器中还不支持

- typescript 中已经可以使用`#`来定义真正的私有属性了

```typescript
class Person {
    #name: string

    constructor(name: string) {
        this.#name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.#name}!`);
    }
}

let jeremy = new Person("Jeremy Bearimy");

jeremy.#name
//     ~~~~~
// Property '#name' is not accessible outside class 'Person'
// because it has a private identifier.
```

⚠️ 和常规属性(这里特别比较 private 修饰符声明的比较)不同，私有字段(private fields)拥有下面这些特性。

- 专用字段以 # 字符开头。有时我们称这些 prviate name。
- 每个专用字段名称都唯一地限定于其包含的类。
- TypeScript 辅助功能修饰符，例如 public，private 不能在私有字段上使用。

### Private Fields 的使用规范

除了能保存自己的私有这一属性以外，私有字段的另一个好处是我们刚才提到的唯一性。例如，常规属性声明易于在子类中被覆盖。而 `private fields` 是受保护的。

```typescript
class C {
  foo = 10;

  cHelper() {
    return this.foo;
  }
}

class D extends C {
  foo = 20;

  dHelper() {
    return this.foo;
  }
}

let instance = new D();
// 'this.foo' refers to the same property on each instance.
console.log(instance.cHelper()); // prints '20'
console.log(instance.dHelper()); // prints '20'
```

### 那我们到底该使用 # 定制的私有字段还是使用 private 修饰符?

当涉及到属性时，TypeScript 的`private`修饰符会并没有完全正确的执行，它的行为完全像普通属性一样，我们称之为 `soft privacy`, 我们依然可以通过 `['foo']` 这样的形式访问到。看下面的代码：

```typescript
class C {
  private foo = 10;
}

// This is an error at compile time,
// but when TypeScript outputs .js files,
// it'll run fine and print '10'.
console.log(new C().foo); // prints '10'
//                  ~~~
// error! Property 'foo' is private and only accessible within class 'C'.

// TypeScript allows this at compile-time
// as a "work-around" to avoid the error.
console.log(new C()["foo"]); // prints '10'
```

对比下面使用 `#` 私有字段，是完全访问不到的

```typescript
class C {
    #foo = 10;
}

console.log(new C().#foo); // SyntaxError
//                  ~~~~
// TypeScript reports an error *and*
// this won't work at runtime!

console.log(new C()["#foo"]); // prints undefined
//          ~~~~~~~~~~~~~~~
// TypeScript reports an error under 'noImplicitAny',
// and this prints 'undefined'.
```

**结论就是，如果你想严格的保护您的私有属性的值，就使用 `#` 即可，子类继承的时候也无需担心命名冲突的问题。当我们还是使用 `private` 的时候就需要注意对私有修饰符的定义的值修改的问题了.**

## export \* as xxx 语法使用

typescript 也支持这种用法啦，在导入模块的 as 重新定义模块名的模块的时候，我们可以重新导出到单独模块名。

menu.ts

```typescript
export const MENU1 = "nav: 菜单 1";
export const MENU2 = "nav: 菜单 2";
export const MENU3 = "nav: 菜单 3";
export const MENU4 = "nav: 菜单 4";
export const DEMO = "nav:Demo";
```

index.ts

```typescript
import * as menu from "./menu.ts";
console.log(menu.MENU1); // 'nav: 菜单 1'；
console.log(menu.MENU2); // 'nav: 菜单 2'；
// ....

export { menu };
```

### `import * as React from 'react'; vs import React from 'react';` 这两个使用有什么区别?

简而言之就是我们使用的 `import React from 'react'` 其实是导出的默认的模块，而用到 `* as` 是导出全部模块。

## 顶层 await 使用

js 也支持啦 😄

```typescript
const response = await fetch("...");
const greeting = await response.text();
console.log(greeting);

// Make sure we're a module
export {};
```

> 注意：顶层 await 只会在模块中起作用，在非模块文件中使用会报错。顶层 await 仅在模块的顶层起作用，并且只有当 TypeScript 找到一个真正可用的模块才允许使用，我们可以用一个 export {} 来检测是否在模块下使用。

```typescript
const response = await fetch("...");
const greeting = await response.text();
console.log(greeting);

// 'await' expressions are only allowed at the top level of a file when that file is a module, but this file has no imports or exports. Consider adding an empty 'export {}' to make this file a module.
```
