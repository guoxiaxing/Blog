---
slug: clone
title: 深浅拷贝
tags: [JavaScript, 拷贝]
---

## 深浅拷贝的定义

### 浅拷贝

创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址指向的值，就会影响到另一个对象。（创建一个新的对象，遍历对象的属性，直接`target[key] = origin[key]`，一遍遍历完成则拷贝结束）

### 深拷贝

将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象

## 浅拷贝的方式

- `target = Object.assign({}, origin)`

- 扩展运算符

- 数组：concat、slice

- 自定义函数

```javascript
function clone(origin) {
  const target = {};
  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = origin[key];
    }
  }
  return target;
}
```

## 深拷贝的方式

- JSON.parse(JSON.stringify(obj))

但是这样的拷贝方式有很多缺陷：

[JSON.stringify 的一些特点 🙋](https://www.jianshu.com/p/d9bbcf99c186)

- 对于属性值为 undefined、symbol、函数的属性会被过滤，如果这些类型的值作为数组的元素，则会被转换为 null；函数或者 undefined 单独被转换时，会直接返回 undefined，JSON.stringify(function() {}) -> undefined/JSON.stringify(undefined) -> undefined
- 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。一般来说都是{}
- 循环引用会报错
- bigint 的值也不能被序列化
- 被转换的对象如果定义了 toJSON 方法，那么会返回调用该方法的返回值
- 布尔值，数字，字符串的包装对象，在被序列化的过程中会被转换为原始值
- 所有 symbol 属性的键在转换的时候都会被忽略，即使通过 replacer 函数强制指定包含了他们
- Date 的日期对象会被转换为字符串
- NaN，Infinity 和 null 都会被转为 null
- 不可枚举的属性会被默认忽略

- 简单版本 但是这个无法解决循环引用的问题

```javascript
function clone(target) {
  if (target && typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

- 解决循环引用的版本

这个存储空间，需要可以存储 key-value 形式的数据，且 key 可以是一个引用类型，我们可以选择 Map 这种数据结构：

- 检查 map 中有无克隆过的对象

- 有 - 直接返回

- 没有 - 将当前对象作为 key，克隆对象作为 value 进行存储

- 继续克隆

```javascript
function clone(target, map = new Map()) {
  if (target && typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }

    map.set(target, cloneTarget);

    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }

    return cloneTarget;
  } else {
    return target;
  }
}
```

可以使用 WeakMap 来代替 Map

> WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

**什么是弱引用呢？**

> 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

举个例子：

如果我们使用 Map 的话，那么对象间是存在强引用关系的：

```javascript
let obj = { name: "Lily" };
const target = new Map();
map.set(obj, "123");
obj = null;
```

虽然我们手动将 obj，进行释放，然是 target 依然对 obj 存在强引用关系，所以这部分内存依然无法被释放。

再来看 WeakMap：

```javascript
let obj = { name: "Lily" };
const target = new WeakMap();
map.set(obj, "123");
obj = null;
```

如果是 WeakMap 的话， target 和 obj 存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

- 完善版本

```javascript
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

function deepClone(obj, map = new WeakMap()) {
  if (obj === null) return obj;
  if (!isObject(obj)) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (map.has(obj)) return map.get(obj);
  const target = new obj.constructor();
  map.set(obj, target);
  if (obj instanceof Set) {
    obj.forEach(val => target.add(deepClone(val, map)));
    return target;
  }
  if (obj instanceof Map) {
    map.forEach((val, key) => target.set(key, deepClone(val, map)));
    return target;
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = deepClone(obj[key], map);
    }
  }
  return target;
}
```

## 重中之重：浏览器提供了原生的深拷贝 API

原生的深拷贝 API：structuredClone。

它也有些缺点：

- 原型：无法拷贝对象的原型链。
- 函数：无法拷贝函数。
- 不可克隆：并没有支持所有类型的拷贝，比如 Error。

但是对于我们平常使用的拷贝功能是够用了
