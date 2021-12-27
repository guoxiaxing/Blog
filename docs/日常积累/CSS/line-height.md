---
slug: line-height
title: 关于 line-height 属性
tags: [css]
---

# 关于 line-height 属性

- 没给元素设置高度时，元素高度采用的是 line-height 的高度，这个属性具有继承性。也自带默认值，所以当你给一个没有设置高度的元素设置 line-height:0;即使里面有文本，它也是会塌陷的。

- 可以分为好几种盒子，当你设置 line-height 的时候，行内框是不会变化的，改变的是行距，它只由 font-size 的决定。这其实就是上边元素 height 等于 line-height 的时候，元素内文本会垂直居中的原因。

- 取值为 number 时，line-height 为 number 乘以当前元素的 font-size,取 normal 时一般就是 number 为 1.2
