import * as types from '../types';
import api from 'api';
import { md5, cookie, crypto, objectUtil } from '@ktw/ktools';

/**
 * 用户信息模块
 */
const user = {
  state: {
    //用户信息
    info: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    //用户验证凭证
    token: cookie.get('token') || '',
  },
  getters: {
    //用户是否登录
    login: state => !!state.token,
  },
  mutations: {
    //设置用户信息
    [types.SET_USER_INFO](state, data) {
      state.info = data;
      const user = objectUtil.deepCopy(data);
      delete user.password;
      localStorage.setItem('user', JSON.stringify(user));
    },
    //设置用户验证凭证
    [types.SET_USER_TOKEN](state, { token, expiredTime, }) {
      state.token = token;
      cookie.set('token', state.token, { expires: expiredTime || 0.04, });
    },
    //保存用户登录名和密码
    [types.SET_USER_TICKET](state, { username, password, remeber, }) {
      if (remeber) {
        let ticket = crypto.encryptAes(`${username} ${password}`);
        cookie.set('ticket', ticket, { expires: 365 * 100, });
      } else {
        cookie.remove('ticket');
      }
    },
    //清除用户登录名和密码
    [types.REMOVE_USER_TICKET](state) {
      cookie.remove('ticket');
    },
    //移除用户信息
    [types.REMOVE_USER_INFO](state) {
      state.info = {};
      localStorage.removeItem('user');
    },
    //移除用户验证凭证
    [types.REMOVE_USER_TOKEN](state) {
      state.token = '';
      cookie.remove('token');
    },
    //更新用户信息
    [types.UPDATE_USER_INFO](state, data) {
      state.info = Object.assign({}, state.info, data);
      const user = objectUtil.deepCopy(state.info);
      delete user.password;
      localStorage.setItem('user', JSON.stringify(user));
    },
  },
  actions: {
    //用户登录
    async [types.USER_LOGIN]({ commit, }, { username, password, remeber, expiredTime, }) {
      const response = await api.public.login({
        name: username,
        password: md5(password),
      });
      if (response.data && response.headers) {
        //设置用户信息
        commit(types.SET_USER_INFO, response.data);
        //设置用户登录凭证
        commit(types.SET_USER_TOKEN, {
          token: response.headers['token'],
          expiredTime,
        });
        //设置用户名和密码
        commit(types.SET_USER_TICKET, {
          username,
          password,
          remeber,
        });
      } else {
        throw new Error('登陆信息提交错误。请提交完整的接口调用返回值');
      }
    },
    //退出登录
    [types.USER_LOGOUT]({ commit, }) {
      commit(types.REMOVE_USER_INFO);
      commit(types.REMOVE_USER_TOKEN);
    },
  },
};

export default user;
