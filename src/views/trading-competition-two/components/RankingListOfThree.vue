<template>
    <div class="riskListContainer">
      <div class="riskList-header">
        <div class="header-title font-style-color">第二赛季各策略组Top3</div>
        <div class="header-date font-style-color">第二赛季时间：2019.09.23 ～ 2019.12.31</div>
      </div>
      <div class="riskList-body">
        <div class="date">数据统计于201912.31  18：00</div>
        <!--card-->
        <RiskCard v-for="(listInfoItem,listInfoIndex) in listInfo" :key="listInfoIndex" :listInfoItem="listInfoItem" :listInfoIndex="listInfoIndex"/>
        <!--more-->
        <el-button class="button-style" @click="$router.push('/trading-competition-history')">查看更多</el-button>
      </div>
    </div>
</template>

<script>
import { Button } from 'vant';
import RiskCard from './RiskCard.vue';

export default {
  name: 'RankingListOfThree',
  components: {
    RiskCard,
    'el-button': Button,
  },
  data() {
    return {
      listInfo: [
        {
          currencyType: 'BTC',
          titleType: 'CTA',
          list: [
            {
              name: '',
              maximumDrawDown: '最大回撤',
              seasonROi: '赛季ROI',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
          ],
        },
        {
          currencyType: 'BTC',
          titleType: '市场中性',
          list: [
            {
              name: '',
              maximumDrawDown: '最大回撤',
              seasonROi: '赛季ROI',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
          ],
        },
        {
          currencyType: 'BTC',
          titleType: '不限策略',
          list: [
            {
              name: '',
              maximumDrawDown: '最大回撤',
              seasonROi: '赛季ROI',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
            {
              name: '资本家',
              maximumDrawDown: '25.33%',
              seasonROi: '23.00%',
            },
          ],
        },
      ],
    };
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
      font-size:14px;
      line-height:21px;
      font-weight: 500;
    }
    .header-date{
      height:25px;
      font-size:8px;
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
      margin: 20px 0 5px 36px;
      font-size:8px;
     text-align: left;
      color:rgba(255,255,255,1);
      line-height:25px;
      background:linear-gradient(0deg,rgba(45,164,240,1) 0%, rgba(255,255,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .button-style{
      height:15px;
      font-size:10px;
      color:rgba(42,85,231,1);
      line-height:15px;
      background: none;
      border: none;
    }
  }

}
</style>
