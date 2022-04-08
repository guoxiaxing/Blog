---
slug: react-router
title: React Router原理
tags: [React, React Router]
---

## 单页应用

单页面应用是使用一个 html，一次性加载 js, css 等资源，所有页面都在一个容器页面下，页面切换实质是组件的切换。

## react-router、react-router-dom、history 三者的关系

- history 是 react-router 的核心。
- react-router 是 react-router-dom 的核心。
- react-router-dom 里面提供了 Link、Route、Routes、Router 组件（HashRouter/BrowserRouter）

## 单页面应用实现原理

单页面应用路由实现原理是，切换 url，监听 url 变化，从而渲染不同的页面组件。

主要的方式有 `history` 模式和 `hash` 模式。

### history 模式

#### 改变路由

1. history.pushState

```javascript
history.pushState(state, title, path);
```

- state：一个与指定网址相关的状态对象， popstate 事件触发时，该对象会传入回调函数。如果不需要可填 null。
- title：新页面的标题，但是所有浏览器目前都忽略这个值，可填 null。
- path：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个地址。

2. history.replaceState

```javascript
history.replaceState(state, title, path);
```

参数和 pushState 一样，这个方法会修改当前的 history 对象记录， history.length 的长度不会改变

#### 监听路由

popstate 事件

```javascript
window.addEventListener("popstate", function(e) {
  /* 监听改变 */
});
```

同一个文档的 history 对象出现变化时，就会触发 popstate 事件


> history.pushState 可以使浏览器地址改变，但是无需刷新页面。注意：用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。 popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 history.back()、history.forward()、history.go()方法。

### hash 模式

#### 改变路由

window.location.hash

通过 window.location.hash 属性获取和设置 hash 值。

#### 监听路由

onhashchange

```javascript
window.addEventListener("hashchange", function(e) {
  /* 监听改变 */
});
```

## 核心 API

### Router 组件

接收 location 变化，派发更新流；Router 作用是把 history location 等路由信息传递下去。

一个项目应该有一个根 Router ，来达到切换路由组件之前的更新作用。 如果存在多个 Router 会造成，会造成切换路由，页面不更新的情况。

### Routes 组件

是一个承载多个 Route 组件的容器

找到与当前 path,匹配的组件进行渲染。 通过 location.pathname 和组件的 path 进行匹配。找到符合 path 的 Route 组件。

### Route

组件页面承载容器

匹配 path,渲染组件。作为路由组件的容器,可以根据将实际的组件渲染出来。

取出当前上一级的 location,match 等信息。作为 prop 传递给页面组件。使得我们可以在页面组件中的 props 中获取 location ,match 等信息。

## demo

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Detail from "../src/page/detail";
import List from "../src/page/list";
import Index from "../src/page/home/index";

const menusList = [
  {
    name: "首页",
    path: "/index"
  },
  {
    name: "列表",
    path: "/list"
  },
  {
    name: "详情",
    path: "/detail"
  }
];
const index = () => {
  return (
    <div>
      <div>
        <Router>
          <div>
            {/* link 路由跳转 */
            menusList.map(router => (
              <Link key={router.path} to={router.path}>
                <span className="routerLink">{router.name}</span>
              </Link>
            ))}
          </div>
          <Routes>
            <Route path="/index" component={Index}></Route>
            <Route path="/list" component={List}></Route>
            <Route path="/detail" component={Detail}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
};
```

## 总结

history 提供了核心 api，如监听路由，更改路由的方法，已经保存路由状态 state。

react-router-dom 提供路由渲染组件，路由唯一性匹配组件，重定向组件等功能组件。

## 流程分析

当地址栏改变 url，组件的更新渲染都经历了什么？

拿 history 模式做参考。当 url 改变，首先触发 histoy，调用事件监听 popstate 事件， 触发回调函数 handlePopState，触发 history 下面的 setState 方法，产生新的 location 对象，然后通知 Router 组件更新 location 并通过 context 上下文传递，Routes 通过传递的更新流，匹配出符合的 Route 组件渲染，最后由 Route 组件取出 context 内容（location 和 match 信息传递给匹配到的渲染组件），传递给渲染页面，渲染更新。

当我们调用 history.push 方法，切换路由，组件的更新渲染又都经历了什么呢？

我们还是拿 history 模式作为参考，当我们调用 history.push 方法，首先调用 history 的 push 方法，通过 history.pushState 来改变当前 url，接下来触发 history 下面的 setState 方法，接下来的步骤就和上面一模一样
