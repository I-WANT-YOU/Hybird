import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'test',
      component: () => import('../views/Testing.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/activity/ActivityCenter.vue'),
    },
    {
      path: '/activity/product/:id',
      name: 'product-detail',
      component: () => import('../views/activity/product/ProductDetail.vue'),
    },
    {
      path: '/activity/product/:id/buy',
      name: 'product-buy',
      component: () => import('../views/activity/product/ProductBuy.vue'),
    },
    // 会员中心
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/member/Member.vue'),
    },
    // 更多福利
    {
      path: '/more-welfare',
      name: 'welfare',
      component: () => import('../views/member/MoreWelfare.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
