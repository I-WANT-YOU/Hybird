<template>
  <div class="raceDetailPerformanceAnalysis">
    <p class="title">业绩分析</p>
    <!--类型Tabs-->
    <div class="typeTabs">
      <span v-for="(item,index) in typeData"
            :key="index"
            class="typeTabs-item"
            :class="{'selected-typeTabs-item':typeTabSelected === index}"
            @click="changeType(index)"
      >
        {{item}}
      </span>
    </div>
    <div>
      <!--时间Tabs-->
      <div class="timeTabs">
        <div class="timeTabs-item"
             v-for="(item,index) in timeTabsData" :key="index"
             :class="{'selected-timeTabs-item':timeTabSelected === index}"
             @click="changeTime(index)"
        >
          <span>{{item}}</span>
        </div>
      </div>
      <div class="chart" ref="myChart"></div>
    </div>
  </div>
</template>

<script>
import EChart from 'echarts';
import bg from '../../../assets/images/trading-competition-two/detail/content/bg-three.png';

export default {
  name: 'RaceDetailPerformanceAnalysis',
  data() {
    return {
      bg,
      typeData: [
        '净值走势',
        '收益率',
      ],
      timeTabsData: [
        '近一周',
        '近一月',
        '近半年',
        '全部',
      ],
      typeTabSelected: 0,
      timeTabSelected: 3,
    };
  },
  methods: {
    /* 改变类型 */
    changeType(index) {
      this.typeTabSelected = index;
    },
    /* 改变时间轴 */
    changeTime(index) {
      this.timeTabSelected = index;
    },
    /* 初始化净值走势折线图 */
    initTrendChart(chartData) {
      this.myChart = EChart.init(this.$refs.myChart);
      this.myChart.clear();
      const optionLineOne = {
        grid: {
          top: '12px',
          left: '48px',
          right: '10px',
          bottom: '45px',
        },
        color: ['#EA772A'],
        legend: {
          data: ['净值'],
          itemHeight: 4,
          orient: 'vertical',
          icon: 'roundRect',
          bottom: 'bottom',
          textStyle: {
            color: '#F8E39E',
            padding: [4, 0, 3, 0],
            fontSize: 10,
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            this.netWorthValue = params[0].value;
            if (params[0].value.toString().length === 1) {
              this.netWorthValue = `${params[0].value.toString()}.000`;
            } else if (params[0].value.toString().length === 3) {
              this.netWorthValue = `${params[0].value.toString()}00`;
            } else if (params[0].value.toString().length === 4) {
              this.netWorthValue = `${params[0].value.toString()}0`;
            }
            this.netWorthDate = params[0].axisValue;
            return '';
          },
          // formatter: params => `<div>${params[0].seriesName}:${Math.floor(params[0].value * 10000) / 100}%</div><div>${params[1].seriesName}:${Math.floor(params[1].value * 10000) / 100}%</div>`,
        },
        xAxis: {
          type: 'category',
          // nameGap: '170px',
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#F8E39E',
            margin: 10,
            fontSize: 10,
            formatter: (value) => {
              const newValue = value.substring(5);
              return newValue;
            },
          },
          axisTick: {
            show: false,
          },
          data: chartData.xData,
        },
        yAxis: {
          type: 'value',
          min: chartData.maxNum === chartData.minNum ? chartData.minNum / 1.1 : (chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2),
          max: chartData.maxNum === chartData.minNum ? chartData.maxNum * 1.1 : (chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1),
          interval: chartData.maxNum === chartData.minNum ? (chartData.maxNum * 1.1 - chartData.minNum / 1.1) / 6 : ((chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1) - (chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2)) / 6,
          nameGap: '70px',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter: (value) => {
              let newValue = (Math.floor(value * 1000) / 1000).toString();
              if (newValue.length === 3) {
                newValue += '00';
              } else if (newValue.length === 4) {
                newValue += '0';
              } else if (newValue.length === 1) {
                newValue += '.000';
              }
              return newValue;
            },
            color: '#F8E39E',
            margin: 15,
            fontSize: 10,
          },
          splitLine: {
            lineStyle: {
              color: '#2C2C2C',
            },
          },
        },
        series: [{
          name: '净值',
          data: chartData.yData,
          type: 'line',
          animationEasing: 'liner',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#EA772A',
            width: 0.8,
          },
        }],
      };
      this.myChart.setOption(optionLineOne);
    },
  },
  mounted() {
    this.initTrendChart();
  },
};
</script>

<style lang="scss" scoped>
  .raceDetailPerformanceAnalysis{
    font-family:PingFang SC sans-serif;
    background: url("../../../assets/images/trading-competition-two/detail/content/bg-three.png");
    background-size: 375px 100%;
    padding-top: 20px;
    .title{
      margin: 0;
      height:20px;
      padding: 5px 0 0 25px;
      font-size:14px;
      font-weight:400;
      color:rgba(42,85,231,1);
      line-height:19px;
      background:linear-gradient(0deg,rgba(45,164,240,1) 0%, rgba(255,255,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    /*类型Tabs*/
    .typeTabs{
      display: flex;
      padding-left: 39px;
      .typeTabs-item{
        margin:10px 15px 0 0;
        padding:3px 5px;
        vertical-align: center;
        font-size:9px;
        font-family:Adobe Heiti Std sans-serif;
        font-weight:normal;
        color:rgba(255,255,255,1);
      }
      .selected-typeTabs-item{
        background:#1C7AFF;
        box-shadow:0 3px 3px 0 rgba(13,3,7,0.75);
        border-radius:9px;
      }
    }
    /*时间tabs*/
    .timeTabs{
      padding: 16px 42px;
      display: flex;
      justify-content: space-between;
      .timeTabs-item{
        position: relative;
        height:21px;
        font-size:9px;
        font-family:SourceHanSansCN sans-serif;
        font-weight:200;
        color:rgba(255,255,255,1);
        line-height:21px;
      }
      .selected-timeTabs-item{
        color: #2A55E7;
        >span{
          display: block;
          position: relative;
          &:after{
            content: '';
            position: absolute;
            display: block;
            width: 5px;
            height: 5px;
            left: 40%;
            border-radius: 10px;
            background-color: #2A55E7;
          }
        }
      }
    }
    .chart{
      width: 315px;
      height: 150px;
    }
  }

</style>
