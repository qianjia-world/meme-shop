import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/Home/ProductView.vue')
      },
      {
        path: 'aboutus',
        component: () => import('../views/Home/AboutUs.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Home/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Admin/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Admin/AdminList.vue'),
    children: [
      {
        path: 'goods',
        component: () => import('../views/Admin/AdminGoods.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Admin/AdminCoupons.vue')
      },
      {
        path: 'Articles',
        component: () => import('../views/Admin/AdminArticles.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
