---
slug: toLocaleString
title: toLocaleString的隐藏用法
tags: [JavaScript, toLocaleString]
---

对于 toLocaleString 我们最常使用的还是将日期对象转换为字符串。新增的参数 locales 和 options 使程序能够指定使用哪种语言格式化规则，允许定制该方法的表现

## 语法

```javascript
obj.toLocaleString([locales [, options]])
```

## 哪些类中包含这个 API

- Array

- Date

- Number

## 参数

- locales：可选，带有 BCP 47 语言标记的字符串或字符串数组，用来表示要转为目标语言的类型，具体参考这个 [Intl](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- options：可选，配置属性对象。
  - style: 数字展示样式
    | style 字段值 | 说明 |
    | ---- | ---- |
    | decimal | 用于纯数字格式（默认） |
    | currency | 用于货币格式 |
    | percent | 用于百分比格式|
    | unit | 用于单位格式 |
  - currency: 当 options.style 为 currency 时，options.currency 用来表示货币单位的类型
    | currency 字段值 | 说明 |
    | ---- | ---- |
    | USD | 使用美元格式（默认） |
    | EUR | 使用欧元格式 |
    | CNY | 使用人民币格式|

## 示例

其实我们可以发现 toLocaleString 在使用到数字上是可以简化一些我们在数字转换方面的操作：

1. 数字转化为百分比
2. 数字转换为货币
3. 逗号分割

---

1. ❗️ 将数字每三位进行逗号分割

```javascript
const num = 10001;
num.toLocaleString(); // '1,001'
```

2. ❗️ 将数字转换为货币

```javascript
const cur = 100000001111;
cur.toLocaleString("zh", { style: "currency", currency: "CNY" }); // '¥100,000,001,111.00'
```

3. ❗️ 将数字转换为百分比

```javascript
const percent = 0.12;
percent.toLocaleString("zh", { style: "percent" }); // '12%'
```

4. 将冲数字/字符串的数组使用逗号拼接，类似于数组的 toString/join 操作

```javascript
const arr = [1, 2, 3];
arr.toLocaleString(); // '1,2,3'
```
