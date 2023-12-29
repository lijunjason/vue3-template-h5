# vue3-template-h5

- 基于 Vue3、Pinia、Vite、TypeScript
- IDE环境：VSCode、Node16+
- VSCode 插件：TypeScript Vue Plugin (Volar)、Vue Language Features
  (Volar)、Prettier - Code formatter、ESLint、Stylelint

# 项目初始化&启动

```
npm install pnpm -g
pnpm i --registry=http://ires.58corp.com/repository/58npm/
pnpm run dev

```

# 接口调试抓包

- whistle 相关

  ```
  sudo npm i -g whistle
  w2 start
  浏览器打开 http://127.0.0.1:8899/#network
  手机配置代理 [电脑ip]:8899
  查看请求
  ```

- 浏览器插件安装 SwitchyOmega
  https://github.com/FelisCatus/SwitchyOmega/releases/tag/v2.5.20 下载.crx 文件
  拖拽到浏览器的扩展程序中

# 文件目录

```
├── .husky
│   └── commit-msg           # commit 信息校验
|   └── pre-commit           # eslint 代码检验
├── .vscode
│   └── extensions.json       # 指定推荐的扩展插件列表
|   └── settings.json         # vscode 格式化配置
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件和基础布局组件
│   ├── hooks                # 自定义hooks
│   ├── router               # Vue-Router
│   ├── store                # Pinia
│   ├── styles               # 全局样式
│   ├── utils                # 工具库
│   ├── views                # 业务页面入口和常用模板
│   ├── App.vue              # Vue 模板入口
│   ├── auto-import.d.ts     # 自动导入组件
│   └── main.ts              # Vue 入口 JS
│   └── vite-env.d.ts        # 全局公用 TypeScript 类型
├── public                   # 静态文件
├── auto-imports.d.ts        # Vue3 组合式API 类型声明文件
├── components.d.ts          # 组件自注册类型声明文件
├── vite.config.ts           # Vite 配置文件
├── tsconfig.json            # TS 配置文件
├── index.html               # 浏览器渲染入口
├── README.md                # 简单介绍
└── package.json             # 项目的依赖

```

# 模版搭建

## Vite 脚手架初始化项目

- https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

```sh
# 新建文件夹vite-vue3
pnpm create vite vite-vue3 --template vue-ts
# 当前文件夹
pnpm create vite . --template vue-ts
# 修改vite.config.ts, 修改域名端口，自动启动浏览器
server: {
  host: 'localhost',
  port: 9999,
  open: true
}
# 进入文件夹安装依赖启动项目
pnpm i
pnpm run dev
```

## 代码加入 eslint 校验与自动格式化

- 相关依赖安装

```sh
pnpm i eslint eslint-plugin-vue eslint-config-prettier prettier eslint-plugin-import eslint-plugin-prettier eslint-config-airbnb-base -D

# eslint: ESlint的核心代码库
# prettier: prettier格式化代码核心库
# eslint-config-airbnb-base: airbnb的代码规范(依赖plugin-import)
# eslint-config-prettier: eslint 结合prettier的格式化
# eslint-plugin-vue: eslint在vue里的代码规范
# eslint-plugin-import: 项目里面支持eslint
# eslint-plugin-prettier: 将prettier结合进入eslint的插件
```

- 配置script脚本, 项目安装eslint 配置

```sh
# package.json 配置script
"lint:create": "eslint --init"
# 执行
pnpm run lint:create

You can also run this command directly using 'npm init @eslint/config'.
✔ How would you like to use ESLint? · To check syntax and find problems (选第二个)
✔ What type of modules does your project use? · JavaScript modules (import/export)
✔ Which framework does your project use? · Vue.js
✔ Does your project use TypeScript? ·  Yes
✔ Where does your code run? · browser+node
✔ What format do you want your config file to be in? · JavaScript
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · pnpm

# 安装完成后，后面项目还缺少一些依赖，提前安装好
pnpm i typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-alias @types/eslint @types/node -D

# @typescript-eslint/parser: ESlint的解析器，用于解析typescript 从而检查和规范Typescript代码
# @typescript-eslint/eslint-plugin: 这是ESlint插件，包含了各类定义好的检查Typescript代码规范
# eslint-import-resolver-alias: 让我们可以import的时候使用@别名
```

## eslintrc 文件修改

