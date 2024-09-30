import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '应用管理',
      hideChildrenInMenu: true,
    },
    name: 'DemosApp',
    path: '/demos/',
    redirect: '/app/list',
    children: [
      {
        meta: { title: '应用管理' },
        name: 'DemosApp1',
        path: '/app/list',
        component: () => import('#/views/demos/app/list.vue'),
      },
      {
        meta: { title: '创建应用' },
        name: 'DemosCreate',
        path: '/app/create',
        component: () => import('#/views/demos/app/form.vue'),
      },
      {
        meta: { title: '编辑应用' },
        name: 'DemosEdit',
        path: '/app/edit',
        component: () => import('#/views/demos/app/form.vue'),
      },
    ],
  },
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '分组管理',
      hideChildrenInMenu: true,
    },
    name: 'Group',
    path: '/group/',
    children: [
      {
        meta: { title: '分组管理' },
        name: 'GroupList',
        path: '/group/list',
        component: () => import('#/views/demos/group.vue'),
      },
    ],
  },
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '设备管理',
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: '待分配设备',
        },
        name: 'AntDesignDemos',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/index.vue'),
      },
      {
        meta: {
          title: '已分配设备',
        },
        name: 'AntDesignDemos1',
        path: '/demos/ant-design1',
        component: () => import('#/views/demos/index1.vue'),
      },
    ],
  },
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '报警管理',
      hideChildrenInMenu: true,
    },
    name: 'Warning',
    path: '/warning/',
    children: [
      {
        meta: { title: '报警管理' },
        name: 'WarningList',
        path: '/warning/list',
        component: () => import('#/views/demos/warning.vue'),
      },
    ],
  },
  // warning
];

export default routes;
