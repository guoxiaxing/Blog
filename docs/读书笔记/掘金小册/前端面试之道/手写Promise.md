---
slug: promise
title: 手写Promise
tags: [掘金小册, 前端面试之道, 手写Promise]
---

## 简易版本

### 初始代码

```javascript
// Promise 的三个状态

const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(executer) {
  const that = this; // 缓存that是因为代码可能会异步执行，用于获取正确的 this 对象
  that.state = PENDING; // 初始值是pending
  that.value = null; // 保存resolve或者reject传入的值
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];
}
```

- resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，因为当执行完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用

### resolve、reject 函数

写在 Promise 内部

```javascript
function resolve(val) {
  if (that.state === PENDING) {
    that.state = RESOLVED;
    that.value = val;
    that.resolvedCallbacks.map(cb => cb(that.value));
  }
}

function reject(reason) {
  if ((that.state = PENDING)) {
    that.state = REJECTED;
    that.value = reason;
    that.rejectedCallbacks(cb => cb(that.value));
  }
}
```

**状态只能从 pending 变成 resolved/rejected**

- 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
- 将当前状态更改为对应状态，并且将传入的值赋值给 value
- 遍历回调数组并执行

### 执行传入的函数

完成以上两个函数以后，我们就该实现如何执行 Promise 中传入的函数了

```javascript
try {
  fn(resolve, reject);
} catch (e) {
  reject(e);
}
```

- 要注意的是，可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数

### then 函数的实现

```javascript
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : e => {
          throw e;
        };
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
  }

  if (that.state === RESOLVED) {
    onFulfilled(that.value);
  }

  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};
```

- 判断传入的是否是函数，如果不是则透传之前的值
- 当状态不是等待态时，就去执行相对应的函数。如果状态是等待态的话，就往回调函数中 push 函数

## 实现一个符合 Promise/A+ 规范的 Promise

### 改造一下 resolve 和 reject 函数

```javascript
function resolve(value) {
  if (value instanceof MyPromise) {
    return value.then(resolve, reject);
  }
  setTimeout(() => {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.forEach(cb => cb(that.value));
    }
  }, 0);
}

function reject(reason) {
  setTimeout(() => {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = reason;
      that.rejectedCallbacks.forEach(cb => cb(that.value));
    }
  }, 0);
}
```

- Promise 是异步执行回调的

### 改造 then 函数

首先我们需要新增一个变量 promise2，因为每个 then 函数都需要返回一个新的 Promise 对象，该变量用于保存新的返回对象

```javascript
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : e => {
          throw e;
        };
  const p2 = new MyPromise((resolve, reject) => {
    if (that.state === PENDING) {
      that.resolvedCallbacks.push(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(p2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(p2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
  });

  if (that.state === RESOLVED) {
    setTimeout(() => {
      try {
        const x = onFulfilled(that.value);
        resolutionProcedure(p2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }, 0);
  }

  if (that.state === REJECTED) {
    setTimeout(() => {
      try {
        const x = onRejected(that.value);
        resolutionProcedure(p2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }, 0);
  }
};
```

- 首先我们返回了一个新的 Promise 对象，并在 Promise 中传入了一个函数
- 函数的基本逻辑还是和之前一样，往回调数组中 push 函数
- 同样，在执行函数的过程中可能会遇到错误，所以使用了 try...catch 包裹
- 规范规定，执行 onFulfilled 或者 onRejected 函数时会返回一个 x，并且执行 Promise 解决过程，这是为了不同的 Promise 都可以兼容使用(then 方法传入的函数的返回值也可能是 Promise)

### promise 的解决过程

```javascript
function resolutionProcedure(p2, x, resolve, reject) {
  // 首先规范规定了 x 不能与 promise2 相等，这样会发生循环引用的问题
  if (p2 === x) {
    throw reject(new TypeError("循环引用"));
  }
  // 这里的代码是完全按照规范实现的。如果 x 为 Promise 的话，需要判断以下几个情况：

  // 1. 如果 x 处于等待态，Promise 需保持为等待态直至 x 被执行或拒绝
  // 2. 如果 x 处于其他状态，则用相同的值处理 Promise

  if (x instanceof MyPromise) {
    // 先判断x的状态
    if (x.state === PENDING) {
      x.then(y => {
        // x状态还未改变，返回的下一个promise的resove的接收的值y不确定，对其递归处理
        resolutionProcedure(p2, y, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }

  let called = false;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolutionProcedure(p2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```

- 首先创建一个变量 called 用于判断是否已经调用过函数
- 然后判断 x 是否为对象或者函数，如果都不是的话，将 x 传入 resolve 中
- 如果 x 是对象或者函数的话，先把 x.then 赋值给 then，然后判断 then 的类型，如果不是函数类型的话，就将 x 传入 resolve 中
- 如果 then 是函数类型的话，就将 x 作为函数的作用域 this 调用之，并且传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise，两个回调函数都需要判断是否已经执行过函数，然后进行相应的逻辑

加 called 的目的

```javascript
// 比如下面这种情况, 就没要在执行onFulfilled(3);
let p = new MyPromise(resolve => {
  resolve(1);
})
  .then(v => {
    return {
      then: function(onFulfilled) {
        onFulfilled(2);
        onFulfilled(3);
      }
    };
  })
  .then(v => {
    console.log(v);
  });
```

