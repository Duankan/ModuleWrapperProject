## 业务 api

* 详细配置项位于： `/src/config/k-config-api.js`

* 接口打包文件位于： `/static/sdk/api.js`

* 接口打包文件引入: `/index.html`

> 建议: 开发阶段引用接口打包生成的线上地址(`http://192.168.1.117:3000/api/xxx/api.js`).
> 这样可以新增接口打包完成后，本地代码直接请求。

### 基本结构

例如一个稍显复杂的`post`请求：

模版: `http://hostname:port/pathname/:id?query=xxx`

url: `http://192.168.1.68:8080/resource/service/12345678?query=name`

body: `{ pageIndex: 1, pagesize: 10 }` 或者 `File` 对象

按`body`的内容分为两类：

* `JSON` 对象

```js
api.[项目名].[接口名]({
  id: 12345678,
  query: 'name',
  pageIndex: 1,
  pagesize: 10
}, config?);
```

* `file`或者`FormData`对象

```js
api.[项目名].[接口名]({
  id: 12345678,
  query: 'name'
}, File, config?);

如果没有 path 参数与 query 参数,请将参数第一位以 空对象 传递.

api.[项目名].[接口名]({} , FormData, config);
```

`config`配置为可选项，详情见`axios`[文档](https://www.npmjs.com/package/axios#request-config)，扩展了**失败重试**，见**如何使用**第 3 条。

### 如何使用

* 使用已打包的接口。

如需**全局管理状态**，在`src/store/modules/xx.js`的头部通过`import { login, findCatalog } from 'api';`的方式导入 api 接口，否则在`.vue`文件`script`头部导入接口。

* 自定义请求。

通过`import { fetch } from 'api';`导入，然后`fetch(config)`发送，`config`对象见`axios`[文档](https://www.npmjs.com/package/axios#request-config)。

?> `fetch`仅仅只是一个变量名，其指向了一个`axios`实例，`api`请求是通过`fetch`这个实例发送的，便于全局错误处理。

* 失败重试。

`api`请求现在支持**失败重试**，例如：`api.login({user: 'admin', password: 'xxx'}, {retry: 3, retryDelay: 500})`，该请求将失败重试 3 次，每次间隔 500ms。

### 注意事项

!> 请务必详细阅读`/src/config/k-config-api.js`中注解内容。

当 `api` 请求返回的 `promise` 被 `resolve` 后得到的 `response`对象格式为：

```js
{
  data: {
    message: '成功',
    statusCode: 200,
    data: {}    // 数据
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {}
}
```

请求成功时，我们只关心 `response.data.data` 中的内容，所以进行了 `response.data = response.data.data` 重新赋值，现在`response.data`即为所需数据。

请求失败时，我们只关心 `response.data.message` 和 `response.data.statusCode` 中的内容，对此框架进行了全局错误处理通知, 并`reject`了一个错误异常，用以进行请求出错后续处理(见示例)。

### 示例

async 函数用法见 [async](http://es6.ruanyifeng.com/#docs/async)

```js
import { login } from 'api';

async function login() {
  try {
    // 接口调用返回的为promise对象
    const response = await api.db.login({ username: 'admin', password: 123456 });
  } catch (e) {
    // 失败的后续处理，如结束登陆按钮的 loading 状态等。。。
  }
  this.$Message.success('登陆成功！');
  console.log(response.data); // 打印登陆成功返回的用户信息
}
```

## api 管理系统

项目框架已默认集成 api 管理系统开发流程.

### 使用指南

!> 必读

1. 注册 `username`（用户名）使用`中文`实名注册，邮箱使用`公司邮箱（xxx@kingtopware.com）`.
2. 注册完需联系`管理员`或者`项目组长`，添加成为`项目组长`或者`开发者`.
3. 添加项目 `项目名` 必须为 `英文`，打包时会将`项目名`作为`接口名`前置. 例如: `api.[项目名].[接口名]`.
4. 不要修改`项目权限`，请保持为`私有`.
5. 项目创建完，请到 `设置/环境配置` 中增加当前项目的`接口环境变量`.
6. 接口名称必须按照 `login|登陆` 这样的规则书写。 `|`之前会作为`接口名`，之后为了查找方便.
7. `项目组长`通过`项目`内的`成员管理`，将`项目开发者`添加进`项目成员列表`.
8. 创建完接口后，最好通过接口面板的`运行`页面，测试添加的接口是否正常（第一次使用需按说明安装 chrome 浏览器插件），并把返回结果复制粘贴到接口`编辑`页面的`response`中。

### 部署地址

?> 内网访问： http://192.168.1.117:3000

### 详细文档

?> 使用说明： http://192.168.1.117:3000/doc/usage.html
