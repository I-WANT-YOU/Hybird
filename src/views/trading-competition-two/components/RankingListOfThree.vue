<template>
    <div class="riskListContainer">
      <div class="riskList-header">
        <div class="header-title font-style-color">第二赛季各策略组Top3</div>
        <div class="header-date font-style-color">第二赛季时间：2019.09.23 ～ 2019.12.31</div>
      </div>
      <div class="riskList-body">
        <div class="date">数据统计于 2019.12.31  18:00</div>
        <!--card-->
        <RiskCard :listInfo="ctaRankingList" currentType="BTC"   strategyType="CTA"/>
        <RiskCard :listInfo="marketNeutralRankingList" currentType="BTC" strategyType="市场中性"/>
        <RiskCard :listInfo="mixedRankingList" currentType="USD" strategyType="不限策略" :showBorder="false"/>
        <!--more-->
        <el-button class="button-style" @click="$router.push('/trading-competition-history')">查看更多</el-button>
      </div>
    </div>
</template>

<script>
import { Button } from 'vant';
import { mapGetters } from 'vuex';
import RiskCard from './RiskCard.vue';

export default {
  name: 'RankingListOfThree',
  components: {
    RiskCard,
    'el-button': Button,
  },
  computed: {
    ...mapGetters('race/raceInfo', [
      'ctaRankingList', 'marketNeutralRankingList', 'mixedRankingList',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.riskListContainer{
  /*公用*/
  .font-style-color{
    color:rgba(255,255,255,1);
    line-height:12px;
    background:linear-gradient(0deg,rgba(45,164,240,1) 0%, rgba(255,255,255,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .riskList-header{
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .header-title{
      height:21px;
      font-size:15px;
      line-height:21px;
      font-weight: 500;
    }
    .header-date{
      height:25px;
      font-size:11px;
      line-height:25px;
    }
  }
  .riskList-body{
    background: url("../images/bg-risk.png") no-repeat;
    background-size: 100% 100% ;
    overflow: hidden;
    padding-bottom: 30px;
    text-align: center;
    .date{
      height: 25px;
      margin: 20px 0 0 36px;
      font-size:10px;
     text-align: left;
      color:rgba(255,255,255,1);
      line-height:25px;
      background:linear-gradient(0deg,rgba(45,164,240,1) 0%, rgba(255,255,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .button-style{
      display: block;
      margin: 15px auto 0;
      height:20px;
      font-size:12px;
      color:rgba(42,85,231,1);
      line-height:20px;
      background: none;
      border: none;
    }
  }

}
</style>
