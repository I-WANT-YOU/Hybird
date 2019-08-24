<template>
  <div class="raceDetail">
    <BgainNavBar title="团队详情"/>
    <div class="contentContainer">
      <!--头部-->
      <div class="title"></div>
      <!--最近的数据-->
      <div class="latestInfo">
        <div class="latestData">
          <div>
            <div>
              <span></span>
              <van-img></van-img>
            </div>
          </div>
          <div></div>
        </div>
        <div class="recentData"></div>
      </div>
      <!--团队数据-->
      <div class=teamInfo></div>
      <!--业绩分析-->
      <div class="analysis"></div>
      <div class="teamIntroduction"></div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '../../components/BgainNavBar.vue';

export default {
  name: 'RaceDetail',
  components: {
    BgainNavBar,
  },
};
</script>

<style lang="scss" scoped>
  .raceDetail{
    .contentContainer{
      display: flex;
      flex-direction: column;
      align-items: center;
      background: url("../../assets/images/detail/background.png");
      background-size: 375px 1258px;
      /*头部*/
      .title{
        width: 160px;
        height: 42px;
        margin: 13px 0 10px 0;
        background: url("../../assets/images/detail/background-title.png");
        background-size:160px 42px;
      }
    }
  }
</style>
