<script>
/**
 * 预留空模块
 */
export default {
  name: 'EmptyModule',
  data() {
    return {
      test: 'test',
    };
  },
  created() { },
};
</script>
<template>
  <div class="empty">加载参数没有指定模块</div>
</template>
<style scoped lang="less">
.empty {
  width: 100%;
  height: 100%;
}
</style>
