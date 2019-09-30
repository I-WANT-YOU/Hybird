<template>
  <div class="raceDetailHeader">
    <div class="title">
      <div class="title-text">
        <span>{{productName}}</span>
      </div>
      <div class="title-info">
        <div>
          <!--<span>违规品种交易</span>-->
          <span v-show="lables[0] === 2">高杠杆</span>
          <span v-show="lables[0] === 1">高回撤</span>
        </div>
        <!--<div>-->
          <!--<span>跟投最多</span>-->
          <!--<span>停业</span>-->
          <!--<span>高回撤</span>-->
        <!--</div>-->
      </div>
    </div>
    <div class="latest-info">
      <div class="netWorth">
        <div>
          <span>{{nav}}</span>
          <img :src="nav-0>0?up:down" alt="" class="arrow-icon"/>
        </div>
        <span>最新净值</span>
      </div>
      <div class="netWorth referenceValue">
        <span>{{roiSeason+'%'}}</span>
        <span>赛季ROI</span>
      </div>
    </div>
    <div class="recent-info">
      <div class="recent-info-item" v-for="(item,index) in recentData" :key="index">
        <div class="">
          <!--<span>{{item.name}}</span>-->
          <!--<span>{{item.time}}</span>-->
          <el-popover
            placement="top"
            title=''
            width="180"
            trigger="click"
          >
            <span class="tipOne">{{item.tips}}</span>
            <div slot="reference"  class="recent-info-item-name"  style="outline:none;border:none">
              <span>{{item.name}}</span>
              <span>{{item.time}}</span>
              <img
                   class="hasTip" alt="" :src="tip"  style="outline:none;border:none" />
            </div>
          </el-popover>
        </div>
        <div class="recent-info-item-value">
          <span>{{item.value}}</span>
          <span>{{item.symbol}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Popover } from 'element-ui';
import up from '../../../../assets/images/trading-competition-two/detail/header/up.png';
import down from '../../../../assets/images/trading-competition-two/detail/header/down.png';
import tip from '../../../../assets/images/trading-competition-two/detail/header/tip.png';

const { mapGetters } = createNamespacedHelpers('race/raceInfo');

export default {
  name: 'raceDetailHeader',
  data() {
    return {
      up,
      down,
      tip,
    };
  },
  computed: {
    ...mapGetters(['createDate',
      'lables',
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
      const recentInfo = [
        {
          name: '近一周',
          value: this.ror7Days,
          symbol: '%',
          time: `${this.rank7Days}/${this.count7Days}`,
          tips: '近1周净值涨跌幅及相应排名',
        },
        {
          name: '近一月',
          value: this.ror28Days,
          symbol: '%',
          time: `${this.rank28Days}/${this.count28Days}`,
          tips: '近1月净值涨跌幅及相应排名',
        },
        {
          name: '成立以来',
          value: this.ror,
          symbol: '%',
          time: `${this.rank}/${this.countWholePeriod}`,
          tips: '成立以来净值涨跌幅及相应排名',
        },
      ];
      return recentInfo;
    },
  },
  components: {
    'el-popover': Popover,
  },
};
</script>

<style lang="scss" >
  .el-popover{
    outline: none;
    margin-bottom: 10px;
    left: -23px;
    text-align: right;
    /*left:0!important;*/
  }
  .tipOne{
    display: inline-block;
    font-size:10px;
    border: none;
    margin-left: 20px;
    background: #303133;
    color: #FFFFFF;
    text-align: right;
    padding: 3px 2px;
    border-radius: 6px;
  }
  .raceDetailHeader{
    width: 375px;
    height: 192px;
    background: url("../../../../assets/images/trading-competition-two/detail/header/bg.png");
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
            height: 11.5px;
            margin-right: 16px;
            padding-left: 4px;
            padding-right: 4px;
            line-height: 11.5px;
            font-size:8px;
            font-weight:400;
            color:rgba(255,255,255,1);
            background: #1C7AFF;
            &:after{
              content: '';
              position: absolute;
              margin-left: 3.8px;
              width: 7.5px;
              height: 11.5px;
              background: url("../../../../assets/images/trading-competition-two/detail/header/right-arrow.png") no-repeat;
              background-size: 7.5px 11.5px;
            }
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
      margin-top: 10px;
      display: flex;
      justify-content: center;
      >div{
        width:103px;
        height:63px;
        margin: 0 9px;
        background: url("../../../../assets/images/trading-competition-two/detail/header/big-text-bg.png");
        background-size:103px 63px ;
      }
      /*最新净值*/
      .netWorth{
        display: flex;
        flex-direction: column;
        align-items: center;
        >div{
          padding-top: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          >span{
            font-size:23px;
            font-family:Myriad Pro sans-serif;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:30px;
          }
          .arrow-icon{
            margin-left: 3px;
            width: 8px;
            height: 11px;
          }
        }
        >span{
          margin-top: 7px;
          font-size:10px;
          font-family:SourceHanSansCN sans-serif;
          font-weight:200;
          color:rgba(255,255,255,1);
        }
      }
      /*基准值*/
      .referenceValue{
        >span:nth-child(1){
          margin: 0;
          padding-top: 5px;
          font-size:23px;
          font-family:Myriad Pro sans-serif;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:30px;
        }
      }

    }
    /*近期数据*/
    .recent-info{
      margin-top: 12px;
      display: flex;
      justify-content: center;
      .recent-info-item{
        width:84px;
        height:41px;
        margin: 0 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: url("../../../../assets/images/trading-competition-two/detail/header/small-text-bg.png");
        background-size: 84px 41px;
        border-radius:8px;
        font-size: 10px;
        .recent-info-item-name{
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family:SourceHanSansCN sans-serif;
          color:rgba(255,255,255,1);
          .el-popover{
            border: none;
            outline: none;
          }
          .hasTip{
            position: absolute;
            top: -4.5px;
            right: -8px;
            display: block;
            width: 7px;
            height: 7px;
            >img{
              width: 7px!important;
              height: 7px!important;
            }
          }

          >span{
            padding: 2px 0;
            font-weight:200;
          }
          >span:nth-child(1){
            font-size:9px;
          }
          >span:nth-child(2){
            font-size:7px;
          }
        }
        .recent-info-item-value{
          color:rgba(29,121,252,1);
        }
      }
    }
  }
</style>
