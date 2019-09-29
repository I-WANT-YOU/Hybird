<template>
  <div class="raceDetailCollapse">
    <div class="defaultShow">
      <div class="defaultShow-item"
           v-for="(item,index) in recentData" :key="index" v-show="index<6">
        <div>
          <span>{{item.name}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
    <div  :class ="{collapseShow: showCollapse,hideCollapseShow:!showCollapse}">
      <div class="collapseShow-item"
           v-for="(item,index) in recentData" :key="index"  v-show="index>=6">
        <div>
          <span>{{item.name}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
    <div class="clickCollapse">
      <span @click="toggleShow">{{showCollapse?'收起':'查看更多'}}</span>
      <img :src="!showCollapse?doubleDown:doubleUp" @click="toggleShow" alt=""/>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import doubleDown from '../../../../assets/images/trading-competition-two/detail/content/doubleDown.png';
import doubleUp from '../../../../assets/images/trading-competition-two/detail/content/doubleUp.png';

const { mapGetters } = createNamespacedHelpers('race/raceInfo');

export default {
  name: 'raceDetailCollapse',
  data() {
    return {
      doubleDown,
      doubleUp,
      showCollapse: false, // false 隐藏 true 展示
    };
  },
  computed: {
    ...mapGetters(['createDate',
      'size',
      'productName',
      'sharpeRatio',
      'calmarRatio',
      'benchmarkNav',
      'nav',
      'change',
      'pnl',
      'roiSeason',
      'roiAnnual',
      'ror7Days',
      'rank7Days',
      'count7Days',
      'ror28Days',
      'rank28Days',
      'count28Days',
      'ror',
      'rank',
      'countWholePeriod',
      'margin',
      'maxDrawDownRate']),
    recentData() {
      // const infoList = [
      //   {
      //     name: '成立日期',
      //     value: this.createDate,
      //   },
      //   {
      //     name: '成立天数',
      //     value: '哇哈哈',
      //   },
      //   {
      //     name: '当前规模',
      //     value: this.size,
      //   },
      //   {
      //     name: '赛季净盈亏',
      //     value: this.pnl,
      //   },
      //   {
      //     name: '历史ROI',
      //     value: '我是水娃',
      //   },
      //   {
      //     name: '年化收益率',
      //     value: this.roiAnnual,
      //   },
      //   {
      //     name: '最大回撤',
      //     value: this.maxDrawDownRate,
      //   },
      //   {
      //     name: '最大回撤天数',
      //     value: '我是爷爷',
      //   },
      //   {
      //     name: '卡玛比',
      //     value: this.calmarRatio,
      //   },
      //   {
      //     name: '夏普率',
      //     value: this.sharpeRatio,
      //   },
      //   {
      //     name: '波动率',
      //     value: '我是葫芦小金刚',
      //   },
      //   {
      //     name: '索提诺比',
      //     value: '我是七娃',
      //   },
      //   {
      //     name: '赛季最低ROI',
      //     value: '我是蝴蝶',
      //   },
      //   {
      //     name: '赛季最大回撤',
      //     value: '我是蝴蝶',
      //   },
      //   {
      //     name: '赛季最大当前净杠杆',
      //     value: '蛇精病',
      //   },
      // ];
      const infoList = [
        {
          name: '成立日期',
          value: this.createDate,
        },
        {
          name: '当前规模',
          value: this.size,
        },
        {
          name: '夏普率',
          value: this.sharpeRatio,
        },
        {
          name: '卡玛比',
          value: this.calmarRatio,
        },
        {
          name: '最大回撤',
          value: `${this.maxDrawDownRate}%`,
        },
        {
          name: '年化收益率',
          value: `${this.roiAnnual}%`,
        },
        {
          name: '赛季净盈亏',
          value: this.pnl > 0 ? `+${this.pnl}` : (this.pnl < 0 ? `-${this.pnl}` : this.pnl),
        },
        {
          name: '赛季ROI',
          value: `${this.roiSeason}%`,
        },
        {
          name: '当前净杠杆',
          value: this.margin,
        },
      ];
      return infoList;
    },
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
    overflow: hidden;
    font-family:SourceHanSansCN sans-serif;
    background: url("../../../../assets/images/trading-competition-two/detail/header/bg-two.png") no-repeat;
    background-size: 375px 246px;
    /*默认显示*/
    .defaultShow{
      min-height: 110px;
      display: flex;
      flex-wrap: wrap;
      margin: 0 10px;
      padding: 0 30px;
      border-top: #2A55E7 dotted 1px;
      .defaultShow-item{
        position: relative;
        width: 33.3%;
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
      .defaultShow-item:nth-child(3n){
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
      /*min-height: 110px;*/
      overflow: hidden;
      display: flex;
      height: 0;
      flex-wrap: wrap;
      margin: 0 10px;
      padding: 0 30px;
      transition: 1s;
      .collapseShow-item{
        position: relative;
        width: 33.3%;
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
    }
    .collapseShow{
      overflow: hidden;
      display: flex;
      height: 55px;
      flex-wrap: wrap;
      margin: 0 10px;
      padding: 0 30px;
      transition: 1s;
      .collapseShow-item{
        position: relative;
        width: 33.3%;
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
      .collapseShow-item:nth-child(3n){
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
      .collapseShow-item:nth-child(15){
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
      padding: 10px 0 0;
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
