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
      path: '/BGPRecord',
      name: 'BGPRecord',
      component: () => import('../views/activity/BGPRecord.vue'),
    },
    {
      path: '/BGPDetailList',
      name: 'BGPDetailList',
      component: () => import('../views/activity/BGPDetailList.vue'),
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
    {
      path: '/activity/product/result/:orderId',
      name: 'product-result',
      component: () => import('../views/activity/product/ProductResult.vue'),
    },
    {
      path: '/activity/product/:id/result-fail',
      name: 'product-result-fail',
      component: () => import('../views/activity/product/ProductResultFail.vue'),
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
    {
      path: '/address',
      name: 'receiving-address',
      component: () => import('../views/address/ReceivingAddress.vue'),
    },
    {
      path: '/address-native',
      name: 'receiving-address-native',
      component: () => import('../views/address/ReceivingAddressCopy.vue'),
    },
    // 加入社群
    {
      path: '/community/add',
      name: 'community-add',
      component: () => import('../views/community/AddCommunity.vue'),
    },
    {
      path: '/community/knowbgain',
      name: 'community-knowbgain',
      component: () => import('../views/community/KnowBgain.vue'),
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('../views/agreement/Agreement.vue'),
      children: [
        {
          path: 'privacy',
          name: 'privacy',
          component: () => import('../views/agreement/subpage/Privacy.vue'),
        },
        {
          path: 'service',
          name: 'service',
          component: () => import('../views/agreement/subpage/Service.vue'),
        },
        {
          path: 'disclaimer',
          name: 'disclaimer',
          component: () => import('../views/agreement/subpage/Disclaimer.vue'),
        },
        {
          path: 'investment',
          name: 'investment',
          component: () => import('../views/agreement/subpage/Investment.vue'),
        },
      ],
    },
    // 静态banner
    {
      path: '/abcFund',
      name: 'AbcFund',
      component: () => import('../views/staticViews/AbcFund.vue'),
    },
    {
      path: '/fundRelease',
      name: 'FundRelease',
      component: () => import('../views/staticViews/FundRelease.vue'),
    },
    {
      path: '/refer',
      name: 'refer',
      component: () => import('../views/refer/Refer.vue'),
    },
    {
      path: '/refer-detail',
      name: 'referDetail',
      component: () => import('../views/refer/ReferDetail.vue'),
    },
    {
      path: '/refer-rules',
      name: 'referRules',
      component: () => import('../views/refer/ReferRules.vue'),
    },
<<<<<<< HEAD
    {
      path: '/commonProblem', // lihui- 常见问题
      name: 'CommonProblem',
      component: () => import('../views/staticViews/CommonProblem.vue'),
=======
    // 基金风险说明
    {
      path: '/risk-statement',
      name: 'RiskStatement',
      component: () => import('../views/staticViews/RiskStatement.vue'),
    },
    // 定期常见问题
    {
      path: '/fixed-questions',
      name: 'FixedQuestions',
      component: () => import('../views/staticViews/FixedQuestions.vue'),
    },
    // 定期常见问题
    {
      path: '/fixed-safety-security',
      name: 'SafetySecurity',
      component: () => import('../views/staticViews/SafetySecurity.vue'),
>>>>>>> aeb33af517b984619141963179c6285c2cfb3c57
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
