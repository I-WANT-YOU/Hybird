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
import { mapActions, state } from 'vuex';
import BgainNavBar from '../../components/BgainNavBar.vue';
import RaceDetailHeader from './components/RaceDetailHeader.vue';
import RaceDetailCollapse from './components/RaceDetailCollapse.vue';
import RaceDetailPerformanceAnalysis from './components/RaceDetailPerformanceAnalysis.vue';
import RaceDetailTeamInfo from './components/RaceDetailTeamInfo.vue';
import TradingFooter from './components/TradingFooter.vue';

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
    this.getRaceDetail(1);
  },
};
</script>

<style lang="scss" scoped>
  .raceDetail{
    div{
      margin:0;
      padding:0;
      font-size: 0;
    }
    background-color: black;
  }

</style>
