---
slug: javascript
title: JS 基础知识点及常考面试题
tags: [掘金小册, 前端面试之道, JS基础知识点及常考面试题]
---

## 原始(Primitive)类型

- number
- string
- boolean
- null
- undefined
- symbol
- bigint

其中 `null` 和 `undefined` 是没有对应的包装类型的，其他原始值都有

原始值是没有属性和方法可以调用的。但是我们还是会发现我们可以在原始值上访问属性和执行方法，原因是 JS 会自动为我们进行装箱，转换为对应的包装对象（一个临时对象，在调用完方法或者访问完属性之后就会立即被销毁）

:::info

但是对于原始值访问属性/方法是有一个值不同的，那就是**number**

因为 number 是有浮点数的，所以 JS 是不知道我们是要调用方法/访问属性，还是这就是一个浮点数，所以对于 number 的方法调用我们需要把这个原始值现转化为一个表达式

```js
1.toString(); // 报错
(1).toString(); // '1'
```

:::

:::warning

关于 typeof null 为何为 object？

这个是 JS 底层的一个 bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object

:::

## 对象类型

### 对象类型和原始类型有什么区别？

对象类型存储的是指针，原始类型存储的是值

当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）

## typeof vs instanceof

typeof 可以判断准确判断除了 null 之外的原始值；对于对象类型，除了 function 其他都返回'object'。

所以对象对象类型的判断推荐是使用 instanceof

但是 instanceof 不能判断原始值类型，会直接返回 false

instanceof 原理：判断对象的原型链上是否有后面函数的原型对象。如果左侧的值不是对象，直接返回 false，如果右侧的不是函数直接报错

```javascript
function myInstanceof(obj, Construc) {
  let proto = obj.__proto__;
  let protoC = Construc.prototype;
  while (proto) {
    if (proto === protoC) return true;
    proto = proto.__proto__;
  }
  return false;
}
```

**instanceof 不是百分之百可靠的，是因为 instanceof 的判断基于的是原型链，而原型链是可以被修改的**

## 四则运算

### 加法

- 如果其中任意一方是字符串，那么就是字符串拼接

```javascript
1 + "1"; // '11'
```

- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```javascript
true + true; // 2
4 + [1, 2, 3]; // "41,2,3"
```

**那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字**

### 比较运算符

- 如果是对象，就通过 toPrimitive 转换对象

- 如果是字符串，就通过 unicode 字符索引来比较

## this

this 是动态确定的，函数在执行的时候才可以确定 this 值

- 全局作用域下 this 指向 window，严格模式下指向 undefined

- 对象的方法中，this 指向的是最近的调用它的对象

- new 运算符调用构函数时，t 构造函数中的 this 指向的是使用 new 创建的对象

- 事件处理函数中的 this 指向的是绑定该事件的元素

> 特殊情况：
> 箭头函数不绑定自己的 this，它的 this 取决于定义它的外部函数/上下文中的 this
> 所以箭头函数的 bind/call/apply 是无效的

bind、apply、call 可以改变函数中的 this 指向，指向我们传入的第一个参数，如果第一个参数是 null/undefined 则 this 指向的是全局对象

**不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定**

多种情况出现时，由优先级决定

new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。

![](/img/16717eaf3383aae8_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0.jpg)