```sh
# eslintrc复制下面代码
/**
 * npx eslint --init // 自动生成配置文件并安装下面四个依赖
 *
 * npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue -D // 手动创建文件
 *
 * eslint
 * @typescript-eslint/parser // ESLint 默认使用的是 Espree 进行语法解析，所以无法对部分 typescript 语法进行解析，需要替换掉默认的解析器
 * @typescript-eslint/eslint-plugin // 作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则
 * eslint-plugin-vue // 让 eslint 识别 vue 文件
 *
 * 配置文件优先级：.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json。
 */

module.exports = {
  root: true, // 停止向上查找父级目录中的配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // eslint-config-prettier 的缩写
    'prettier',
    // 解决使用自动导入api报错
    './.eslintrc-auto-import.json',
    // 单独解决使用vue api时报错
    // 'vue-global-api',
  ],
  parser: 'vue-eslint-parser', // 指定要使用的解析器
  // 给解析器传入一些其他的配置参数
  parserOptions: {
    ecmaVersion: 'latest', // 支持的es版本
    parser: '@typescript-eslint/parser',
    sourceType: 'module', // 模块类型，默认为script，我们设置为module
  },
  // 全局自定义的宏，这样再源文件中使用全局变量就不会报错或者警告
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    PHONE_BAR_SDK: 'readonly',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'], // eslint-plugin- 可以省略
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};


# 修改package.json文件，添加一个脚本命令
"lint": "eslint \"src/**/*.{js,vue,ts}\" --fix",

```

## 修改 vite.config.ts

```sh
pnpm install vite-plugin-eslint -D  vite的一个插件，让项目可以方便的得到eslint支持,完成eslint配置后,可以快速的将其集成进vite之中,便于在代码不符合eslint规范的第一时间看到提示

import eslintPlugin from 'vite-plugin-eslint'

plugins: [vue(), eslintPlugin()],
```

# 修改添加常见配置文件

- 外部新建文件 .eslintrcignore, .prettierrc.cjs, .prettierignore

- .eslintrcignore

```sh
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
/bin
.eslintrc.js
prettier.config.js
/src/mock/*

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.DS_Store
dist-ssr
*.local

/cypress/videos/
/cypress/screenshots/

# Editor directories and files
.vscode
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

components.d.ts
vite-env.d.ts
```

- .prettierrc.cjs

```sh
module.exports = {
  // 一行最多 100 字符
  printWidth: 80,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: 'es5',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'always',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf',
}
```

- .prettierignore

```sh
/dist/*
.local
.output.js
/node_modules/**
src/.DS_Store

**/*.svg
**/*.sh

/public/*
components.d.ts
```

- package.json添加脚本

```sh
"prettier-format": "prettier --config .prettierrc.cjs \"src/**/*.{vue,js,ts}\" --write",
```

- tsconfig.json ts 编译项目的根目录各含义属性 --
  https://www.typescriptlang.org/docs/handbook/compiler-options.html
  https://www.tslang.cn/docs/handbook/compiler-options.html
  https://vitejs.bootcss.com/guide/features.html#typescript Vite 使用 esbuild 将
  TypeScript 转译到 JavaScript, 但不执行任何类型检查； vue-tsc比tsc速度快三斜线
  引用告诉编译器在编译过程中要引入的额外的文件

```sh
{
  "compilerOptions": {
    // 指定es的目标版本
    "target": "esnext",
    "useDefineForClassFields": true,
    // "isolatedModules": true,
    "module": "esnext",
    // 决定如何处理模块
    "moduleResolution": "node",
    "strict": true,
    "strictNullChecks": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    // 编译过程中需要引入的库文件的列表
    "lib": ["esnext", "dom", "DOM.Iterable"],
    // 默认所有可见的"@types"包会在编译过程中被包含进来
    "types": ["vite/client"],
    // 解析非相对模块名的基准目录
    "baseUrl": ".",
    // 模块名到基于 baseUrl的路径映射的列表
    "paths": {
      "@/*": ["src/*"],
      "*.ts": ["*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Husk、lint-staged、commitlint 功能添加

- husky: 是一个为 git 客户端增加 hook 的工具, 在一些git操作前 自动触发的函数；如
  果我们希望在检测错误的同时，自动修复 eslint 语法错误, 就可以通过后面钩子实现
  typicode.github.io/husky/#/
- lint-staged: 过滤出 Git 代码暂存区文件(被 git add 的文件)的工具, 将所有暂存文
  件的列表传递给任务
- commitlint: 是对我们git commit提交的注释进行 校验的工具

```sh
# 可以让我们在如 git commit、git push 执行前，预先处理我们指定的任务
pnpm install lint-staged husky -D
# 配置package.json文件 (新项目需要先git init一下)
"prepare": "husky install"
# 将husky安装完毕
npm run prepare
# 后面就开始添加各种 git hooks 钩子
# pre-commit钩子一般 添加的是lint-staged 去对git暂存区的代码做一些格式化的操作
npx husky add .husky/pre-commit "npx lint-staged"
# lint-staged 对add之后，暂存区里面的文件进行格式化修复等工作
pnpm install lint-staged -D
# package.json文件中 添加
"lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "npm run lint",
      "npm run prettier-format"
    ]
  }
