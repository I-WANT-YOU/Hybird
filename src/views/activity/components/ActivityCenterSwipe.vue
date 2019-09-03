<template>
  <div class="swipe">
    <Swipe
      :autoplay="3000"
      indicator-color="white"
    >
      <SwipeItem v-for="(item,index) in bannerList" :key="index">
        <van-image
          :src="item.img_url"
          @click="onSkip"
        />
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
  data() {
    return {
      img: 'http://img2.imgtn.bdimg.com/it/u=180868167,273146879&fm=26&gp=0.jpg',
    };
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Swipe,
    SwipeItem,
    'van-image': Image,
  },
  methods: {
    onSkip() {
      if (this.isLogin) {
        Bridge.sendMessage({
          module: 'active',
          action: 'getRefer',
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
  .swipe{
    width :335px;
    height:88px;
  }

</style>
