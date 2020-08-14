<script>
import config from 'config';
import PanelWrapper from '../../moduleloader/panelWrapper/PanelWrapper';

/* actions */
const USER_LOGOUT = 'USER_LOGOUT';

export default {
  name: 'DashBoard',
  components: { PanelWrapper, },
  data() {
    return {
      //LOGO地址
      logoUrl: config.system.logoUrl,
      //系统标题
      title: config.system.title,
    };
  },
  methods: {
    //退出登录
    click() {
      this.$Modal.confirm({
        title: '退出',
        content: '<p>确定退出系统吗?</P>',
        onOk: () => {
          this.$store.dispatch(USER_LOGOUT).then(() => {
            this.$router.replace('/login');
          });
        },
      });
    },
  },
};
</script>

<template>
  <div>
    <header>
      <div class="left">
        <img
          :src="logoUrl"
          alt="logo"
        >
        <span>
          {{ title }}
        </span>
      </div>
      <div class="right">
        <UserInfo />
        <Icon
          type="md-log-out"
          size="24"
          title="退出"
          @click.native="click"
        ></Icon>
      </div>
    </header>
    <main>
      <PanelWrapper>
        <router-view></router-view>
      </PanelWrapper>
    </main>
  </div>
</template>

<style lang="less" scoped>
header {
  display: flex;
  height: 50px;
  color: #fff;
  background-color: #459aee;

  .left {
    display: flex;
    flex: 1;

    img {
      height: 30px;
      margin: 10px;
    }
    span {
      line-height: 50px;
      font-size: 24px;
      margin: 0 80px 0 6px;
    }
  }
  .right {
    display: flex;
    align-items: center;

    .k-icon {
      cursor: pointer;
      margin-right: 36px;
    }
  }
}
main {
  height: calc(~'100vh - 50px');
}
</style>
