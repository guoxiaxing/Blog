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
