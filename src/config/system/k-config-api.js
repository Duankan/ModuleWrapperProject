import { fetch } from 'api';
import config from 'config';
import { Message, LoadingBar } from '@ktw/kcore';

/*
api业务接口配置
  fetch.errorNotify 请求出错回调函数，默认console.error(error), error对象 {code: 403, message: '服务器禁止访问'}
    可配置自己的提示方式: 如 import { Message } from 'element-ui'; Message.error(`${error.code}: ${error.message}`);
  fetch.start(config) 请求开始时触发的回调函数, config为axios请求配置对象, 函数必须return config对象！！！
    详情见： https://www.npmjs.com/package/axios#request-config
    可配合nprogress显示请求状态，详情：https://www.npmjs.com/package/nprogress。
  fetch.success 请求成功时触发的回调函数 (200 <= httpCode <= 300).
  fetch.error 请求失败时触发的回调函数，http请求失败.
  fetch.validate 验证返回格式不满足{statusCode: xxx, message: xxx, data: xxx}的返回结果.
    例如: gis相关请求, 默认通过返回结果中是否包含totalFeature判断.
  fetch.environment 包含打包项目的基础环境变量, 即后台服务地址, 用于部署测试环境下调试使用, 例如:
  fetch.environment = {
    basicUrl: 'http://192.168.1.68:8082',
    YunServicesUrl: 'http://192.168.1.176:15000',
  };
*/

// 项目 api 环境变量配置
fetch.environment = config.project;

fetch.errorNotify = fetch.errorNotify = function(error) {
  console.table(error);
  Message.error(`${error.code}: ${error.message}`);
};

fetch.start = function(config) {
  LoadingBar.start();
  /*
    例如： 需要在请求头中带上token信息，可以这样：
    在本文件头部import store from '@/store';
    config.headers['token'] = store.state.app.userInfo.token;
  */
  return config;
};

fetch.success = function() {
  LoadingBar.finish();
};

fetch.error = function() {
  LoadingBar.error();
};
