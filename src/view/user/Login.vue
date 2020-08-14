<script>
import UserLogin from './UserLogin';
import config from 'config';

export default {
  name: 'Login',
  components: {
    UserLogin,
  },
  data() {
    return {
      //登录失效时间(天)
      expiredTime: config.system.expiredTime / 24,
      //LOGO路径
      logoUrl: config.system.logoUrl,
      //系统标题
      title: config.system.title,
      //系统介绍
      introduction: config.system.introduction,
      //版权信息
      copyright: config.system.copyright,
    };
  },
};
</script>

<template>
  <div class="login-wrapper">
    <header>
      <div>
        <img
          :src="logoUrl"
          alt="产品图标"
        >
        <span>{{ title }}</span>
      </div>
      <p> {{ introduction }}</p>
    </header>
    <UserLogin :expired-time="expiredTime" />
    <footer>
      {{ copyright }}
    </footer>
  </div>
</template>

<style lang="less" scoped>
.login-wrapper {
  background: url('~assets/user/user-bg.svg');
  background-color: #f0f2f5;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  height: 100vh;
  padding: 140px 0 144px 0;

  header {
    text-align: center;

    div {
      line-height: 60px;

      img {
        height: 60px;
        border-radius: 50%;
        margin-right: 14px;
        vertical-align: middle;
      }
      span {
        font-size: 34px;
        vertical-align: middle;
      }
    }

    p {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      margin: 20px 0 80px 0;
    }
  }

  footer {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 14px;
  }
}
</style>
