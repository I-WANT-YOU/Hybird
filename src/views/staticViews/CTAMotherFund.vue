<template>
  <div class="container">
    <!--<BgainNavBar title = "第一月度CTA组冠军团队"/>-->
      <van-image class="image-banner" :src="CTAMotherFund"/>
      <div class="buttonContainer"><van-image class="image-button" :src="CTAButton"/></div>
  </div>
</template>

<script>
import { Image } from 'vant';
// import BgainNavBar from '@component/BgainNavBar.vue';
import CTAMotherFund from '../../assets/images/staticViews/CTAMotherFund.png';
import CTAButton from '../../assets/images/staticViews/CTAButton.png';

export default {
  name: 'CTAMotherFund',
  data() {
    return {
      CTAMotherFund,
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
  top: 400px;
  .image-button{
    width:181px;
    height: 52px;
  }
}
</style>
