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
      <!--展示图表数据-->
      <div class="showSingleData">
        <span>{{dataKeys.date+'：'+dataValues.date}}</span>
        <div>
          <span>{{dataKeys.value1+'：'+dataValues.value1}}</span>
          <span>{{dataKeys.value2+'：'+dataValues.value2}}</span>
        </div>
      </div>
      <div class="chart" ref="myChart"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable max-len */

import EChart from 'echarts';
import { mapActions, mapState, mapGetters } from 'vuex';
import pulicMethods from '@utils/publicMethods';
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
      dataKeys: {
        date: '日期',
        value1: '当日净值',
        value2: '基准净值',
      },
      dataValues: {
        date: '--',
        value1: '--',
        value2: '--',
      },
    };
  },
  computed: {
    ...mapState('race/raceInfo', ['raceDetail']),
    ...mapGetters('race/raceInfo', ['navDate', 'compareData', 'weekDataTwo', 'monthDataTwo', 'halfYearDataTwo', 'allYearDataTwo']),
  },
  methods: {
    ...mapActions('race/raceInfo', ['getRaceDetail']),
    /* 改变类型 */
    changeType(index) {
      this.typeTabSelected = index;
      if (index === 0) {
        this.initTrendChart(this.formatNetWorthChartData(this.raceDetail.nav_data, 365));
      } else {
        this.initProfitChart(this.formatNetWorthChartData(this.allYearDataTwo));
      }
    },
    /* 改变时间轴 */
    changeTime(index) {
      this.timeTabSelected = index;
      if (this.typeTabSelected === 0) {
        switch (index) {
          case 0:
            this.initTrendChart(this.formatNetWorthChartData(this.raceDetail.nav_data, 8));
            break;
          case 1:
            this.initTrendChart(this.formatNetWorthChartData(this.raceDetail.nav_data, 31));
            break;
          case 2:
            this.initTrendChart(this.formatNetWorthChartData(this.raceDetail.nav_data, 187));
            break;
          case 3:
            this.initTrendChart(this.formatNetWorthChartData(this.raceDetail.nav_data, 365));
            break;
          default:
            break;
        }
      } else {
        switch (index) {
          case 0:
            this.initProfitChart(this.formatNetWorthChartData(this.weekDataTwo));
            break;
          case 1:
            this.initProfitChart(this.formatNetWorthChartData(this.monthDataTwo));
            break;
          case 2:
            this.initProfitChart(this.formatNetWorthChartData(this.halfYearDataTwo));
            break;
          case 3:
            this.initProfitChart(this.formatNetWorthChartData(this.allYearDataTwo));
            break;
          default:
            break;
        }
      }
    },
    /* 格式化时间（年 chart数据） */
    formatChartYearData(date) {
      return pulicMethods.formatChartYearData(date);
    },
    /* 格式表格数据 */
    formatNetWorthChartData(data, times) {
      console.log(data);
      const currentData = {
        xData: [],
        yOne: [],
        yTwo: [],
        maxNum: '',
        minNum: '',
      };
      let filterData = [];
      if (!!times && times < data.length) { // 不同的日期显示不同数据
        /* 第一遍筛选 */
        filterData = data.filter((item, index) => index >= (data.length - times));
      } else {
        filterData = data;
      }
      currentData.xData = filterData.map(item => this.formatChartYearData(item.x)); // 格式化时间
      currentData.yOne = filterData.map(item => item.y1);
      currentData.yTwo = filterData.map(item => item.y2);
      const y1max = Math.max.apply(null, currentData.yOne);
      const y1min = Math.min.apply(null, currentData.yOne);
      const y2max = Math.max.apply(null, currentData.yTwo);
      const y2min = Math.min.apply(null, currentData.yTwo);
      currentData.maxNum = y1max > y2max ? y1max : y2max;
      currentData.minNum = y1min > y2min ? y2min : y1min;
      return currentData;
    },
    /* 净值走势折线图 */
    initTrendChart(chartData) {
      // 最大值和最小值为0时候的判断
      this.myChart = EChart.init(this.$refs.myChart);
      this.myChart.clear();
      const optionLineOne = {
        grid: {
          top: '12px',
          left: '30px',
          right: '10px',
          bottom: '45px',
        },
        color: ['#EA772A'],
        legend: {
          data: ['Bgain指数', 'nav'],
          itemHeight: 4,
          orient: 'vertical',
          icon: 'roundRect',
          bottom: 'bottom',
          textStyle: {
            color: '#F8E39E',
            padding: [4, 0, 3, 0],
            fontSize: 8,
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
            show: true,
          },
          axisLabel: {
            color: '#ffffff',
            margin: 8,
            fontSize: 8,
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
          min: chartData.minNum,
          max: chartData.maxNum,
          interval: (chartData.maxNum - chartData.minNum) / 5,
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
            color: '#FFFFFF',
            margin: 10,
            fontSize: 7,
          },
          splitLine: {
            lineStyle: {
              color: '#2C2C2C',
            },
          },
        },
        series: [{
          name: 'Bgain指数',
          data: chartData.yOne,
          type: 'line',
          animationEasing: 'liner',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#EA772A',
            width: 0.8,
          },
        },
        {
          name: 'nav',
          data: chartData.yTwo,
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
    /* 收益率折线图 */
    initProfitChart(chartData) {
      this.myChart = EChart.init(this.$refs.myChart);
      this.myChart.clear();
      const optionLineTwo = {
        grid: {
          top: '12px',
          left: '55px',
          right: '10px',
          bottom: '45px',
        },
        color: ['#EA772A', '#5294D4'],
        legend: {
          itemHeight: 4,
          data: ['仅持有BTC的收益率', '用BTC购买该基金的收益率（以USD计价）'],
          icon: 'roundRect',
          bottom: 'bottom',
          textStyle: {
            color: '#F8E39E',
            padding: [4, 0, 3, 0],
            fontSize: 10,
          },
          formatter(name) {
            if (name === '仅持有BTC的收益率') {
              return '买BTC收益率';
            }
            return '买基金（USD）收益率';
          },
          tooltip: {
            show: true,
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            this.profitDate = params[0].axisValue;
            this.profitBTC = `${Math.floor(params[0].value * 10000) / 100}%`;
            this.profitUSD = `${Math.floor(params[1].value * 10000) / 100}%`;
            return '';
          },
          // formatter: params => `<div>${params[0].seriesName}:${Math.floor(params[0].value * 10000) / 100}%</div><div>${params[1].seriesName}:${Math.floor(params[1].value * 10000) / 100}%</div>`,
        },
        xAxis: {
          type: 'category',
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
          // min: (chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2),
          // max: (chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1),
          // interval: ((chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1)-(chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2))/5,
          // min:-0.2,
          // max:0.6,
          // interval:0.2,
          min: Math.floor(chartData.minNum * 10) / 10,
          max: Math.ceil(chartData.maxNum * 10) / 10,
          interval: (Math.ceil(chartData.maxNum * 10) / 10 - Math.floor(chartData.minNum * 10) / 10) / 5,
          nameGap: '70px',
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#F8E39E',
            margin: 12,
            fontSize: 10,
            formatter: (value) => {
              let newValue = (Math.floor(value * 10000) / 100);
              if (newValue >= 0) {
                newValue = newValue.toString();
                if (newValue.length === 1) {
                  newValue += '.00';
                  newValue += '%';
                } else if (newValue.length === 2) {
                  newValue += '.00';
                  newValue += '%';
                } else if (newValue.length === 3) {
                  newValue += '.00';
                  newValue += '%';
                } else if (newValue.length === 4) {
                  if (newValue - 10 > 0) {
                    newValue += '0';
                    newValue += '%';
                  } else {
                    newValue += '%';
                  }
                } else if (newValue.length === 5) {
                  newValue += '%';
                } else if (newValue.length === 6) {
                  newValue += '%';
                }
              }
              if (newValue < 0) {
                newValue = newValue.toString();
                if (newValue.length === 2) {
                  newValue += '.00';
                  newValue += '%';
                } else if (newValue.length === 3) {
                  newValue += '.00';
                  newValue += '%';
                } else if (newValue.length === 4) {
                  newValue += '.00';
                  newValue += '%';
                } else if (newValue.length === 5) {
                  newValue += '0';
                  newValue += '%';
                } else if (newValue.length === 6) {
                  newValue += '%';
                } else if (newValue.length === 7) {
                  newValue += '%';
                }
              }
              return newValue;
            },
          },
          splitLine: {
            lineStyle: {
              color: '#2C2C2C',
            },
          },
        },
        series: [{
          name: '仅持有BTC的收益率',
          data: chartData.yOne,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#EA772A',
            width: 0.8,
          },
        },
        {
          name: '用BTC购买该基金的收益率（以USD计价）',
          data: chartData.yTwo,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#5294D4',
            width: 0.8,
          },
        },
        ],
      };
      this.myChart.setOption(optionLineTwo);
    },

  },
  mounted() {
    this.getRaceDetail(10).then(
      () => {
        try {
          /* 初始化净值走势图表 */
          this.initTrendChart(this.formatNetWorthChartData(this.raceDetail.nav_data, 365));
        } catch (e) {
          throw new Error(e);
        }
      },
      (error) => {
        if (error.status) {
        } else {
        }
      },
    );
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
    /*展示数据*/
    .showSingleData{
      margin: auto;
      width: 315px;
      display: flex;
      flex-direction: column;
      span{
        font-size:8px;
        font-weight:200;
        color:rgba(255,255,255,1);
      }
      >div{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
    }
    .chart{
      margin: auto;
      width: 315px;
      height: 150px;
    }
  }

</style>
