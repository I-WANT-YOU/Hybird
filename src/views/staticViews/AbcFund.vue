<template>
  <div>
    <van-image class="image-banner"
      :src="abcFund"
    />
  </div>
</template>

<script>
import { Image } from 'vant';
import abcFund from '../../assets/images/staticViews/ABC.png';

export default {
  name: 'AbcFund',
  data() {
    return {
      abcFund,
    };
  },
  components: {
    'van-image': Image,
  },
};
</script>

<style lang="scss" scoped>
.image-banner{
  width: 100%;
}
</style>
