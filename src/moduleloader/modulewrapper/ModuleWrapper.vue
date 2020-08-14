<script>
import modules from '@/view';

/**
 * @author  duankang
 * @date    2020-07-04
 * @功能    模块包装器，用来创建动态组件(下方面板,左右面板)
 */
export default {
  name: 'ModuleWrapper',
  components: modules,
  props: {
    //模块引用ID
    refId: {
      type: String,
      default: '',
    },
    //模块类型
    module: {
      type: String,
      default: 'EmptyModule',
    },
    //模块属性参数
    propOptions: {
      type: Object,
      default: () => { },
    },
    //模块非属性参数，用来$attrs传值
    attrOptions: {
      type: Object,
      default: () => { },
    },
  },
  render(createElement) {
    return createElement(
      this.module,
      {
        props: this.options,
        ref: this.refId,
        attrs: this.attrOptions,
      }
    );
  },
};
</script>
