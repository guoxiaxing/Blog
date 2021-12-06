"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7790],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=l(n),d=i,y=m["".concat(p,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(y,a(a({ref:t},s),{},{components:n})):r.createElement(y,a({ref:t},s))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var l=2;l<o;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6882:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return l},assets:function(){return s},toc:function(){return u},default:function(){return d}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),a=["components"],c={slug:"typescript-4.3",title:"Typescript 4.3 \u5e38\u7528\u65b0\u7279\u6027",tags:["typescript"]},p=void 0,l={permalink:"/Blog/typescript/typescript-4.3",source:"@site/typescript/2021-12-06-typescript-4.3.md",title:"Typescript 4.3 \u5e38\u7528\u65b0\u7279\u6027",description:"override \u548c --noImplicitOverride \u6807\u5fd7",date:"2021-12-06T00:00:00.000Z",formattedDate:"December 6, 2021",tags:[{label:"typescript",permalink:"/Blog/typescript/tags/typescript"}],readingTime:1.85,truncated:!1,authors:[],prevItem:{title:"Typescript 4.2 \u5e38\u7528\u65b0\u7279\u6027",permalink:"/Blog/typescript/typescript-4.2"},nextItem:{title:"Typescript 4.4 \u5e38\u7528\u65b0\u7279\u6027",permalink:"/Blog/typescript/typescript-4.4"}},s={authorsImageUrls:[]},u=[{value:"override \u548c --noImplicitOverride \u6807\u5fd7",id:"override-\u548c---noimplicitoverride-\u6807\u5fd7",children:[],level:2},{value:"\u6c38\u8fdc truthy \u7684 promise \u68c0\u67e5",id:"\u6c38\u8fdc-truthy-\u7684-promise-\u68c0\u67e5",children:[],level:2},{value:"static \u7d22\u5f15\u7b7e\u540d",id:"static-\u7d22\u5f15\u7b7e\u540d",children:[],level:2}],m={toc:u};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"override-\u548c---noimplicitoverride-\u6807\u5fd7"},"override \u548c --noImplicitOverride \u6807\u5fd7"),(0,o.kt)("p",null,"\u5f53\u4e00\u4e2a\u65b9\u6cd5\u88ab\u6807\u8bb0\u4e3a override \u65f6\uff0cTypeScript \u5c06\u59cb\u7ec8\u786e\u4fdd\u57fa\u7c7b\u4e2d\u5b58\u5728\u4e00\u4e2a\u5177\u6709\u76f8\u540c\u540d\u79f0\u7684\u65b9\u6cd5\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"class SomeComponent {\n  setVisible(value: boolean) {\n    // ...\n  }\n}\nclass SpecializedComponent extends SomeComponent {\n  override show() {\n  // ~~~~~~~~\n  // Error! This method can't be marked with 'override' because it's not declared in 'SomeComponent'.\n  // ...\n  }\n  // ...\n}\n")),(0,o.kt)("p",null,"TypeScript 4.3 \u8fd8\u63d0\u4f9b\u4e86\u4e00\u4e2a\u65b0\u7684 --noImplicitOverride \u6807\u5fd7\u3002\u542f\u7528\u6b64\u9009\u9879\u65f6\uff0c\u9664\u975e\u4f60\u663e\u5f0f\u4f7f\u7528\u4e00\u4e2a override \u5173\u952e\u5b57\uff0c\u5426\u5219\u91cd\u5199\u4e00\u4e2a\u8d85\u7c7b\u4e2d\u7684\u4efb\u4f55\u65b9\u6cd5\u5c06\u751f\u6210\u9519\u8bef\u3002"),(0,o.kt)("h2",{id:"\u6c38\u8fdc-truthy-\u7684-promise-\u68c0\u67e5"},"\u6c38\u8fdc truthy \u7684 promise \u68c0\u67e5"),(0,o.kt)("p",null,"\u5728 strictNullChecks \u4e0b\uff0c\u68c0\u67e5\u4e00\u4e2a\u6761\u4ef6\u4e2d\u7684\u4e00\u4e2a Promise \u662f\u5426\u201c\u771f\u5b9e\u201d\u4f1a\u89e6\u53d1\u9519\u8bef\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"async function foo(): Promise<boolean> {\n  return false;\n}\nasync function bar(): Promise<string> {\n  if (foo()) {\n    // ~~~~~\n    // Error!\n    // This condition will always return true since\n    // this 'Promise<boolean>' appears to always be defined.\n    // Did you forget to use 'await'?\n    return \"true\";\n  }\n  return \"false\";\n}\n")),(0,o.kt)("h2",{id:"static-\u7d22\u5f15\u7b7e\u540d"},"static \u7d22\u5f15\u7b7e\u540d"),(0,o.kt)("p",null,"\u7d22\u5f15\u7b7e\u540d\u4f7f\u6211\u4eec\u53ef\u4ee5\u5728\u4e00\u4e2a\u503c\u4e0a\u8bbe\u7f6e\u6bd4\u4e00\u4e2a\u7c7b\u578b\u663e\u5f0f\u58f0\u660e\u66f4\u591a\u7684\u5c5e\u6027\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'class Foo {\n  hello = "hello";\n  world = 1234;\n  // This is an index signature:\n  [propName: string]: string | number | undefined;\n}\nlet instance = new Foo();\n// Valid assigment\ninstance["whatever"] = 42;\n// Has type \'string | number | undefined\'.\nlet x = instance["something"];\n')),(0,o.kt)("p",null,"\u4e4b\u524d\uff0c\u7d22\u5f15\u7b7e\u540d\u53ea\u80fd\u5728\u7c7b\u7684\u5b9e\u4f8b\u4fa7\u58f0\u660e\u3002\u73b0\u5728\u6211\u4eec\u53ef\u4ee5\u5c06\u7d22\u5f15\u7b7e\u540d\u58f0\u660e\u4e3a static\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'class Foo {\n  static hello = "hello";\n  static world = 1234;\n  static [propName: string]: string | number | undefined;\n}\n// Valid.\nFoo["whatever"] = 42;\n// Has type \'string | number | undefined\'\nlet x = Foo["something"];\n')))}d.isMDXComponent=!0}}]);