### 开发环境配置

?> 详细开发流程及项目搭建见 [Adonis 网站](http://192.168.1.117)

* **代码编辑器** : `Visual Studio Code`
* **插件安装 ( 必须 )**: `EditorConfig for VS Code`, `ESLint`, `Prettier`, `Git Lens`, `Vue 2 Snippets`
* **插件安装 ( 可选 )**: `npm Intellisense`, `Path Intellisense`, `Auto Rename Tag`, `vscode-icons`, `JavaScript standardjs styled snippets`
* **Visual Studio Code 配置** `快捷键( ctrl + , )`:

```json
  "editor.tabSize": 2,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.autoFixOnSave": true,
  "eslint.run": "onSave",
  "javascript.format.enable": false,
  "prettier.printWidth": 100,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "vueStyle.formatOnSave": true,
  "editor.formatOnSave": true,
  "files.autoSave": "onWindowChange",
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  },
```

### 项目目录结构

* build —————————— **webpack 打包相关配置文件**
* config —————————— **环境变量配置文件 可在代码中通过 `process.env.NODE_ENV` 来判断**
* dist —————————— **运行 `npm run build` 命令后打包的生产构建版本**
  * config —————————— **项目配置目录**
  * static —————————— **打包生成的静态文件目录**
* docs —————————— **项目开发文档目录**
  * assets —————————— **用来放置开发文档中引用的相关资源文件**
  * zh-cn —————————— **用来放置开发文档**
* node_modules —————————— **`npm install` 安装的项目依赖**
* src —————————— **项目源代码文件夹**
  * assets —————————— **项目引用的资源文件**
    * icon —————————— **放置系统中使用到的 svg 图标**
  * components —————————— **项目公共组件**
  * config —————————— **项目配置文件夹**
    * system —————————— **系统配置文件夹**
      * k-config-api —————————— **系统api配置**
      * k-config-deploy —————————— **系统部署配置**
      * k-config —————————— **系统配置**
  * directive —————————— **vue 指令**
  * filters —————————— **vue 过滤器**
  * router —————————— **vue-router**
  * store —————————— **vuex**
    * modules —————————— **vuex modules**
  * styles —————————— **全局样式文件**
    * variable —————————— **组件库样式变量**
    * reset —————————— **全局重置样式**
    * transition —————————— **全局过渡定义**
  * utils —————————— **工具函数**
    * help —————————— **业务开发中需要的全局帮助函数**
  * view —————————— **放置业务组件**
    * dashboard —————————— **首页**
    * map —————————— **地图组件**
    * user —————————— **用户相关**
  * App.vue —————————— **入口组件**
  * main.js —————————— **入口 js**
* static —————————— **静态资源文件夹**
  * sdk —————————— **放置第三方 sdk**
* test —————————— **放置测试代码文件夹**
* .babelrc —————————— **babel-loader 加载的配置文件**
* .editorconfig —————————— **统一编辑器格式配置文件**
* .eslintrc.js —————————— **eslint 代码校验配置文件**
* .postcssrc.js —————————— **postcss 配置文件**
* .prettierrc.js —————————— **prettier 配置文件**
* favicon.ico —————————— **favicon**
* index.html —————————— **html 模版文件**
* package.json —————————— **npm 生成的包管理文件**
* README.md —————————— **常用命令说明**

### 常用命令

!> 必须使用 npm 安装依赖，请确保 npm 已指向私有仓库地址, 详情见 [私有仓库](http://192.168.1.117:7002)。

```bash
# 安装项目依赖
npm install

# 开发模式（热重载） 浏览器键入 http://localhost:8080
npm run dev

# 自动fix代码格式问题
npm run lint

# 生产版本构建(minify)
npm run build

# 生产版本构建(查看打包构建bundle组成报告)
npm run build --report

# 查看生产构建后的版本
npm run web

# 查看项目文档
npm run docs

# 发布新版本，并根据提交记录自动生成changlong.md
npm run release

# 运行单元测试
npm run unit

# 运行端到端测试
npm run e2e

# 运行所有测试
npm test
```

### 代码提交规范

* 项目推荐采用 git 作为代码管理工具，当通过 git 提交代码时，会采用`commitlint`进行提交信息校验，信息格式遵循`Angular commit convention`，以保证每次提交信息`清楚`、`明确`，有利于回退及问题排查。

```
代码提交格式：
<类型>(<域>?): <主题>

<主体>?

<补充>?

类型包括：
build: 系统构建后提交
ci: 持续集成脚本或者配置变更
chore: 杂项、周期性事件提交
docs: 文档变更
feat: 新功能
fix: bug修复
perf: 代码性能优化
refactor: 代码重构（修复bug或者增加新功能）
style: 界面样式变更
test: 添加或者修改测试脚本

主题：
简明阐述本次提交修改的内容

主体（可选）：
详细阐述为什么修改，如何修改

补充（可选）：
BREAKING CHANGE: 不兼容性更新说明

实例：
bug修复: git commit -a -m "fix(user): 修复user模块用户无法登陆的bug。"
功能开发: git commit -a -m "feat(dashboard): 新增首页导航栏，现在可以正确进行功能页面导航。"
破坏性变更（不兼容性更改）: git commit -a -m "feat(mapdoc): 新增地图文档功能。
BREAKING CHANGE: 新保存的地图文档格式将不兼容老版本格式。迁移文档见： xxxx"
文档更新: git commit -a -m "docs: 修复文档中存在的错别字及语法错误。"


详情见： https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines
```

### 代码组织及命名规范

?> 统一的命令规范有利于减少认知成本，提高沟通效率，方便日后维护。

* `assets`目录下以`view`目录下业务组件文件夹名，组织资源文件，文件名使用`-`分割`小写字母`。
* `components`目录下放置公共组件。
* `config/k-config.yml`文件写入系统级配置及系统权限路由。
* `directive`、`filters`目录放置`vue`的指令、过滤器，里面的函数可以在业务组件中引用。
* `store`目录下`modules`目录下放置`系统级模块`。
* `view`目录下以`小写字母`命名业务组件文件夹。

!> `.vue`结尾的业务组件采用`每个单词首字母大写命名规则`，子组件应该以父组件文件名开头，多文件时，建议建立子文件夹组织父子组件关系。
