# vue3-template

- VSCode、Node16+、
- VSCode 插件：TypeScript Vue Plugin (Volar)、Vue Language Features (Volar)、Prettier - Code formatter、ESLint

# 包管理工具安装 pnpm

```sh
npm install pnpm -g
pnpm config get registry
pnpm config set registry https://registry.npmmirror.com/
```

# Vite 脚手架初始化项目

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

# 代码加入 eslint 校验与自动格式化

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

# eslintrc 文件修改

```sh
# eslintrc复制下面代码
module.exports = {
  // 环境 浏览器，最新es语法，node环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // 扩展的eslint规范语法，可以被继承的规则；字符串数组：每个配置继承它前面的配置
  // 分别是 eslint-plugin-vue提供的
  // eslint-config-airbnb-base 提供的
  // eslint-config-prettier 提供的
  // eslint-config- 前缀可以简写
  // https://eslint.vuejs.org/rules/valid-v-if.html
  extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb-base', 'prettier'],
  // ESLint 会对我们的代码进行校验，而 parser 的作用是将我们写的代码转换为 ESTree（AST），ESLint 会对 ESTree 进行校验
  parser: 'vue-eslint-parser',
  // 解析器的配置项
  parserOptions: {
    // es的版本号，或者年份都可以
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    // 源码类型 默认是script， es模块使用module
    sourceType: 'module',
    // 额外的语言类型
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  // 全局自定义的宏，这样再源文件中使用全局变量就不会报错或者警告
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  // 插件
  // 前缀eslint-plugin- 可以省略
  // vue 官方提供了一个 ESLint 插件 eslint-plugin-vue，它提供了 parser 和 rules。parser 为 vue-eslint-parser,放在上面的parser字段里， rules放在extends字段里，选择合适的规则
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    // 设置项目内的别名
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
    // 允许的扩展名
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  // 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'vue/multi-word-component-names': 0,
    'vue/attribute-hyphenation': 0,
    'vue/v-on-event-hyphenation': 0,
  },
};


# 修改package.json文件，添加一个脚本命令
"lint": "eslint \"src/**/*.{js,vue,ts}\" --fix",

```

# 修改 vite.config.ts

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

- tsconfig.json
  ts 编译项目的根目录
  各含义属性 -- https://www.typescriptlang.org/docs/handbook/compiler-options.html
  https://www.tslang.cn/docs/handbook/compiler-options.html
  https://vitejs.bootcss.com/guide/features.html#typescript
  Vite 使用 esbuild 将 TypeScript 转译到 JavaScript, 但不执行任何类型检查； vue-tsc比tsc速度快
  三斜线引用告诉编译器在编译过程中要引入的额外的文件

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
    "strictNullChecks": false,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
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
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

# Husk、lint-staged、commitlint 功能添加

- husky: 是一个为 git 客户端增加 hook 的工具, 在一些git操作前 自动触发的函数；如果我们希望在检测错误的同时，自动修复 eslint 语法错误, 就可以通过后面钩子实现 typicode.github.io/husky/#/
- lint-staged: 过滤出 Git 代码暂存区文件(被 git add 的文件)的工具, 将所有暂存文件的列表传递给任务
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

package.json文件中 添加
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  },

或者放入脚本命令
"lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "npm run lint",
      "npm run prettier-format"
    ]
  }
或者
"*.{ts,js,vue}": [
      "eslint --fix"
    ],
    "*.{html,scss,css,vue}": [
      "prettier --write",
      "stylelint --fix"
    ]
```

# Stylelint 钩子

# 环境变量和模式

# 调试功能与配置文件

# 最终项目结构：

```
.
├── .gitignore
├── .vscode
│   └── extensions.json
├── README.md
├── index.html
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── assets
│   │   └── vue.svg
│   ├── components
│   │   └── HelloWorld.vue
│   ├── main.ts
│   ├── style.css
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```