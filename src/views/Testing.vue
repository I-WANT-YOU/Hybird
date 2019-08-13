<template>
  <div class="testing__container">
    <bgain-nav-bar title="测试页面" :showArrow="false"></bgain-nav-bar>
    <grid :gutter="10">
      <grid-item
        @click="onLogout"
        icon="replay"
        text="登出"
        style="margin-bottom: 10px"
      />
    </grid>
    <grid :gutter="10">
      <grid-item
        v-for="option in options"
        :key="option.to"
        :icon="option.icon"
        :text="option.text"
        :to="option.to"
      />
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem, Toast } from 'vant';
import { mapActions } from 'vuex';
import BgainNavBar from '@/components/BgainNavBar.vue';

export default {
  name: 'Testing',
  components: {
    BgainNavBar,
    Grid,
    GridItem,
  },
  data() {
    return {
      options: [
        {
          icon: 'free-postage',
          text: '活动中心',
          to: '/activity',
        },
        {
          icon: 'diamond-o',
          text: '会员中心',
          to: '/member',
        },
      ],
    };
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async onLogout() {
      try {
        Toast.loading({
          message: '登出中...',
        });
        await this.logout();
        Toast('登出成功');
      } catch (error) {
        Toast(error.message);
        Toast.clear();
      }
    },
  },
};
</script>

<style scoped>

</style>
