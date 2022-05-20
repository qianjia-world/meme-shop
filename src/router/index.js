import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'aboutus',
        component: () => import('../views/AboutUs.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/AdminList.vue'),
    children: [
      {
        path: 'goods',
        component: () => import('../views/AdminGoods.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/AdminCoupons.vue')
      },
      {
        path: 'Articles',
        component: () => import('../views/AdminArticles.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
