---
slug: angular-web-components
title: 将 angular 组件打包为 webComponents
tags: [angular, webComponent]
---

## 背景

在迁移 React 的过程中需要使用英语科目的题目弹窗，但是迁移这个弹窗需要花费大量的时间还需要堆一百多个题型进行回测，成本太高，所以希望有一种方式可以在 React 页面中使用 angular 组件。

## 这么实现在 React 页面中使用 angular 组件呢？

angular 这个框架本身支持了将 angular 组件打包为一个 element 来使用，那么 let's do it!!!

## 实现

参考 demo：https://github.com/phodal/wc-angular-demo

参考文档：https://islamuad.medium.com/web-components-with-angular-d0205c9db08f

1. 新建一个 angular 项目

2. 将所需要的组件拷贝到新的项目中（这里只需要拷贝需要打包为 webComponent 的组件并且在 module 中进行声明，为了让解释更清晰，称这个 module 为 AModule-因为我们需要对其的入参进行改造，而它所依赖的组件必须在 AModule 中进行声明（导入的目录可以继续从原项目（micro-angular）中导入，因为我们的项目使用的是 monorepo 的形式，所以可以直接导入原本 angular 项目（micro-angualar）的组件（**这些组件必须被 micro-angular 中声明他们的模块导出才可以**）））

3. 安装 `@angular/elements` `@webcomponents/custom-elements`(提供 polyfill)

```bash
yarn add @angular/elements
yarn add @webcomponents/custom-elements
```

4. 在 polyfill.ts 文件中导入 poyfill

```typescript title='polyfill.ts'
import "@webcomponents/custom-elements/src/native-shim";
import "@webcomponents/custom-elements/custom-elements.min";
```

5. 注册需要打包的组件

```typescript title='app.module.ts'
import { HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MkdTemplateContainerModule } from "@monkey-design/components";
import { createCustomElement } from "@angular/elements";
import { QuizCommonSharedModule } from "./quiz-common/quiz-common.module";
import { SharedModule } from "./shared.module";
import { EditReadingQuizQuestionComponent } from "./quiz-common/edit-reading-quiz-question/edit-reading-quiz-question.component";
import { QuizQuestionModalComponent } from "./quiz-common/quiz-question-modal/quiz-question-modal.component";
import { EditWordPractiseQuesitonComponent } from "./quiz-common/edit-word-practise-quesiton/edit-word-practise-quesiton.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MkdTemplateContainerModule.forRoot(),
    QuizCommonSharedModule
  ],
  entryComponents: [EditReadingQuizQuestionComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const quizModalEl = createCustomElement(QuizQuestionModalComponent, {
      injector: this.injector
    });
    const editReadingQuizQuestionModalEl = createCustomElement(
      EditReadingQuizQuestionComponent,
      {
        injector: this.injector
      }
    );
    const editWordPractiseQuesitonModalEl = createCustomElement(
      EditWordPractiseQuesitonComponent,
      {
        injector: this.injector
      }
    );
    customElements.define("app-quiz-question-modal-wc", quizModalEl);
    customElements.define(
      "app-edit-reading-quiz-question",
      editReadingQuizQuestionModalEl
    );
    customElements.define(
      "app-edit-word-practise-quesiton",
      editWordPractiseQuesitonModalEl
    );
  }
}
```

6. 打包组件

```bash
yarn build
#  "build": "GLOB_ENV=.env.prod node --max_old_space_size=8192 node_modules/.bin/ng build --configuration=prod --output-hashing='none'",
```

7. 然后需要在使用 webComponent 的项目中导入打包后的 js

```html titile='micro-react/src/index.html'
<!-- 加载webComponent资源 -->
<link rel="stylesheet" href="./angular-web-components/styles.css" />
<!-- 加载webComponent资源，注意导入顺序很重要-->
<script src="./angular-web-components/runtime.js" defer></script>
<script src="./angular-web-components/polyfills.js" defer></script>
<script src="./angular-web-components/main.js" defer></script>
```

8.  在 React 中使用组件

