<script>
import { cookie, crypto } from '@ktw/ktools';

export default {
  name: 'UserLogin',
  props: {
    //登录成功回调函数
    success: {
      type: Function,
      default: null,
    },
    //登录失败回调函数
    fail: {
      type: Function,
      default: null,
    },
    //登录过期时间(单位:天，默认为0.04天约1小时)
    expiredTime: {
      type: Number,
      default: 0.04,
    },
  },
  data() {
    return {
      //用户信息
      user: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请填写用户名', trigger: 'blur', }],
        password: [
          { required: true, message: '请填写用户密码', trigger: 'blur', },
          {
            type: 'string',
            min: 6,
            message: '密码长度不得小于6位',
            trigger: 'blur',
          }
        ],
      },
      //是否记住密码
      remeber: false,
      //是否正在加载
      loading: false,
    };
  },
  mounted() {
    this.readTicket();
  },
  methods: {
    //读取保存的用户凭证
    readTicket() {
      let ticket = cookie.get('ticket');
      if (ticket) {
        ticket = crypto.decryptAes(ticket);
        let segments = ticket.split(' ');
        this.user.username = segments[0];
        this.user.password = segments[1];
        this.remeber = true;
      }
    },
    //记住密码
    remeberPassword(val) {
      if (!val) {
        this.$store.commit('REMOVE_USER_TICKET');
      }
    },
    //用户登录
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('USER_LOGIN', {
              ...this.user,
              remeber: this.remeber,
              expiredTime: this.expiredTime,
            })
            .then(() => {
              (this.success && this.success()) || this.$router.replace('/');
              this.loading = false;
            })
            .catch(e => {
              this.fail && this.fail(e);
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<template>
  <Form
    ref="form"
    :model="user"
    :rules="rules"
    class="user-login"
    @keydown.native.enter="handleSubmit"
  >
    <FormItem prop="username">
      <Input
        v-model="user.username"
        type="text"
        placeholder="用户名"
      >
      <Icon
        slot="prepend"
        type="ios-person-outline"
      />
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        v-model="user.password"
        type="password"
        placeholder="用户密码"
      >
      <Icon
        slot="prepend"
        type="ios-lock-outline"
      />
      </Input>
    </FormItem>
    <FormItem>
      <Checkbox
        v-model="remeber"
        @on-change="remeberPassword"
      >记住密码</Checkbox>
    </FormItem>
    <FormItem>
      <Button
        :loading="loading"
        type="primary"
        long
        @click="handleSubmit()"
      >
        <span
          v-if="!loading"
          class="submit"
        >
          登录
          <Icon type="arrow-right-c"></Icon>
        </span>
        <span v-else>请等待...</span>
      </Button>
    </FormItem>
  </Form>
</template>

<style lang="less">
.user-login {
  width: 360px;
  margin: 0 auto;

  .forget {
    float: right;
  }
  .k-form-item:last-child {
    .submit {
      font-size: 14px;
      .k-icon {
        opacity: 0;
        font-size: 16px;
        transition: all 0.3s;
      }
    }

    &:hover {
      .submit .k-icon {
        opacity: 1;
        margin-left: 8px;
      }
    }
  }
}
</style>
