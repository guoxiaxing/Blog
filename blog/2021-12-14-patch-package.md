---
slug: patch-package
title: 如何优雅的修改第三方包
tags: [patch-package]
---

## 官方介绍

patch-package 给开发者提供了通过打“补丁”的方式，使得重新安装依赖包时能够保留之前对第三方依赖包的修改的一种解决方案。

## 应用场景

我们在使用第三方依赖包时如果遇到了 bug，通常解决的方式都是绕过这个问题，使用其他方式解决，较为麻烦。或者给作者提个 issue 或者 PR，然后等待作者的修复。等待的时间不可控，此时就可以借助 patch-package 自己动手去修复该 bug，感觉是不是很棒。并且还可以在第三方依赖包上，根据业务需求扩展能力。

> 最好还是扩展一些通用性比较高的能力，如果是比较通用且该能力大多数开发者都有这种诉求的话可以给第三方依赖包提个 PR。

## 使用方法

### 安装

都是在项目里自行安装

#### npm

```bash
npm i patch-package
```

#### yarn

```bash
yarn add patch-package postinstall-postinstall
```

#### 为什么 yarn 要添加 postinstall-postinstall 包

yarn 在 yarn、yarn install 和 yarn add <package> 之后运行 postinstall 脚本，但在 yarn remove <package> 之后不运行。如果您将此包添加到您的项目中，即使在 yarn remove <package> 之后，它也会执行您项目的 postinstall 钩子。这需要你的 postinstall 脚本是幂等的，因为它会为 yarn、yarn install 和 yarn add <package> 运行两次

### 修改 package.json

依赖包在安装完之后会执行 postinstall 命令

```json
"scripts": {
    ***,
+   "postinstall": "patch-package"
}
```

### 修改依赖包源码

### 生成补丁

```bash
yarn patch-package package-name(修改的包名)
# 或者
npx patch-package package-name（npm版本 > 5.2）
```

执行`npx patch-package antd`结果

```bash
npx patch-package antd
Need to install the following packages:
  patch-package
Ok to proceed? (y) y
patch-package 6.4.7
• Creating temporary folder
• Installing antd@4.17.3 with yarn
• Diffing your files with clean files
✔ Created file patches/antd+4.17.3.patch

💡 antd is on GitHub! To draft an issue based on your patch run

    yarn patch-package antd --create-issue

```
可以看到patch-package已经为我们创建了一个补丁。

默认会在我们的根目录下创建一个patches文件夹。在patches文件夹下会创建依赖包名+版本号.patch的文件，文件描述了我们修改了什么，第几行，有点像git的提交记录。