```tsx
import type { OldKnowledgeQueryCondition } from '@common/data/old-knowledge';
import type { FC } from 'react';
import useCustomElement from 'use-custom-element';
import type { Question, QuestionSourceType } from '../../../data/question';
import { PlatformType, QuestionUseType } from '../../../data/question';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'app-quiz-question-modal-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const DefaultQuestion: Question = { content: {}, platformType: PlatformType.App };

interface EditEnglishQuestionModalProps {
  question?: Question;
  questionSourceType: QuestionSourceType;
  useType?: QuestionUseType;
  oldKnowledgeQueryCondition: OldKnowledgeQueryCondition;
  searchAllQuestionMeta?: boolean;
  onCancel: () => void;
  onSubmit: (question: Question) => void;
}

export const EditEnglishQuestionModal: FC<EditEnglishQuestionModalProps> = ({
  question = DefaultQuestion,
  questionSourceType,
  useType = QuestionUseType.Test,
  oldKnowledgeQueryCondition,
  searchAllQuestionMeta = false,
  onCancel,
  onSubmit,
}) => {
  // NOTE：webComponent 传递 boolean 类型的属性时，只要我们添加了这个属性，无论给他的值是 true 还是 false
  // 最后组件拿到的是 'true' / 'false' 所以当一个属性的值是 false 的时候，为了实现想要的效果，需要给 webComponent
  // 删除这个属性
  const realProps = searchAllQuestionMeta
    ? {
        question,
        ['question-source-type']: questionSourceType,
        ['use-type']: useType,
        ['old-knowledge-query-condition']: oldKnowledgeQueryCondition,
        ['search-all-question-meta']: searchAllQuestionMeta,
        cancel: onCancel,
        submit: onSubmit,
      }
    : {
        question,
        ['question-source-type']: questionSourceType,
        ['use-type']: useType,
        ['old-knowledge-query-condition']: oldKnowledgeQueryCondition,
        cancel: onCancel,
        submit: onSubmit,
      };
  const [quizQuestionProps, ref] = useCustomElement(realProps);
  console.log('input quizQuestionProps:', quizQuestionProps);
  return <app-quiz-question-modal-wc {...quizQuestionProps} ref={ref}></app-quiz-question-modal-wc>;
};
```

9. 为了让打包后的组件在开发、测试、线上环境可以读取到正确的环境变量，将 environment 作为一个 window 上的全局变量，webComponent 直接从 window.angularWebComponentEnvironment 读取环境变量信息，然后由使用组件的项目去给组件注入自己的环境变量

```typescript micro-react/src/environment/environment.ts

export const environment: Environment = {
  xxx: xxx
  ...
};

// 为 WebComponent 添加环境变量
(window as any).angularWebComponentEnvironment = environment;
```

10. 为了使用方便，我在 react 项目里配置了一个脚本，可以直接在修改了 webComponent 之后重新打包并启动 react 项目

```json titile='micro-react/package.json'
"mv-wc": "node ../move-web-component.js",
"dev:wc": "cd ../micro-angular-web-components && yarn build:test && cd ../micro-react && yarn mv-wc && yarn gen-version-env && DISABLE_ESLINT_PLUGIN=true dotenv -e .local.single.env -e .env.test react-app-rewired start"
```

```json titile='micro-angular-web-components/package.json'
"build:test": "GLOB_ENV=.env.test node --max_old_space_size=8192 node_modules/.bin/ng build --configuration=test --output-hashing='none'",
```

```js title='move-web-component.js'
const fs = require("fs");
const path = require("path");
const wcDistDir = path.resolve(__dirname, "./dist/angular-web-components");
const targetBuildDir = path.resolve(
  __dirname,
  "./dist/react/angular-web-components"
);
const targetDevDir = path.resolve(
  __dirname,
  "./micro-react/public/angular-web-components"
);
const targetDir = process.env.IS_BUILD ? targetBuildDir : targetDevDir;
console.log("process.env.IS_BUILD", process.env.IS_BUILD);
const fileNames = ["main.js", "runtime.js", "polyfills.js", "styles.css"];
function copyFile(src, dist) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dist));
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

fileNames.forEach(name => {
  const sourePath = `${wcDistDir}/${name}`;
  const targetPath = `${targetDir}/${name}`;
  copyFile(sourePath, targetPath);
});

console.log(`打包后的WebComponent文件成功复制到 ${targetDir} 目录下！`);
```

这样我们在修改了 webCompoenent 想看看效果的时候就可以直接运行 `yarn dev:wc` 即可

## 踩坑

### Angular Input 对象属性无法传入，会变成'[object Object]'

原因是 html 元素的属性只能是字符串类型

