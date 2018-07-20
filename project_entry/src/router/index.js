import Vue from 'vue'
import Router from 'vue-router'
import ManagementIndex from '@/views/management/index'
import ManagementList from '@/views/management/list/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ManagementIndex',
      redirect: '/ManagementList',
      component: ManagementIndex,
      children: [
        // 列表
        {
          path: '/ManagementList',
          name: 'ManagementList',
          component: ManagementList
        }
      ]
    }
  ]
})
