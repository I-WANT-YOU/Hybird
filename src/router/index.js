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
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
