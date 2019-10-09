<template>
  <div class="raceDetailCollapse">
    <div class="defaultShow">
      <div class="defaultShow-item"
           v-for="(item,index) in recentData" :key="index" v-show="index<8">
        <div>
          <span>{{item.name}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
    <div class="defaultShow"  :class ="{collapseShow: showCollapse,hideCollapseShow:!showCollapse}">
      <div class="defaultShow-item"
           v-for="(item,index) in recentData" :key="index"  v-show="index>=8">
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
      'maxDrawDownRate',
      'minRoiSeason',
      'maxMargin',
      'entryDate',
      'historyRoi',
      'seasonMaxDrawDown',
      'volatility',
      'sortinoRatio',
      'maxDrawDownDate',
    ]),
    recentData() {
      // 累计经营亏
      let currentPnl = this.pnl;
      if (this.pnl > 0) {
        currentPnl = `+${this.pnl}`;
      } else if (this.pnl < 0) {
        currentPnl = `-${this.pnl}`;
      }
      // 净杠杆
      let currentMaxMargin = this.maxMargin;
      if (this.maxMargin.indexOf('.') < 0) { // 没有小数位
        currentMaxMargin = `${this.maxMargin}.00`;
      } else if (this.maxMargin.indexOf('.') > 0 && currentMaxMargin.substring(this.maxMargin.indexOf('.') + 1).length === 1) { // 小数点后有一位
        currentMaxMargin = `${this.maxMargin.toString()}0`;
      } else {
        currentMaxMargin = this.maxMargin.substring(0, this.maxMargin.indexOf('.') + 3); // 保留后两位
      }
      const infoList = [
        {
          name: '成立日期',
          value: this.createDate,
        },
        {
          name: '成立天数',
          value: this.entryDate,
        },
        {
          name: '当前规模',
          value: this.size,
        },
        {
          name: '累计净盈亏',
          value: currentPnl,
        },
        /*-------------*/
        {
          name: '历史ROI',
          value: `${this.historyRoi}%`,
        },
        {
          name: '年化收益率',
          value: `${this.roiAnnual}%`,
        },
        {
          name: '最大回撤',
          value: `${this.maxDrawDownRate}%`,
        },
        {
          name: '最大回撤天数',
          value: this.maxDrawDownDate,
        },
        /*--------------*/
        {
          name: '卡玛比',
          value: this.calmarRatio,
        },
        {
          name: '夏普率',
          value: this.sharpeRatio,
        },
        {
          name: '波动率',
          value: `${this.volatility}%`,
        },
        {
          name: '索提诺比',
          value: `${this.sortinoRatio}%`,
        },
        /*------------------*/
        {
          name: '赛季最低ROI',
          value: `${this.minRoiSeason}%`,
        },
        {
          name: '赛季最大回撤',
          value: `${this.seasonMaxDrawDown}%`,
        },
        {
          name: '赛季最大净杠杆',
          value: currentMaxMargin,
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
    background-size: 375px 301px;
    /*默认显示*/
    .defaultShow{
      height: 110px;
      display: flex;
      flex-wrap: wrap;
      margin: 0 10px;
      padding: 0 30px;
      border-top: #2A55E7 dotted 1px;
      /*默认显示部分*/
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
      /*隐藏分割线*/
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
      .defaultShow-item:nth-child(15){
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
    /*折叠隐藏*/
    .hideCollapseShow{
      overflow: hidden;
      height: 0;
      transition: 1s;
      border-top:none;
    }
    /*折叠显示*/
    .collapseShow{
      height: 110px;
      transition: 1s;
      border-top:none;
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
