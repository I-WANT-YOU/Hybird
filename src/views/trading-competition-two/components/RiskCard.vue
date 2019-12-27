<template>
  <div class="card">
    <div class="card-header">
      <div class="currency-container" :style="{textAlign:listInfoIndex===0?'center':'right'}">{{listInfoItem.titleType}}</div>
      <div class="strategy-container">
        <div class="rotate-font-style">
          {{listInfoItem.currencyType}}
        </div>
      </div>
    </div>
    <ul class="card-body" >
      <li class="card-body-item" v-for="(listItem,listIndex) in listInfoItem.list" :key="listIndex">
        <el-image v-if="listIndex !== 0" class="img-style" :src="imgList[listIndex-1]"/>
        <span v-else class="img-style"></span>
        <span class="name-item font-style-color">{{listItem.name}}</span>
        <span class="maxDraw-item">{{listItem.maximumDrawDown}}</span>
        <span class="roi-item font-style-color">{{listItem.seasonROi}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Image } from 'vant';
import first from '../images/first.png';
import second from '../images/second.png';
import third from '../images/third.png';
import strategyType from '../images/strategy-type.png';
import currencyType from '../images/currency-type.png';

export default {
  name: 'RiskCard',
  props: {
    listInfoItem: {
      type: Object,
      default: () => {},
    },
    listInfoIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      imgList: [
        first,
        second,
        third,
      ],
      currencyType,
      strategyType,
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
    margin: auto;
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
      .card-body-item{
        height: 25px;
        font-size:9px;
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
          width: 110px;
          margin-left: 15px;
        }
        .maxDraw-item{
          width: 65px;
          text-align: right;
          color:rgba(164,200,234,1);
          line-height:18px;
        }
        .roi-item{
          width: 80px;
          text-align: right;
        }
      }
    }
  }
</style>