所以我们需要将对象类型的属性先使用 `JSON.stringify` 序列化，然后再在组件中使用 `JSON.parse` 反序列化得到对象（useCustomElement Hook https://github.com/the-road-to-learn-react/use-custom-element - 这个 hook 会自动将对象进行序列化&绑定事件）

:::tip 注意

1. 如果我们的 web Components 里面有输入，当我们使用它时，命名模式就会改变。我们在 Angular 组件中使用 camelCase，但如果要从其他 HTML 文件中访问该输入，我们就必须使用 kebab-case (比如 angular 组件的输入属性：questionSourceType，那么我们进行属性赋值的时候就需要给 question-source-type 属性设置值)
2. 如果我们的 Angular 组件里面有输出，我们可以通过 addEventListener 来监听发出的合成事件。没有其他方法，包括 React 通常的 on<EventName={callback}>是不行的，因为这是一个合成事件

:::

### 使用 useCustomElement 可以解决输入属性和事件监听的问题

:::tip

useCustomElement 没有对应的 type 文件，所以当我们作为模块引入是需要添加类型定义。
在全局的 typing.d.ts 中加入
`declare module 'use-custom-element';`

:::

### @ant-design/icons-angular 图标库导入问题

![](/img/angular/1658140892177-e81edfdf-cd8c-4e85-8b06-9d655e89f94d.png)

打包后图标的导入目录都是/assets/，所以只需要将打包后的 assets 目录挪到组件打包后生成目录的根目录下即可

### 组件不被 React 识别

![](/img/angular/1658140941305-ef364828-e928-44b8-81a7-2ee05a4982cc.png)

添加类型声明 https://stackoverflow.com/questions/37414304/typescript-complains-property-does-not-exist-on-type-jsx-intrinsicelements-whe

```tsx
import type React from 'react';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'angular-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
```

### 怎么知道需要在 React 中导入哪些文件才能使用打包后的 angular 组件？

观察打包后的 angular 项目在 index.html 中引入了哪些文件即可

### 引入 angular component 打包后的 style.css 在 build 的时候报错

原因是 `引入 angular component 打包后的 style.css` 已经是被打包后的文件了，相关资源都不需要被二次打包了，可以直接跳过 react 项目的打包流程，将 angular 组件的打包结果直接放到 react 项目打包后的根目录下（对于 react 项目来说，`src/public` 目录下的文件是不会被打包的，会直接移动到打包后的目录的根目录下；angular 的 src/assets 目录有类似的效果）

### 打包后的 angular component main.js 中引入外部资源（js）文件导致生产环境报 404

main.js 中使用相对路径引入了同级目录下的 js 文件，然后 main.js 在 public/index.html 中引入

开发环境起服务没有问题，可以访问，请求的路径为

https://local.zhenguanyu.com:3000/222f5cd159794ee92973.worker.js

生产环境报错

https://zebrain-test.zhenguanyu.com/br/feature-angular-element/react/222f5cd159794ee92973.worker.js

原因：在 index.html 中引用到了外部的 js 和 css 文件，这两个文件都通过相对路径引用了某些资源，js 文件和 css 文件对于引入的文件处理是不一致的，具体表现为：

● js 文件的相对路径是以引用该 js 文件的页面（index.html）为基准
● css 文件的相对路径是以自身的位置为基准

参考：https://cloud.tencent.com/developer/article/1932222

所以将这个 js 文件挪到和 index.html 同级即可

### 本地起服务报错

![](/img/angular/1660038900201-aad9a6bd-15d9-445d-9636-e652a504a35e.png)

版本信息

![](/img/angular/1660038907829-4e7f7a4f-ac48-4dd5-8e11-5f5a9a4a7e7b.png)

查了一下是 typescript 版本的问题

https://www.npmpeer.dev/packages/@angular/compiler-cli/compatibility

![](/img/angular/1660038927703-44bf777b-e85e-42c7-9851-6980ecd9ab65.png)

但是项目中使用的是 4.3.2，所以降低 TS 版本即可

### service 的 apiPrefix

因为我们的组件会涉及到发请求的问题，所以就会有线上和测试环境的区分，但是如果我们的 angular 组件有自己的 environments 的话，在打包的时候我们就会制定使用 test 还是 prod，就会导致在项目中使用打包后的 webComponent 会出现请求接口不对的问题。将环境变量注入到全局，webComponent 从 window 上读取环境变量。

### angular 中使用使用了 webComponent 的 React 组件

因为我们的项目支持在 angular 中使用 react 组件， 那么就有一种场景：angular 组件中使用的 react 组件中又使用了打包为 webComponent 的 angular 组件

