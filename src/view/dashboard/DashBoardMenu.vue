<script>
// import * as types from '@/store/types';
// import moduleConfig from 'moduleConfig';
// import { ModuleLoader } from '@/moduleloader';
// import { setTimeout } from 'timers';

//菜单窗口分组名
// const MENU_WINDOW_GROUP = 'MenuWindowGroup';

/**
 * 系统菜单模块
 */
// export default {
//   name: 'DashBoardMenu',
//   data() {
//     return {
//       //系统菜单
//       systemMenus: moduleConfig.menusgroup.menus,
//       //菜单项集合
//       menuItems: {},
//       //当前菜单
//       curArgs: {},
//       active: '',
//     };
//   },
//   events: {
//     'on-clearActiveClass': 'clearActiveClass',
//   },
//   created() {
//     this.getMenuItems();
//     this.active = this.systemMenus[0].id;
//     // this.curArgs = this.$store.getters.menuShow;
//   },
//   methods: {
//     //获取菜单项
//     getMenuItems() {
//       this.systemMenus.forEach(m => {
//         this.addMenuItem(m);
//         if (m.children) {
//           m.children.forEach(n => {
//             this.addMenuItem(n);
//             if (n.children && Array.isArray(n.children)) {
//               n.children.forEach(j => {
//                 this.addMenuItem(j);
//               });
//             }
//             if (n.children && !Array.isArray(n.children)) {
//               this.addMenuItem(n.children);
//               n.children = [n.children];
//             }
//           });
//         }
//       });
//     },
//     //设置菜单项
//     addMenuItem(item) {
//       //window窗口增加到一个分组下，且一次只打开一个窗口
//       if (item.action.toLowerCase() == 'window') {
//         item.showArgs.singleton = true;
//         item.showArgs.group = MENU_WINDOW_GROUP;
//       }
//       this.menuItems[item.id] = item;
//     },
//     //激活菜单功能
//     activeMenuItem(item) {
//       this.active = item.id;
//       if (item.children) return;
//       let args = this.menuItems[item.id];
//       let type = args.action.toLowerCase();
//       if (type === 'window' || type === 'panel') {
//         window.vueApp.$router.push({ name: 'map', });
//       }
//       if (type === 'link') ModuleLoader.closeAllModules();
//       setTimeout(() => {
//         ModuleLoader.createModule(args);
//       }, 0);
//     },
//     //清除激活样式
//     clearActiveClass() {
//       this.active = '';
//     },
//   },
// };
</script>

<template>
  <div class="menu-items">
    <!-- <Dropdown
      v-for="(iItem,iIndex) in systemMenus"
      v-if="iItem.visible"
      :class="{active : active == iItem.id}"
      :key="iIndex"
    >
      <div
        class="menu-item"
        @click.stop="activeMenuItem(iItem)"
      >
        <SvgIcon
          v-if="iItem.icon"
          :icon-class="iItem.icon"
          :size="18"
          class="menu-item-svg"
        />
        {{ iItem.title }}
        <Icon
          v-if="iItem.children"
          type="ios-arrow-down"
        ></Icon>
      </div>
      <DropdownMenu
        v-if="!!iItem.children"
        slot="list"
      >
        <template
          v-for="(jItem,jIndex) in iItem.children"
          v-if="jItem.visible"
        >
          <DropdownItem
            v-if="!jItem.children"
            :key="jIndex"
            @click.native.stop="activeMenuItem(jItem)"
          >
            {{ jItem.title }}
          </DropdownItem>
          <Dropdown
            v-else
            :key="jIndex"
            placement="right-start"
          >
            <DropdownItem>
              {{ jItem.title }}
              <Icon type="ios-arrow-forward"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(kItem,kIndex) in jItem.children"
                v-if="kItem.visible"
                :key="kIndex"
                @click.native.stop="activeMenuItem(kItem)"
              >
                {{ kItem.title }}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </DropdownMenu>
    </Dropdown> -->
  </div>
</template>

<style lang="less" scoped>
// .menu-items {
//   display: flex;
//   justify-items: center;
//   align-items: center;
//   z-index: 1000;
//   /deep/.k-dropdown-menu {
//     max-width: 200px;
//   }
//   /deep/.k-dropdown-rel {
//     height: 100%;
//   }
//   .active {
//     height: 100%;
//     background-color: #0082fc !important;
//   }
//   .menu-item {
//     color: #fff;
//     cursor: pointer;
//     font-size: 14px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 100%;
//     padding: 0px 20px;
//     .menu-item-svg {
//       margin-right: 3px;
//     }
//     /deep/.k-svgicon {
//       svg {
//         display: flex;
//       }
//     }
//   }
// }
</style>
