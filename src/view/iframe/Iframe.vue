<script>
import config from 'config';
export default {
  name: 'Iframe',
  data() {
    return {
      iframeUrl: '',
    };
  },
  computed: {
    currentsrc() {
      let parse_url = this.$route.params.url;//路由地址
      let initUrl = config.initCfg.initUrl;
      if (!parse_url && initUrl) {
        parse_url = initUrl;
      }
      if (parse_url.toLowerCase().indexOf('http') < 0 && parse_url.toLowerCase().indexOf('basicplatform') == 0) {
        parse_url = config.project.basicplatform + parse_url + '?r=' + Math.random();
      }
      return parse_url;
    },
  },
  watch: {
    async currentsrc(newVal) {
      let tmp_url = newVal;
      if (tmp_url && tmp_url.indexOf('main.html#/applications/') < 0) {
        this.iframeUrl = tmp_url;
      }
    },
  },
  created() {
    let tmp_url = this.$route.params.url;
    if (tmp_url && tmp_url.indexOf('main.html#/applications/') > 0) {
      // tmp_url = await this.queryscfbycondition(this.$route.query);

    }
    this.iframeUrl = config.project.basicplatform + tmp_url + '?r=' + Math.random();
  },
  mounted() { },
  methods: {
    //post传递参数
    postMessageToIframe() { },
  },
};
</script>

<template>
  <div class="iframe">
    <iframe
      id="qmframevue"
      :src="iframeUrl"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="auto"
    >
    </iframe>
  </div>
</template>
<style lang="less" scoped>
.iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
