<template>
  <div class="container">
    <!--<BgainNavBar title = ""/>-->
    <van-image class="image-banner" :src="InterestArbitrageFund"/>
    <div class="buttonContainer"><van-image class="image-button" :src="CTAButton"/></div>
  </div>
</template>

<script>
import { Image } from 'vant';
// import BgainNavBar from '@component/BgainNavBar.vue';
import InterestArbitrageFund from '../../assets/images/staticViews/InterestArbitrageFund.png';
import CTAButton from '../../assets/images/staticViews/CTAButton.png';

export default {
  name: 'InterestArbitrageFund',
  data() {
    return {
      InterestArbitrageFund,
      CTAButton,
    };
  },
  components: {
    'van-image': Image,
    // BgainNavBar,
  },
};
</script>

<style lang="scss" scoped>
  .image-banner{
    position: relative;
    width: 100%;
  }
  .buttonContainer{
    position: absolute;
    left: 97px;
    right: 97px;
    top: 380px;
    .image-button{
      width:181px;
      height: 52px;
    }
  }
</style>
