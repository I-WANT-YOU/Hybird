<template>
  <div class="raceDetailCollapse">
    <div class="defaultShow">
      <div class="defaultShow-item" v-for="(item,index) in infoList" :key="index" v-show="index<8">
        <div>
          <span>{{item.name}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
    <div  :class ="{collapseShow: showCollapse,hideCollapseShow:!showCollapse}">
      <div class="collapseShow-item" v-for="(item,index) in infoList" :key="index"  v-show="index>=8">
        <div>
          <span>{{item.name}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
    <div class="clickCollapse">
      <span @click="toggleShow">收起</span>
      <img :src="doubleDown" @click="toggleShow" alt=""/>
    </div>
  </div>
</template>

<script>
import doubleDown from '../../../assets/images/trading-competition-two/detail/content/doubleDown.png';
import doubleUp from '../../../assets/images/trading-competition-two/detail/content/doubleUp.png';

export default {
  name: 'raceDetailCollapse',
  data() {
    return {
      doubleDown,
      doubleUp,
      showCollapse: false, // false 隐藏 true 展示
      infoList: [
        {
          name: '综合得分',
          value: '83.23',
        },
        {
          name: '当前规模',
          value: '83.23',
        },
        {
          name: '夏普率',
          value: '83.23',
        },
        {
          name: '卡玛比',
          value: '83.23',
        },
        {
          name: '年化收益率',
          value: '83.23',
        },
        {
          name: '日增长率',
          value: '83.23',
        },
        {
          name: '日增长率(CNY)',
          value: '83.23',
        },
        {
          name: '成立以来',
          value: '83.23',
        },
        {
          name: '最大回撤',
          value: '83.23',
        },
        {
          name: '净值',
          value: '83.23',
        },
        {
          name: '赛季ROI',
          value: '83.23',
        },
        {
          name: '赛季净盈亏',
          value: '83.23',
        },
        {
          name: '当前净杠杆',
          value: '83.23',
        },
        {
          name: '成立日期',
          value: '83.23',
        },
      ],
    };
  },
  methods: {
    toggleShow() {
      this.showCollapse = !this.showCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
  .raceDetailCollapse{
    font-family:SourceHanSansCN sans-serif;
    background: url("../../../assets/images/trading-competition-two/detail/header/bg-two.png") no-repeat;
    background-size: 375px 100%;
    /*默认显示*/
    .defaultShow{
      display: flex;
      flex-wrap: wrap;
      margin: 0 10px;
      padding: 0 30px;
      border-top: #2A55E7 dotted 1px;
      .defaultShow-item{
        position: relative;
        width: 25%;
        margin-top: 15px;
        >div{
          display: flex;
          flex-direction: column;
          align-items: center;
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 1px;
            height: 10px;
            background: white;
            color: white;
          }
          >span:nth-child(1){
            font-size:10px;
            font-weight:200;
            color:rgba(255,255,255,1);
          }
          >span:nth-child(2){
            margin-top: 9px;
            font-size:12px;
            font-weight:200;
            color:rgba(42,85,231,1);
          }
        }
      }
      .defaultShow-item:nth-child(4n){
        >div{
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 0;
            height: 10px;
            background: white;
            color: white;
          }
        }
      }
    }
    /*折叠部分*/
    .hideCollapseShow{
      overflow: hidden;
      display: flex;
      height: 0;
      flex-wrap: wrap;
      margin: 0 10px;
      padding: 0 30px;
      transition: 8s;
      .collapseShow-item{
        position: relative;
        width: 25%;
        margin-top: 15px;
        >div{
          display: flex;
          flex-direction: column;
          align-items: center;
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 1px;
            height: 10px;
            background: white;
            color: white;
          }
          >span:nth-child(1){
            font-size:10px;
            font-weight:200;
            color:rgba(255,255,255,1);
          }
          >span:nth-child(2){
            margin-top: 9px;
            font-size:12px;
            font-weight:200;
            color:rgba(42,85,231,1);
          }
        }
      }
      .collapseShow-item:nth-child(4n){
        >div{
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 0;
            height: 10px;
            background: white;
            color: white;
          }
        }
      }
      .collapseShow-item:nth-child(14){
        >div{
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 0;
            height: 10px;
            background: white;
            color: white;
          }
        }
      }
    }
    .collapseShow{
      overflow: hidden;
      display: flex;
      height: 100px;
      flex-wrap: wrap;
      margin: 0 10px;
      padding: 0 30px;
      transition: 8s;
      .collapseShow-item{
        position: relative;
        width: 25%;
        margin-top: 15px;
        >div{
          display: flex;
          flex-direction: column;
          align-items: center;
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 1px;
            height: 10px;
            background: white;
            color: white;
          }
          >span:nth-child(1){
            font-size:10px;
            font-weight:200;
            color:rgba(255,255,255,1);
          }
          >span:nth-child(2){
            margin-top: 9px;
            font-size:12px;
            font-weight:200;
            color:rgba(42,85,231,1);
          }
        }
      }
      .collapseShow-item:nth-child(4n){
        >div{
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 0;
            height: 10px;
            background: white;
            color: white;
          }
        }
      }
      .collapseShow-item:nth-child(14){
        >div{
          &:after{
            position: absolute;
            top: 25%;
            right: 0;
            content: '';
            width: 0;
            height: 10px;
            background: white;
            color: white;
          }
        }
      }
    }
    /*展开标识*/
    .clickCollapse{
      width: 100%;
      padding: 17px 0 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      >img{
        width: 9px;
        height: 9px;
      }
      >span{
        font-size:12px;
        font-weight:400;
        color:rgba(16,73,157,1);
        padding-right: 6px;
      }
    }
  }
</style>
