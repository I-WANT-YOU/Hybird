<template>
  <div class="swipe">
    <Swipe class="swiper_image" :autoplay="3000" indicator-color="white">
      <SwipeItem v-for="(item,index) in bannerList" :key="index" @click="onSkip(item.url)">
        <van-image class="swiper_item_image" :src="item.img_url" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import {
  Swipe, SwipeItem, Image,
} from 'vant';
import { mapState } from 'vuex';
import Bridge from '@/config/bridge';

export default {
  name: 'ActivityCenterSwipe',
  props: {
    isLogin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      img: 'http://img2.imgtn.bdimg.com/it/u=180868167,273146879&fm=26&gp=0.jpg',
    };
  },
  components: {
    Swipe,
    SwipeItem,
    'van-image': Image,
  },
  methods: {
    onSkip(url) {
      if (this.isLogin) {
        Bridge.sendMessage({
          module: 'active',
          action: 'getUrl',
          params: `${url}`,
        });
      } else {
        Bridge.sendMessage({
          module: 'auth',
          action: 'goSignIn',
        });
      }
    },
  },
  computed: {
    ...mapState('activity', [
      'bannerList',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.swipe {
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: center;
  .swiper_image {
    width: 335px;
    height: 88px;
  }
  .swiper_item_image {
    width: 335px;
    height: 88px;
  }
}
</style>
