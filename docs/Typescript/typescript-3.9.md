---
slug: typescript-3.9
title: Typescript 3.9 常用新特性
tags: [typescript]
---

## 写在前面

挑重点的讲一讲

## 在条件语句中检测未调用的函数

- 在 3.7 的时候引入了检测未调用函数错误提示，3.9 做了部分优化

```typescript
function hasImportantPermissions(): boolean {
  // ...
}
// Oops!
if (hasImportantPermissions) {
  //  ~~~~~~~~~~~~~~~~~~~~~~~
  // This condition will always return true since the function is always defined.
  // Did you mean to call it instead?
  deleteAllTheImportantFiles();
}
```

但是，此错误仅适用于 if 语句中的条件。现在三元条件（即语法）现在也支持此功能。

```typescript
declare function listFilesOfDirectory(dirPath: string): string[];
declare function isDirectory(): boolean;
function getAllFiles(startFileName: string) {
  const result: string[] = [];
  traverse(startFileName);
  return result;
  function traverse(currentPath: string) {
    return isDirectory
      ? //     ~~~~~~~~~~~
        // This condition will always return true
        // since the function is always defined.
        // Did you mean to call it instead?
        listFilesOfDirectory(currentPath).forEach(traverse)
      : result.push(currentPath);
  }
}
```

## 解析可选链与非 null 断言中的差异

- TypeScript 最近实现了对可选链操作符的支持，但根据广大使用者的反馈，非 null 断言操作符（!）的可选链（?.）行为不符合直觉。

```typescript
foo?.bar!.baz;
```

被解释为等效于以下 JavaScript 代码：

```javascript
(foo?.bar).baz;
```

> 在以上代码中，括号会阻止可选链的“短路”行为；因此如果未定义 foo 为 undefined，则访问 baz 会引发运行时错误。

换句话说，大多数人认为以上原始代码片段应该被解释为在：

```typescript
foo?.bar.baz;
```

中，当 foo 为 undefined 时，计算结果为 undefined。

这是一项重大变化，但我们认为大部分代码在编写时都是为了考虑新的解释场景。如果您希望继续使用旧有行为，则可在!操作符左侧添加括号，如下所示：

```
(foo?.bar)!.baz;
```