- 需要在 angular 中引入打包后的 js 文件（注意需要 angular 打包完成之后再加载这些 js-否则访问不到 environment，而且顺序很重要一定要按顺序加载和执行，不然会报 webpack 的一些错误）

```html title='micro-angular/src/index.html'
<script type="text/javascript">
  window.onload = function() {
    console.log(
      window.angularWebComponentEnvironment,
      "webComponent Enviroment"
    );
    const fragment = document.createDocumentFragment();
    const mainScript = document.createElement("script");

    const runtimeScript = document.createElement("script");
    const polyfillScript = document.createElement("script");
    mainScript.defer = true;
    runtimeScript.defer = true;
    polyfillScript.defer = true;
    runtimeScript.src = "./assets/angular-web-components/runtime.js";
    polyfillScript.src = "./assets/angular-web-components/polyfills.js";
    mainScript.src = "./assets/angular-web-components/main.js";
    fragment.appendChild(runtimeScript);
    fragment.appendChild(polyfillScript);
    fragment.appendChild(mainScript);
    document.body.appendChild(fragment);
  };
</script>
```

:::danger 注意

不要想着在 angular 项目中自己注册一个同名的 webComponent 来避免引入这些 js，实践证明是不可以的，因为 angular 并检测不到 react 中的 webComponent 变化，我们在 angular 中运行的 React 代码是不在 angular 自己的组件树上的，即使这些元素/组件也出现在了页面上，angular 还是不会检测 React 组件中元素的变更（不会展示这个同名的组件），只会检测到我们包裹 React 组件的 angular 组件中的变更为止

:::

### boolean 类型的属性

:::tip

webComponent 传递 boolean 类型的属性时，只要我们添加了这个属性，无论给他的值是 true 还是 false 最后组件拿到的是 'true' / 'false' 所以当一个属性的值是 false 的时候，为了实现想要的效果，需要给 webComponent 删除这个属性

:::

### 属性值为 undefined 时会导致 webComponent 移除该属性

```ts
@Input('question')
  public set inputQuestion(question: string) {
    const innerQuestion = JSON.parse(question ?? '{}');
    console.log('question-modal', innerQuestion);
    this.question = cloneDeep(innerQuestion || DefaultQuestion);
    this.initQuestion = cloneDeep(innerQuestion || DefaultQuestion);
  }

```

当外界传给 question 的只是 undefined 的时候，这个 set 逻辑不会执行，所以判断 webComponent 会移除该属性，因为普通的 angular 组件，当某个属性值是 undefined 的时候会执行该输入属性的 set 逻辑的

### 需要在 module 中声明 webComponent 依赖的组件以及依赖组件的依赖组件,以此类推

angular 打包 webComponent 的时候会打包里面使用到的所有组件，以及这些组件依赖的组件，所以组件以及组件依赖的组件都需要在 webComponent 定义的 module 中去声明，否则就会报错。

![](/img/angular/1669279887261-cb437bda-eb6d-4347-82a3-573bfeead70b.png)

## 参考文档

- React 中使用 angular webComponent Demo：https://github.com/phodal/wc-angular-demo
- https://zhuanlan.zhihu.com/p/98621475
- https://imm9o.medium.com/web-components-with-angular-d0205c9db08f
- https://javascript.plainenglish.io/how-to-dynamically-integrate-angular-in-react-and-share-data-between-both-c507e90b1f09
- https://buddy.works/tutorials/building-web-components-with-angular
- https://www.codementor.io/blog/angular-web-components-8e4n0r0zw7
- https://indepth.dev/posts/1116/angular-web-components-a-complete-guide
- https://javascript.plainenglish.io/creating-web-component-with-angular-element-angular-11-1c53be854a07
- https://juejin.cn/post/6866978487870160910
- https://www.cnblogs.com/JasonWang-code/p/13606137.html
- webComponent 传入对象属性：https://netbasal.com/using-web-components-in-angular-react-preact-vue-and-svelte-3c640a8ba46
- React 中如何使用 public 文件夹：https://juejin.cn/post/6949781646820245534
- React 在 src 目录下访问 src 目录之外的文件会报错：https://blog.csdn.net/halations/article/details/102857657
- 禁止 Zone.js 的自动脏检测，手动出发 angular 检测：https://www.angulararchitects.io/aktuelles/angular-elements-part-iii/
