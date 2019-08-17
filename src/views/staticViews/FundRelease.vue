<template>
  <div>
    <BgainNavBar title = ""/>
    <div><van-image class="image-banner" :src="fundRelease"/></div>
  </div>
</template>

<script>
import { Image } from 'vant';
import BgainNavBar from '@component/BgainNavBar.vue';
import fundRelease from '../../assets/images/staticViews/fund-release.png';

export default {
  name: 'FundRelease',
  data() {
    return {
      fundRelease,
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
