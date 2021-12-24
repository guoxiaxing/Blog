"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2767],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return s}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=a.createContext({}),i=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},p=function(e){var n=i(e.components);return a.createElement(u.Provider,{value:n},e.children)},g={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},h=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),h=i(t),s=r,d=h["".concat(u,".").concat(s)]||h[s]||g[s]||l;return t?a.createElement(d,c(c({ref:n},p),{},{components:t})):a.createElement(d,c({ref:n},p))}));function s(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,c=new Array(l);c[0]=h;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var i=2;i<l;i++)c[i]=t[i];return a.createElement.apply(null,c)}return a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},6799:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return u},metadata:function(){return i},assets:function(){return p},toc:function(){return g},default:function(){return s}});var a=t(7462),r=t(3366),l=(t(7294),t(3905)),c=["components"],o={slug:"angular-ChangeDetection",title:"Angular ChangeDetection",tags:["angular"]},u=void 0,i={permalink:"/Blog/fragment/angular-ChangeDetection",source:"@site/fragment/2021-12-20-angular-ChangeDetection.md",title:"Angular ChangeDetection",description:"ChangeDetection \u662f\u4ec0\u4e48",date:"2021-12-20T00:00:00.000Z",formattedDate:"December 20, 2021",tags:[{label:"angular",permalink:"/Blog/fragment/tags/angular"}],readingTime:16.07,truncated:!1,authors:[],prevItem:{title:"formControl\u7684disabled\u5c5e\u6027\u7ed1\u5b9a\u4e0d\u751f\u6548",permalink:"/Blog/fragment/angular-form-contol-disabled"}},p={authorsImageUrls:[]},g=[{value:"ChangeDetection \u662f\u4ec0\u4e48",id:"changedetection-\u662f\u4ec0\u4e48",children:[],level:2},{value:"ChangeDetectionStrategy.Default",id:"changedetectionstrategydefault",children:[],level:2},{value:"detectChange \u5b9e\u73b0",id:"detectchange-\u5b9e\u73b0",children:[],level:2},{value:"detectChange \u65f6\u673a",id:"detectchange-\u65f6\u673a",children:[],level:2},{value:"DetectionStrategy.OnPush",id:"detectionstrategyonpush",children:[{value:"OnPush \u4e3b\u8981\u539f\u5219",id:"onpush-\u4e3b\u8981\u539f\u5219",children:[],level:3},{value:"@Input \u5c5e\u6027\u53d1\u751f\u6539\u53d8\u7684\u65f6\u5019",id:"input-\u5c5e\u6027\u53d1\u751f\u6539\u53d8\u7684\u65f6\u5019",children:[{value:"\u4e0d\u4f1a\u8fdb\u884c\u6df1\u5ea6\u68c0\u67e5",id:"\u4e0d\u4f1a\u8fdb\u884c\u6df1\u5ea6\u68c0\u67e5",children:[],level:4},{value:"\u7236\u7ec4\u4ef6\u662f OnPush",id:"\u7236\u7ec4\u4ef6\u662f-onpush",children:[],level:4},{value:"ngZone \u4e4b\u5916\u7684\u4e8b\u4ef6",id:"ngzone-\u4e4b\u5916\u7684\u4e8b\u4ef6",children:[],level:4}],level:3},{value:"Async Pipe",id:"async-pipe",children:[{value:"markForCheck on next",id:"markforcheck-on-next",children:[],level:4},{value:"\u76f4\u63a5\u6539\u53d8\u539f\u5bf9\u8c61\u7684\u5d4c\u5957\u503c\u4e0d\u4f1a\u89e6\u53d1",id:"\u76f4\u63a5\u6539\u53d8\u539f\u5bf9\u8c61\u7684\u5d4c\u5957\u503c\u4e0d\u4f1a\u89e6\u53d1",children:[],level:4}],level:3},{value:"Browser \u4e8b\u4ef6",id:"browser-\u4e8b\u4ef6",children:[],level:3}],level:2},{value:"NgZone",id:"ngzone",children:[{value:"UI \u5237\u65b0\u4e0d\u53ca\u65f6",id:"ui-\u5237\u65b0\u4e0d\u53ca\u65f6",children:[{value:"\u5176\u4ed6\u7b2c\u4e09\u65b9 npm \u5e93",id:"\u5176\u4ed6\u7b2c\u4e09\u65b9-npm-\u5e93",children:[],level:4},{value:"NgZone \u4e4b\u5916\u521b\u5efa\u7684\u7ec4\u4ef6",id:"ngzone-\u4e4b\u5916\u521b\u5efa\u7684\u7ec4\u4ef6",children:[],level:4}],level:3},{value:"runOutsideAngular \u6027\u80fd\u4f18\u5316",id:"runoutsideangular-\u6027\u80fd\u4f18\u5316",children:[],level:3}],level:2},{value:"ChangeDetectorRef.detach \u7684\u9a9a\u64cd\u4f5c",id:"changedetectorrefdetach-\u7684\u9a9a\u64cd\u4f5c",children:[],level:2},{value:"Q&amp;A",id:"qa",children:[],level:2}],h={toc:g};function s(e){var n=e.components,t=(0,r.Z)(e,c);return(0,l.kt)("wrapper",(0,a.Z)({},h,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"changedetection-\u662f\u4ec0\u4e48"},"ChangeDetection \u662f\u4ec0\u4e48"),(0,l.kt)("p",null,"\u6570\u636e\u9a71\u52a8\u7684 UI\uff0c\u6211\u4eec\u671f\u671b\u7684\u662f\u53ea\u9700\u8981\u6539\u53d8 component \u91cc\u7684\u6570\u636e\uff0c\u7136\u540e template \u91cc\u7684 UI \u5143\u7d20\u5c31\u9b54\u6cd5\u822c\u5730\u81ea\u52a8\u53d8\u6210\u6700\u65b0\u7684\u5c55\u73b0\u4e86\u3002ChangeDetection \u5c31\u662f Angular \u5b9e\u73b0\u6570\u636e\u9a71\u52a8 UI \u7684\u65b9\u5f0f\u3002"),(0,l.kt)("h2",{id:"changedetectionstrategydefault"},"ChangeDetectionStrategy.Default"),(0,l.kt)("p",null,"\u8fd9\u662f\u9ed8\u8ba4\u7684\u9b54\u6cd5\u65b9\u6848\uff0c\u7701\u5fc3\u7701\u4e8b\u513f\uff0c\u80fd\u628a\u4e8b\u60c5\u529e\u597d\uff0c\u6211\u4eec\u5565\u4e5f\u4e0d\u7528\u7ba1\u3002"),(0,l.kt)("h2",{id:"detectchange-\u5b9e\u73b0"},"detectChange \u5b9e\u73b0"),(0,l.kt)("p",null,"\u4efb\u4f55\u6570\u636e\u6539\u53d8\uff0cAngular \u90fd\u80fd\u53d1\u73b0\u5e76\u66f4\u65b0 UI\u3002\u8fd9\u662f\u56e0\u4e3a Angular \u4f1a\u5728\u5408\u9002\u65f6\u673a\u8fd0\u884c detectChange\uff0c\u5e76\u91cd\u65b0\u83b7\u53d6\u4e00\u904d\u6570\u636e\u6570\u636e\u7ed1\u5b9a\u7684\u503c\uff0c\u5e76\u4e0e\u4e0a\u4e00\u6b21\u7684\u503c\u8fdb\u884c\u5bf9\u6bd4\u3002\u5982\u679c\u4e0d\u4e00\u6837\u7684\u8bdd\u5c31\u4f1a\u8fdb\u884c UI \u6539\u53d8\u3002"),(0,l.kt)("p",null,"Angular \u5bf9 Object \u7684\u68c0\u6d4b\u53ea\u662f\u7b80\u5355\u68c0\u67e5\u662f\u5426\u662f\u540c\u4e00\u4e2a\u5b9e\u4f8b\uff0c\u6539\u53d8 object.count \u4e0d\u4f1a\u89e6\u53d1 child \u7684 inObj \u7684\u53d8\u5316\uff0c\u4f46\u662f detectChange \u4e5f\u4f1a detect \u6240\u6709 child \u7ec4\u4ef6\u7684\u53d8\u5316\u3002\u4e8e\u662f child \u7ec4\u4ef6\u4e5f\u4f1a\u518d\u68c0\u67e5\u4e00\u904d\u3002"),(0,l.kt)("p",null,"*","ngFor \u8fd9\u79cd\u4e1c\u897f\u81ea\u5df1\u5185\u90e8\u4f1a\u5728\u6bcf\u6b21 detectChange \u7684\u65f6\u5019\u5bf9\u6bd4 array \u7684\u65b0\u589e\u3001\u51cf\u5c11\u3001\u8c03\u5e8f\u3002"),(0,l.kt)("h2",{id:"detectchange-\u65f6\u673a"},"detectChange \u65f6\u673a"),(0,l.kt)("p",null,"\u4f46\u662f Angular \u6bd4\u8f83\u673a\u667a\u7684\u662f\uff0c\u5b83\u4f1a\u5728\u4e00\u4e9b\u4e8b\u4ef6\u5b8c\u6210\u7684\u65f6\u5019\u81ea\u52a8\u89e6\u53d1 detectChange\u3002\u8fd9\u4e9b\u5305\u62ec\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6240\u6709\u6d4f\u89c8\u5668\u4e8b\u4ef6\uff08click\u3001keyup\u3001mouseover \u7b49\uff09"),(0,l.kt)("li",{parentName:"ul"},"\u6240\u6709 addEventListener \u7684 callback \u5b8c\u6210\u540e"),(0,l.kt)("li",{parentName:"ul"},"\u6240\u6709 Ajax \u8bf7\u6c42\u540e"),(0,l.kt)("li",{parentName:"ul"},"\u6240\u6709\u7684 setTimeout \u548c setInterval \u7684\u56de\u8c03\u89e6\u53d1\u540e"),(0,l.kt)("li",{parentName:"ul"},"\uff08\u6d4f\u89c8\u5668\u81ea\u5e26\u7684\uff09Websockets \u7684\u5404\u4e8b\u4ef6\uff08onclose\u3001onopen\u3001onmessage \u7b49\uff09"),(0,l.kt)("li",{parentName:"ul"},"Promise\uff08resolve\u3001reject...\uff09"),(0,l.kt)("li",{parentName:"ul"},"NgZone.run\u3001NgZone.runTask..."),(0,l.kt)("li",{parentName:"ul"},"...")),(0,l.kt)("p",null,"\u8fd9\u4e9b\u4e8b\u60c5\u53d1\u751f\u7684\u65f6\u5019\uff0c\u90fd\u662f\u6709\u6bd4\u8f83\u5927\u7684\u6982\u7387\u4f1a\u5f15\u8d77 UI \u6539\u53d8\u7684\u3002\u6bd4\u5982 click \u9a71\u4f7f\u7684\u6539\u53d8\u3001\u65b0\u7f51\u7edc\u8bf7\u6c42\u6570\u636e\u9a71\u4f7f\u7684\u6539\u53d8\u4e4b\u7c7b\u4e4b\u7c7b\u3002"),(0,l.kt)("p",null,"Angular \u5e95\u5c42\u7684 ngZone \u901a\u8fc7 zone.js \u6765\u5bf9\u6d4f\u89c8\u5668\u7684 addEventListener \u7b49\u65b9\u6cd5\u505a patch\uff0c\u4ece\u800c\u76d1\u542c\u8fd9\u4e9b\u4e8b\u4ef6\u7684\u89e6\u53d1\u65f6\u673a\u800c\u8fd0\u884c detectChange"),(0,l.kt)("p",null,"Angular \u8fd9\u4e9b detectChange \u7684\u8c03\u7528\u90fd\u662f\u4ece root node \u8c03\u7528\u7684\uff0c\u6240\u4ee5\u4f1a\u68c0\u67e5\u6574\u4e2a\u5e94\u7528\u7684\u7ed1\u5b9a\u503c"),(0,l.kt)("h2",{id:"detectionstrategyonpush"},"DetectionStrategy.OnPush"),(0,l.kt)("p",null,"\u867d\u7136 Default\b \u7684\u7b56\u7565\u5f88\u7f8e\u597d\uff0cAngular \u7684 detectChanges \u7684\u6027\u80fd\u4e5f\u4e0d\u9519\uff0c\u4f46\u662f\u5bf9\u4e8e\u5927\u4e00\u4e9b\u7684\u5e94\u7528\u6765\u8bf4\uff0c\u6bcf\u4e00\u4e2a\u4e8b\u4ef6\u90fd\u68c0\u67e5\u6574\u4e2a\u7ec4\u4ef6\u6811\u8fd8\u662f\u4f1a\u6709\u6027\u80fd\u95ee\u9898\u7684\u3002\u53ef\u4ee5\u51cf\u5c11\u4e0d\u5fc5\u8981\u7684\u68c0\u6d4b\u4ece\u800c\u63d0\u9ad8\u6027\u80fd"),(0,l.kt)("p",null,"OnPush \u867d\u7136\u9700\u8981\u6211\u4eec\u4e3b\u52a8\u8c03\u7528 markForCheck\uff0c\u4f46\u662f\u6709\u4e09\u79cd\u60c5\u51b5 Angular \u4f1a\u81ea\u52a8\u5e2e\u6211\u4eec\u8c03\u7528\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"@Input"),(0,l.kt)("li",{parentName:"ul"},"AsyncPipe"),(0,l.kt)("li",{parentName:"ul"},"Browser \u4e8b\u4ef6")),(0,l.kt)("p",null,"OnPush \u76f8\u5173\u7684\u4e24\u4e2a\u63a5\u53e3:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"markForCheck - \u6807\u8bb0\u4e3a dirty\u3002\u4e0b\u6b21\u6709 detectChange \u7684\u65f6\u5019\u66f4\u65b0 UI"),(0,l.kt)("li",{parentName:"ul"},"detectChange - \u7acb\u5373\u5bf9\u5f53\u524d\u7ec4\u4ef6\u8fdb\u884c detectChange\uff0c\u5373\u4f7f\u7ec4\u4ef6\u8fd0\u884c\u5728 ngZone \u4e4b\u5916\uff0c\u540c\u6b65\u66f4\u65b0 UI")),(0,l.kt)("h3",{id:"onpush-\u4e3b\u8981\u539f\u5219"},"OnPush \u4e3b\u8981\u539f\u5219"),(0,l.kt)("p",null,"\u5176\u4e3b\u8981\u539f\u5219\u5c31\u662f\u6ca1\u6709\u88ab\u6807\u8bb0 markForCheck \u7684\u7ec4\u4ef6\u5728 changeDetection \u65f6\u4f1a\u88ab\u76f4\u63a5\u8df3\u8fc7"),(0,l.kt)("p",null,"\u4e3e\u4e2a\u4f8b\u5b50\uff0csetTimeout\u3001setInterval\u3001\u7f51\u7edc\u8bf7\u6c42\u4e4b\u7c7b\u7684\u4e8b\u4ef6\u540e\uff0cAngular \u4f1a\u4ece root \u53d1\u8d77 detectChange\uff0c\u4f46\u662f\u9047\u5230 onPush \u65f6\uff0c\u5982\u679c\u6ca1\u6709\u88ab markForCheck\uff0c\u5c31\u4f1a\u8df3\u8fc7\u8fd9\u6574\u4e2a\u8282\u70b9\u4ee5\u53ca\u5176\u5b50\u8282\u70b9\uff08\u5b50\u8282\u70b9\u65e0\u8bba\u662f OnPush \u7b56\u7565\u8fd8\u662f Default \u7b56\u7565\u90fd\u4f1a\u88ab\u8df3\u8fc7\uff09"),(0,l.kt)("p",null,"\u6240\u4ee5\uff0c\u5f53\u6211\u4eec\u77e5\u9053\u9700\u8981\u66f4\u65b0 UI \u7684\u65f6\u5019\uff0c\u6211\u4eec\u9700\u8981\u66f4\u65b0 UI \u65f6\uff0c\u9700\u8981\u8c03\u7528 markForCheck()"),(0,l.kt)("p",null,"\u7ecf\u8fc7 markForCheck \u6807\u8bb0\u540e\u7684 OnPush \u7ec4\u4ef6\uff0c\u4f1a\u628a\u81ea\u5df1\u6240\u6709 OnPush \u7684\u7236\u7ec4\u4ef6\u90fd\u6807\u8bb0\u4e3a dirty\uff0c\u4e0b\u6b21\u6267\u884c detectChange \u7684\u65f6\u5019\u5c31\u4f1a\u628a\u9700\u8981\u68c0\u67e5\u7684\u90fd\u641e\u5b9a\u3002\n\u7a0d\u5fae\u6709\u51e0\u4e2a\u7ec6\u8282\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u81ea\u5df1\u7684\u5b50\u7ec4\u4ef6\u5982\u679c\u662f Default \u7684\u8bdd\uff0c\u4f1a\u5728\u81ea\u5df1\u8fd0\u884c detectChange \u7684\u65f6\u5019\u4e5f\u68c0\u67e5\u4e00\u904d"),(0,l.kt)("li",{parentName:"ul"},"\u5982\u679c\u81ea\u5df1\u7684\u5b50\u7ec4\u4ef6\u662f OnPush \u5e76\u4e14\u5b50\u7ec4\u4ef6\u81ea\u5df1\u6ca1\u6709 markForCheck\uff0c\u90a3\u4e48 detectChange \u5c31\u4f1a\u88ab\u8df3\u8fc7"),(0,l.kt)("li",{parentName:"ul"},"\u5982\u679c OnPush \u6ca1\u6709\u88ab markForCheck\uff0c\u90a3\u4e48\u5373\u4f7f\u81ea\u5df1\u7684\u5b50\u7ec4\u4ef6\u662f Default\uff0c\u4e5f\u4e0d\u4f1a\u88ab\u68c0\u67e5")),(0,l.kt)("p",null,"\u5728\u4e00\u4e9b\u60c5\u51b5\u4e0b Angular \u4f1a\u81ea\u52a8\u7ed9\u6211\u4eec\u7684 OnPush \u7ec4\u4ef6\u6807\u8bb0 markForCheck\u3002"),(0,l.kt)("h3",{id:"input-\u5c5e\u6027\u53d1\u751f\u6539\u53d8\u7684\u65f6\u5019"},"@Input \u5c5e\u6027\u53d1\u751f\u6539\u53d8\u7684\u65f6\u5019"),(0,l.kt)("p",null,"\u5f53\u7ed9\u5b50\u7ec4\u4ef6\u7ed1\u5b9a\u7684@Input \u503c\u53d1\u751f\u6539\u53d8\u7684\u65f6\u5019\uff0cAngular \u4f1a\u81ea\u52a8\u7ed9\u5b50\u7ec4\u4ef6\u6807\u8bb0 markForCheck\uff0c\u5e76\u5728 detectChange \u7684\u65f6\u5019\u66f4\u65b0 UI\uff0c\u4e0d\u9700\u8981\u6211\u4eec\u624b\u52a8\u8c03\u7528 markForCheck\u3002"),(0,l.kt)("p",null,"\u4f46\u662f\u9700\u8981\u6ce8\u610f\u51e0\u4e2a\u7ec6\u8282\uff1a"),(0,l.kt)("h4",{id:"\u4e0d\u4f1a\u8fdb\u884c\u6df1\u5ea6\u68c0\u67e5"},"\u4e0d\u4f1a\u8fdb\u884c\u6df1\u5ea6\u68c0\u67e5"),(0,l.kt)("p",null,"\u4e0a\u9762\u63d0\u5230\u8fc7\uff0cAngular \u7684 changeDetection \u5bf9 Object \u53ea\u68c0\u67e5\u662f\u4e0d\u662f\u540c\u4e00\u4e2a\u5bf9\u8c61\uff0c\u4e0d\u4f1a\u8fdb\u884c\u6df1\u5ea6\u68c0\u67e5\u3002\u6240\u6709\u6539\u53d8\u4efb\u4f55 Object \u5185\u5d4c\u7684\u503c\uff0c\u6216\u8005\u7ed9 array.push \u4e4b\u7c7b\u7684\u64cd\u4f5c\uff0c\u90fd\u4e0d\u4f1a\u81ea\u52a8\u89e6\u53d1 markForCheck\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<app-child [inCount]="count" [inObj]="obj" [inArr]="array"> </app-child>\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"public count: number = 0;\npublic obj: { count: number; other: number } = { count: 0, other: 4 }\npublic array: number[] = [];\n\n// will trigger mark\nthis.count = 2;\nthis.obj = {...obj, count: 2};\nthis.array = [];\nthis.array = [...this.array];\nthis.array = this.array.slice(0);\n\n// will not trigger mark\nthis.obj.count = 6;\nthis.array.push(1);\nthis.array.length = 0;\n")),(0,l.kt)("h4",{id:"\u7236\u7ec4\u4ef6\u662f-onpush"},"\u7236\u7ec4\u4ef6\u662f OnPush"),(0,l.kt)("p",null,"\u68c0\u67e5\u4e0a\u8ff0@Input \u7ed1\u5b9a\u503c\u662f\u5426\u53d8\u5316\u7684\u903b\u8f91\u4e0d\u5728\u5b50\u7ec4\u4ef6\u91cc\uff0c\u800c\u662f\u5728\u7236\u7ec4\u4ef6 detectChange \u65f6\u5224\u5b9a\u7684\u3002\b \u4e5f\u5c31\u662f\u8bf4\uff0c\u53ea\u8981\u7236\u7ec4\u4ef6\u6ca1\u6709\u89e6\u53d1 detectChange\uff0c\u5b50\u7ec4\u4ef6\u65e2\u4e0d\u4f1a markForCheck\uff0c\u4e5f\u4e0d\u4f1a\u6539\u53d8@Input \u7684\u503c\u3002\u867d\u7136 Angular \u4f1a\u76d1\u542c\u5f88\u591a\u76f8\u5173\u65b9\u6cd5\uff0c\u5e76\u81ea\u52a8\u89e6\u53d1 detectChange\uff0c\u4f46\u662f\u8fd8\u662f\u9700\u8981\u6ce8\u610f\u4e00\u4e9b\u7279\u6b8a\u60c5\u51b5\u7684\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<app-child [inCount]="count"></app-child>\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class ParentComponent implements OnInit {\n  public count: number = 0;\n\n  ngOnInit() {\n    interval(1000).subscribe(() => {\n      this.count++; // will not trigger cd for child\n    });\n  }\n}\n")),(0,l.kt)("p",null,"\u56e0\u4e3a\u68c0\u67e5@Input \u7ed1\u5b9a\u503c\u7684\u53d8\u5316\u662f\u5728\u7236\u7ec4\u4ef6\u91cc\u505a\u7684\uff0c\u6240\u4ee5\u5982\u679c\u7236\u7ec4\u4ef6\u662f OnPush \u5e76\u4e14\u6ca1\u6709\u6807\u8bb0 markForCheck\uff0c\u90a3\u4e48\u5b50\u7ec4\u4ef6\u4e5f\u4e0d\u4f1a\u89e6\u53d1 cd\u3002"),(0,l.kt)("p",null,"\u8fd9\u91cc\u867d\u7136\u6bcf\u6b21\u89e6\u53d1 interval \u540e\u90fd\u4f1a\u6709 detectChange \u53d1\u751f\uff0c\u4f46\u662f\u56e0\u4e3a\u7236\u7ec4\u4ef6\u662f OnPush \u5e76\u4e14\u6ca1\u6709\u88ab markForCheck\uff0c\u6240\u4ee5\u4f1a\u76f4\u63a5\u8df3\u8fc7\u3002"),(0,l.kt)("h4",{id:"ngzone-\u4e4b\u5916\u7684\u4e8b\u4ef6"},"ngZone \u4e4b\u5916\u7684\u4e8b\u4ef6"),(0,l.kt)("p",null,"Angular \u81ea\u52a8\u89e6\u53d1 detectChange \u90fd\u662f ngZone \u91cc\u7684\u4e8b\u4ef6\u89e6\u53d1\u7684\uff0c\u5982\u679c\u4e8b\u4ef6\u4e0d\u5728 ngZone \u91cc\u7684\u8bdd\uff0c\u5c31\u4e0d\u4f1a\u81ea\u52a8\u89e6\u53d1 detectChange\u3002\n\u4f8b\u5b50\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Component, OnInit, NgZone } from "@angular/core";\n\n@Component({\n  changeDetection: ChangeDetectionStrategy.Default\n})\nexport class ParentComponent implements OnInit {\n  public count: number = 0;\n\n  constructor(private ngZone: NgZone) {}\n\n  ngOnInit() {\n    // the interval is outside ngZone thus it will not\n    // trigger change detection and ui will not update\n    this.ngZone.runOutsideAngular(() => {\n      interval(1000).subscribe(() => {\n        this.count++; // will not trigger cd for child\n      });\n    });\n  }\n}\n')),(0,l.kt)("p",null,"\u4e0a\u9762\u552f\u4e00\u533a\u522b\u5c31\u662f\u7528\u6765 ngZone.runOutsideAngular \u8fd9\u4e2a\u65b9\u6cd5\u628a interval \u7684\u521b\u5efa\u4e22\u5728\u7684 Angular \u7684 Zone \u4e4b\u5916\u3002\u8fd9\u6837 Angular \u5c31\u6ca1\u6709 patch \u8fd9\u4e2a interval\uff0c\u4e5f\u4e0d\u4f1a\u5728 interval \u89e6\u53d1\u7684\u65f6\u5019\u8c03\u7528 detectChange \u4e86\u3002"),(0,l.kt)("p",null,"\u6ce8\u610f\u8fd9\u91cc\u662f\u76f4\u63a5\u4e0d\u8c03\u7528 detectChange\u3002\u6240\u4ee5\u5373\u4f7f OnPush \u7684\u7ec4\u4ef6\u8c03\u7528\u4e86 markForCheck \u4e5f\u4e0d\u4f1a\u66f4\u65b0 UI\u3002\u751a\u81f3 ChangeDetectionStrategy.Default \u7684\u7ec4\u4ef6\u4e5f\u4e0d\u4f1a\u6709 UI \u66f4\u65b0\u3002\u5fc5\u987b\u7b49\u6709\u5176\u4ed6\u4e8b\u4ef6\u53d1\u751f\uff0c\u89e6\u53d1 detectChange \u540e\uff0cUI \u624d\u4f1a\u5237\u65b0\u3002"),(0,l.kt)("h3",{id:"async-pipe"},"Async Pipe"),(0,l.kt)("p",null,"Angular \u9664\u4e86\u5728@Input \u503c\u6539\u53d8\u7684\u65f6\u5019\u4f1a\u5185\u90e8\u5e2e\u6211\u4eec markForCheck\uff0c\u8fd8\u6709 Asyc Pipe \u53d1\u5c04\u65b0\u503c\u5f97\u65f6\u5019\u4f1a\u5e2e\u6211\u4eec markForCheck\u3002"),(0,l.kt)("h4",{id:"markforcheck-on-next"},"markForCheck on next"),(0,l.kt)("p",null,"v9.x \u7684\u8868\u73b0\u662f\u53ea\u8981 Observable \u6709\u89e6\u53d1\u4e86 next\uff0c\b \u7ed1\u5b9a\u4e86\u8fd9\u4e2a Observable \u7684 OnPush \u7ec4\u4ef6\u5c31\u4f1a\u88ab markForCheck\u3002\u4e0d\u4f1a\u68c0\u67e5\u53d1\u51fa\u7684\u503c\u662f\u4e0d\u662f\u548c\u4ee5\u524d\u7684\u4e0d\u4e00\u6837\u3002"),(0,l.kt)("p",null,"\u4f8b\u5b50\uff1a\nchild \u7ec4\u4ef6\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},"<p>count {{ (inObj$ | async)?.count }}</p>\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class ChildComponent {\n  @Input()\n  inObj$: Observable<{ count: number }>;\n}\n")),(0,l.kt)("p",null,"parent \u7ec4\u4ef6\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<app-child [inObj$]="obj$"></app-child>\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"@Component({\n  changeDetection: ChangeDetectionStrategy.Default\n})\nexport class ParentComponent implements OnInit {\n  private obj = { count: 1 };\n  private _obj$ = new BehaviorSubject(this.obj);\n  public obj$ = this._obj$.asObservable();\n\n  ngOnInit() {\n    interval(1000).subscribe(() => {\n      this.obj.count++;\n      this._obj$.next(this.obj); // Child component will update\n    });\n  }\n}\n")),(0,l.kt)("p",null,"\u8fd9\u91cc\u8981\u6ce8\u610f\u7684\u662f\uff0c\u5373\u4f7f obj \u7684\u5b9e\u4f8b\u4e0d\u53d8\uff0c\u53ea\u8981\u8c03\u7528\u4e86 async pipe \u7684 next \u88ab\u8c03\u7528\u4e86\uff0cAngular \u5c31\u4f1a\u5e2e\u6211\u4eec\u8c03\u7528\u90a3\u4e2a OnPush \u7ec4\u4ef6\u7684 markForCheck\u3002\u8fd9\u4e2a\u8868\u73b0\u5728 v10.0.0 \u91cc\u6709\u6539\u53d8\uff0c\u4f46\u662f\u6211\u6ca1\u6709\u53bb\u81ea\u5df1\u6d4b\u3002"),(0,l.kt)("h4",{id:"\u76f4\u63a5\u6539\u53d8\u539f\u5bf9\u8c61\u7684\u5d4c\u5957\u503c\u4e0d\u4f1a\u89e6\u53d1"},"\u76f4\u63a5\u6539\u53d8\u539f\u5bf9\u8c61\u7684\u5d4c\u5957\u503c\u4e0d\u4f1a\u89e6\u53d1"),(0,l.kt)("p",null,"\u8fd9\u91cc\u53ea\u662f\u63d0\u4e00\u4e0b\uff0cv9.x \u7684 async pipe \u53ea\u662f\u76d1\u542c next\uff0c\u6240\u4ee5\u76f4\u63a5\u6539\u53d8\u5b9e\u4f8b\u91cc\u9762\u7684\u503c\u7684\u8bdd\u662f\u4e0d\u4f1a markForCheck \u7684"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"// ...\nngOnInit() {\n  interval(1000).subscribe(() => {\n    // will not trigger mark for check\n    this.obj.count++;\n  });\n}\n// ...\n")),(0,l.kt)("h3",{id:"browser-\u4e8b\u4ef6"},"Browser \u4e8b\u4ef6"),(0,l.kt)("p",null,"\u5373\u4f7f\u4f60\u7684\u7ec4\u4ef6\u7528\u4e86 OnPush\uff0c\u5b83\u7684\u76d1\u542c\u7684 Browser \u4e8b\u4ef6\uff08click\u3001mouseover\u3001mouseleave \u7b49\uff09\u89e6\u53d1\u7684\u65f6\u5019\uff0cAngular \u90fd\u4f1a\u5e2e\u4f60\u8c03\u7528 markForCheck\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<span>count is: {{count}}</span>\n<button (click)="addOneClicked()">Increment</button>\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class TestComponent {\n  public count: number = 0;\n\n  public addOneClicked(): void {\n    // does not need to call markForCheck if\n    // invoked from click handler\n    this.count++;\n  }\n}\n")),(0,l.kt)("h2",{id:"ngzone"},"NgZone"),(0,l.kt)("p",null,"\u63a8\u8350\u4e00\u7bc7\u8be6\u7ec6\u8bb2 NgZone \u7684",(0,l.kt)("a",{parentName:"p",href:"https://medium.com/reverse-engineering-angular/angular-deep-dive-zone-js-how-does-it-monkey-patches-various-apis-9cc1c7fcc321"},"\u6587\u7ae0")),(0,l.kt)("p",null,"Angular \u5728 bootstrap \u7684\u65f6\u5019\u9996\u5148\u521b\u5efa\u4e86\u4e00\u4e2a\u53eb ngZone \u7684 zone\u3002ngZone \u7684\u4f5c\u7528\u5c31\u662f\uff0c\u5728\u8fd9\u4e2a zone \u91cc\u8fd0\u884c\u7684\u4ee3\u7801\u88ab Angular monkey patch \u6389\u4e86\uff0c\u52a0\u4e0a\u4e86 Angular \u81ea\u5df1\u7684\u5305\u62ec changeDetection \u5728\u5185\u7684\u4e00\u4e9b\u5904\u7406\u3002\u5f00\u5934\u8bf4\u7684 Angular \u76d1\u542c timeout\u3001interval\u3001click \u4e4b\u7c7b\u7684\u4e1c\u897f\uff0c\u5c31\u662f\u901a\u8fc7 ngZone \u6765\u76d1\u542c\u7684\u3002"),(0,l.kt)("p",null,"Angular \u901a\u8fc7 ngZone \u6765 patch \u8fd9\u4e9b\u65b9\u6cd5\uff0c\u53cd\u8fc7\u6765\u4e5f\u5c31\u662f\u8bf4\uff0c\u5982\u679c\u5728 ngZone \u4e4b\u5916\u8c03\u7528 \bsetInterval\u3001addEventListener \u4e4b\u7c7b\u7684\u4e1c\u897f\u7684\u8bdd\uff0c\u7528\u7684\u65b9\u6cd5\u5c31\u4e0d\u662f Angular patch \u8fc7\u7684\u7248\u672c\uff0c\u4e5f\u5c31\u4e0d\u4f1a\u89e6\u53d1 detectChange \u4e86\u3002"),(0,l.kt)("h3",{id:"ui-\u5237\u65b0\u4e0d\u53ca\u65f6"},"UI \u5237\u65b0\u4e0d\u53ca\u65f6"),(0,l.kt)("p",null,"\u4e0a\u9762\u63d0\u5230 \b \u4e0d\u5728 NgZone \u91cc\u521b\u5efa setInterval \u4e4b\u7c7b\u7684\u4e1c\u897f\uff0cAngular \u5c31\u4e0d\u4f1a\u5e2e\u6211\u4eec\u81ea\u52a8\u89e6\u53d1 detectChange\u3002\u6211\u4eec UI \u66f4\u65b0\u4e0d\u53ca\u65f6\u7684\u95ee\u9898\u57fa\u672c\u90fd\u662f\u8fd9\u4e2a\u9020\u6210\u7684\u3002\u4e0b\u9762\u5217\u4e00\u4e9b\u5e38\u89c1\u7684\u5728 ngZone \u4e4b\u5916\u8fd0\u884c\u7684\u539f\u56e0\u3002"),(0,l.kt)("h4",{id:"\u5176\u4ed6\u7b2c\u4e09\u65b9-npm-\u5e93"},"\u5176\u4ed6\u7b2c\u4e09\u65b9 npm \u5e93"),(0,l.kt)("p",null,"Angular \u5bf9\u7b2c\u4e09\u65b9\u5e93\u662f\u65e0\u611f\u77e5\u7684\uff0c\u6240\u4ee5\u5982\u679c\u7b2c\u4e09\u65b9\u5e93\u5e95\u5c42\u7528\u4e86 C++ \u56de\u8c03\u7684\u8bdd\uff0c\u6211\u4eec\u5c31\u6709\u53ef\u80fd\u5728\u4e0d\u77e5\u60c5\u7684\u60c5\u51b5\u4e0b\u8dd1\u51fa NgZone \u4e86\u3002\u9700\u8981\u6ce8\u610f\u3002\u4f46\u662f Promise \u7684\u4e8b\u60c5\u5728\u8fd9\u91cc\u4e5f\u9002\u7528\uff0c\u5982\u679c\u7b2c\u4e09\u65b9\u5e93\u662f\u7528 Promise \u7684\u8bdd\uff0c\u5341\u6709\u516b\u4e5d\u662f\u6ca1\u95ee\u9898\u7684\u3002\u56e0\u4e3a Angular \u628a Promise \u7ed9 patch \u4e86\u3002"),(0,l.kt)("h4",{id:"ngzone-\u4e4b\u5916\u521b\u5efa\u7684\u7ec4\u4ef6"},"NgZone \u4e4b\u5916\u521b\u5efa\u7684\u7ec4\u4ef6"),(0,l.kt)("p",null,"\u8fd9\u4e2a\u662f\u6bd4\u8f83\u9690\u6666\u7684\u4e00\u4e2a\u60c5\u51b5\u3002\u4e0a\u9762\u8bb2 OnPush \u7684\u65f6\u5019\u505a\u7684\u4e00\u5927\u4e2a\u5047\u8bbe\u662f click \u7b49\u6d4f\u89c8\u5668\u4e8b\u4ef6\u53d1\u751f\u7684\u65f6\u5019 Angular \u4f1a\u81ea\u52a8\u8c03\u7528 detectChange \u6765\u5237\u65b0 UI\u3002\u4f46\u662f\u8fd9\u4e2a\u662f\u5728\u7ec4\u4ef6\u5728 NgZone \u91cc\u521b\u5efa\u7684\u524d\u63d0\u4e0b\u624d\u6210\u7acb\u7684\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<button (click)="onClick()"></button>\n')),(0,l.kt)("p",null,"\u4e0a\u9762\u7684\u8fd9\u79cd template\uff0c\u5728\u521b\u5efa\u8fd9\u4e2a button \u7684\u65f6\u5019\uff0cAngular \u4f1a\u8c03\u7528 addEventListener \u6765\u5e2e\u6211\u4eec\u628a\u8be5\u505a\u7684\u4e8b\u60c5\u641e\u5b9a\u3002\u7136\u540e\u518d\u56de\u987e\u4e00\u4e0b\u4e4b\u524d\u4e4b\u524d\u8bb2\u7684\uff0cAngular \u662f\u901a\u8fc7 NgZone\uff0c\u628a addEventListener \u7b49\u65b9\u6cd5 patch \u4e86\uff0c\u624d\u8fbe\u5230\u81ea\u52a8 detectChange \u7684\u6548\u679c\u7684\u3002\u90a3\u4e48\u5982\u679c\u8fd9\u4e2a button \u662f\u5728 ngZone \u4e4b\u5916\u521b\u5efa\u7684\uff0c\u90a3\u8c03\u7528\u7684 addEventListener \u5c31\u662f\u6ca1\u6709\u88ab patch \u8fc7\u7684\u7248\u672c\uff0c\u70b9\u51fb\u540e\u4e5f\u5c31\u4e0d\u4f1a\u4e3b\u52a8\u89e6\u53d1 detectChange\u3002\uff08\u81ea\u52a8\u7684 markForCheck \u8fd8\u4f1a\u8fdb\u884c\uff0c\u8fd9\u4e2a\u529f\u80fd\u662f Angular \u89e3\u6790 template \u7684\u4e00\u90e8\u5206\uff0c\u4e0d\u662f patch \u51fa\u6765\u7684\uff09"),(0,l.kt)("p",null,"\u8981\u600e\u4e48\u5728 ngZone \u4e4b\u5916\u521b\u5efa\u7ec4\u4ef6\uff1f",(0,l.kt)("inlineCode",{parentName:"p"},"*ngIf"),"\u3001",(0,l.kt)("inlineCode",{parentName:"p"},"*ngFor")," \u7b49 directive \u914d\u5408\u5728 zone \u4e4b\u5916\u624b\u52a8\u8c03\u7528 detectChange \u5c31\u4f1a\u53d1\u751f\u3002"),(0,l.kt)("p",null,"\u4f8b\u5b50\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<p>count is: {{count}}</p>\n<div *ngIf="enable">\n  <button (click)="onCreatedButtnClick()">\n    Created\n  </button>\n</div>\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush\n})\nexport class ParentComponent implements OnInit {\n  public count: number = 0;\n  public enable: boolean = false;\n\n  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef) {}\n\n  ngOnInit() {\n    this.ngZone.runOutsideAngular(() => {\n      interval(1000).subscribe(() => {\n        this.enable = true;\n\n        // we are outside ngZone, so we have to manually\n        // call detectChanges so angular can create button\n        this.cd.detectChanges();\n      });\n    });\n  }\n\n  onCreatedButtnClick(): void {\n    // UI will not update until detectChange is triggered\n    // by network or some other component. This is because\n    // the button was created outside of angular zone and\n    // will not automatically call detectChanges on click\n    this.count++;\n    this.cd.markForCheck();\n  }\n}\n")),(0,l.kt)("h3",{id:"runoutsideangular-\u6027\u80fd\u4f18\u5316"},"runOutsideAngular \u6027\u80fd\u4f18\u5316"),(0,l.kt)("p",null,"\u6027\u80fd\u5dee\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},"<span>time is: {{time}}</span>\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"public time: number = 0;\n\nconstructor(private ngZone: NgZone, private cd:ChangeDetectorRef) {}\n\npublic ngOnInit(): void {\n  interval(100).subscribe(_ => {\n    this.time++;\n    this.cd.markForCheck(); // \u901a\u5e38\u60c5\u51b5\u4e0b\u4e0d\u9700\u8981\uff0c\u5728OnPush\u7b56\u7565\u4e0b\u9700\u8981\u52a0\n  });\n}\n")),(0,l.kt)("p",null,"\u4e0a\u9762\u8fd9\u79cd\u5199\u6cd5\uff0c\u6839\u636e\u60c5\u51b5\uff0c\u53ef\u80fd\u4f1a\u6709\u5f88\u7cdf\u7cd5\u7684\u6027\u80fd\u3002\u539f\u56e0\u662f ngZone \u628a setInterval \u7ed9 patch \u4e86\u3002\u6240\u4ee5 setInterval \u7684\u6bcf\u6b21\u56de\u8c03\u540e\uff0c\u90fd\u4f1a\u89e6\u53d1\u6e90\u4e8e root node \u7684 detectChange\u3002\u4f1a\u628a\u6574\u4e2a\u5e94\u7528\u90fd\u68c0\u67e5\u4e00\u6b21\u3002"),(0,l.kt)("p",null,"\u867d\u7136 OnPush \u7684\u7ec4\u4ef6\u4f1a\u88ab\u8df3\u8fc7\uff0c\u4f46\u662f markForCheck \u4f1a\u628a\u81ea\u5df1\u6240\u6709\u7236\u4eb2\u7ec4\u4ef6\u90fd\u7ed9\u6807\u8bb0\u4e3a dirty\u3002\u5982\u679c\u81ea\u5df1\u7684\u7236\u7ec4\u4ef6\u91cc\u6709\u5f88\u591a\u6570\u636e\u7ed1\u5b9a\u7684\u8bdd\uff0c\u4e5f\u4f1a\u6709\u6027\u80fd\u95ee\u9898\u3002\u66f4\u4f55\u51b5\u6211\u4eec\u4ee3\u7801\u91cc\u8fd8\u6709\u4e0d\u5c11\u7ec4\u4ef6\u8fd8\u662f Default \u7684 cd \u7b56\u7565..."),(0,l.kt)("p",null,"\u6027\u80fd\u4f18\u5316\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"public time: number = 0;\n\nconstructor(private ngZone: NgZone, private cd:ChangeDetectorRef) {}\n\npublic ngOnInit(): void {\n  this.ngZone.runOutsideAngular(() => {\n    interval(100).subscribe(_ => {\n      this.time++;\n      this.cd.detectChanges();\n    }\n  });\n}\n")),(0,l.kt)("p",null,"\u50cf\u8fd9\u6837\u5728 ngZone \u4e4b\u5916\u521b\u5efa interval \u7684\u8bdd\uff0c\u7528\u7684\u5c31\u4e0d\u662f Angular \u6253\u8fc7\u7334\u5b50\u8865\u4e01\u7684\u7248\u672c\u4e86\u3002\u6240\u4ee5\u89e6\u53d1\u7684\u65f6\u5019\u4e0d\u4f1a\u5bf9\u6574\u4e2a\u5e94\u7528\u8fdb\u884c cd\u3002"),(0,l.kt)("p",null,"\u56e0\u4e3a\u6ca1\u6709 angular \u7684 cd\uff0c\u6211\u4eec\u5fc5\u987b\u81ea\u5df1\u624b\u52a8\u8c03\u7528\u4e00\u4e0b detectChanges()\u3002\u8fd9\u4e2a\u65b9\u6cd5\u53ea\u4f5c\u7528\u4e8e\u5f53\u524d node \u4ee5\u53ca\u5176\u5b50\u7ec4\u4ef6\u3002\u6240\u4ee5\u50cf\u4e00\u4e2a\u7b80\u5355\u7684 timer \u8fd9\u6837\u53ef\u4ee5\u786e\u5b9a\u4e0d\u4f1a\u5f71\u54cd\u5e94\u7528\u5176\u4ed6\u90e8\u5206\u72b6\u6001\u7684\u7ec4\u4ef6\uff0c\u53ef\u4ee5\u653e\u5fc3\u5730\u53ea\u5bf9\u5b83\u8fdb\u884c cd\u3002"),(0,l.kt)("p",null,"\u5f53\u7136\u8fd9\u4e2a\u7684\u524d\u63d0\u662f\u4e0d\u5f71\u54cd\u5e94\u7528\u5176\u4ed6\u5730\u65b9\u3002\u5982\u679c\u8981\u5c55\u793a\u65f6\u95f4\uff0c\u4f46\u662f\u6bcf 10s dispatch \u4e00\u4e2a action \u7684\u8bdd\uff0c\u5e94\u8be5\u628a\u8fd9\u4e2a action \u4e22\u56de AngularZone \u91cc\u9762\u6765 dispatch\uff0c\u4ee5\u89e6\u53d1\u4e00\u6b21\u5168\u5c40\u7684 cd\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"public ngOnInit(): void {\n  this.ngZone.runOutsideAngular(() => {\n    interval(100).subscribe(_ => {\n      this.time++;\n      this.cd.detectChanges();\n\n      if (this.time % 100 === 0) {\n        // NgZone.run\u4f1a\u89e6\u53d1\u4e00\u6b21\u6e90\u4e8eroot node\u7684detectChange\n        this.ngZone.run(() => {\n          this.store.dispatch(new Action());\n        });\n      }\n    }\n  });\n}\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u5982\u679c ngZone \u5916\u89e6\u53d1\u7684 detectChange \u89e6\u53d1\u4e86","*","ngIf \u4e4b\u7c7b\u7684 directive \u521b\u5efa\u65b0\u5143\u7d20\u7684\u8bdd\uff0c\u521b\u5efa\u7684\u7ec4\u4ef6\u7684 click \u7b49 handler \u90fd\u4f1a\u5728 ngZone \u4e4b\u5916\u6267\u884c\uff0c\u5e76\u4e14\u4e0d\u4f1a\u89e6\u53d1 detectChange\u3002\u6240\u4ee5\u8981\u6ce8\u610f")),(0,l.kt)("h2",{id:"changedetectorrefdetach-\u7684\u9a9a\u64cd\u4f5c"},"ChangeDetectorRef.detach \u7684\u9a9a\u64cd\u4f5c"),(0,l.kt)("h2",{id:"qa"},"Q&A"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"detectChange \u548c markForCheck \u7684\u533a\u522b\uff1f")),(0,l.kt)("p",null,"markForCheck \u53ea\u662f\u6807\u8bb0 dirty\uff0c\u81ea\u8eab\u5176\u5b9e\u53ea\u662f\u628a\u4e00\u4e2a\u503c\u8bbe\u7f6e\u4e3a true\u3002\u5b9e\u9645\u8fdb\u884c\u6570\u636e\u5bf9\u6bd4\u3001UI \u66f4\u65b0\u3001\u5143\u7d20\u521b\u5efa\u7684\u662f detectChange\u3002"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u4e1a\u52a1\u7ec4\u4ef6\u6700\u4f73\u5b9e\u8df5\uff1fonPush + markForCheck/detectChange \u7ec4\u5408\uff1f")),(0,l.kt)("p",null,"\u6700\u597d\u662f\u5c3d\u53ef\u80fd\u591a\u7684\u7ec4\u4ef6\u4f7f\u7528 onPush + markForCheck\u3002detectChange \u662f\u5728\u7edd\u5927\u591a\u6570\u60c5\u51b5\u4e0b\u662f\u4e0d\u9700\u8981\u7684\u3002\bdetectChange \u7684\u4e00\u79cd\u5408\u7406\u7684\u4f7f\u7528\u573a\u666f\u662f\u4e0a\u9762\u63d0\u5230\u7684 runOutsideAngular \u7684\u6027\u80fd\u4f18\u5316\u3002\u76f8\u5bf9\u72ec\u7acb\u7684\u7ec4\u4ef6\u4f46\u662f\u9700\u8981\u9891\u7e41\u66f4\u65b0\u3002"))}s.isMDXComponent=!0}}]);