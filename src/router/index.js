import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import config from 'config';
import routes from './routes';

Vue.use(Router);

/*
mode:
  hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
  history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。
base：
  应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
linkActiveClass：
  全局配置 <router-link> 的默认『激活 class 类名』。参考 router-link。
linkExactActiveClass：
  全局配置 <router-link> 精确激活的默认的 class。可同时翻阅 router-link。

详情见： https://router.vuejs.org/zh-cn/api/options.html
*/

const router = new Router({
    mode: 'hash',
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    routes,
});

/*
完整的导航解析流程：
  1.导航被触发。
  2.在失活的组件里调用 beforeRouteLeave 守卫。 (能访问组件实例this)
  3.调用全局的 beforeEach 守卫。
  4.在重用的组件里调用 beforeRouteUpdate 守卫。 (能访问组件实例this)
  5.在路由配置里调用 beforeEnter守卫。
  6.解析异步路由组件。
  7.在被激活的组件里调用 beforeRouteEnter 守卫。 (!!!不能访问组件实例this，此时组件还未初始化完成.)
  8.调用全局的 beforeResolve 守卫。
  9.导航被确认。
  10.调用全局的 afterEach 守卫。
  11.触发 DOM 更新。
  12。用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

路由守卫hook函数中传入的 to, from 为 route对象，拥有以下属性：
  name: 当前路由的名称，如果有的话
  path: 对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"
  params: 对于路径 /user/:username/post/:post_id 匹配 /user/evan/post/123  $route.params == { username: 'evan', post_id: 123 }
  query: 对于路径 /foo?user=1, 则有 $route.query.user === 1
  hash: 当前路由的 hash 值 (带 #) ，对于路径 /foo#main, 则有 $route.hash === '#main'
  fullPath: 完成解析后的 URL，包含查询参数和 hash 的完整路径
  matched: 路由匹配的route数组，从路径左向右匹配

详情见： https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
*/

// 全局路由前置钩子，在每个路由进入前调用
router.beforeEach((to, from, next) => {
    // if (!config.whiteList.includes(to.path)) {
    //   if (!store.getters.login) {
    //     next('/login');
    //   } else {
    //     if (!store.state.permission.routes) {
    //       store.commit('SET_PERMISSION_ROUTES');
    //     }
    //     to.matched.length ? next() : next(to.fullPath);
    //   }
    // } else {
    //   next();
    // }
    if (!config.whiteList.includes(to.fullPath)) {
        if (!store.state.permission.routes) {
            store.commit('SET_PERMISSION_ROUTES');
        }
        to.matched.length ? next() : next(to.fullPath);
    } else {
        store.getters.login ? next('/') : next();
    }
});

// 全局路由后置钩子，在每个路由进入后调用
router.afterEach(() => {});

export default router;