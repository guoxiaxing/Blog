"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9591],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return s}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=u(n),s=r,g=m["".concat(o,".").concat(s)]||m[s]||k[s]||l;return n?a.createElement(g,p(p({ref:t},c),{},{components:n})):a.createElement(g,p({ref:t},c))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,p=new Array(l);p[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var u=2;u<l;u++)p[u]=n[u];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4109:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return o},metadata:function(){return u},toc:function(){return c},default:function(){return m}});var a=n(7462),r=n(3366),l=(n(7294),n(3905)),p=["components"],i={slug:"clone",title:"\u6df1\u6d45\u62f7\u8d1d",tags:["JavaScript","\u62f7\u8d1d"]},o=void 0,u={unversionedId:"Javascript/clone",id:"Javascript/clone",isDocsHomePage:!1,title:"\u6df1\u6d45\u62f7\u8d1d",description:"\u6df1\u6d45\u62f7\u8d1d\u7684\u5b9a\u4e49",source:"@site/docs/Javascript/clone.md",sourceDirName:"Javascript",slug:"/Javascript/clone",permalink:"/Blog/docs/Javascript/clone",tags:[{label:"JavaScript",permalink:"/Blog/docs/tags/java-script"},{label:"\u62f7\u8d1d",permalink:"/Blog/docs/tags/\u62f7\u8d1d"}],version:"current",frontMatter:{slug:"clone",title:"\u6df1\u6d45\u62f7\u8d1d",tags:["JavaScript","\u62f7\u8d1d"]},sidebar:"tutorialSidebar",previous:{title:"\u5982\u4f55\u4f18\u96c5\u7684\u5bf9\u6570\u7ec4\u8fdb\u884c\u5206\u7ec4",permalink:"/Blog/docs/Javascript/array-groupBy"},next:{title:"toLocaleString\u7684\u9690\u85cf\u7528\u6cd5",permalink:"/Blog/docs/Javascript/toLocaleString"}},c=[{value:"\u6df1\u6d45\u62f7\u8d1d\u7684\u5b9a\u4e49",id:"\u6df1\u6d45\u62f7\u8d1d\u7684\u5b9a\u4e49",children:[{value:"\u6d45\u62f7\u8d1d",id:"\u6d45\u62f7\u8d1d",children:[],level:3},{value:"\u6df1\u62f7\u8d1d",id:"\u6df1\u62f7\u8d1d",children:[],level:3}],level:2},{value:"\u6d45\u62f7\u8d1d\u7684\u65b9\u5f0f",id:"\u6d45\u62f7\u8d1d\u7684\u65b9\u5f0f",children:[],level:2},{value:"\u6df1\u62f7\u8d1d\u7684\u65b9\u5f0f",id:"\u6df1\u62f7\u8d1d\u7684\u65b9\u5f0f",children:[],level:2},{value:"\u91cd\u4e2d\u4e4b\u91cd\uff1a\u6d4f\u89c8\u5668\u63d0\u4f9b\u4e86\u539f\u751f\u7684\u6df1\u62f7\u8d1d API",id:"\u91cd\u4e2d\u4e4b\u91cd\u6d4f\u89c8\u5668\u63d0\u4f9b\u4e86\u539f\u751f\u7684\u6df1\u62f7\u8d1d-api",children:[],level:2}],k={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,p);return(0,l.kt)("wrapper",(0,a.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u6df1\u6d45\u62f7\u8d1d\u7684\u5b9a\u4e49"},"\u6df1\u6d45\u62f7\u8d1d\u7684\u5b9a\u4e49"),(0,l.kt)("h3",{id:"\u6d45\u62f7\u8d1d"},"\u6d45\u62f7\u8d1d"),(0,l.kt)("p",null,"\u521b\u5efa\u4e00\u4e2a\u65b0\u5bf9\u8c61\uff0c\u8fd9\u4e2a\u5bf9\u8c61\u6709\u7740\u539f\u59cb\u5bf9\u8c61\u5c5e\u6027\u503c\u7684\u4e00\u4efd\u7cbe\u786e\u62f7\u8d1d\u3002\u5982\u679c\u5c5e\u6027\u662f\u57fa\u672c\u7c7b\u578b\uff0c\u62f7\u8d1d\u7684\u5c31\u662f\u57fa\u672c\u7c7b\u578b\u7684\u503c\uff0c\u5982\u679c\u5c5e\u6027\u662f\u5f15\u7528\u7c7b\u578b\uff0c\u62f7\u8d1d\u7684\u5c31\u662f\u5185\u5b58\u5730\u5740 \uff0c\u6240\u4ee5\u5982\u679c\u5176\u4e2d\u4e00\u4e2a\u5bf9\u8c61\u6539\u53d8\u4e86\u8fd9\u4e2a\u5730\u5740\u6307\u5411\u7684\u503c\uff0c\u5c31\u4f1a\u5f71\u54cd\u5230\u53e6\u4e00\u4e2a\u5bf9\u8c61\u3002\uff08\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5bf9\u8c61\uff0c\u904d\u5386\u5bf9\u8c61\u7684\u5c5e\u6027\uff0c\u76f4\u63a5",(0,l.kt)("inlineCode",{parentName:"p"},"target[key] = origin[key]"),"\uff0c\u4e00\u904d\u904d\u5386\u5b8c\u6210\u5219\u62f7\u8d1d\u7ed3\u675f\uff09"),(0,l.kt)("h3",{id:"\u6df1\u62f7\u8d1d"},"\u6df1\u62f7\u8d1d"),(0,l.kt)("p",null,"\u5c06\u4e00\u4e2a\u5bf9\u8c61\u4ece\u5185\u5b58\u4e2d\u5b8c\u6574\u7684\u62f7\u8d1d\u4e00\u4efd\u51fa\u6765,\u4ece\u5806\u5185\u5b58\u4e2d\u5f00\u8f9f\u4e00\u4e2a\u65b0\u7684\u533a\u57df\u5b58\u653e\u65b0\u5bf9\u8c61,\u4e14\u4fee\u6539\u65b0\u5bf9\u8c61\u4e0d\u4f1a\u5f71\u54cd\u539f\u5bf9\u8c61"),(0,l.kt)("h2",{id:"\u6d45\u62f7\u8d1d\u7684\u65b9\u5f0f"},"\u6d45\u62f7\u8d1d\u7684\u65b9\u5f0f"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"target = Object.assign({}, origin)"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6269\u5c55\u8fd0\u7b97\u7b26")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6570\u7ec4\uff1aconcat\u3001slice")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u81ea\u5b9a\u4e49\u51fd\u6570"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"function clone(origin) {\n  const target = {};\n  for (let key in origin) {\n    if (origin.hasOwnProperty(key)) {\n      target[key] = origin[key];\n    }\n  }\n  return target;\n}\n")),(0,l.kt)("h2",{id:"\u6df1\u62f7\u8d1d\u7684\u65b9\u5f0f"},"\u6df1\u62f7\u8d1d\u7684\u65b9\u5f0f"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"JSON.parse(JSON.stringify(obj))")),(0,l.kt)("p",null,"\u4f46\u662f\u8fd9\u6837\u7684\u62f7\u8d1d\u65b9\u5f0f\u6709\u5f88\u591a\u7f3a\u9677\uff1a"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://www.jianshu.com/p/d9bbcf99c186"},"JSON.stringify \u7684\u4e00\u4e9b\u7279\u70b9 \ud83d\ude4b")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5bf9\u4e8e\u5c5e\u6027\u503c\u4e3a undefined\u3001symbol\u3001\u51fd\u6570\u7684\u5c5e\u6027\u4f1a\u88ab\u8fc7\u6ee4\uff0c\u5982\u679c\u8fd9\u4e9b\u7c7b\u578b\u7684\u503c\u4f5c\u4e3a\u6570\u7ec4\u7684\u5143\u7d20\uff0c\u5219\u4f1a\u88ab\u8f6c\u6362\u4e3a null\uff1b\u51fd\u6570\u6216\u8005 undefined \u5355\u72ec\u88ab\u8f6c\u6362\u65f6\uff0c\u4f1a\u76f4\u63a5\u8fd4\u56de undefined\uff0cJSON.stringify(function() {}) -> undefined/JSON.stringify(undefined) -> undefined")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5176\u4ed6\u7c7b\u578b\u7684\u5bf9\u8c61\uff0c\u5305\u62ec Map/Set/WeakMap/WeakSet\uff0c\u4ec5\u4f1a\u5e8f\u5217\u5316\u53ef\u679a\u4e3e\u7684\u5c5e\u6027\u3002\u4e00\u822c\u6765\u8bf4\u90fd\u662f{}")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5faa\u73af\u5f15\u7528\u4f1a\u62a5\u9519")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"bigint \u7684\u503c\u4e5f\u4e0d\u80fd\u88ab\u5e8f\u5217\u5316")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u88ab\u8f6c\u6362\u7684\u5bf9\u8c61\u5982\u679c\u5b9a\u4e49\u4e86 toJSON \u65b9\u6cd5\uff0c\u90a3\u4e48\u4f1a\u8fd4\u56de\u8c03\u7528\u8be5\u65b9\u6cd5\u7684\u8fd4\u56de\u503c")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5e03\u5c14\u503c\uff0c\u6570\u5b57\uff0c\u5b57\u7b26\u4e32\u7684\u5305\u88c5\u5bf9\u8c61\uff0c\u5728\u88ab\u5e8f\u5217\u5316\u7684\u8fc7\u7a0b\u4e2d\u4f1a\u88ab\u8f6c\u6362\u4e3a\u539f\u59cb\u503c")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6240\u6709 symbol \u5c5e\u6027\u7684\u952e\u5728\u8f6c\u6362\u7684\u65f6\u5019\u90fd\u4f1a\u88ab\u5ffd\u7565\uff0c\u5373\u4f7f\u901a\u8fc7 replacer \u51fd\u6570\u5f3a\u5236\u6307\u5b9a\u5305\u542b\u4e86\u4ed6\u4eec")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Date \u7684\u65e5\u671f\u5bf9\u8c61\u4f1a\u88ab\u8f6c\u6362\u4e3a\u5b57\u7b26\u4e32")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"NaN\uff0cInfinity \u548c null \u90fd\u4f1a\u88ab\u8f6c\u4e3a null")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u4e0d\u53ef\u679a\u4e3e\u7684\u5c5e\u6027\u4f1a\u88ab\u9ed8\u8ba4\u5ffd\u7565")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u7b80\u5355\u7248\u672c \u4f46\u662f\u8fd9\u4e2a\u65e0\u6cd5\u89e3\u51b3\u5faa\u73af\u5f15\u7528\u7684\u95ee\u9898"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'function clone(target) {\n  if (target && typeof target === "object") {\n    let cloneTarget = Array.isArray(target) ? [] : {};\n    for (const key in target) {\n      cloneTarget[key] = clone(target[key]);\n    }\n    return cloneTarget;\n  } else {\n    return target;\n  }\n}\n')),(0,l.kt)("p",null,"\u89e3\u51b3\u5faa\u73af\u5f15\u7528\u95ee\u9898\uff0c\u6211\u4eec\u53ef\u4ee5\u989d\u5916\u5f00\u8f9f\u4e00\u4e2a\u5b58\u50a8\u7a7a\u95f4\uff0c\u6765\u5b58\u50a8\u5f53\u524d\u5bf9\u8c61\u548c\u62f7\u8d1d\u5bf9\u8c61\u7684\u5bf9\u5e94\u5173\u7cfb\uff0c\u5f53\u9700\u8981\u62f7\u8d1d\u5f53\u524d\u5bf9\u8c61\u65f6\uff0c\u5148\u53bb\u5b58\u50a8\u7a7a\u95f4\u4e2d\u627e\uff0c\u6709\u6ca1\u6709\u62f7\u8d1d\u8fc7\u8fd9\u4e2a\u5bf9\u8c61\uff0c\u5982\u679c\u6709\u7684\u8bdd\u76f4\u63a5\u8fd4\u56de\uff0c\u5982\u679c\u6ca1\u6709\u7684\u8bdd\u7ee7\u7eed\u62f7\u8d1d\uff0c\u8fd9\u6837\u5c31\u5de7\u5999\u5316\u89e3\u7684\u5faa\u73af\u5f15\u7528\u7684\u95ee\u9898\u3002"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u89e3\u51b3\u5faa\u73af\u5f15\u7528\u7684\u7248\u672c")),(0,l.kt)("p",null,"\u8fd9\u4e2a\u5b58\u50a8\u7a7a\u95f4\uff0c\u9700\u8981\u53ef\u4ee5\u5b58\u50a8 key-value \u5f62\u5f0f\u7684\u6570\u636e\uff0c\u4e14 key \u53ef\u4ee5\u662f\u4e00\u4e2a\u5f15\u7528\u7c7b\u578b\uff0c\u6211\u4eec\u53ef\u4ee5\u9009\u62e9 Map \u8fd9\u79cd\u6570\u636e\u7ed3\u6784\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u68c0\u67e5 map \u4e2d\u6709\u65e0\u514b\u9686\u8fc7\u7684\u5bf9\u8c61")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6709 - \u76f4\u63a5\u8fd4\u56de")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u6ca1\u6709 - \u5c06\u5f53\u524d\u5bf9\u8c61\u4f5c\u4e3a key\uff0c\u514b\u9686\u5bf9\u8c61\u4f5c\u4e3a value \u8fdb\u884c\u5b58\u50a8")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u7ee7\u7eed\u514b\u9686"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'function clone(target, map = new Map()) {\n  if (target && typeof target === "object") {\n    let cloneTarget = Array.isArray(target) ? [] : {};\n\n    if (map.get(target)) {\n      return map.get(target);\n    }\n\n    map.set(target, cloneTarget);\n\n    for (const key in target) {\n      cloneTarget[key] = clone(target[key], map);\n    }\n\n    return cloneTarget;\n  } else {\n    return target;\n  }\n}\n')),(0,l.kt)("p",null,"\u53ef\u4ee5\u4f7f\u7528 WeakMap \u6765\u4ee3\u66ff Map"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"WeakMap \u5bf9\u8c61\u662f\u4e00\u7ec4\u952e/\u503c\u5bf9\u7684\u96c6\u5408\uff0c\u5176\u4e2d\u7684\u952e\u662f\u5f31\u5f15\u7528\u7684\u3002\u5176\u952e\u5fc5\u987b\u662f\u5bf9\u8c61\uff0c\u800c\u503c\u53ef\u4ee5\u662f\u4efb\u610f\u7684\u3002")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u4ec0\u4e48\u662f\u5f31\u5f15\u7528\u5462\uff1f")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u5728\u8ba1\u7b97\u673a\u7a0b\u5e8f\u8bbe\u8ba1\u4e2d\uff0c\u5f31\u5f15\u7528\u4e0e\u5f3a\u5f15\u7528\u76f8\u5bf9\uff0c\u662f\u6307\u4e0d\u80fd\u786e\u4fdd\u5176\u5f15\u7528\u7684\u5bf9\u8c61\u4e0d\u4f1a\u88ab\u5783\u573e\u56de\u6536\u5668\u56de\u6536\u7684\u5f15\u7528\u3002\u4e00\u4e2a\u5bf9\u8c61\u82e5\u53ea\u88ab\u5f31\u5f15\u7528\u6240\u5f15\u7528\uff0c\u5219\u88ab\u8ba4\u4e3a\u662f\u4e0d\u53ef\u8bbf\u95ee\uff08\u6216\u5f31\u53ef\u8bbf\u95ee\uff09\u7684\uff0c\u5e76\u56e0\u6b64\u53ef\u80fd\u5728\u4efb\u4f55\u65f6\u523b\u88ab\u56de\u6536\u3002")),(0,l.kt)("p",null,"\u4e3e\u4e2a\u4f8b\u5b50\uff1a"),(0,l.kt)("p",null,"\u5982\u679c\u6211\u4eec\u4f7f\u7528 Map \u7684\u8bdd\uff0c\u90a3\u4e48\u5bf9\u8c61\u95f4\u662f\u5b58\u5728\u5f3a\u5f15\u7528\u5173\u7cfb\u7684\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'let obj = { name: "Lily" };\nconst target = new Map();\nmap.set(obj, "123");\nobj = null;\n')),(0,l.kt)("p",null,"\u867d\u7136\u6211\u4eec\u624b\u52a8\u5c06 obj\uff0c\u8fdb\u884c\u91ca\u653e\uff0c\u7136\u662f target \u4f9d\u7136\u5bf9 obj \u5b58\u5728\u5f3a\u5f15\u7528\u5173\u7cfb\uff0c\u6240\u4ee5\u8fd9\u90e8\u5206\u5185\u5b58\u4f9d\u7136\u65e0\u6cd5\u88ab\u91ca\u653e\u3002"),(0,l.kt)("p",null,"\u518d\u6765\u770b WeakMap\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'let obj = { name: "Lily" };\nconst target = new WeakMap();\nmap.set(obj, "123");\nobj = null;\n')),(0,l.kt)("p",null,"\u5982\u679c\u662f WeakMap \u7684\u8bdd\uff0c target \u548c obj \u5b58\u5728\u7684\u5c31\u662f\u5f31\u5f15\u7528\u5173\u7cfb\uff0c\u5f53\u4e0b\u4e00\u6b21\u5783\u573e\u56de\u6536\u673a\u5236\u6267\u884c\u65f6\uff0c\u8fd9\u5757\u5185\u5b58\u5c31\u4f1a\u88ab\u91ca\u653e\u6389\u3002"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5b8c\u5584\u7248\u672c")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'function isObject(obj) {\n  return obj !== null && typeof obj === "object";\n}\n\nfunction deepClone(obj, map = new WeakMap()) {\n  if (obj === null) return obj;\n  if (!isObject(obj)) return obj;\n  if (obj instanceof Date) return new Date(obj);\n  if (obj instanceof RegExp) return new RegExp(obj);\n  if (map.has(obj)) return map.get(obj);\n  const target = new obj.constructor();\n  map.set(obj, target);\n  if (obj instanceof Set) {\n    obj.forEach(val => target.add(deepClone(val, map)));\n    return target;\n  }\n  if (obj instanceof Map) {\n    map.forEach((val, key) => target.set(key, deepClone(val, map)));\n    return target;\n  }\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      target[key] = deepClone(obj[key], map);\n    }\n  }\n  return target;\n}\n')),(0,l.kt)("h2",{id:"\u91cd\u4e2d\u4e4b\u91cd\u6d4f\u89c8\u5668\u63d0\u4f9b\u4e86\u539f\u751f\u7684\u6df1\u62f7\u8d1d-api"},"\u91cd\u4e2d\u4e4b\u91cd\uff1a\u6d4f\u89c8\u5668\u63d0\u4f9b\u4e86\u539f\u751f\u7684\u6df1\u62f7\u8d1d API"),(0,l.kt)("p",null,"\u539f\u751f\u7684\u6df1\u62f7\u8d1d API\uff1astructuredClone\u3002"),(0,l.kt)("p",null,"\u5b83\u4e5f\u6709\u4e9b\u7f3a\u70b9\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u539f\u578b\uff1a\u65e0\u6cd5\u62f7\u8d1d\u5bf9\u8c61\u7684\u539f\u578b\u94fe\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u51fd\u6570\uff1a\u65e0\u6cd5\u62f7\u8d1d\u51fd\u6570\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u4e0d\u53ef\u514b\u9686\uff1a\u5e76\u6ca1\u6709\u652f\u6301\u6240\u6709\u7c7b\u578b\u7684\u62f7\u8d1d\uff0c\u6bd4\u5982 Error\u3002")),(0,l.kt)("p",null,"\u4f46\u662f\u5bf9\u4e8e\u6211\u4eec\u5e73\u5e38\u4f7f\u7528\u7684\u62f7\u8d1d\u529f\u80fd\u662f\u591f\u7528\u4e86"))}m.isMDXComponent=!0}}]);