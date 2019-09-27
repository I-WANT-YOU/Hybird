<template>
  <div class="raceDetail">
    <BgainNavBar title="团队详情"/>
    <RaceDetailHeader/>
    <RaceDetailCollapse/>
    <RaceDetailPerformanceAnalysis/>
    <RaceDetailTeamInfo/>
    <TradingFooter/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BgainNavBar from '../../components/BgainNavBar.vue';
import RaceDetailHeader from './components/detail/RaceDetailHeader.vue';
import RaceDetailCollapse from './components/detail/RaceDetailCollapse.vue';
import RaceDetailPerformanceAnalysis from './components/detail/RaceDetailPerformanceAnalysis.vue';
import RaceDetailTeamInfo from './components/detail/RaceDetailTeamInfo.vue';
import TradingFooter from './components/home/TradingFooter.vue';

export default {
  name: 'RaceDetailTwo',
  data() {
    return {};
  },
  components: {
    BgainNavBar,
    RaceDetailHeader,
    RaceDetailCollapse,
    RaceDetailPerformanceAnalysis,
    RaceDetailTeamInfo,
    TradingFooter,
  },
  methods: {
    ...mapActions('race/raceInfo', ['getRaceDetail']),
  },
  mounted() {
    // this.getRaceDetail(1);
  },
};
</script>

<style lang="scss" scoped>
  .raceDetail{
    background-color: black;
  }

</style>
