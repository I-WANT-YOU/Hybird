<template>
  <div class="container">
    <!--<BgainNavBar title = "第一月度CTA组冠军团队"/>-->
      <van-image class="image-banner" :src="CTAMotherFund"/>
      <div class="buttonContainer" @click="onSkip"><van-image class="image-button" :src="CTAButton"/></div>
  </div>
</template>

<script>
import { Image } from 'vant';
// import BgainNavBar from '@component/BgainNavBar.vue';
import CTAMotherFund from '../../assets/images/staticViews/CTAMotherFund.png';
import CTAButton from '../../assets/images/staticViews/CTAButton.png';
import Bridge from '@/config/bridge';

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
  methods: {
    onSkip() {
      Bridge.sendMessage({
        module: 'fund',
        action: 'getInitial',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.image-banner{
  position: relative;
  width: 375px;
  height: 1730px;
}
.buttonContainer{
  position: absolute;
  left: 50%;
  top: 0;
  margin-top: 400px;
  transform: translateX(-50%);
  .image-button{
    width:181px;
    height: 52px;
  }
}
</style>