# 安装commitlint
pnpm install @commitlint/config-conventional @commitlint/cli -D
# 添加到git钩子里
npx husky add .husky/commit-msg  "npx --no -- commitlint --edit ${1}"
# 新建commitlint.config.cjs
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
      	'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'feat', // 新功能（feature)
        'fix', // 修复bug
        'upd', // 更新某功能
        'refactor', // 重构
        'docs', // 文档（documentation）
        'chore', // 构建过程或辅助工具的变动，比如增加依赖库等
        'style', // 格式（不影响代码运行的变动）
        'revert', // 撤销commit,回滚到上一个版本
        'perf', // 性能优化
        'test', // 测试（单元、集成测试）
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
#常用的git hooks
#pre-commit  由 git commit 调用，在 commit 之前执行
#commit-msg：由 git commit 或 git merge 调用 或者 --amend xxx
#pre-merge-commit  由 git merge 调用，在 merge 之前执行
#pre-push：被 git push 调用，在 git push 前执行，防止进行推送
```

# Stylelint 钩子

- Stylelint CSS 代码检查器（linter），帮助我们规避 CSS 代码中的错误并保持一致的
  编码风格
- 1.安装vscode插件 StyleLint插件
- 2.修改vscode 设置 settings.json， 添加下面几行代码

```sh
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "stylelint.validate": ["css", "scss","less", "vue"],
}
# 安装项目需要的校验库, (常见的规则包)
pnpm install --save-dev stylelint stylelint-config-standard
# 根目录建立 .stylelintrc.cjs
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-recommended-scss'],
    },
  ],
  rules: {
    'selector-class-pattern': null,
    'no-duplicate-selectors': null,
    'no-duplicate-selectors': null,
    'no-duplicate-selectors': null,
    'scss/dollar-variable-pattern': null,
    'media-feature-name-no-unknown': null,
  },
};

# 执行
npx stylelint "**/*.css"

# 增加对vue里面的样式支持， (附带less和sass的支持)
# 对less的支持
pnpm install stylelint-less stylelint-config-recommended-less -D
# 对sass的支持
pnpm install stylelint-scss stylelint-config-recommended-scss postcss -D
# 对vue里面样式的支持 (vue的样式需要依赖前面这个库)【本次用这个】
pnpm install postcss-html stylelint-config-standard-scss stylelint-config-recommended-vue postcss -D
# Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持, 不需要在安装特定插件和预处理器

# 修改styellintrc
 extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-less",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue"
  ]

sass的extends
"extends": [
	"stylelint-config-standard-scss",
	"stylelint-config-recommended-vue/scss"
]，
#  package.json文件添加
"lint:css": "stylelint **/*.{html,vue,css,sass,scss,less} --fix",
# 给vite添加插件
pnpm install vite-plugin-stylelint -D
# 修改vite.config.js
import StylelintPlugin from 'vite-plugin-stylelint';
plugins：[... StylelintPlugin({fix: true})]
# 添加到 lint-stage里面， 在暂存区对文件样式进行格式化
"lint-staged": {
  "*.{js,jsx,vue,ts,tsx}": [
    "npm run lint",
    "npm run prettier-format"
  ],
  "*.{vue,less,css,sass}": [
    "npm run lint:css"
  ]
}
# 最后添加一个 .stylelintignore文件， 忽略哪些文件不检查 css，less，scss等
/dist/*
/public/*
#  .stylelintrc.cjs 内部的其他配置
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
  overrides: [
    // 若项目中存在scss文件，添加以下配置
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
      extends: ["stylelint-config-recommended-scss"],
    },
    // 若项目中存在less文件，添加以下配置
    {
      files: ["*.less", "**/*.less"],
      customSyntax: "postcss-less",
      extends: ["stylelint-config-recommended-less"],
    },
  ],
}
```

## 环境变量和模式

```sh
# 创建.env .env.dev .env.prod
- .env
# 加载公共配置 页面标题
VITE_APP_TITLE = 'Vue3 Template H5'
- .env.dev
# 开发环境
NODE_ENV = development

VITE_APP_API_BASE_URL = /api-dev

# 是否在打包时生成 sourcemap
VITE_BUILD_SOURCEMAP = true
# 是否在打包时删除 console 代码
VITE_BUILD_DROP_CONSOLE = false
# 是否开启调试工具 vconsole
VITE_BUILD_VCONSOLE = true
- .env.prod
# 生产环境
NODE_ENV = production

