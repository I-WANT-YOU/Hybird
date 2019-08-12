import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Testing.vue'),
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
