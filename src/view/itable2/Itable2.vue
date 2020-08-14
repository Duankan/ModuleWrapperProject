<script>
import config from 'config';

export default {
  name: 'Itable2',
  data() {
    return {
      columns: [
        {
          title: '中国',
          key: 'name',
        },
        {
          title: '湖北',
          key: 'age',
        },
        {
          title: '荆州',
          key: 'address',
        }
      ],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        }
      ],
    };
  },
  methods: {},
};
</script>

<template>
  <div class="Itable">
    <Table
      :columns="columns"
      :data="data"
      size="small"
    ></Table>
  </div>
</template>

<style lang="less" scoped>
.Itable {
  width: 100%;
  height: 100%;
}
</style>
