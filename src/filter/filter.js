/*
filter过滤器只能在 双花括号插值 和 v-bind 表达式中使用。
<!-- 在双花括号中 -->
message | capitalize
<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

过滤器可以串联：
message | filterA | filterB

过滤器可以接收额外参数：
message | filterA('arg1', arg2)
其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。

详情见：https://cn.vuejs.org/v2/guide/filters.html
*/

const capitalize = function(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default {
  capitalize,
};
