<script>
import ModuleWrapper from '../modulewrapper/ModuleWrapper';
import { PanelLoader } from '@/moduleloader';

const panelstates = {
  LEFT: 'left',
  RIGHT: 'right',
  BOTTOMCOLLAPSED: 'bottom-collapsed',
  BOTTOMCLOSED: 'bottom-closed',
  BOTTOMOPEN: 'bottom-open',
};
export default {
  name: 'PanelWrapper',
  components: { ModuleWrapper, },
  data() {
    return {
      //抽屉是否显示
      showDrawer: false,
      //左右两侧模块
      left_right_module: {},
      //下方模块
      bottomModules: [],
      //激活的底部面板
      bottomActivedModule: 'EmptyModule',
      //底部面板状态
      bottomState: panelstates.BOTTOMCLOSED,
      //两侧面板状态
      bilateralPanelState: '',
      //模块集合
      modules: {},
    };
  },
  computed: {
    //底部面板样式
    bottomPanelClasses() {
      let wrapperEL = document.getElementsByClassName('wrapper')[0];
      let centerEL = document.getElementsByClassName('center')[0];
      if (this.bottomState == panelstates.BOTTOMCOLLAPSED) {
        if (!L.Util.isNull(wrapperEL) && !L.Util.isNull(centerEL)) {
          centerEL.style.height = wrapperEL.offsetHeight - 25 + 'px';
        }
        return panelstates.BOTTOMCOLLAPSED; //收拢
      } else if (this.bottomState == panelstates.BOTTOMCLOSED) {
        if (!L.Util.isNull(wrapperEL) && !L.Util.isNull(centerEL)) {
          centerEL.style.height = wrapperEL.offsetHeight + 'px';
        }
        return panelstates.BOTTOMCLOSED; //关闭
      }
      if (!L.Util.isNull(wrapperEL) && !L.Util.isNull(centerEL)) {
        centerEL.style.height = wrapperEL.offsetHeight - 204 + 'px';
      }
      return '';
    },
    //中间插槽样式
    centerCSS() {
      if (this.bilateralPanelState == panelstates.RIGHT) {
        return 'center-to-left';
      } else if (this.bilateralPanelState == panelstates.LEFT) {
        return 'center-to-right';
      } else {
        return '';
      }
    },
    //底部面板标题
    bottomTitle() {
      if (!L.Util.isNull(this.bottomActivedModule)) {
        for (let i = 0; i < this.bottomModules.length; i++) {
          if (this.bottomModules[i].module == this.bottomActivedModule) {
            return this.bottomModules[i].title;
            break;
          }
        }
      }
      return '未加载模块';
    },
    //抽屉出现位置
    drawerPosition() {
      if (
        !L.Util.isNull(this.left_right_module) &&
        !L.Util.isNull(this.left_right_module.showArgs)
      ) {
        if (this.left_right_module.showArgs.position == panelstates.LEFT) return panelstates.LEFT;
        if (this.left_right_module.showArgs.position == panelstates.RIGHT) return panelstates.RIGHT;
      }
      return '';
    },
  },
  watch: {
    left_right_module(val) {
      this.clearRefs();
      this.$nextTick(p => {
        let wrapper = document.getElementsByClassName('wrapper')[0];
        let leftPanel = wrapper.getElementsByClassName('left-panel')[0];
        let drawer = document.getElementsByClassName('v-transfer-dom')[0];
        leftPanel.appendChild(drawer);
      });
    },
    //监测左右面板展开收缩
    bilateralPanelState(val) {
      let bottomEL = document.getElementsByClassName('bottom-panel')[0];
      let wrapperEL = document.getElementsByClassName('wrapper')[0];
      if (val == panelstates.LEFT) {
        bottomEL.style.width = wrapperEL.offsetWidth - 300 + 'px';
        bottomEL.style.marginLeft = 300 + 'px';
      } else if (val == panelstates.RIGHT) {
        bottomEL.style.width = wrapperEL.offsetWidth - 300 + 'px';
        bottomEL.style.marginLeft = 0 + 'px';
      } else {
        bottomEL.style.width = wrapperEL.offsetWidth + 'px';
        bottomEL.style.marginLeft = 0 + 'px';
      }
    },
  },
  mounted() {
    PanelLoader.inst(this);
  },
  destroyed() {
    PanelLoader.destroy();
  },
  methods: {
    //创建面板
    createModule(args) {
      if (!L.Util.isNull(args) && !L.Util.isNull(args.showArgs)) {
        if (args.showArgs.position == panelstates.LEFT) {
          this.showDrawer = true;
          this.left_right_module = args;
          this.bilateralPanelState = panelstates.LEFT;
        } else if (args.showArgs.position == panelstates.RIGHT) {
          this.showDrawer = true;
          this.left_right_module = args;
          this.bilateralPanelState = panelstates.RIGHT;
        } else if (args.showArgs.position == panelstates.BOTTOMOPEN) {
          this.bottomState = panelstates.BOTTOMOPEN;
          this.bottomActivedModule = args.module;
          this.bottomModules.push(args);
        } else {
          this.bilateralPanelState = '';
          this.bottomState = '';
        }
      }
      this.modules[args.id] = args;
    },
    //激活模块
    activeModule(id) {
      if (!id || !this.modules[id]) return;
      let panel = this.modules[id];
      let pos = panel.showArgs.position;
      if (pos == panelstates.BOTTOMOPEN) {
        this.bottomActivedModule = panel.module;
      }
    },
    //获取模块实例
    getModule(id) {
      return new Promise(resolve => {
        this.$nextTick(p => {
          let moduleInst;
          if (id && this.modules[id] && this.$refs[id]) {
            moduleInst = {
              props: this.modules[id].startArgs || {},
              attrs: this.modules[id].attrArgs || {},
              inst: (this.$refs[id][0] || this.$refs[id]).$refs[id],
            };
          }
          resolve(moduleInst);
        });
      });
    },
    //获取模块窗口参数
    getModuleInfo(id) {
      this.clearRefs();
      return this.modules[id];
    },
    //关闭抽屉
    closeDrawer(panel) {
      this.bilateralPanelState = '';
      delete this.modules[panel.id];
      delete this.$refs[panel.id];
      delete this.left_right_module[panel.id];

    },
    //折叠下方面板
    toggleBottomPanel() {
      this.bottomState = this.bottomState
        == panelstates.BOTTOMOPEN
        ? panelstates.BOTTOMCOLLAPSED
        : panelstates.BOTTOMOPEN;
    },
    //关闭下方面板
    closeBottomPanel() {
      this.clearRefs();
      this.bottomState = panelstates.BOTTOMCLOSED;
      for (let i = 0; i < this.bottomModules.length; i++) {
        let bot_md = this.bottomModules[i];
        delete this.modules[bot_md.id];
        delete this.$refs[bot_md.id];
      }
      this.bottomModules = [];
    },
    //移除tab
    removeTab(id) {
      this.clearRefs();
      let index = this.bottomModules.findIndex(item => {
        return item.module == id;
      });
      delete this.modules[this.bottomModules[index].id];
      delete this.$refs[this.bottomModules[index].id];
      this.bottomModules.splice(index, 1);
    },
    //清理因移除组件后，refs指向null
    clearRefs() {
      let refs = this.$refs;
      let that = this;
      Object.keys(refs).map(key => {
        if (L.Util.isNull(refs[key])) {
          delete refs[key];
          delete that.modules[key];
        } else {
        }
      });
    },
    //关闭全部面板
    closeAllModules() {
      this.showDrawer = false;
      this.left_right_module = {};
      // this.
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="left-panel">
      <Drawer
        v-model="showDrawer"
        :mask="false"
        :mask-closable="false"
        :title="left_right_module.title"
        :placement="drawerPosition"
        width="300"
        @on-close="closeDrawer(left_right_module)"
      >
        <ModuleWrapper
          :module="left_right_module.module"
          :ref="left_right_module.id"
          :ref-id="left_right_module.id"
          :prop-options="left_right_module.startArgs"
          :attr-options="left_right_module.attrArgs"
        />
      </Drawer>
    </div>
    <div
      :class="centerCSS"
      class="center"
    >
      <slot></slot>
    </div>
    <div class="right-panel"></div>
    <div
      :class="bottomPanelClasses"
      class="bottom-panel"
    >
      <div class="bottom-panel-header">
        <div class="bottom-panel-header-title">{{ bottomTitle }}</div>
        <div class="bottom-panel-header-tool">
          <Icon
            :type="bottomState=='bottom-open'?'ios-arrow-down':'ios-arrow-up'"
            size="16"
            color="#ffffff"
            title="折叠/展开"
            @click.native="toggleBottomPanel"
          ></Icon>
          <Icon
            type="md-close"
            size="16"
            color="#ffffff"
            title="关闭"
            @click.native="closeBottomPanel"
          ></Icon>
        </div>
      </div>
      <div class="bottom-panel-content">
        <Tabs
          ref="bottomTab"
          :animated="false"
          v-model="bottomActivedModule"
          :class="{'no-tab':bottomModules.length<=1}"
          type="card"
          closable
          @on-tab-remove="removeTab"
        >
          <TabPane
            v-for="item in bottomModules"
            :key="item.module"
            :name="item.module"
            :label="item.module"
          >
            <ModuleWrapper
              :module="item.module"
              :ref="item.id"
              :ref-id="item.id"
              :prop-options="item.startArgs"
              :attr-options="item.attrArgs"
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .center {
    width: 100%;
    height: 100%;
    flex: 1;
  }
  .center-to-left {
    width: calc(~'100% - 300px');
  }
  .center-to-center {
    width: calc(~'100% - 600px');
    margin-left: 300px;
  }
  .center-to-right {
    width: calc(~'100% - 300px');
    margin-left: 300px;
  }
  .bottom-panel {
    width: calc(~'100% - 2px');
    height: 200px;
    // border: 1px solid gold;
    .bottom-panel-header {
      width: 100%;
      height: 25px;
      background-color: #459aee;
      .bottom-panel-header-title {
        padding-top: 2px;
        font-size: 15px;
        font-weight: bold;
        color: white;
        float: left;
      }
      .bottom-panel-header-tool {
        font-size: 15px;
        float: right;
        cursor: pointer;
      }
    }
    .bottom-panel-content {
      width: 100%;
      height: calc(~'100% - 25px');
    }
  }
  .bottom-collapsed {
    height: 25px;
    // border: 1px solid gold;q
  }
  .bottom-closed {
    height: 0px;
  }
}
/deep/ .k-drawer {
  margin-top: 50px;
  width: 300px;
  height: calc(~'100% - 50px');
}
/deep/ .k-tabs {
  width: 100%;
  height: 100%;
  /deep/ .k-tabs-bar {
    border-bottom: 1px solid #dcdee2;
    width: 100%;
    height: 32px;
    margin-bottom: 0px;
  }
  /deep/ .k-tabs-content {
    width: 100%;
    height: calc(~'100% - 32px');
    overflow: scroll;
    /deep/ .k-tabs-tabpane {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
