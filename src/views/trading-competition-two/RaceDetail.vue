<template>
  <div class="raceDetail">
    <BgainNavBar title="团队详情"/>
    <raceDetailHeader/>
  </div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';
import raceDetailHeader from './components/raceDetailHeader.vue';

export default {
  name: 'RaceDetailTwo',
  data() {
    return {};
  },
  components: {
    BgainNavBar,
    raceDetailHeader,
  },
};
</script>

<style lang="scss" scoped>

</style>
