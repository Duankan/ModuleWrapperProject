/*
declare type RouteConfig = {
  path: string;  // 路由匹配路径
  component?: Component;  // 路由匹配的单一组件，多组件展示请使用components属性，异步路由 () => import('view/login/Login')
  name?: string; // 命名路由
  components?: { [name: string]: Component }; // 命名视图组件  同时（同级）展示多个视图，而不是嵌套展示时使用。
  redirect?: string | Location | Function;   // 路由重定向跳转
  props?: boolean | string | Function;  是否将路由参数作为props传递给路由组件 详细用法： https://router.vuejs.org/zh-cn/essentials/passing-props.html
  alias?: string | Array<string>;   { path: '/a', component: A, alias: '/b' }  访问/b等同访问/a
  children?: Array<RouteConfig>; // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void;  详情见同级目录下index.js中关于路由钩子的注释部分
  meta?: any;  路由元信息 用以绑定该路由相关信息 详细用法：https://router.vuejs.org/zh-cn/advanced/meta.html
  caseSensitive?: boolean; // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object; // 编译正则的选项
}

详情见： https://router.vuejs.org/zh-cn/api/options.html#routes
*/

import Login from 'view/user/Login';
import DashBoard from 'view/dashboard/DashBoard';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard,
  }
];

export default routes;