```text
diff --git a/node_modules/antd/lib/button/button.js b/node_modules/antd/lib/button/button.js
index da5fc9a..7eec125 100644
--- a/node_modules/antd/lib/button/button.js
+++ b/node_modules/antd/lib/button/button.js
@@ -143,40 +143,40 @@ var InternalButton = function InternalButton(props, ref) {
   var _classNames;
 
   var _props$loading = props.loading,
-      loading = _props$loading === void 0 ? false : _props$loading,
-      customizePrefixCls = props.prefixCls,
-      type = props.type,
-      danger = props.danger,
-      _props$shape = props.shape,
-      shape = _props$shape === void 0 ? 'default' : _props$shape,
-      customizeSize = props.size,
-      className = props.className,
-      children = props.children,
-      icon = props.icon,
-      _props$ghost = props.ghost,
-      ghost = _props$ghost === void 0 ? false : _props$ghost,
-      _props$block = props.block,
-      block = _props$block === void 0 ? false : _props$block,
-      _props$htmlType = props.htmlType,
-      htmlType = _props$htmlType === void 0 ? 'button' : _props$htmlType,
-      rest = __rest(props, ["loading", "prefixCls", "type", "danger", "shape", "size", "className", "children", "icon", "ghost", "block", "htmlType"]);
+    loading = _props$loading === void 0 ? false : _props$loading,
+    customizePrefixCls = props.prefixCls,
+    type = props.type,
+    danger = props.danger,
+    _props$shape = props.shape,
+    shape = _props$shape === void 0 ? 'default' : _props$shape,
+    customizeSize = props.size,
+    className = props.className,
+    children = props.children,
+    icon = props.icon,
+    _props$ghost = props.ghost,
+    ghost = _props$ghost === void 0 ? false : _props$ghost,
+    _props$block = props.block,
+    block = _props$block === void 0 ? false : _props$block,
+    _props$htmlType = props.htmlType,
+    htmlType = _props$htmlType === void 0 ? 'button' : _props$htmlType,
+    rest = __rest(props, ["loading", "prefixCls", "type", "danger", "shape", "size", "className", "children", "icon", "ghost", "block", "htmlType"]);
 
   var size = React.useContext(_SizeContext["default"]);
 
   var _React$useState = React.useState(!!loading),
-      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
-      innerLoading = _React$useState2[0],
-      setLoading = _React$useState2[1];
+    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
+    innerLoading = _React$useState2[0],
+    setLoading = _React$useState2[1];
 
   var _React$useState3 = React.useState(false),
-      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
-      hasTwoCNChar = _React$useState4[0],
-      setHasTwoCNChar = _React$useState4[1];
+    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
+    hasTwoCNChar = _React$useState4[0],
+    setHasTwoCNChar = _React$useState4[1];
 
   var _React$useContext = React.useContext(_configProvider.ConfigContext),
-      getPrefixCls = _React$useContext.getPrefixCls,
-      autoInsertSpaceInButton = _React$useContext.autoInsertSpaceInButton,
-      direction = _React$useContext.direction;
+    getPrefixCls = _React$useContext.getPrefixCls,
+    autoInsertSpaceInButton = _React$useContext.autoInsertSpaceInButton,
+    direction = _React$useContext.direction;
 
   var buttonRef = ref || /*#__PURE__*/React.createRef();
   var delayTimeoutRef = React.useRef();
@@ -218,10 +218,11 @@ var InternalButton = function InternalButton(props, ref) {
   React.useEffect(fixTwoCNChar, [buttonRef]);
 
   var handleClick = function handleClick(e) {
+    console.log(234567) // 我的修改
     var _a;
 
     var onClick = props.onClick,
-        disabled = props.disabled; // https://github.com/ant-design/ant-design/issues/30207
+      disabled = props.disabled; // https://github.com/ant-design/ant-design/issues/30207
 
     if (innerLoading || disabled) {
       e.preventDefault();
```
### 测试补丁是否有效

- 手动删除node_modules文件夹，重新执行yarn安装依赖包。可以看到在依赖包安装结束后执行了patch-package命令，之前生成的补丁被应用了。因为我们配置了postinstall脚本，所以会自动执行patch-package命令

```bash
$ patch-package
patch-package 6.4.7
Applying patches...
antd@4.17.3 ✔
✨  Done in 3.32s.
```

- 查看node-modules中之前修改的antd修改的地方，查看之前修改的代码是否还存在。如果之前修改的代码还存在，说明补丁文件已经生效了，如果不存在，排查下是否哪个步骤出现了问题。

antd/lib/button/button.js

```javascript
  var handleClick = function handleClick(e) {
    console.log(234567) // Ops! 存在
    var _a;

    var onClick = props.onClick,
      disabled = props.disabled; // https://github.com/ant-design/ant-design/issues/30207

    if (innerLoading || disabled) {
      e.preventDefault();
      return;
    }

    (_a = onClick) === null || _a === void 0 ? void 0 : _a(e);
  };
```

**最后将patches文件夹推送到远端仓库，日后无论是谁拉取代码，安装依赖，我们之前修改的部分都会生效的**

## 注意事项

1. patch是锁定版本号的，如果升级了版本，patch内容将会失效，最好在package.json能够锁定版本号。

2. 魔改的同时，也局限了升级的能力，尽量还是去提issue和PR。