## Promise 规范

### 术语

1. ‘promise’ 是一个有符合此标准的 then 方法的 object 或 function
2. ‘thenable’ 是 then 方法定义的 object 或 function
3. ‘value’ 是一个 JavaScript 合法值（包括 undefined，thenable，promise）- resolve 的 value
4. ‘exception’ 是一个 throw 语句抛出错误的值
5. ‘reason’ 是一个表明 promise 失败的原因的值

### 要求

#### 状态

- pending
- resolved
- rejected

只能由 pending -> resolved / pending -> rejected

##### resolved 状态

- 不能在改变为其他状态
- 必须要有一个 value

##### rejected 状态

- 不能再改变为其他状态
- 必须要有一个 reason

### then 方法

一个 promise 必须提供一个 then 方法，用来获取当前或最终的 value 或 reason

一个 promise 的 then 方法接受两个参数：

`promise.then(onFulfilled, onRejected)`

1. onFulfilled 和 onRejected 都是可选的，如果没有提供或者提供的不是函数则将值和 reason 透传

2. 如果 onFulfilled 是一个函数

- 他会在 promise 的状态变为 resolved 后调用，并且接收到一个 value
- 只会被调用一次

3. 如果 onRejected 是一个函数

- 他会在 promise 的状态变为 rejected 之后调用，并且接收到一个 reason
- 只会被调用一次

4.  onFulfilled 或 onRejected 都是异步调用，也就是说等同步代码执行完毕之后调用

5.  promise 的 then 可以链式调用多次

- 如果或当 promise 转态是 resolved 时，所有的 onFulfilled 回调回以他们注册时的顺序依次执行
- 如果或当 promise 转态是 rejected 时，所有的 onRejected 回调回以他们注册时的顺序依次执行

6. then 方法返回一个 promise `promise2 = promise1.then(onFulfilled, onRejected);`

- 如果 onFulfilled 或 onRejected 返回的是一个 x，那么它会以 `[[Resolve]](promise2, x)` 处理解析
- 如果 onFulfilled 或 onRejected 里抛出了一个异常，那么 promise2 必须捕获这个错误（接受一个 reason 参数）

```javascript
if (that.state === RESOLVED) {
  setTimeout(() => {
    try {
      const x = onFulfilled(that.value);
      resolutionProcedure(p2, x, resolve, reject);
    } catch (e) {
      reject(e);
    }
  }, 0);
}

if (that.state === REJECTED) {
  setTimeout(() => {
    try {
      const x = onRejected(that.value);
      resolutionProcedure(p2, x, resolve, reject);
    } catch (e) {
      reject(e);
    }
  }, 0);
}
```

- 如果 onFulfilled 不是一个函数，并且 promise1 状态是 resolved, promise2 一定会接受到与 promse1 一样的值 value
- 如果 onRejected 不是一个函数，并且 promise1 状态是 rejected，promise2 一定会接受到与 promise1 一样的值 reason

其实也就是值透传

### Promise 的处理程序

promise 处理程序是一个表现形式为 `[[Resolve]](promise, x)` 的抽象处理操作。如果 x 是 thenable 类型，它会尝试生成一个 promise 处理 x，否则它将直接 resolve x

`[[Resolve]](promise, x)` 的执行表现形式如下步骤：

1. 如果返回的 promise1 和 x 是指向同一个引用（循环引用），则抛出错误
2. 如果 x 是一个 promise 实例，则采用它的状态:

- 如果 x 是 pending 状态，那么保留它（递归执行这个 promise 处理程序），直到 pending 状态转为 resolved 或 rejected 状态
- 如果或当 x 状态是 resolved，resolve 它，并且传入和 promise1 一样的值 value
- 如果或当 x 状态是 rejected，reject 它，并且传入和 promise1 一样的值 reason

3. 如果 x 是个对象或函数类型

- 把 x.then 赋值给 then 变量
- 如果捕获（try，catch）到 x.then 抛出的错误的话，需要 reject 这个 promise
- 如果 then 是函数类型，那个用 x 调用它（将 then 的 this 指向 x）,第一个参数传 resolvePromise ，第二个参数传 rejectPromise
  - 如果或当 resolvePromise 被调用并接受一个参数 y 时，执行 `[[Resolve]](promise, y)`
  - 如果或当 rejectPromise 被调用并接受一个参数 r 时，执行 reject(r)
  - 如果 resolvePromise 和 rejectPromise 已经被调用或以相同的参数多次调用的话吗，优先第一次的调用，并且之后的调用全部被忽略（避免多次调用）
  - 如果 then 执行过程中抛出了异常
    - 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略异常
    - 否则，则 reject 这个异常

4. 如果 then 不是函数类型，直接 resolve x（resolve(x)）
5. 如果 x 即不是函数类型也不是对象类型，直接 resolve x（resolve(x)）

### 备注

1. onFulfilled 和 onRejected 都在下一轮的事件循环中（一个新的栈）被异步调用。可以用宏任务，例如：setTimeout，setImmediate 或者微任务，例如：MutationObsever 或 process.nextTick 实现。 由于 promise 的实现被当做平台代码，所以它本身可能包含一个任务队列或 “trampoline” 的处理程序
