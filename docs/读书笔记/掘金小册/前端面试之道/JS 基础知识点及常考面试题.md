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

## == vs ===

`==` 会进行类型转换；`===` 则要求类型和值都相等。

`==` 的判断流程：

1. 类型是否相同，如果类型相同则是简单的值的比较
2. null == undefined => true
3. 类型不相同的话就先需要进行类型转换
  - 如果是string和number，会将string转为number
  - 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
  - 判断其中一方是否为 object 且另一方为原始类型，是的话就会把 object 转为原始类型再进行判断

例子：

```javascript
// string和number

1 == '1'
      ↓
1 ==  1

// 其中一方为boolean

'1' == true
        ↓
'1' ==  1
        ↓
 1  ==  1

 // 其中一方为object，另一方是原始值

 '1' == { name: 'yck' }
        ↓
'1' == '[object Object]'
```

思考题：

[] == ![] => true

分析： 

![] => false => 0

[] => '' => 0

[].valueOf() => [] 

[].toString() => '' 

Number('') => 0

## 闭包

闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。（一个函数可以访问外部函数中的变量）

在 JS 中，闭包存在的意义**就是让我们可以间接访问函数内部的变量。**

> 经典面试题，循环中使用闭包解决 `var` 定义函数的问题

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

首先因为 setTimeout 是个异步函数，所以会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6。

解决方式

1. var -> let

let 可以声明局部变量，这个变量仅仅在当前块中有效

2. 利用闭包+立即执行函数来解决 

```javascript

for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```
在上述代码中，我们首先使用了立即执行函数将 i 传入函数内部，这个时候值就被固定在了参数 j 上面不会改变，当下次执行 timer 这个闭包的时候，就可以使用外部函数的变量 j，从而达到目的。

3. 使用 setTimeout 的第三个参数，这个参数会被当成 timer 函数的参数传入。**这个是我不知道的**

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

## 深浅拷贝

> 什么是浅拷贝？如何实现浅拷贝？什么是深拷贝？如何实现深拷贝？

**对象类型在赋值的过程中其实是复制了地址，从而会导致改变了一方其他也都被改变的情况。**

### 浅拷贝

- Object.assign，返回值是传入的第一个对象
- {} 解构运算符(...)

浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了。

### 深拷贝

- JSON.parse(JSON.stringify(obj))

JSON.stringify(obj)的规则：

- 对于属性值为undefined、symbol、函数的属性会被过滤，如果这些类型的值作为数组的元素，则会被转换为null；函数或者undefined单独被转换时，会直接返回undefined，JSON.stringify(function() {}) -> undefined/JSON.stringify(undefined) -> undefined

- 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。一般来说都是{}

- 循环引用会报错

- bigint的值也不能被序列化

- 如果被转换的对象有toJSON的方法，则会直接调用该方法

- 布尔值，数字，字符串的包装对象，在被序列化的过程中会被转换为原始值

- 所有symbol属性的键在转换的时候都会被忽略，即使通过replacer函数强制指定包含了他们

- Date的日期对象会被转换为字符串

- NaN，Infinity和null都会被转为null

- 不可枚举的属性会被默认忽略

简易版本的深拷贝：

```javascript
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
function deepClone(obj) {
  if (!isObject(obj)) return obj;
  const target = Array.isArray(obj) ? [] : {};
  Reflect.ownKeys(obj).forEach(key => {
    target[key] = deepClone(obj[key]);
  })
  return target;
}

// 推荐

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
## 原型

> 如何理解原型？如何理解原型链？

每个函数都有一个prototype属性，指向这个函数的原型对象，这个对象上有一个constructor属性，指回构造函数本身；每个对象都有一个__proto__属性，表示这个对象的构造函数的原型对象（prototype属性）。

原型链：当我们访问对象的一个属性的时候，首先会在对象本身上查找，如果找不到就会到这个对象的原型对象(__proto__属性指向的对象)上去查找，如果没有就接着去找原型对象的原型对象上找，知道原型链的终点(null)上，如果还是没有就返回undefined

原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型，但是并不是所有函数都具有这个属性，Function.prototype.bind/Function.prototype.call/Function.prototype.apply 就没有这个属性。

Object.\_\_proto\_\_ => Function.prototype 

Function.prototype.\_\_proto\_\_ => Object.prototype

- Object.prototype 是所有对象的爸爸，所有对象都可以通过 \_\_proto\_\_ 找到它
- Function.prototype 是所有函数的爸爸，所有函数都可以通过 \_\_proto\_\_ 找到它
- 函数的 prototype 是一个对象

