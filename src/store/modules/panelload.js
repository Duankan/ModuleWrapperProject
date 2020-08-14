import * as types from '../types';
import api from 'api';
import { md5, cookie, crypto, objectUtil } from '@ktw/ktools';

/**
 * 用户信息模块
 */
const panelload = {
    state: {},
    getters: {},
    mutations: {
        // //设置用户信息
        // [types.SET_USER_INFO](state, data) {
        //   state.info = data;
        //   const user = objectUtil.deepCopy(data);
        //   delete user.password;
        //   localStorage.setItem('user', JSON.stringify(user));
        // }
    },
    actions: {},
};

export default panelload;