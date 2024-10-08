<template>
  <Page description="">
    <Card class="mb-5" title="待分配表单">
      <template #extra>
        <Button @click="setAgeSort">新增</Button>
      </template>
      <QueryForm />
      <Table
        size="small"
        bordered
        :columns="columns"
        :row-key="(record) => record.login.uuid"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
      </Table>
    </Card>
  </Page>
</template>

<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { usePagination } from './usePagination';
import { onUnmounted, ref, computed } from 'vue';
import { Table } from 'ant-design-vue';
import { useVbenForm } from '#/adapter';

import { Button, Card, message, notification, Space } from 'ant-design-vue';
import axios from 'axios';

const setAgeSort = () => {};
function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

const [QueryForm] = useVbenForm({
  // 默认展开
  // collapsed: true,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: { class: 'w-full' },
    labelWidth: 80,
  },
  // 提交函数
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username',
      label: '设备SN',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username',
      label: '报警类型',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username',
      label: '会员编号',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username1',
      label: '应用',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username',
      label: '商户号',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username1',
      label: '上报状态',
    },
  ],
  actionWrapperClass: 'col-auto text-left ml-4',
  submitButtonOptions: { text: '查询' },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
});

const queryData = (params) => {
  return axios.get('https://randomuser.me/api', { params });
};

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
  stop,
} = usePagination(queryData, {
  formatResult: (res) => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});

const totalItems = ref(200);

const pagination = computed(() => ({
  total: totalItems.value,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
) => {
  current.value = pag.current;
  pageSize.value = pag.pageSize;
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

const columns = [
  {
    title: '设备SN',
    dataIndex: 'name',
  },
  {
    title: '报警类型',
    dataIndex: 'gender',
  },
  {
    title: '会员编号',
    dataIndex: 'email',
  },
  {
    title: '会员姓名',
    dataIndex: 'email',
  },
  {
    title: '人脸得分',
    sorter: true,
    dataIndex: 'email',
  },
  {
    title: '商户号',
    dataIndex: 'email',
  },
  {
    title: '报警时间',
    // sorter: true,
    dataIndex: 'email',
  },
  {
    title: '同步状态',
    dataIndex: 'email',
  },
];

// 组件卸载时停止监听
onUnmounted(() => {
  stop();
});
</script>

<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
