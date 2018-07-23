import Vue from 'vue'
import Router from 'vue-router'
import ManagementIndex from '@/views/management/index'
import ManagementList from '@/views/management/list/list'
import OpList from '@/views/management/oplist/oplist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ManagementIndex',
      redirect: '/ManagementList',
      component: ManagementIndex,
      children: [
        // 入口列表
        {
          path: '/ManagementList',
          name: 'ManagementList',
          component: ManagementList
        },
        // 运营页面
        {
          path: '/OpList',
          name: 'OpList',
          component: OpList
        }
      ]
    }
  ]
})
