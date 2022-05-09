"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6463],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return u}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),p=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},v={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(n),u=r,m=d["".concat(c,".").concat(u)]||d[u]||v[u]||o;return n?a.createElement(m,i(i({ref:t},s),{},{components:n})):a.createElement(m,i({ref:t},s))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6183:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return s},default:function(){return d}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],l={slug:"lexical-scope",title:"\u8bcd\u6cd5\u4f5c\u7528\u57df",tags:["JavaScript"]},c=void 0,p={unversionedId:"\u8bfb\u4e66\u7b14\u8bb0/JavaScript/\u4f60\u4e0d\u77e5\u9053\u7684JavaScript/\u8bcd\u6cd5\u4f5c\u7528\u57df",id:"\u8bfb\u4e66\u7b14\u8bb0/JavaScript/\u4f60\u4e0d\u77e5\u9053\u7684JavaScript/\u8bcd\u6cd5\u4f5c\u7528\u57df",isDocsHomePage:!1,title:"\u8bcd\u6cd5\u4f5c\u7528\u57df",description:"\u8bcd\u6cd5\u9636\u6bb5",source:"@site/docs/\u8bfb\u4e66\u7b14\u8bb0/JavaScript/\u4f60\u4e0d\u77e5\u9053\u7684JavaScript/\u8bcd\u6cd5\u4f5c\u7528\u57df.md",sourceDirName:"\u8bfb\u4e66\u7b14\u8bb0/JavaScript/\u4f60\u4e0d\u77e5\u9053\u7684JavaScript",slug:"/\u8bfb\u4e66\u7b14\u8bb0/JavaScript/\u4f60\u4e0d\u77e5\u9053\u7684JavaScript/lexical-scope",permalink:"/Blog/docs/\u8bfb\u4e66\u7b14\u8bb0/JavaScript/\u4f60\u4e0d\u77e5\u9053\u7684JavaScript/lexical-scope",tags:[{label:"JavaScript",permalink:"/Blog/docs/tags/java-script"}],version:"current",frontMatter:{slug:"lexical-scope",title:"\u8bcd\u6cd5\u4f5c\u7528\u57df",tags:["JavaScript"]},sidebar:"tutorialSidebar",previous:{title:"\u63d0\u5347",permalink:"/Blog/docs/\u8bfb\u4e66\u7b14\u8bb0/JavaScript/\u4f60\u4e0d\u77e5\u9053\u7684JavaScript/up"},next:{title:"DFS\u548cBFS",permalink:"/Blog/docs/\u8bfb\u4e66\u7b14\u8bb0/\u6398\u91d1\u5c0f\u518c/\u524d\u7aef\u7b97\u6cd5\u548c\u6570\u636e\u7ed3\u6784/DFS\u548cBFS"}},s=[{value:"\u8bcd\u6cd5\u9636\u6bb5",id:"\u8bcd\u6cd5\u9636\u6bb5",children:[],level:2},{value:"\u6b3a\u9a97\u8bcd\u6cd5",id:"\u6b3a\u9a97\u8bcd\u6cd5",children:[{value:"eval",id:"eval",children:[],level:3},{value:"with",id:"with",children:[],level:3},{value:"\u6027\u80fd",id:"\u6027\u80fd",children:[],level:3}],level:2},{value:"\u5c0f\u7ed3",id:"\u5c0f\u7ed3",children:[],level:2}],v={toc:s};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"\u8bcd\u6cd5\u9636\u6bb5"},"\u8bcd\u6cd5\u9636\u6bb5"),(0,o.kt)("p",null,"\u8bcd\u6cd5\u4f5c\u7528\u57df\uff1a\u7531\u4f60\u5199\u4ee3\u7801\u65f6\u5c06\u53d8\u91cf\u548c\u5757\u4f5c\u7528\u57df\u5199\u5728\u54ea\u91cc\u6240\u51b3\u5b9a\uff0c\u56e0\u6b64\u5f53\u8bcd\u6cd5\u89e3\u6790\u5668\u5728\u5904\u7406\u4ee3\u7801\u65f6\u4f1a\u4fdd\u6301\u4f5c\u7528\u57df\u4e0d\u53d8"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u65e0\u8bba\u51fd\u6570\u5728\u54ea\u91cc\u88ab\u8c03\u7528\uff0c\u4e5f\u65e0\u8bba\u5b83\u5982\u4f55\u88ab\u8c03\u7528\uff0c\u5b83\u7684\u8bcd\u6cd5\u4f5c\u7528\u57df\u53ea\u7531\u51fd\u6570\u88ab\u58f0\u660e\u65f6\u6240\u5904\u7684\u4f4d\u7f6e\u51b3\u5b9a")),(0,o.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"this")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"\u51fd\u6570\u4e2d\u7684 this \u662f\u5728\u51fd\u6570\u8c03\u7528\u7684\u65f6\u5019\u624d\u80fd\u51b3\u5b9a\uff0c\u548c\u51fd\u6570\u5b9a\u4e49\u7684\u4f4d\u7f6e\u65e0\u5173"))),(0,o.kt)("h2",{id:"\u6b3a\u9a97\u8bcd\u6cd5"},"\u6b3a\u9a97\u8bcd\u6cd5"),(0,o.kt)("p",null,"\u5982\u679c\u8bcd\u6cd5\u4f5c\u7528\u57df\u5b8c\u5168\u7531\u51fd\u6570\u58f0\u660e\u7684\u4f4d\u7f6e\u6765\u5b9a\u4e49\uff0c\u90a3\u4e48\u600e\u6837\u624d\u80fd\u5728\u8fd0\u884c\u65f6\u4fee\u6539\uff08\u6b3a\u9a97\uff09\u8bcd\u6cd5\u4f5c\u7528\u57df\u5462\uff1f"),(0,o.kt)("p",null,"JS \u4e2d\u6709\u4e24\u79cd\u673a\u5236\u53ef\u4ee5\u5b9e\u73b0\u6b3a\u9a97\u8bcd\u6cd5\u4f5c\u7528\u57df\uff0c\u4f46\u662f\u4ed6\u4eec\u90fd\u6709\u4e00\u4e2a\u5f88\u5927\u7684\u95ee\u9898\uff1a",(0,o.kt)("strong",{parentName:"p"},"\u6b3a\u9a97\u8bcd\u6cd5\u4f5c\u7528\u57df\u4f1a\u5bfc\u81f4\u6027\u80fd\u4e0b\u964d")),(0,o.kt)("h3",{id:"eval"},"eval"),(0,o.kt)("p",null,"eval \u53ef\u4ee5\u63a5\u53d7\u4e00\u4e2a\u5b57\u7b26\u4e32\u4f5c\u4e3a\u53c2\u6570\uff0c\u5e76\u5c06\u5b57\u7b26\u4e32\u7684\u5185\u5bb9\u89c6\u4e3a \b \u5728\u4e66\u5199\u65f6\u5c31\u5b58\u5728\u4e8e\u7a0b\u5e8f\u8fd9\u4e2a\u4f4d\u7f6e\u7684\u4ee3\u7801\u3002\u4e5f\u5c31\u662f\u76f8\u5f53\u4e8e\u4f60\u7684\u4ee3\u7801\u5c31\u5b9a\u4e49\u5728 eval \u51fd\u6570\u8c03\u7528\u7684\u4f4d\u7f6e"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'function foo(str, a) {\n  eval(str); // \u6b3a\u9a97\n  console.log(a, b);\n}\nvar b = 2;\nfoo("var b = 3", 1); // 1 3\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"var b = 3"),"\u76f8\u5f53\u4e8e\u672c\u6765\u5c31\u5728 foo \u7684\u90a3\u884c\u6765\u5904\u7406\u3002\u7531\u4e8e\u90a3\u6bb5\u4ee3\u7801\u58f0\u660e\u4e86\u4e00\u4e2a\u65b0\u7684\u53d8\u91cf b\uff0c\u76f8\u5f53\u4e8e\u5bf9\u5df2\u7ecf\u5b58\u5728\u7684 foo \u7684\u8bcd\u6cd5\u4f5c\u7528\u57df\u8fdb\u884c\u4e86\u4fee\u6539\u3002\u5728 foo \u4e2d\u5b9a\u4e49\u4e86\u4e00\u4e2a\u53d8\u91cf b\uff0c\u5e76\u4e14\u906e\u853d\u4e86\u5168\u5c40\u4f5c\u7528\u57df\u4e2d\u7684\u53d8\u91cf b\u3002"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"eval \u53ef\u4ee5\u5728\u8fd0\u884c\u671f\u95f4\u4fee\u6539\u4e66\u5199\u65f6\u671f\u7684\u8bcd\u6cd5\u4f5c\u7528\u57df")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"\u5728\u4e25\u683c\u6a21\u5f0f\u4e0b\uff0ceval \u51fd\u6570\u5728\u8fd0\u884c\u65f6\u6709\u81ea\u5df1\u7684\u8bcd\u6cd5\u4f5c\u7528\u57df\uff0c\u8fd9\u610f\u5473\u7740\u5176\u4e2d\u7684\u58f0\u660e\u65e0\u6cd5\u4fee\u6539\u6240\u5728\u7684\u4f5c\u7528\u57df"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'function foo(str) {\n  eval(str);\n  console.log(a); // ReferenceError: a is not defined\n}\nfoo("var a = 2");\n')))),(0,o.kt)("h3",{id:"with"},"with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"function foo(obj) {\n  with (obj) {\n    a = 2;\n  }\n}\nconst o1 = {\n  a: 3\n};\nconst o2 = {\n  b: 3\n};\n\nfoo(o1);\nconsole.log(o1.a); // 2\n\nfoo(o2);\nconsole.log(o2.a); // undefined\nconsole.log(a); // 2 a \u88ab\u6cc4\u9732\u5230\u4e86\u5168\u5c40\u4f5c\u7528\u57df\n")),(0,o.kt)("p",null,"\u8fd9\u4e2a\u4f8b\u5b50\u4e2d\u521b\u5efa\u4e86 o1 \u548c o2 \u4e24\u4e2a\u5bf9\u8c61\u3002\u5176\u4e2d\u4e00\u4e2a\u5177\u6709 a \u5c5e\u6027\uff0c\u53e6\u5916\u4e00\u4e2a\u6ca1\u6709\u3002foo(..) \u51fd \u6570\u63a5\u53d7\u4e00\u4e2a obj \u53c2\u6570\uff0c\u8be5\u53c2\u6570\u662f\u4e00\u4e2a\u5bf9\u8c61\u5f15\u7528\uff0c\u5e76\u5bf9\u8fd9\u4e2a\u5bf9\u8c61\u5f15\u7528\u6267\u884c\u4e86 with(obj) {..}\u3002 \u5728 with \u5757\u5185\u90e8\uff0c\u6211\u4eec\u5199\u7684\u4ee3\u7801\u770b\u8d77\u6765\u53ea\u662f\u5bf9\u53d8\u91cf a \u8fdb\u884c\u7b80\u5355\u7684\u8bcd\u6cd5\u5f15\u7528\uff0c\u5b9e\u9645\u4e0a\u5c31\u662f\u4e00\u4e2a LHS \u5f15\u7528\uff08\u67e5\u770b\u7b2c 1 \u7ae0\uff09\uff0c\u5e76\u5c06 2 \u8d4b\u503c\u7ed9\u5b83\u3002"),(0,o.kt)("p",null,"\u5f53\u6211\u4eec\u5c06 o1 \u4f20\u9012\u8fdb\u53bb\uff0ca \uff1d 2 \u8d4b\u503c\u64cd\u4f5c\u627e\u5230\u4e86 o1.a \u5e76\u5c06 2 \u8d4b\u503c\u7ed9\u5b83\uff0c\u8fd9\u5728\u540e\u9762\u7684 console. log(o1.a) \u4e2d\u53ef\u4ee5\u4f53\u73b0\u3002\u800c\u5f53 o2 \u4f20\u9012\u8fdb\u53bb\uff0co2 \u5e76\u6ca1\u6709 a \u5c5e\u6027\uff0c\u56e0\u6b64\u4e0d\u4f1a\u521b\u5efa\u8fd9\u4e2a\u5c5e\u6027\uff0c o2.a \u4fdd\u6301 undefined\u3002"),(0,o.kt)("p",null,"\u4f46\u662f\u53ef\u4ee5\u6ce8\u610f\u5230\u4e00\u4e2a\u5947\u602a\u7684\u526f\u4f5c\u7528\uff0c\u5b9e\u9645\u4e0a a = 2 \u8d4b\u503c\u64cd\u4f5c\u521b\u5efa\u4e86\u4e00\u4e2a\u5168\u5c40\u7684\u53d8\u91cf a\u3002"),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"\u5c3d\u7ba1 with \u5757\u53ef\u4ee5\u5c06\u4e00\u4e2a\u5bf9\u8c61\u5904\u7406\u4e3a\u8bcd\u6cd5\u4f5c\u7528\u57df\uff0c\u4f46\u662f\u8fd9\u4e2a\u5757\u5185\u90e8\u6b63\u5e38\u7684 var \u58f0\u660e\u5e76\u4e0d\u4f1a\u88ab\u9650\u5236\u5728\u8fd9\u4e2a\u5757\u7684\u4f5c\u7528\u57df\u4e2d\uff0c\u800c\u662f\u88ab\u6dfb\u52a0\u5230 with \u6240\u5904\u7684\u51fd\u6570\u4f5c \u7528\u57df\u4e2d\u3002"))),(0,o.kt)("p",null,"eval(..) \u51fd\u6570\u5982\u679c\u63a5\u53d7\u4e86\u542b\u6709\u4e00\u4e2a\u6216\u591a\u4e2a\u58f0\u660e\u7684\u4ee3\u7801\uff0c\u5c31\u4f1a\u4fee\u6539\u5176\u6240\u5904\u7684\u8bcd\u6cd5\u4f5c\u7528\u57df\uff0c\u800c with \u58f0\u660e\u5b9e\u9645\u4e0a\u662f\u6839\u636e\u4f60\u4f20\u9012\u7ed9\u5b83\u7684\u5bf9\u8c61\u51ed\u7a7a\u521b\u5efa\u4e86\u4e00\u4e2a\u5168\u65b0\u7684\u8bcd\u6cd5\u4f5c\u7528\u57df\u3002"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4e25\u683c\u6a21\u5f0f\u4e0b\uff0cwith \u4f1a\u88ab\u5b8c\u5168\u7981\u6b62")),(0,o.kt)("h3",{id:"\u6027\u80fd"},"\u6027\u80fd"),(0,o.kt)("p",null,"\u4f7f\u7528 eval \u548c with \u4f1a\u5bfc\u81f4\u6027\u80fd\u53d8\u5dee"),(0,o.kt)("p",null,"JavaScript \u5f15\u64ce\u4f1a\u5728\u7f16\u8bd1\u9636\u6bb5\u8fdb\u884c\u6027\u80fd\u4f18\u5316\u3002\u5176\u4e2d\u6709\u4e9b\u4f18\u5316\u4f9d\u8d56\u4e8e\u80fd\u591f\u6839\u636e\u4ee3\u7801\u7684\u8bcd\u6cd5\u8fdb\u884c\u9759\u6001\u5206\u6790\uff0c\u5e76\u9884\u5148\u786e\u5b9a\u6240\u6709\u53d8\u91cf\u548c\u51fd\u6570\u7684\u5b9a\u4e49\u4f4d\u7f6e\uff0c\u624d\u80fd\u5728\u6267\u884c\u8fc7\u7a0b\u4e2d\u5feb\u901f\u627e\u5230\u6807\u8bc6\u7b26\u3002"),(0,o.kt)("p",null,"\u6700\u60b2\u89c2\u7684\u60c5\u51b5\u662f\u5982\u679c\u51fa\u73b0\u4e86 eval(..) \u6216 with\uff0c\u6240\u6709\u7684\u4f18\u5316\u53ef\u80fd\u90fd\u662f\u65e0\u610f\u4e49\u7684\uff0c\u56e0\u6b64\u6700\u7b80\u5355\u7684\u505a\u6cd5\u5c31\u662f\u5b8c\u5168\u4e0d\u505a\u4efb\u4f55\u4f18\u5316\u3002"),(0,o.kt)("h2",{id:"\u5c0f\u7ed3"},"\u5c0f\u7ed3"),(0,o.kt)("p",null,"\u8bcd\u6cd5\u4f5c\u7528\u57df\uff0c\u610f\u5473\u7740\u4f5c\u7528\u57df\u662f\u7531\u4e66\u5199\u4ee3\u7801\u65f6\u51fd\u6570\u58f0\u660e\u7684\u4f4d\u7f6e\u6765\u51b3\u5b9a\u3002"),(0,o.kt)("p",null,"JavaScript \u4e2d\u6709\u4e24\u4e2a\u673a\u5236\u53ef\u4ee5\u201c\u6b3a\u9a97\u201d\u8bcd\u6cd5\u4f5c\u7528\u57df\uff1aeval(..) \u548c with\u3002\u4e5f\u5c31\u662f\u5728\u4ee3\u7801\u8fd0\u884c\u65f6\u4fee\u6539\u8bcd\u6cd5\u4f5c\u7528\u57df"),(0,o.kt)("p",null,"\u8fd9\u4e24\u4e2a\u673a\u5236\u7684\u526f\u4f5c\u7528\u662f\u5f15\u64ce\u65e0\u6cd5\u5728\u7f16\u8bd1\u65f6\u5bf9\u4f5c\u7528\u57df\u67e5\u627e\u8fdb\u884c\u4f18\u5316\uff0c\u56e0\u4e3a\u5f15\u64ce\u53ea\u80fd\u8c28\u614e\u5730\u8ba4\u4e3a\u8fd9\u6837\u7684\u4f18\u5316\u662f\u65e0\u6548\u7684\u3002\u4f7f\u7528\u8fd9\u5176\u4e2d\u4efb\u4f55\u4e00\u4e2a\u673a\u5236\u90fd\u5c06\u5bfc\u81f4\u4ee3\u7801\u8fd0\u884c\u53d8\u6162\u3002\u4e0d\u8981\u4f7f\u7528\u5b83\u4eec\u3002"))}d.isMDXComponent=!0}}]);