VITE_APP_API_BASE_URL = /api-pro

# 是否在打包时生成 sourcemap
VITE_BUILD_SOURCEMAP = false
# 是否在打包时删除 console 代码
VITE_BUILD_DROP_CONSOLE = true
# 是否开启调试工具 vconsole
VITE_BUILD_VCONSOLE = false
# 在package.json文件里面 写上对应的脚本
"dev": "vite --mode dev",
"build": "vue-tsc --noEmit && vite build --mode prod",
# src/vite-env.d.ts添加
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_BUILD_SOURCEMAP: string;
  readonly VITE_BUILD_DROP_CONSOLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
# tsconfig.node.json 添加
{
  // 只有同时加入 "src/vite-env.d.ts" 才能使vite.config.ts中能使用src/vite-env.d.ts中的全局类型
  "include": ["vite.config.ts", "src/vite-env.d.ts"]
}


# index.html 中通过vite-plugin-simple-html加载
pnpm i vite-plugin-simple-html -D
# vite.config.ts

import simpleHtmlPlugin from 'vite-plugin-simple-html';

export default ({ mode }) => {
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      simpleHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
    ],
  });
};

```

## 调试功能与配置文件

```sh
# .vscode文件里面 .launch.json文件 settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.validate": ["css", "less", "scss", "vue"],
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[ts]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    // "editor.defaultFormatter": "stylelint.vscode-stylelint"
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
# 移动端调试
pnpm i vconsole
pnpm i vite-plugin-vconsole -D
# vite.config.ts配置
plugin: [
  viteVConsole({
    entry: pathResolve('src/main.ts'),
    localEnabled: true,
    enabled: env.VITE_BUILD_VCONSOLE === 'true',
    config: {
      maxLogNumber: 1000,
      theme: 'dark',
    },
  }),
]
```

## vant4 移动端适配 自动导入 vue-router4 pinia

```sh
# vant 安装
pnpm i vant
# vant 按需引入
pnpm i unplugin-vue-components -D
# vite.config.ts配置
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

plugins: [
  Components({
    resolvers: [VantResolver()],
  }),
]

#移动端适配rem方案
pnpm i amfe-flexible
pnpm i postcss-pxtorem -D
pnpm i autoprefixer -D
#新建文件postcss.config.cjs

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue({ file }) {
        return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75;
      },
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.ignore', 'keep-px'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
};
# 自动导入
pnpm i unplugin-auto-import -D
# vite.config.ts配置
import AutoImport from 'unplugin-auto-import/vite';

plugins: [
  AutoImport({
    imports: ['vue', 'vue-router'],
    // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
    dts: 'src/auto-import.d.ts',
    // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
    // 'vue-global-api'这个插件仅仅解决vue3 hook报错
    eslintrc: {
      enabled: true,
    },
  }),
]
# .eslintrc.cjs

extends: [
  // 解决使用自动导入api报错
  './.eslintrc-auto-import.json',
  // 单独解决使用vue api时报错
  // 'vue-global-api',
],

#安装vue-router
pnpm i vue-router@4

#安装pinia
pnpm i pinia
# 安装terser
pnpm install terser --save-dev

pnpm install @vitejs/plugin-legacy --save-dev
```

## 关于可选链(Optional chaining)(?.)的使用问题

```sh
pnpm i @rollup/plugin-babel -D
pnpm i @babel/plugin-transform-optional-chaining -D

# vite.config.ts配置
# 在 serve 环境时，如果需要解决低版本chrome可选链报错问题，就打开上面的 babel 配置；如果需要 debug ，则注释掉 babel 配置
# build 时 vite 会对文件进行转译以支持低版本浏览器，不影响
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      babelHelpers: 'bundled',
      plugins: [ '@babel/plugin-transform-optional-chaining' ]
      include: include: [/\.vue$/, /\.ts$/],
      extensions: ['.vue', '.ts'],
    })
  ]
})

```

## 打包build 视图分析依赖文件

```sh
pnpm i rollup-plugin-visualizer -D

# vite.config.ts配置
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [vue(), visualizer({
    emitFile: false,
    filename: "visualizer.html", //分析图生成的文件名
    open: true //如果存在本地服务端口，将在打包后自动展示
  })],
})
```

## setup语法糖name增强

```sh
pnpm i vite-plugin-vue-setup-extend -D

# vite.config.ts配置
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
export default  ({ mode }) => defineConfig({
  plugins: [
    vueSetupExtend()
  ]
}
```
