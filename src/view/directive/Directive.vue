<script>
import Vue from 'vue';
import view from '@/view';
import { PanelLoader } from '@/moduleloader';
import { ModuleLoader } from '@/moduleloader';
import custom from 'custom';
import config from 'config';
export default {
  name: 'Directive',
  components: view,
  props: {
    //模块引用ID
    module: {
      type: String,
      default: 'EmptyModule',
    },
  },
  // directives: {
  //   'duying': {
  //     //绑定时第一次调用
  //     bind: function (el, binding) {
  //       el.style['background'] = binding.value;
  //     },
  //     //绑定元素被插入父节点时调用
  //     inserted: function (el, binding) {
  //       console.log('inserted');
  //     },
  //     //绑定元素模块更新时调用
  //     update: function (el, binding) {
  //       console.log('update');
  //     },
  //     //绑定元素模板完成一次更新周期时调用
  //     componentUpdate: function (el, binding) {
  //       console.log('componentUpdate');
  //     },
  //     //解绑时第一次调用
  //     unbind: function () {
  //       // console.log(this.el);
  //       // console.log('unbind');
  //     },
  //   },
  // },
  data() {
    return {
      paipaipai: '',
      color: 'white',
      show: true,
      left: { module: 'Map', position: 'left', action: 'panel', panelId: null, },
      right: { module: 'EmptyModule', position: 'right', action: 'panel', panelId: null, },
      bottom1: { module: 'Itable', position: 'bottom-open', action: 'panel', panelId: null, },
      bottom2: { module: 'Itable2', position: 'bottom-open', action: 'panel', panelId: null, },
      link: { module: 'https://www.iviewui.com/components/tabs', position: '', action: 'link', openType: 'href', panelId: null, },
    };
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      return this.paipaipai.split('').reverse().join('');
    },
  },
  methods: {
    toIframe() {
      this.$router.push({ name: 'Iframe', params: { url: 'basicplatform-highgis-portal/main.html#/content/myData', }, });
    },
    //打开面板
    async openPanel(item) {
      console.log(custom);
      console.log(config);
      let moduleInst = null;
      if (!L.Util.isNull(item)) {
        moduleInst = ModuleLoader.getModule(item.panelId);
        if (!moduleInst) {
          item.panelId = ModuleLoader.createModule({
            title: `${item.module}属性查询结果`,
            module: item.module,
            showArgs: { position: item.position, },
            attrArgs: {
              autoLoad: false,
            },
            ref: item.module,
            propsOptions: {},
            action: item.action,
            openType: item.openType,
          });
        } else {
          //激活面板
          ModuleLoader.activeModule(item.panelId);
        }
      }
    },
  },
  // render: function (createElement) {
  //   return createElement(
  //     this.module, {
  //     class: {
  //       child: true,
  //       more: false,
  //     },
  //     attrs: {
  //       id: 'foo',
  //       name: 'child',
  //     },
  //     style: {
  //       width: '100%',
  //       height: '50px',
  //     },
  //     // domProps: {
  //     //   innerHTML: 'child-innerHTML',
  //     // },
  //   },
  //   );
  // },
};
// //vue自定义指令方式一:
// Vue.directive('duying', {
//   //绑定时第一次调用
//   bind: function (el, binding) {
//     el.style['background'] = binding.value;
//   },
//   //绑定元素被插入父节点时调用
//   inserted: function (el, binding) {
//     console.log('inserted');
//   },
//   //绑定元素模块更新时调用
//   update: function (el, binding) {
//     console.log('update');
//   },
//   //绑定元素模板完成一次更新周期时调用
//   componentUpdate: function (el, binding) {
//     console.log('componentUpdate');
//   },
//   //解绑时第一次调用
//   unbind: function (el, binding) {
//     console.log('unbind');
//   },
// });
</script>
<template>
  <div class="directive">
    <Button @click.native="openPanel(left)">分析(左)</Button>
    <Button @click.native="openPanel(right)">分析(右)</Button>
    <Button @click.native="openPanel(bottom1)">分析(下)</Button>
    <Button @click.native="openPanel(bottom2)">分析(下2)</Button>
    <Button @click.native="openPanel(link)">分析(link)</Button>
  </div>
</template>
<style scoped lang="less">
.directive {
  width: 100%;
  height: 100%;
  border: 1px solid red;
}
</style>
