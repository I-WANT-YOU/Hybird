<template>
  <div class="raceDetailHeader">
    <div class="title">
      <div class="title-text">
        <span>辉与资本</span>
      </div>
      <div class="title-info">
        <div>
          <span>违规品种交易</span><span class="triangle"></span>
          <span>高杠杆</span><span class="triangle"></span>
          <span>高回撤</span><span class="triangle"></span>
        </div>
        <div>
          <span>跟投最多</span><span class="triangle"></span>
          <span>停业</span><span class="triangle"></span>
          <span>高回撤</span><span class="triangle"></span>
        </div>
      </div>
    </div>
    <div class="latest-info">
      <div class="netWorth">
        <div>
          <span>1.0923</span>
          <img :src="up" alt=""/>
        </div>
        <span>最新净值</span>
      </div>
      <div class="referenceValue">
        <span>1.0923</span>
        <span>基准值</span>
      </div>
    </div>
    <div class="recent-info"></div>

  </div>
</template>

<script>
import up from '../../../assets/images/trading-competition-two/detail/header/up.png';
import down from '../../../assets/images/trading-competition-two/detail/header/down.png';

export default {
  name: 'raceDetailHeader',
  data() {
    return {
      up,
      down,
    };
  },
};
</script>

<style lang="scss" scoped>
  .raceDetailHeader{
    width: 375px;
    height: 192px;
    background: url("../../../assets/images/trading-competition-two/detail/header/bg.png");
    background-size: 375px 192px;
    font-family:PingFang SC sans-serif;
    /*标题*/
    .title{
      padding-top: 20px;
      display: flex;
      .title-text{
        height: 18px;
        padding: 0 10px 0 26px ;
        display: flex;
        align-items: center;
        >span{
          font-size:14px;
          font-weight:400;
          color:rgba(42,85,231,1);
          background:linear-gradient(0deg,rgba(45,164,240,1) 0%, rgba(255,255,255,1) 100%);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
      }
      .title-info{
        >div{
          height: 18px;
          display: flex;
          align-items: center;
          >span{
            margin-right: 7px;
            padding: 2px 4px;
            font-size:8px;
            font-weight:400;
            color:rgba(255,255,255,1);
            background: #1C7AFF;
          }
          /*实现三角*/
          .triangle{
            height: 0;
            width: 0;
            border-top: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 10px solid red;
          }
        }
      }
    }
    /*最新数据*/
    .latest-info{
      display: flex;
      justify-content: center;
      /*最新净值*/
      .netWorth{
        background: url("../../../assets/images/trading-competition-two/detail/header/big-text-bg.png");
      }
      /*基准值*/
      .referenceValue{}

    }
    /*近期数据*/
    .recent-info{

    }
  }
</style>
