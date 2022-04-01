---
slug: es6
title: ES6基础知识点及常考面试题
tags: [掘金小册, 前端面试之道, ES6基础知识点及常考面试题]
---

## var let const 的区别

- var 定义的是全局变量，定义的变量会被作为 window 的属性。let 和 const 定义的变量具有块级作用域，只在当前块中有效，**即使在全局作用域中添加的变量也不会作为 window 上的属性 - 对**

- var 有变量提升，let 和 const 定义的变量不会被提升，所以变量在声明之前不可以被访问，存在暂存性死区

- const 定义的是常量，必须初始化，值不可以被修改

- let 和 const 定义的变量在当前块中不可以被再次定义；但是 var 可以重复声明变量。var 已经在当前块中声明的变量，let 和 const 也不可以再次声明

> 为什么要存在提升这个事情呢，其实提升存在的根本原因就是为了解决函数间互相调用的情况
>
> ```javascript
> function test1() {
>   test2();
> }
> function test2() {
>   test1();
> }
> test1();
> ```
>
> 假如不存在提升这个情况，那么就实现不了上述的代码，因为不可能存在 test1 在 test2 前面然后 test2 又在 test1 前面。

### 总结

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
- var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
- var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
- let 和 const 作用基本一致，但是后者声明的变量不能再次赋值
- let 和 const 在当前作用域中不能定义重名变量

## 原型继承和 class 继承

### 原型继承

- 原型链：子类的原型等于父类的实例

优点： 简单

缺点： 共享父类的引用类型的属性；无法在创建子类实例的时候向父类构造函数传参；无法实现多继承

- 构造函数继承：在子类构造函数中通过 call/apply 方法调用父类的构造函数（Parent.call(this,args1,args2,...)）其实就是相当于在子类构造函数中将父类构造函数中的内容重写了一遍

优点：不会共享父类的引用类型属性；可以实现多继承；可以在构造子类实例的时候向父类构造函数传参

缺点：无法继承父类原型上的属性和方法

- 原型式继承：Object.create

```javascript
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

缺点：子类的 constructor 是 F；共享父类的引用类型属性（如果 obj 是父类实例）无法继承父类原型上的引用类型属性（如果是父类原型对象的话）

- 组合继承

```javascript
function Parent(value) {
  this.val = value;
}
Parent.prototype.getValue = function() {
  console.log(this.val);
};
function Child(value) {
  Parent.call(this, value);
}
Child.prototype = new Parent();
```

缺点：父类自身的属性被重复声明

- 寄生组合式继承：(推荐)

```javascript
// 继承原型对象上的属性和方法
Child.prototype = Object.create(Parent.prototype);
// 继承父类本身的属性和方法
function Child() {
  Parent.call(this);
}
Child.prototype.constructor = Child;
```

- Class 的 extends 继承

```javascript
Child.__proto__ === Parent;

Child.prototype.__proto__ === Parent.prototype;
```

**在子类构造函数中必须调用 super，因为这段代码可以看成 Parent.call(this, value)。**

> super 可以有两种使用方式：函数&对象
>
> 1. 函数：只能在子类的构造函数中使用，表示的是父类，相当于在子类的构造函数中调用父类的构造函数，继承父类本身的属性和方法
> 2. 对象：在子类方法中使用 super 对象，代表的是父类的原型对象，因为类的方法是被定义在原型上的

> JS 中并不存在 Class，它是构造函数的语法糖；Class 的本质都是函数

:::info

ES6 的继承：子类构造函数中必须调用 super 才可以使用 this；原因是子类是没有自己的 this 的，是继承父类的 this 然后对他进行改造。

ES5 的继承：在子类构造函数中通过 call 和 apply 方法调用父类的构造函数，将父类自身的属性和方法添加到子类的 this

ES5 继承的实质是，先创造子类实例对象的 this，然后再将父类的方法添加到子类的 this 上(Parent.call(this)；而 ES6 继承则是先创建父类的实例对象 this（所以必须在子类的构造函数中先调用 super 方法），然后子类的构造函数中再去修改 this。

:::

## 模块化

### 作用：

- 命名冲突
- 提高代码复用性
- 提高代码可维护性

### 实现方式

ES6 模块化/CommonJS 模块化

命名空间（对象）

立即执行函数，添加一些属性个方法到 window 上

#### ES6 模块化和 CommonJS 模块化的区别

- ES6 是静态的只读的引用（只能在最顶层使用，不能在块中使用）
- CommonJS 模块化：动态的变量拷贝（**浅拷贝**）（可以在条件语句中使用，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次）
- CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- ES6 是静态导入的，所以可以更好的进行 tree shaking
- JS 中现在也支持了动态的 import 来实现按需加载

#### CommonJS

```javascript
var module = require("./a.js");
module.a;
// 这里其实就是包装了一层立即执行函数，这样就不会污染全局变量了，
// 重要的是 module 这里，module 是 Node 独有的一个变量
module.exports = {
  a: 1
};
// module 基本实现
var module = {
  id: "xxxx", // 我总得知道怎么去找到他吧
  exports: {} // exports 就是个空对象
};
// 这个是为什么 exports 和 module.exports 用法相似的原因
var exports = module.exports;
var load = function(module) {
  // 导出的东西
  var a = 1;
  module.exports = a;
  return module.exports;
};
// 然后当我 require 的时候去找到独特的
// id，然后将要使用的东西用立即执行函数包装下，over
```

:::danger

另外虽然 exports 和 module.exports 用法相似，但是不能对 exports 直接赋值。因为 var exports = module.exports 这句代码表明了 exports 和 module.exports 享有相同地址，通过改变对象的属性值会对两者都起效，但是如果直接对 exports 赋值就会导致两者不再指向同一个内存地址，修改并不会对 module.exports 起效。

:::

## Proxy

在 Vue3.0 中将会通过 Proxy 来替换原本的 Object.defineProperty 来实现数据响应式。 Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

```javascript
let p = new Proxy(target, handler);
```

target 代表需要添加代理的对象，handler 用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。

```javascript
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value);
    }
  };
  return new Proxy(obj, handler);
};

let obj = { a: 1 };
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`);
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`);
  }
);
p.a = 2; // 监听到属性a改变
p.a; // 'a' = 2
```

Vue 中的响应式，需要我们在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。

```javascript
get(target, property, receiver) {
    getLogger(target, property)
    // 这句判断代码是新增的
    if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], handler);
    } else {
        return Reflect.get(target, property);
    }
}
```

## reduce

**reduce 可以将数组中的元素通过回调函数最终转换为一个值。**
