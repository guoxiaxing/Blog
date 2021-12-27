---
slug: angular-form-contol-disabled
title: formControl的disabled属性绑定不生效
tags: [angular]
---

## 背景

我想在组件的某一个属性为 true 的时候禁用我的 checkbox，所以我就在 type='checkbox'的 input 框上添加了一个数据绑定`[disabled]='!!readonly'`并且我确定我的 readonly 属性是 true，然而，结果让我大吃一惊，没有生效，怎么会这样？？？？？

## 代码

```html
<label>
  <input
    type="checkbox"
    formControlName="correct"
    [style]="{ verticalAlign: 'text-bottom' }"
    [disabled]="!!readonly"
  />
  是
</label>
```

复选框仍然可以选择
但是我发现当我给下面的单选框设置一样的 disabled 属性的时候，它是符合预期的，再看看它的代码

```html
<label>
  <input
    type="radio"
    [checked]="!!item.value.correct"
    (change)="onRadioChange(i)"
    [style]="{ verticalAlign: 'text-bottom' }"
    [disabled]="!!readonly"
  />
  是
</label>
```

这个结果更是让我摸不着头脑 😭

## 排查过程

1. 直接给[disabled]='true' -> 不生效 ❌
2. 直接设置 disabled 属性 -> 生效，因为这就相当于操作了 input 标签本身的 html 属性，和 angular 就没啥关系了 ✅
3. diasbled='disabled' -> 生效，原因同二 ✅
4. [disabled] = 'readonly ? "disabled" : ""' -> 不生效 ❌

然后我似乎总结出了规律，只要是在 input 上使用了 angular 的数据绑定，即使计算之后的值是对的，也是无法生效的，但是直接使用 html 的 input 标签的属性就是可以的！！！所以是 angular 绑定的时候出问题了？？？

## 发现 Bug

功夫不负有心人，我终于发现了一些不一样的东西。
原来，不生效的原因是，我的 type='checkbox'的 input 是一个 formControl，所以 angular 更希望你通过给 fromControl 实例设置 disabled 来禁用它，而不是在它上面绑定[disabled]属性！！！！而且其实 angular 是给我报了一个警告的，只不过因为它是一个警告 ⚠️ 所以我认为它并不会是导致我代码不生效的原因！！！粗心大意太误人了 🤦‍♀

## 解决方式

1. 当然是使用 angular 推荐的方式，通过你的 formControl 实例来 disabled 这个表单项

```typescript
formControl.disable(); // 禁用
formControl.enable(); // 启用
```

2. 但是，由于我的这段代码并不是我写的，所以我采用了一种偷巧的方式，直接设置 input 原生的 disabled 属性，也是可以达到期望的

```html
<label fncFormItem>
  <input
    type="checkbox"
    formControlName="correct"
    [style]="{ verticalAlign: 'text-bottom' }"
    [attr.disabled]="!!readonly ? '' : null"
  />
  是
</label>
```

## 参考链接

[angular 的 formControl 的 disabled 属性绑定不生效](https://www.cnblogs.com/z7luv/p/15015895.html)
