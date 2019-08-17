<template>
  <div>
    <BgainNavBar title = "第一月度CTA组冠军团队"/>
    <div>
      <van-image class="image-banner" :src="fundOne"/>
      <van-image class="image-banner" :src="fundTwo"/>
      <van-image class="image-banner" :src="fundThree"/>
      <van-image class="image-banner" :src="fundFour"/>
      <van-image class="image-banner" :src="fundFive"/>
      <van-image class="image-banner" :src="fundSix"/>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import fundOne from '../../assets/images/staticViews/fund-one.png';
import fundTwo from '../../assets/images/staticViews/fund-two.png';
import fundThree from '../../assets/images/staticViews/fund-three.png';
import fundFour from '../../assets/images/staticViews/fund-four.png';
import fundFive from '../../assets/images/staticViews/fund-five.png';
import fundSix from '../../assets/images/staticViews/fund-six.png';

export default {
  name: 'FundRelease',
  data() {
    return {
      fundOne,
      fundTwo,
      fundThree,
      fundFour,
      fundFive,
      fundSix,
    };
  },
  components: {
    'van-image': Image,
    BgainNavBar,
  },
};
</script>

<style lang="scss" scoped>
.image-banner{
  width: 100%;
}
</style>
