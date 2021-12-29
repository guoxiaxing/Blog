---
slug: array-groupBy
title: 如何优雅的对数组进行分组
tags: [JavaScript, 数组分组]
---

我们在日常开发中，会经常碰到需要对数组进行分组的需求，但是由于我们没有原声的支持数组分组的方法，所以我们只能利用一些其他方式实现。

但是有一个好消息：原生的 JavaScript 的数组 groupBy 方法已经到了 stage3 了。

那么我们先看看怎么使用其他的方式来实现数组分组，先假设有一个这样的数组

```javascript
const items = [
  {
    type: "clothes",
    value: "👔"
  },
  {
    type: "clothes",
    value: "👕"
  },
  {
    type: "clothes",
    value: "👗"
  },
  {
    type: "animal",
    value: "🐷"
  },
  {
    type: "animal",
    value: "🐸"
  },
  {
    type: "animal",
    value: "🐒"
  }
];
```

我们希望按照 type 分成下面的格式

```javascript
const items = {
  clothes: [
    {
      type: "clothes",
      value: "👔"
    },
    {
      type: "clothes",
      value: "👕"
    },
    {
      type: "clothes",
      value: "👗"
    }
  ],
  animal: [
    {
      type: "animal",
      value: "🐷"
    },
    {
      type: "animal",
      value: "🐸"
    },
    {
      type: "animal",
      value: "🐒"
    }
  ]
};
```

## for 循环

```javascript
const groupedBy = {};

for (const item of items) {
  if (groupedBy[item.type]) {
    groupedBy[item.type].push(item);
  } else {
    groupedBy[item.type] = [item];
  }
}
```

## reduce

```javascript
const groupedBy = items.reduce((acc, item) => {
  if (acc[item.type]) {
    acc[item.type].push(item);
  } else {
    acc[item.type] = [item];
  }

  return acc;
}, {});
```

## filter

```javascript
const groupedBy = {
  clothes: items.filter(item => item.type === "clothes"),
  animal: items.filter(item => item.type === "animal")
};
```

## Array.prototype.groupBy

```javascript
items.groupBy(({ type }) => type);
```

groupBy 的回调中一共有三个参数：

- 参数 1：数组遍历到的当前对象
- 参数 2：index 索引
- 参数 3：原数组

```javascript
const array = [1, 2, 3, 4, 5];

// groupBy groups items by arbitrary key.
// In this case, we're grouping by even/odd keys
array.groupBy((num, index, array) => {
  return num % 2 === 0 ? "even" : "odd";
});
```

还可以用 `groupByToMap`，将数据分组为一个 `Map` 对象。

```javascript
// groupByToMap returns items in a Map, and is useful for grouping using
// an object key.
const odd = { odd: true };
const even = { even: true };
array.groupByToMap((num, index, array) => {
  return num % 2 === 0 ? even : odd;
});

// =>  Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }
```
