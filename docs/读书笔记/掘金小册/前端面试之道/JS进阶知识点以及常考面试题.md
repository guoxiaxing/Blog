---
slug: JS进阶知识点以及常考面试题
title: JS 进阶知识点以及常考面试题
tags: [掘金小册, 前端面试之道, JS 进阶知识点以及常考面试题]
---

## 手写 call、apply、bind

:::info

call、apply、bind 的区别？

- call 和 apply 在改变 this 指向之后会立即执行；bind 则是返回一个新的女函数以供后续调用
- call 和 bind 传入的是参数列表，而 apply 则需要将所有参数作为一个数组传入
- bind 在改变 this 指向之后，this 指向不能再变，也就是说 bind 的 this 指向的是第一次调用是所传入的对象
- bind 返回的函数作为构造函数来调用的时候，不会被任何方式改变 this，所以对于这种情况我们需要忽略传入的 this

:::

```javascript
Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.myApply = function(context, args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  let result;
  if (Array.isArray(args)) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  let that = this;
  return function F(...args1) {
    if (this instanceof F) {
      return new that(...args, ...args1);
    }
    return that.apply(context, args.concat(args1));
  };
};
```

## new

> new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？

### new 所做的事情

1. 创建一个空的对象（obj），然后构造函数中的 this 指向这个对象
2. 为该对象添加一个\_\_proto\_\_属性，该属性指向构造函数的原型对象(prototype)
3. 指向构造函数中的代码，对这个对象赋值
4. 如果构造函数返回的是对象类型（typeof obj === 'object'）且不是 null，则返回构造函数返回的对象，否则返回 obj

```javascript
function myNew(Construc, ...args) {
  const obj = Object.create(Construc.prototype);
  const result = Construc.call(obj, ...args);
  return result !== null && typeof result === "object" ? result : obj;
}
```

### 通过 new 方式创建对象和通过字面量创建的区别？

**推荐使用字面量创建**

1. 它的代码量更少，更易读；
2. 对象字面量运行速度更快：它们不需要"作用域解析(scope resolution)"；因为存在我们创建了一个同名的构造函数 Object() 的可能，当我们调用 Object() 的时候，解析器需要顺着作用域链从当前作用域开始查找，如果在当前作用域找到了名为 Object() 的函数就执行，如果没找到，就继续顺着作用域链往上照，直到找到全局 Object() 构造函数为止（因为你使用 new Object() 的方式创建对象需要通过作用域链一层层找到 Object，但是你使用字面量的方式就没这个问题）

## instanceof

> instanceof 的原理是什么？
> 答：在前面对象的原型链上查找有没有后面构造函数的原型对象

**注：前面不是对象的话直接返回 false；后面不是函数的话报错**

```javascript
function myInstanceOf(obj, Construc) {
  let objProto = obj.__proto__;
  const ConsProto = Construc.prototype;
  while (objProto) {
    if (objProto === ConsProto) return true;
    objProto = objProto.__proto__;
  }
  return false;
}
```

## 为什么 0.1 + 0.2 !== 0.3

> 为什么 0.1 + 0.2 != 0.3？如何解决这个问题？

先说原因，因为 JS 采用 IEEE 754 双精度版本（64 位），并且只要采用 IEEE 754 的语言都有该问题。

计算机对于数字的存储使用的都是二进制；0.1 和 0.2 转化为二进制都是无限循环的。这样其实没什么问题，但是 JS 采用的浮点数标准却会裁剪掉我们的数字。

IEEE 754 双精度版本（64 位）将 64 位分为了三段

- 第一位用来表示符号
- 接下去的 11 位用来表示指数
- 其他的位数用来表示有效位，也就是用二进制表示 0.1 中的 10011(0011)

那么这些循环的数字被裁剪了，就会出现精度丢失的问题，也就造成了 0.1 不再是 0.1 了，而是变成了 0.100000000000000002

```javascript
0.100000000000000002 === 0.1; // true
```

那么同样的，0.2 在二进制也是无限循环的，被裁剪后也失去了精度变成了 0.200000000000000002

```javascript
0.200000000000000002 === 0.2; // true
```

所以这两者相加不等于 0.3 而是 0.300000000000000004

```javascript
0.1 + 0.2 === 0.30000000000000004; // true
```

那么可能你又会有一个疑问，既然 0.1 不是 0.1，那为什么 console.log(0.1) 却是正确的呢？

因为在输入内容的时候，二进制被转换为了十进制，十进制又被转换为了字符串，在这个转换的过程中发生了取近似值的过程，所以打印出来的其实是一个近似值，你也可以通过以下代码来验证

```javascript
console.log(0.100000000000000002); // 0.1
```

那么说完了为什么，最后来说说怎么解决这个问题吧。其实解决的办法有很多，这里我们选用原生提供的方式来最简单的解决问题

```javascript
console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
```

## 垃圾回收机制

> V8 下的垃圾回收机制是怎么样的？

V8 实现了准确式 GC，GC 算法采用了分代式垃圾回收机制。因此，V8 将内存（堆）分为新生代和老生代两部分。

### 新生代算法

新生代中的对象一般存活时间较短，使用 Scavenge GC 算法。

在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间。在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象会被放入 From 空间中，当 From 空间被占满时，新生代 GC 就会启动了。算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁。当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了。

### 老生代算法

老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是**标记清除算法**和**标记压缩算法**。

在讲算法前，先来说下什么情况下对象会出现在老生代空间中：

- 新生代中的对象是否已经经历过一次 Scavenge 算法，如果经历过的话，会将对象从新生代空间移到老生代空间中。
- To 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

在老生代中，以下情况会先启动标记清除算法：

- 某一个空间没有分块的时候
- 空间中对象超过一定限制
- 空间不能保证新生代中的对象移动到老生代中

在这个阶段中，会遍历堆中所有的对象，然后标记活的对象，在标记完成后，销毁所有没有被标记的对象。在标记大型堆内存时，可能需要几百毫秒才能完成一次标记。这就会导致一些性能上的问题。为了解决这个问题，2011 年，V8 从 stop-the-world 标记切换到增量标志。在增量标记期间，GC 将标记工作分解为更小的模块，可以让 JS 应用逻辑在模块间隙执行一会，从而不至于让应用出现停顿情况。但在 2018 年，GC 技术又有了一个重大突破，这项技术名为并发标记。该技术可以让 GC 扫描和标记对象时，同时允许 JS 运行。

清除对象后会造成堆内存出现碎片的情况，当碎片超过一定限制后会启动压缩算法。在压缩过程中，将活的对象向一端移动，直到所有对象都移动完成然后清理掉不需要的内存。
