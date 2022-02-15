"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8208],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},p=Object.keys(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,p=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=s(n),d=a,y=m["".concat(l,".").concat(d)]||m[d]||u[d]||p;return n?r.createElement(y,o(o({ref:t},c),{},{components:n})):r.createElement(y,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=n.length,o=new Array(p);o[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<p;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},457:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return c},default:function(){return m}});var r=n(7462),a=n(3366),p=(n(7294),n(3905)),o=["components"],i={slug:"typescript-3.8",title:"Typescript 3.8 \u5e38\u7528\u65b0\u7279\u6027",tags:["typescript"]},l=void 0,s={unversionedId:"Typescript/typescript-3.8",id:"Typescript/typescript-3.8",isDocsHomePage:!1,title:"Typescript 3.8 \u5e38\u7528\u65b0\u7279\u6027",description:"\u7c7b\u578b\u9650\u5236\u7684\u5bfc\u5165\u5bfc\u51fa\u65b9\u6cd5 (Type-Only Imports and Export)",source:"@site/docs/Typescript/typescript-3.8.md",sourceDirName:"Typescript",slug:"/Typescript/typescript-3.8",permalink:"/Blog/docs/Typescript/typescript-3.8",tags:[{label:"typescript",permalink:"/Blog/docs/tags/typescript"}],version:"current",frontMatter:{slug:"typescript-3.8",title:"Typescript 3.8 \u5e38\u7528\u65b0\u7279\u6027",tags:["typescript"]},sidebar:"tutorialSidebar",previous:{title:"Typescript 3.7 \u5e38\u7528\u65b0\u7279\u6027",permalink:"/Blog/docs/Typescript/typescript-3.7"},next:{title:"Typescript 3.9 \u5e38\u7528\u65b0\u7279\u6027",permalink:"/Blog/docs/Typescript/typescript-3.9"}},c=[{value:"\u7c7b\u578b\u9650\u5236\u7684\u5bfc\u5165\u5bfc\u51fa\u65b9\u6cd5 (Type-Only Imports and Export)",id:"\u7c7b\u578b\u9650\u5236\u7684\u5bfc\u5165\u5bfc\u51fa\u65b9\u6cd5-type-only-imports-and-export",children:[],level:2},{value:"ECMAScript \u63d0\u6848\u7684\u79c1\u6709\u5b57\u6bb5\uff08ECMAScript Private Fields\uff09",id:"ecmascript-\u63d0\u6848\u7684\u79c1\u6709\u5b57\u6bb5ecmascript-private-fields",children:[{value:"Private Fields \u7684\u57fa\u672c\u7279\u6027",id:"private-fields-\u7684\u57fa\u672c\u7279\u6027",children:[],level:3},{value:"Private Fields \u7684\u4f7f\u7528\u89c4\u8303",id:"private-fields-\u7684\u4f7f\u7528\u89c4\u8303",children:[],level:3},{value:"\u90a3\u6211\u4eec\u5230\u5e95\u8be5\u4f7f\u7528 # \u5b9a\u5236\u7684\u79c1\u6709\u5b57\u6bb5\u8fd8\u662f\u4f7f\u7528 private \u4fee\u9970\u7b26?",id:"\u90a3\u6211\u4eec\u5230\u5e95\u8be5\u4f7f\u7528--\u5b9a\u5236\u7684\u79c1\u6709\u5b57\u6bb5\u8fd8\u662f\u4f7f\u7528-private-\u4fee\u9970\u7b26",children:[],level:3}],level:2},{value:"export * as xxx \u8bed\u6cd5\u4f7f\u7528",id:"export--as-xxx-\u8bed\u6cd5\u4f7f\u7528",children:[{value:"<code>import * as React from &#39;react&#39;; vs import React from &#39;react&#39;;</code> \u8fd9\u4e24\u4e2a\u4f7f\u7528\u6709\u4ec0\u4e48\u533a\u522b?",id:"import--as-react-from-react-vs-import-react-from-react-\u8fd9\u4e24\u4e2a\u4f7f\u7528\u6709\u4ec0\u4e48\u533a\u522b",children:[],level:3}],level:2},{value:"\u9876\u5c42 await \u4f7f\u7528",id:"\u9876\u5c42-await-\u4f7f\u7528",children:[],level:2}],u={toc:c};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,p.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,p.kt)("h2",{id:"\u7c7b\u578b\u9650\u5236\u7684\u5bfc\u5165\u5bfc\u51fa\u65b9\u6cd5-type-only-imports-and-export"},"\u7c7b\u578b\u9650\u5236\u7684\u5bfc\u5165\u5bfc\u51fa\u65b9\u6cd5 (Type-Only Imports and Export)"),(0,p.kt)("p",null,"TypeScript 3.8 \u4e3a\u4ec5\u7c7b\u578b\u5bfc\u5165\u548c\u5bfc\u51fa\u6dfb\u52a0\u4e86\u65b0\u8bed\u6cd5\u3002\u6b64\u65f6\u5bfc\u5165\u3001\u5bfc\u51fa\u7684\u53d8\u91cf\u53ea\u80fd\u4f5c\u4e3a\u7c7b\u578b\u4f7f\u7528"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},'import type { SomeThing } from "./some-module.js";\n\nexport type { SomeThing };\n')),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"import type { Component } from \"react\";\n\ninterface ButtonProps {\n    // ...\n}\n\nclass Button extends Component<ButtonProps> {\n    //               ~~~~~~~~~\n    // error! 'Component' only refers to a type, but is being used as a value here.\n\n    // ...\n}\n")),(0,p.kt)("h2",{id:"ecmascript-\u63d0\u6848\u7684\u79c1\u6709\u5b57\u6bb5ecmascript-private-fields"},"ECMAScript \u63d0\u6848\u7684\u79c1\u6709\u5b57\u6bb5\uff08ECMAScript Private Fields\uff09"),(0,p.kt)("h3",{id:"private-fields-\u7684\u57fa\u672c\u7279\u6027"},"Private Fields \u7684\u57fa\u672c\u7279\u6027"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"js \u4e2d\u5df2\u7ecf\u6709\u63d0\u6848\uff0c\u4f46\u662f\u6d4f\u89c8\u5668\u4e2d\u8fd8\u4e0d\u652f\u6301")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"typescript \u4e2d\u5df2\u7ecf\u53ef\u4ee5\u4f7f\u7528",(0,p.kt)("inlineCode",{parentName:"p"},"#"),"\u6765\u5b9a\u4e49\u771f\u6b63\u7684\u79c1\u6709\u5c5e\u6027\u4e86"))),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"class Person {\n    #name: string\n\n    constructor(name: string) {\n        this.#name = name;\n    }\n\n    greet() {\n        console.log(`Hello, my name is ${this.#name}!`);\n    }\n}\n\nlet jeremy = new Person(\"Jeremy Bearimy\");\n\njeremy.#name\n//     ~~~~~\n// Property '#name' is not accessible outside class 'Person'\n// because it has a private identifier.\n")),(0,p.kt)("p",null,"\u26a0\ufe0f \u548c\u5e38\u89c4\u5c5e\u6027(\u8fd9\u91cc\u7279\u522b\u6bd4\u8f83 private \u4fee\u9970\u7b26\u58f0\u660e\u7684\u6bd4\u8f83)\u4e0d\u540c\uff0c\u79c1\u6709\u5b57\u6bb5(private fields)\u62e5\u6709\u4e0b\u9762\u8fd9\u4e9b\u7279\u6027\u3002"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"\u4e13\u7528\u5b57\u6bb5\u4ee5 # \u5b57\u7b26\u5f00\u5934\u3002\u6709\u65f6\u6211\u4eec\u79f0\u8fd9\u4e9b prviate name\u3002"),(0,p.kt)("li",{parentName:"ul"},"\u6bcf\u4e2a\u4e13\u7528\u5b57\u6bb5\u540d\u79f0\u90fd\u552f\u4e00\u5730\u9650\u5b9a\u4e8e\u5176\u5305\u542b\u7684\u7c7b\u3002"),(0,p.kt)("li",{parentName:"ul"},"TypeScript \u8f85\u52a9\u529f\u80fd\u4fee\u9970\u7b26\uff0c\u4f8b\u5982 public\uff0cprivate \u4e0d\u80fd\u5728\u79c1\u6709\u5b57\u6bb5\u4e0a\u4f7f\u7528\u3002")),(0,p.kt)("h3",{id:"private-fields-\u7684\u4f7f\u7528\u89c4\u8303"},"Private Fields \u7684\u4f7f\u7528\u89c4\u8303"),(0,p.kt)("p",null,"\u9664\u4e86\u80fd\u4fdd\u5b58\u81ea\u5df1\u7684\u79c1\u6709\u8fd9\u4e00\u5c5e\u6027\u4ee5\u5916\uff0c\u79c1\u6709\u5b57\u6bb5\u7684\u53e6\u4e00\u4e2a\u597d\u5904\u662f\u6211\u4eec\u521a\u624d\u63d0\u5230\u7684\u552f\u4e00\u6027\u3002\u4f8b\u5982\uff0c\u5e38\u89c4\u5c5e\u6027\u58f0\u660e\u6613\u4e8e\u5728\u5b50\u7c7b\u4e2d\u88ab\u8986\u76d6\u3002\u800c ",(0,p.kt)("inlineCode",{parentName:"p"},"private fields")," \u662f\u53d7\u4fdd\u62a4\u7684\u3002"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"class C {\n  foo = 10;\n\n  cHelper() {\n    return this.foo;\n  }\n}\n\nclass D extends C {\n  foo = 20;\n\n  dHelper() {\n    return this.foo;\n  }\n}\n\nlet instance = new D();\n// 'this.foo' refers to the same property on each instance.\nconsole.log(instance.cHelper()); // prints '20'\nconsole.log(instance.dHelper()); // prints '20'\n")),(0,p.kt)("h3",{id:"\u90a3\u6211\u4eec\u5230\u5e95\u8be5\u4f7f\u7528--\u5b9a\u5236\u7684\u79c1\u6709\u5b57\u6bb5\u8fd8\u662f\u4f7f\u7528-private-\u4fee\u9970\u7b26"},"\u90a3\u6211\u4eec\u5230\u5e95\u8be5\u4f7f\u7528 # \u5b9a\u5236\u7684\u79c1\u6709\u5b57\u6bb5\u8fd8\u662f\u4f7f\u7528 private \u4fee\u9970\u7b26?"),(0,p.kt)("p",null,"\u5f53\u6d89\u53ca\u5230\u5c5e\u6027\u65f6\uff0cTypeScript \u7684",(0,p.kt)("inlineCode",{parentName:"p"},"private"),"\u4fee\u9970\u7b26\u4f1a\u5e76\u6ca1\u6709\u5b8c\u5168\u6b63\u786e\u7684\u6267\u884c\uff0c\u5b83\u7684\u884c\u4e3a\u5b8c\u5168\u50cf\u666e\u901a\u5c5e\u6027\u4e00\u6837\uff0c\u6211\u4eec\u79f0\u4e4b\u4e3a ",(0,p.kt)("inlineCode",{parentName:"p"},"soft privacy"),", \u6211\u4eec\u4f9d\u7136\u53ef\u4ee5\u901a\u8fc7 ",(0,p.kt)("inlineCode",{parentName:"p"},"['foo']")," \u8fd9\u6837\u7684\u5f62\u5f0f\u8bbf\u95ee\u5230\u3002\u770b\u4e0b\u9762\u7684\u4ee3\u7801\uff1a"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"class C {\n  private foo = 10;\n}\n\n// This is an error at compile time,\n// but when TypeScript outputs .js files,\n// it'll run fine and print '10'.\nconsole.log(new C().foo); // prints '10'\n//                  ~~~\n// error! Property 'foo' is private and only accessible within class 'C'.\n\n// TypeScript allows this at compile-time\n// as a \"work-around\" to avoid the error.\nconsole.log(new C()[\"foo\"]); // prints '10'\n")),(0,p.kt)("p",null,"\u5bf9\u6bd4\u4e0b\u9762\u4f7f\u7528 ",(0,p.kt)("inlineCode",{parentName:"p"},"#")," \u79c1\u6709\u5b57\u6bb5\uff0c\u662f\u5b8c\u5168\u8bbf\u95ee\u4e0d\u5230\u7684"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"class C {\n    #foo = 10;\n}\n\nconsole.log(new C().#foo); // SyntaxError\n//                  ~~~~\n// TypeScript reports an error *and*\n// this won't work at runtime!\n\nconsole.log(new C()[\"#foo\"]); // prints undefined\n//          ~~~~~~~~~~~~~~~\n// TypeScript reports an error under 'noImplicitAny',\n// and this prints 'undefined'.\n")),(0,p.kt)("p",null,(0,p.kt)("strong",{parentName:"p"},"\u7ed3\u8bba\u5c31\u662f\uff0c\u5982\u679c\u4f60\u60f3\u4e25\u683c\u7684\u4fdd\u62a4\u60a8\u7684\u79c1\u6709\u5c5e\u6027\u7684\u503c\uff0c\u5c31\u4f7f\u7528 ",(0,p.kt)("inlineCode",{parentName:"strong"},"#")," \u5373\u53ef\uff0c\u5b50\u7c7b\u7ee7\u627f\u7684\u65f6\u5019\u4e5f\u65e0\u9700\u62c5\u5fc3\u547d\u540d\u51b2\u7a81\u7684\u95ee\u9898\u3002\u5f53\u6211\u4eec\u8fd8\u662f\u4f7f\u7528 ",(0,p.kt)("inlineCode",{parentName:"strong"},"private")," \u7684\u65f6\u5019\u5c31\u9700\u8981\u6ce8\u610f\u5bf9\u79c1\u6709\u4fee\u9970\u7b26\u7684\u5b9a\u4e49\u7684\u503c\u4fee\u6539\u7684\u95ee\u9898\u4e86.")),(0,p.kt)("h2",{id:"export--as-xxx-\u8bed\u6cd5\u4f7f\u7528"},"export ","*"," as xxx \u8bed\u6cd5\u4f7f\u7528"),(0,p.kt)("p",null,"typescript \u4e5f\u652f\u6301\u8fd9\u79cd\u7528\u6cd5\u5566\uff0c\u5728\u5bfc\u5165\u6a21\u5757\u7684 as \u91cd\u65b0\u5b9a\u4e49\u6a21\u5757\u540d\u7684\u6a21\u5757\u7684\u65f6\u5019\uff0c\u6211\u4eec\u53ef\u4ee5\u91cd\u65b0\u5bfc\u51fa\u5230\u5355\u72ec\u6a21\u5757\u540d\u3002"),(0,p.kt)("p",null,"menu.ts"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},'export const MENU1 = "nav: \u83dc\u5355 1";\nexport const MENU2 = "nav: \u83dc\u5355 2";\nexport const MENU3 = "nav: \u83dc\u5355 3";\nexport const MENU4 = "nav: \u83dc\u5355 4";\nexport const DEMO = "nav:Demo";\n')),(0,p.kt)("p",null,"index.ts"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"import * as menu from \"./menu.ts\";\nconsole.log(menu.MENU1); // 'nav: \u83dc\u5355 1'\uff1b\nconsole.log(menu.MENU2); // 'nav: \u83dc\u5355 2'\uff1b\n// ....\n\nexport { menu };\n")),(0,p.kt)("h3",{id:"import--as-react-from-react-vs-import-react-from-react-\u8fd9\u4e24\u4e2a\u4f7f\u7528\u6709\u4ec0\u4e48\u533a\u522b"},(0,p.kt)("inlineCode",{parentName:"h3"},"import * as React from 'react'; vs import React from 'react';")," \u8fd9\u4e24\u4e2a\u4f7f\u7528\u6709\u4ec0\u4e48\u533a\u522b?"),(0,p.kt)("p",null,"\u7b80\u800c\u8a00\u4e4b\u5c31\u662f\u6211\u4eec\u4f7f\u7528\u7684 ",(0,p.kt)("inlineCode",{parentName:"p"},"import React from 'react'")," \u5176\u5b9e\u662f\u5bfc\u51fa\u7684\u9ed8\u8ba4\u7684\u6a21\u5757\uff0c\u800c\u7528\u5230 ",(0,p.kt)("inlineCode",{parentName:"p"},"* as")," \u662f\u5bfc\u51fa\u5168\u90e8\u6a21\u5757\u3002"),(0,p.kt)("h2",{id:"\u9876\u5c42-await-\u4f7f\u7528"},"\u9876\u5c42 await \u4f7f\u7528"),(0,p.kt)("p",null,"js \u4e5f\u652f\u6301\u5566 \ud83d\ude04"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},'const response = await fetch("...");\nconst greeting = await response.text();\nconsole.log(greeting);\n\n// Make sure we\'re a module\nexport {};\n')),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u9876\u5c42 await \u53ea\u4f1a\u5728\u6a21\u5757\u4e2d\u8d77\u4f5c\u7528\uff0c\u5728\u975e\u6a21\u5757\u6587\u4ef6\u4e2d\u4f7f\u7528\u4f1a\u62a5\u9519\u3002\u9876\u5c42 await \u4ec5\u5728\u6a21\u5757\u7684\u9876\u5c42\u8d77\u4f5c\u7528\uff0c\u5e76\u4e14\u53ea\u6709\u5f53 TypeScript \u627e\u5230\u4e00\u4e2a\u771f\u6b63\u53ef\u7528\u7684\u6a21\u5757\u624d\u5141\u8bb8\u4f7f\u7528\uff0c\u6211\u4eec\u53ef\u4ee5\u7528\u4e00\u4e2a export {} \u6765\u68c0\u6d4b\u662f\u5426\u5728\u6a21\u5757\u4e0b\u4f7f\u7528\u3002")),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-typescript"},"const response = await fetch(\"...\");\nconst greeting = await response.text();\nconsole.log(greeting);\n\n// 'await' expressions are only allowed at the top level of a file when that file is a module, but this file has no imports or exports. Consider adding an empty 'export {}' to make this file a module.\n")))}m.isMDXComponent=!0}}]);