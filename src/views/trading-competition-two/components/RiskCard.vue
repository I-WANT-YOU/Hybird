<template>
  <div class="card">
    <div class="card-header">
      <div class="currency-container" :style="{textAlign:strategyType==='CTA'?'center':'right'}">{{strategyType}}</div>
      <div class="strategy-container">
        <div class="rotate-font-style">
          {{currentType}}
        </div>
      </div>
    </div>
    <ul class="card-body" >
      <li class="card-body-item">
        <span  class="img-style"></span>
        <span class="name-item font-style-color"></span>
        <span class="maxDraw-item">最大回撤</span>
        <span class="roi-item font-style-color">赛季ROI</span>
      </li>
      <li class="card-body-item" v-for="(listItem,listIndex) in listInfo" :key="listIndex" v-show="listIndex<4 && listIndex!==0">
        <el-image v-if="listIndex !== 0" class="img-style" :src="imgList[listIndex-1]"/>
        <span v-else class="img-style"></span>
        <span class="name-item font-style-color">{{listItem.team_name}}</span>
        <span class="maxDraw-item">{{listItem.max_drawdown+'%'}}</span>
        <span class="roi-item font-style-color">{{listItem.season_roi+'%'}}</span>
      </li>
    </ul>
    <el-image :src="border" class="border-style" v-show="showBorder"></el-image>
  </div>
</template>

<script>
import { Image } from 'vant';
import first from '../images/first.png';
import second from '../images/second.png';
import third from '../images/third.png';
import strategyTypeImg from '../images/strategy-type.png';
import currencyTypeImg from '../images/currency-type.png';
import border from '../images/border.png';

export default {
  name: 'RiskCard',
  props: {
    listInfo: {
      type: Array,
      default: () => [],
    },
    currentType: {
      type: String,
      default: '',
    },
    strategyType: {
      type: String,
      default: '',
    },
    showBorder: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      imgList: [
        first,
        second,
        third,
      ],
      strategyTypeImg,
      currencyTypeImg,
      border,
    };
  },
  components: {
    'el-image': Image,
  },
};
</script>

<style lang="scss" scoped>
  .card{
    font-family:Source Han Sans CN sans-serif;
    margin: 0 auto 10px;
    .font-style-color{
      color:rgba(255,255,255,1);
      line-height:12px;
      background:linear-gradient(0deg,rgba(45,164,240,1) 0%, rgba(255,255,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .card-header{
      margin: 0 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size:9px;
      color:rgba(255,255,255,1);
      .currency-container{
        width: 40px;
        height: 17px;
        padding-right: 10px;
        line-height:19px;
        text-align: right;
        background: url("../images/currency-type.png") no-repeat;
        background-size: 100% 100%;
      }
      .strategy-container{
        width: 41px;
        height: 30px;
        background: url("../images/strategy-type.png") no-repeat;
        background-size: 100% 100%;
        .rotate-font-style{
          width: 100%;
          height: 100%;
          transform:rotate(40deg);
          text-align: center;
          padding-top: 5.5px;
        }

      }
    }
    .card-body{
      margin: 0 64px 0 50px;
      >li:first-child{
        height: 17px;
        line-height: 17px;
        font-size: 10px;
        .roi-item{
          font-size:10px;
        }
      }
      .card-body-item{
        height: 25px;
        font-size:11px;
        display: flex;
        align-items: center;
        >span{
          display: inline-block;
        }
        .img-style{
          width: 15px;
          height: 18px;
        }
        .name-item{
          text-align: left;
          width: 100px;
          margin-left: 15px;
        }
        .maxDraw-item{
          width: 60px;
          text-align: right;
          color:rgba(164,200,234,1);
          line-height:18px;
        }
        .roi-item{
          font-size:12px;
          width: 80px;
          text-align: right;
        }
      }
    }
    .border-style{
      display: block;
      margin: 10px auto 0;
      width: 303px;
      height: 1px;
    }
  }
</style>
