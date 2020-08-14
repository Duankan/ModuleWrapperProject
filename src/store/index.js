import Vue from 'vue';
import Vuex from 'vuex';
import Message from '@ktw/message';
import Permission from '@ktw/permission';
import Cache from '@ktw/cache';
import Queue from '@ktw/queue';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const modules = {};
//引进modules文件夹下面的各独立的模块
(r =>
    r.keys().forEach(key => {
        modules[key.match(/\/(.+?)\.js$/)[1]] = r(key).default;
    }))(require.context('./modules', true, /\.js$/));

export default new Vuex.Store({
    actions,
    getters,
    modules,
    plugins: [
        Cache({
            key: 'kproject-cli',
            paths: ['app'],
        }),
        Message,
        Permission,
        Queue
    ],
    strict: process.env.NODE_ENV !== 'production',
});