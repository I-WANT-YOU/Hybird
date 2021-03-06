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
          <span>{{dataKeys.value2 === ''?'':dataKeys.value2+'：'+dataValues.value2}}</span>
        </div>
      </div>
      <div class="chart" ref="myChart"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable max-len,prefer-destructuring */

import EChart from 'echarts';
import { uniq } from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import pulicMethods from '@utils/publicMethods';
import { Toast } from 'vant';
import bg from '../../../../assets/images/trading-competition-two/detail/content/bg-three.png';

export default {
  name: 'RaceDetailPerformanceAnalysis',
  data() {
    return {
      bg,
      typeData: [
        '净值走势',
        '收益率(USD计价)',
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
        value2: '',
      },
      dataValues: {
        date: '--',
        value1: '--',
        value2: '',
      },
      beforeDate: '',
    };
  },
  computed: {
    ...mapState('race/raceInfo', ['raceDetail']),
    ...mapGetters('race/raceInfo', ['navDate', 'compareData', 'weekDataTwo', 'monthDataTwo', 'halfYearDataTwo', 'allYearDataTwo']),
  },
  methods: {
    ...mapActions('race/raceInfo', ['getRaceDetail']),
    /* ----------------页面点击事件------------------*/
    /* 改变类型 */
    changeType(index) {
      this.typeTabSelected = index;
      this.timeTabSelected = 3;
      if (index === 0) {
        this.initTrendChart(this.formatTestData(this.raceDetail.nav_data, 365));
        this.dataKeys = {
          date: '日期',
          value1: '当日净值',
          // value2: '基准净值',
          value2: '',
        };
      } else {
        this.initProfitChart(this.formatProfitChartData(this.allYearDataTwo));
        this.dataKeys = {
          date: '日期',
          value1: '投资该产品',
          value2: '持有BTC',
        };
      }
    },
    /* 改变时间轴 */
    changeTime(index) {
      this.timeTabSelected = index;
      if (this.typeTabSelected === 0) {
        switch (index) {
          case 0:
            this.initTrendChart(this.formatTestData(this.raceDetail.nav_data, 8));
            break;
          case 1:
            this.initTrendChart(this.formatTestData(this.raceDetail.nav_data, 31));
            break;
          case 2:
            this.initTrendChart(this.formatTestData(this.raceDetail.nav_data, 187));
            break;
          case 3:
            this.initTrendChart(this.formatTestData(this.raceDetail.nav_data, 365));
            break;
          default:
            break;
        }
      } else {
        switch (index) {
          case 0:
            this.initProfitChart(this.formatProfitChartData(this.weekDataTwo));
            break;
          case 1:
            this.initProfitChart(this.formatProfitChartData(this.monthDataTwo));
            break;
          case 2:
            this.initProfitChart(this.formatProfitChartData(this.halfYearDataTwo));
            break;
          case 3:
            this.initProfitChart(this.formatProfitChartData(this.allYearDataTwo));
            break;
          default:
            break;
        }
      }
    },
    /* ----------------------格式化数据方法---------------------------*/
    /* 格式化时间（年 chart数据） */
    formatChartYearData(date) {
      return pulicMethods.formateDate(date);
    },
    /* 格式化图表数据（净值走势） */
    formatTestData(data, times) {
      const currentData = {
        xData: [],
        yOne: [],
        yTwo: [],
        maxNum: '',
        minNum: '',
      };
      let filterData = [];
      // 根据天数 去重
      currentData.xData = data.map(item => this.formatChartYearData(item.x)); // 格式化时间
      const filterCurrentData = data.map(item => this.formatChartYearData(item.x).substring(0, 11));
      const filterXData = uniq(data.map(item => this.formatChartYearData(item.x).substring(0, 11)));
      if (filterXData.length <= times) { // 取全部
        filterData = data;
      } else {
        const farthestDay = filterXData[filterXData.length + 1 - times];
        const farthestDayIndex = filterCurrentData.indexOf(farthestDay);
        filterData = data.slice(farthestDayIndex, data.length);
      }
      currentData.yOne = filterData.map(item => [item.x, item.y1]);
      currentData.yTwo = filterData.map(item => [item.x, item.y2]);
      const y1max = Math.max.apply(null, filterData.map(item => item.y1));
      const y1min = Math.min.apply(null, filterData.map(item => item.y1));
      currentData.maxNum = y1max;
      currentData.minNum = y1min;
      // const y2max = Math.max.apply(null, currentData.yTwo);
      // const y2min = Math.min.apply(null, currentData.yTwo);
      // currentData.maxNum = y1max > y2max ? y1max : y2max;
      // currentData.minNum = y1min > y2min ? y2min : y1min;
      return currentData;
    },
    /* 格式图表数据(收益率) */
    formatProfitChartData(data) {
      const currentData = {
        xData: [],
        yOne: [],
        yTwo: [],
        maxNum: '',
        minNum: '',
      };
      const filterData = data;
      currentData.xData = data.map(item => this.formatChartYearData(item.x)); // 格式化时间
      currentData.yOne = filterData.map(item => [item.x, item.y1]);
      currentData.yTwo = filterData.map(item => [item.x, item.y2]);
      const y1max = Math.max.apply(null, filterData.map(item => item.y1));
      const y1min = Math.min.apply(null, filterData.map(item => item.y1));
      const y2max = Math.max.apply(null, filterData.map(item => item.y2));
      const y2min = Math.min.apply(null, filterData.map(item => item.y2));
      currentData.maxNum = y1max > y2max ? y1max : y2max;
      currentData.minNum = y1min > y2min ? y2min : y1min;
      return currentData;
    },
    /* 收益率取位方法 */
    formatProfitNumber(value) {
      let returnValue = value;
      if (returnValue - 0 >= 10) {
        returnValue = returnValue.substring(0, 5);
      } else if (returnValue - 0 > 0) {
        returnValue = returnValue.substring(0, 4);
      } else if (returnValue - 0 === 0) {
        returnValue = '0.00';
      } else if (returnValue - (-10) < 0) {
        returnValue = returnValue.substring(0, 6);
      } else if (returnValue - 0 < 0) {
        returnValue = returnValue.substring(0, 5);
      }
      returnValue += '%';
      return returnValue;
    },
    /* 精度处理（收益率） */
    dealWithPrecision(num) {
      // 收益率要求保留后两位
      let currentNum = num;
      if (currentNum > 0) {
        currentNum = currentNum.substring(2);
        if (currentNum.charAt(0) === '0') {
          currentNum = currentNum.substring(1);
          currentNum = currentNum.split('');
          currentNum.splice(1, 0, '.');
          currentNum = currentNum.join('');
        } else {
          currentNum = currentNum.split('');
          currentNum.splice(2, 0, '.');
          currentNum = currentNum.join('');
        }
      } else if (currentNum < 0) {
        currentNum = currentNum.substring(3);
        if (currentNum.charAt(0) === '0') {
          currentNum = currentNum.substring(1);
          currentNum = currentNum.split('');
          currentNum.splice(1, 0, '.');
          currentNum = currentNum.join('');
        } else if (currentNum.charAt(0) === '0' && currentNum.charAt(1) === '0') {
          currentNum = currentNum.substring(2);
          currentNum = currentNum.split('');
          currentNum.splice(1, 0, '.');
          currentNum = currentNum.join('');
        } else {
          currentNum = currentNum.split('');
          currentNum.splice(2, 0, '.');
          currentNum = currentNum.join('');
        }
        currentNum = `-${currentNum}`;
      } else if (currentNum === '0') {
        currentNum = '0.00';
      }
      currentNum += '%';
      return currentNum;
    },
    /* 格式化(当前显示数据 点击图表显示的数据) */
    formatCurrentShowData(paramsData, type) {
      if (type === 'trend') {
        const date = this.formatChartYearData(paramsData[0].axisValue); // 日期
        const current = paramsData[0].value[1]; // 当前净值
        // let basic = '';
        // if (!paramsData[1]) {
        //   basic = ''; // 基准净值
        // } else {
        //   basic = paramsData[1].value; // 基准净值
        // }
        this.dataValues = {
          date,
          value1: current,
          value2: '',
        };
      } else {
        const date = this.formatChartYearData(paramsData[0].axisValue); // 日期
        // 精度处理
        const usdt = this.dealWithPrecision(paramsData[0].value[1]);
        const btc = this.dealWithPrecision(paramsData[1].value[1]);
        this.dataValues = {
          date,
          value1: usdt,
          value2: btc,
        };
      }
    },
    /* 净值走势折线图 */
    initTrendChart(chartData) {
      // const standerLength = chartData.yOne.length;
      // 初始化第一次显示数据(去最后一次数据显示)
      const trendShowData = this.formatProfitChartData(this.raceDetail.nav_data, 365);
      const { xData } = trendShowData;
      const { yOne } = trendShowData;
      const lastIndex = xData.length - 1;
      const date = xData[lastIndex]; // 日期
      const current = yOne[lastIndex][1];
      this.dataValues = {
        date,
        value1: current,
        value2: '',
      };
      // 格式化x轴显示
      const standerLength = uniq(xData.map(item => item.substring(0, 11))).length;
      let max = null;
      let min = null;
      let interval = null;
      let minInterval = null;
      let maxInterval = null;
      if (standerLength === 1) {
        max = null;
        min = null;
        interval = null;
        minInterval = null;
        maxInterval = null;
      } else if (standerLength > 1 && standerLength < 8) {
        max = chartData.yOne[chartData.yOne.length - 1][0];
        min = chartData.yOne[0][0];
        interval = (chartData.yOne[chartData.yOne.length - 1][0] - chartData.yOne[0][0]) / (standerLength - 1);
        minInterval = 3600 * 24 * 1 * 1000;
      } else if (standerLength > 7) {
        max = chartData.yOne[chartData.yOne.length - 1][0];
        min = chartData.yOne[0][0];
        interval = (chartData.yOne[chartData.yOne.length - 1][0] - chartData.yOne[0][0]) / 6;
        minInterval = 3600 * 24 * 1 * 1000;
      }
      /* 格式化y轴显示 */
      /* 格式化y轴显示 */
      let yMin = chartData.minNum * 0.9;
      let yMax = chartData.maxNum * 1.1;
      if (chartData.minNum < 0) {
        yMin = chartData.minNum * 1.1;
      }
      if (chartData.maxNum < 0) {
        yMax = chartData.maxNum * 0.9;
      }
      if (chartData.maxNum === 0) {
        yMax = 0.1;
      }
      if (chartData.minNum === 0) {
        yMin = -0.1;
      }
      const yInterval = (yMax - yMin) / 5;
      this.myChart = EChart.init(this.$refs.myChart);
      this.myChart.clear();
      const optionLineOne = {
        grid: {
          top: '12px',
          left: '30px',
          right: '20px',
          bottom: '45px',
        },
        color: ['#5294D4', '#2A55E7'],
        legend: {
          data: ['净值', 'Bgain指数'],
          itemHeight: 4,
          orient: 'vertical',
          icon: 'roundRect',
          bottom: 'bottom',
          textStyle: {
            color: '#ffffff',
            padding: [4, 0, 3, 0],
            fontSize: 8,
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            this.formatCurrentShowData(params, 'trend');
          },
        },
        xAxis: {
          type: 'time',
          max,
          min,
          interval,
          minInterval,
          maxInterval,
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#ffffff',
            margin: 8,
            fontSize: 8,
            formatter: (value) => {
              this.beforeDate = this.formatChartYearData(value).substring(5, 10);
              return this.formatChartYearData(value).substring(5, 10);
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          min: yMin,
          max: yMax,
          interval: yInterval,
          // min: Math.floor(chartData.minNum * 10) / 10,
          // max: Math.ceil(chartData.maxNum * 10) / 10,
          // interval: (Math.ceil(chartData.maxNum * 10) / 10 - Math.floor(chartData.minNum * 10) / 10) / 5,
          // min: (chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2),
          // max: (chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1),
          // interval: ((chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1) - (chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2)) / 5,
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
            show: true,
            lineStyle: {
              color: '#2C2C2C',
            },
          },
        },
        series: [
          {
            name: '净值',
            data: chartData.yOne,
            type: 'line',
            animationEasing: 'liner',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: '#5294D4',
              width: 0.8,
            },
          },
          // {
          //   name: 'nav',
          //   data: chartData.yTwo,
          //   type: 'line',
          //   animationEasing: 'liner',
          //   smooth: true,
          //   symbol: 'none',
          //   lineStyle: {
          //     color: '#2A55E7',
          //     width: 0.8,
          //   },
          // }
        ],
      };
      this.myChart.setOption(optionLineOne);
    },
    /* 收益率折线图 */
    initProfitChart(chartData) {
      // 初始化第一次显示数据(去最后一次数据显示)
      const profitShowData = chartData;
      const { xData } = profitShowData;
      const { yOne } = profitShowData;
      const { yTwo } = profitShowData;
      const lastIndex = xData.length - 1;
      const date = xData[lastIndex]; // 日期
      const usdt = this.dealWithPrecision(yOne[lastIndex][1]);
      const btc = this.dealWithPrecision(yTwo[lastIndex][1]);
      // 格式化x轴显示
      const standerLength = uniq(xData.map(item => item.substring(0, 11))).length;
      let max = null;
      let min = null;
      let interval = null;
      let minInterval = null;
      let maxInterval = null;
      if (standerLength === 1) {
        max = null;
        min = null;
        interval = null;
        minInterval = null;
        maxInterval = null;
      } else if (standerLength > 1 && standerLength < 8) {
        max = chartData.yOne[chartData.yOne.length - 1][0];
        min = chartData.yOne[0][0];
        interval = (chartData.yOne[chartData.yOne.length - 1][0] - chartData.yOne[0][0]) / (standerLength - 1);
        minInterval = 3600 * 24 * 1 * 1000;
      } else if (standerLength > 7) {
        max = chartData.yOne[chartData.yOne.length - 1][0];
        min = chartData.yOne[0][0];
        interval = (chartData.yOne[chartData.yOne.length - 1][0] - chartData.yOne[0][0]) / 6;
        minInterval = 3600 * 24 * 1 * 1000;
      }
      this.dataValues = {
        date,
        value1: usdt,
        value2: btc,
      };
      /* 格式化y轴显示 */
      let yMin = chartData.minNum * 0.9;
      let yMax = chartData.maxNum * 1.1;
      if (chartData.minNum < 0) {
        yMin = chartData.minNum * 1.1;
      }
      if (chartData.maxNum < 0) {
        yMax = chartData.maxNum * 0.9;
      }
      if (chartData.maxNum === 0) {
        yMax = 0.1;
      }
      if (chartData.minNum === 0) {
        yMin = -0.1;
      }
      const yInterval = (yMax - yMin) / 5;
      this.myChart = EChart.init(this.$refs.myChart);
      this.myChart.clear();
      const optionLineTwo = {
        grid: {
          top: '12px',
          left: '40px',
          right: '20px',
          bottom: '45px',
        },
        color: ['#5294D4', '#2A55E7'],
        legend: {
          itemHeight: 4,
          data: ['投资该产品', '持有BTC'],
          icon: 'roundRect',
          bottom: 'bottom',
          textStyle: {
            color: '#FFFFFF',
            padding: [4, 0, 3, 0],
            fontSize: 8,
          },
          tooltip: {
            show: true,
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            this.formatCurrentShowData(params, 'profit');
          },
        },
        xAxis: {
          type: 'time',
          max,
          min,
          interval,
          minInterval,
          maxInterval,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: '#ffffff',
            margin: 10,
            fontSize: 8,
            formatter: (value) => {
              if (this.formatChartYearData(value).substring(5, 10) === this.beforeDate) {
                return '';
              }
              this.beforeDate = this.formatChartYearData(value).substring(5, 10);
              return this.formatChartYearData(value).substring(5, 10);
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          // min: (chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2),
          // max: (chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1),
          // interval: ((chartData.maxNum + (chartData.maxNum - chartData.minNum) * 1.1) - (chartData.minNum - (chartData.maxNum - chartData.minNum) * 1.2)) / 5,
          min: yMin,
          max: yMax,
          interval: yInterval,
          // min: Math.floor(chartData.minNum * 100) / 100,
          // max: Math.ceil(chartData.maxNum * 100) / 100,
          // interval: (Math.ceil(chartData.maxNum * 100) - Math.floor(chartData.minNum * 100)) / 500,
          nameGap: '70px',
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#ffffff',
            margin: 12,
            fontSize: 8,
            formatter: value => this.formatProfitNumber(value.toString()),
          },
          splitLine: {
            lineStyle: {
              color: '#2C2C2C',
            },
          },
        },
        series: [{
          name: '投资该产品',
          data: chartData.yOne,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#5294D4',
            width: 0.8,
          },
        },
        {
          name: '持有BTC',
          data: chartData.yTwo,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#2A55E7',
            width: 0.8,
          },
        },
        ],
      };
      this.myChart.setOption(optionLineTwo);
    },
  },
  mounted() {
    this.openLoading();
    if (this.$route.query.id) {
      this.getRaceDetail(this.$route.query.id).then(
        () => {
          try {
            /* 初始化净值走势图表 */
            this.initTrendChart(this.formatTestData(this.raceDetail.nav_data, 365));
            this.loading.clear();
          } catch (e) {
            this.loading.clear();
            throw new Error(e);
          }
        },
        () => {
          this.loading.clear();
          Toast('网络错误');
        },
      );
    } else {
      this.loading.clear();
    }
  },
};
</script>

<style lang="scss" scoped>
  .raceDetailPerformanceAnalysis{
    font-family:PingFang SC sans-serif;
    background: url("../../../../assets/images/trading-competition-two/detail/content/bg-three.png");
    background-size: 375px 200%;
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
