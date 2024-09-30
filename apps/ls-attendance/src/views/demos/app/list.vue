<template>
  <Page description="">
    <Card class="mb-5" title="待分配表单">
      <template #extra>
        <Button @click="toPageCreate">新增</Button>
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
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <span>
              <a>编辑 </a>
              <a class="ml-2">详情</a>
            </span>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>

<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { usePagination } from './usePagination';
import { onUnmounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Table } from 'ant-design-vue';
import { useVbenForm } from '#/adapter';

import { Button, Card, message, notification, Space } from 'ant-design-vue';
import axios from 'axios';

const { push } = useRouter();

function toPageCreate() {
  push('/app/create');
}

const setAgeSort = () => {};
function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

const [QueryForm] = useVbenForm({
  commonConfig: {
    // 所有表单项
    componentProps: { class: 'w-full' },
    labelWidth: 80,
  },

  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username',
      label: '应用编号',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username1',
      label: '应用名称',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: '停用', value: '1' },
          { label: '启用', value: '2' },
        ],
        placeholder: '请选择',
      },
      fieldName: 'fieldOptions',
      label: '状态',
    },
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'username3',
      label: '接口地址',
    },
  ],
  actionWrapperClass: 'col-auto',
  submitButtonOptions: { text: '查询' },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
});

const queryData = (params) => {
  // return axios.get('https://randomuser.me/api', { params });
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
    title: '应用编号',
    dataIndex: 'name',
    align: 'center',
    // sorter: true,
  },
  {
    // title: 'Gender',
    title: '应用名称',
    dataIndex: 'gender',
    align: 'center',
  },
  {
    // title: 'Email',
    title: '状态',
    dataIndex: 'email',
    align: 'center',
  },
  {
    // title: 'Email',
    title: '操作时间',
    dataIndex: 'email',
    align: 'center',
  },
  {
    // title: 'Email',
    title: '操作',
    dataIndex: 'action',
    align: 'center',
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

a {
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
