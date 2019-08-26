<template>
  <div class="raceDetail">
    <BgainNavBar title="团队详情"/>
    <div class="contentContainer">
      <!--头部-->
      <div class="capital-title-short" v-show="computedStrLen(teamDetailInfo.team_name)<8">
        <span class="short-text">{{teamDetailInfo.team_name}}</span>
      </div>
      <div class="capital-title-middle"
           v-show="computedStrLen(teamDetailInfo.team_name)>=8
            && computedStrLen(teamDetailInfo.team_name)<13">
        <span class="middle-text">{{teamDetailInfo.team_name}}</span>
      </div>
      <div class="capital-title-long"  v-show="computedStrLen(teamDetailInfo.team_name)>=13">
        <span class="long-text">{{teamDetailInfo.team_name}}</span>
      </div>
      <!--最近的数据-->
      <div class="latestInfo">
        <!--最新数据-->
        <div class="latestData">
          <!--最新净值-->
          <div class="netValue">
              <div>
                <span>最新净值（{{formatMonthDate(teamDetailInfo.date)}}）</span>
                <van-image :src="up" class="arrow-icon" v-show="teamDetailInfo.nav>0"/>
                <van-image :src="down" class="arrow-icon" v-show="teamDetailInfo.nav<0"/>
              </div>
              <span>{{teamDetailInfo.nav}}</span>
            </div>
          <!--日增长率-->
          <div class="netValue">
              <div>
                <span>日增长率</span>
                <van-image :src="up" class="arrow-icon"
                           v-show="teamDetailInfo.ror && teamDetailInfo.ror.substring(0,1)!=='-'"/>
                <van-image :src="down" class="arrow-icon"
                           v-show="teamDetailInfo.ror && teamDetailInfo.ror.substring(0,1)==='-'"/>
              </div>
              <span>{{teamDetailInfo.ror}}</span>
            </div>
        </div>
        <!--最近的数据-->
        <div class="recentData">
          <!--近一周-->
          <div class="recentData-item">
            <span>{{teamDetailInfo.change_weekly_percent||'--'}}</span>
            <div>
              <span>近一周</span>
              <el-popover
                placement="top"
                title=''
                width="200"
                trigger="click">
                <span class="tipOne">近1周净值涨跌幅及相应排名</span>
                <van-image slot="reference" :src="tips" class="icon-tips"></van-image>
              </el-popover>
            </div>
            <span>
              （{{teamDetailInfo.change_weekly_rank_all||'--'}}
              /
              {{teamDetailInfo.change_weekly_rank_all?teamDetailInfo.rank_total_number:'--'}}）
            </span>
          </div>
          <!--近一月-->
          <div class="recentData-item">
            <span>{{teamDetailInfo.change_monthly_percent||'--'}}</span>
            <div>
              <span>近一月</span>
              <el-popover
                placement="top"
                title=''
                width="200"
                trigger="click">
                <span class="tipTwo">近1月净值涨跌幅及相应排名</span>
                <van-image slot="reference" :src="tips" class="icon-tips"></van-image>
              </el-popover>
            </div>
            <span>
              （
              {{teamDetailInfo.change_monthly_rank_all || '--'}}
              /
              {{ teamDetailInfo.change_monthly_rank_all?teamDetailInfo.rank_total_number:'--'}}
              ）
            </span>
          </div>
          <!--成立以来-->
          <div class="recentData-item">
            <span>{{teamDetailInfo.change_since_begin_percent||'--'}}</span>
            <div>
              <span>成立以来</span>
              <!--<el-tooltip effect="light" content="成立以来净值涨跌幅及相应排名" placement="bottom-end">-->
                <!--<van-image :src="tips" class="icon-tips"></van-image>-->
              <!--</el-tooltip>-->
              <el-popover
                placement="top"
                title=''
                width="200"
                trigger="click">
                <div style="position: relative">
                  <span class="tipThree">成立以来净值涨跌幅及相应排名</span>
                </div>
                <van-image slot="reference" :src="tips" class="icon-tips"></van-image>
              </el-popover>
            </div>
            <span>
              （
              {{teamDetailInfo.change_since_begin_rank_all || '--'}}
              /
              {{ teamDetailInfo.change_since_begin_rank_all
              ?teamDetailInfo.rank_total_number:'--'}}
              ）
            </span>
          </div>
        </div>
      </div>
      <!--团队数据-->
      <div class=teamInfo>
        <p class="module-title">团队数据</p>
        <div class="teamInfo-content" >
          <div class="teamInfo-item" v-for="(item,index) in teamData" :key="index">
            <span>{{item.name}}</span>
            <span>{{item.value}}</span>
          </div>
        </div>
      </div>
      <!--业绩分析-->
      <div class="analysis">
        <p class="module-title">业绩分析</p>
        <!--tab切换-->
        <div class="tabs" >
          <span @click="changeTab('trend')" :class="{SelectedStyle:tabChangeViews}">
            净值走势
          </span>
          <span @click="changeTab('profit')" :class="{SelectedStyle:!tabChangeViews}">
            收益率
          </span>
        </div>
        <!--时间tab切换-->
        <div class="timeChange">
          <span
            :class="{timeTabSelectedStyle:tabsTimeState === index}"
            @click="changeTimeTab(item.name)"
            v-for=" (item,index) in timeList"
            :key="index">
            {{item.value}}
          </span>
        </div>
        <!--渲染的图表-->
        <div class="chartInfo">
          <div class="showInfo-one" v-show="tabChangeViews">
            <div>
              <span>日期：</span>
              <span>{{netWorthDate}}</span>
            </div>
            <div>
              <span>净值：</span>
              <span>{{netWorthValue}}</span>
            </div>
          </div>
          <div class="showInfo-two"  v-show="!tabChangeViews">
            <div>
              <span>日期：</span>
              <span>{{profitDate}}</span>
            </div>
            <div>
              <div>
                <span>持有BTC收益率：</span>
                <span>{{profitBTC}}</span>
              </div>
              <div>
                <span>该基金收益率(USD)：</span>
                <span>{{profitUSD}}</span>
              </div>
            </div>
          </div>
          <div class="lineChart" id="myChart"></div>
        </div>
      </div>
      <!--团队介绍-->
      <div class="teamIntroduction">
        <p class="module-title">团队介绍</p>
        <div class="teamIntroduction-content">
          <van-image :src="teamDetailInfo.team_icon_url" class="team-icon"/>
          <div class="teamIntroduction-info">
            <p>管理人：{{teamDetailInfo.administrator}}</p>
            <p>
              {{teamDetailInfo.team_introduction}}
            </p>
          </div>
        </div>
      </div>
      <!--咨询购买-->
      <div class="buttons">
        <button @click="showInfoPop">咨询</button>
        <button>购买</button>
      </div>
    </div>
    <!--弹窗-->
    <van-popup v-model="popsShow" :round=true :closeOnClickOverlay = false>
        <div class="popInfo">
          <p class="popTitle">
            联系我们咨询该产品更多详情
          </p>
          <div class="weixin">
            <span>官方微信号：</span>
            <span>finbeekefu</span>
            <van-image :src="copy" class="copy-icon" @click="copyText('weixin')"/>
          </div>
          <div class="email weixin">
            <span>联系邮箱：</span>
            <span>CS@fin-bee.com</span>
            <van-image :src="copy" class="copy-icon" @click="copyText('email')"/>
          </div>
          <div class="buttonContainer">
            <button @click="hidePop">知道了</button>
          </div>
        </div>
    </van-popup>
  </div>
</template>

<script>
/* eslint-disable max-len */

import { mapState, mapActions, mapGetters } from 'vuex';
import {
  Popover,
} from 'element-ui';
import { Image, Toast, Popup } from 'vant';
import pulicMethods from '@utils/publicMethods';
import EChart from 'echarts';
import BgainNavBar from '../../components/BgainNavBar.vue';
import errorMessage from '../../constants/responseStatus';
import up from '../../assets/images/detail/up.png';
import down from '../../assets/images/detail/down.png';
import tips from '../../assets/images/detail/mark.png';
import copy from '../../assets/images/detail/copy.png';

export default {
  name: 'RaceDetail',
  data() {
    return {
      up,
      down,
      tips,
      copy,
      tabChangeViews: true, // tab切换表示 true:净值 false:收益率
      timeList: [
        { name: 'week', value: '近一周' },
        { name: 'month', value: '近一月' },
        { name: 'halfYear', value: '近半年' },
        { name: 'year', value: '全部' },
      ],
      tabsTimeState: 3,
      changeChart: 0, // 0 净值走势 1 收益率
      profitDate: '--',
      profitUSD: '--',
      profitBTC: '--',
      netWorthDate: '--',
      netWorthValue: '--',
      popsShow: false,
      tipOneVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      window.scrollTo(0, 0);
    });
  },
  components: {
    BgainNavBar,
    'van-image': Image,
    'van-popup': Popup,
    'el-popover': Popover,
  },
  computed: {
    ...mapState('race/raceInfo', [
      'teamDetailInfo',
    ]),
    ...mapGetters('race/raceInfo', [
      'allYearData',
      'halfYearData',
      'monthData',
      'weekData',
    ]),
    /* 团队数据 */
    teamData() {
      const teamData = [
        {
          name: '成立日期',
          value: this.formatChartYearData(this.teamDetailInfo.create_date),
        },
        {
          name: '综合得分',
          value: this.teamDetailInfo.score,
        },
        {
          name: '当前规模',
          value: this.teamDetailInfo.size,
        },
        {
          name: '最大回撤比',
          value: this.teamDetailInfo.max_draw_down_rate_percent,
        },
        {
          name: '夏普率',
          value: this.teamDetailInfo.sharpe_ratio,
        },
        {
          name: '年化收益率',
          value: this.teamDetailInfo.return_rate_annual_percent,
        },
        {
          name: '卡玛比',
          value: this.teamDetailInfo.risk_benefit_ratio,
        },
        {
          name: '4周ROI',
          value: this.teamDetailInfo.roi4week_percent,
        },
        {
          name: '赛季ROI',
          value: this.teamDetailInfo.roi_season_percent,
        },
      ];
      return teamData;
    },
  },

  methods: {
    ...mapActions('race/raceInfo', [
      'getTeamDetailInfo',
    ]),
    /* 字符创长度计算 */
    computedStrLen(str) {
      const newStr = str || ' ';
      let len = 0;
      for (let i = 0; i < newStr.length; i += 1) {
        if (newStr.charCodeAt(i) > 127 || newStr.charCodeAt(i) === 94) {
          len += 2;
        } else {
          len += 1;
        }
      }
      return len;
    },
    changeTimeTab(date) {
      if (this.changeChart === 0) { // 净值走势
        switch (date) {
          case 'week':
            this.tabsTimeState = 0;
            this.initTrendChart(this.formatChartData(this.teamDetailInfo.nav_data, 8));
            break;
          case 'month':
            this.tabsTimeState = 1;
            this.initTrendChart(this.formatChartData(this.teamDetailInfo.nav_data, 31));
            break;
          case 'halfYear':
            this.tabsTimeState = 2;
            this.initTrendChart(this.formatChartData(this.teamDetailInfo.nav_data, 187));
            break;
          case 'year':
            this.tabsTimeState = 3;
            this.initTrendChart(this.formatChartData(this.teamDetailInfo.nav_data, 365));
            break;
          default:
            break;
        }
      } else if (this.changeChart === 1) { // 收益率
        switch (date) {
          case 'week':
            this.tabsTimeState = 0;
            this.initProfitChart(
              this.formatChartDataTwo(this.weekData),
            );
            break;
          case 'month':
            this.tabsTimeState = 1;
            this.initProfitChart(
              this.formatChartDataTwo(this.monthData),
            );
            break;
          case 'halfYear':
            this.tabsTimeState = 2;
            this.initProfitChart(
              this.formatChartDataTwo(this.halfYearData),
            );
            break;
          case 'year':
            this.tabsTimeState = 3;
            this.initProfitChart(
              this.formatChartDataTwo(this.allYearData),
            );
            break;
          default:
            break;
        }
      }
    },
    // 格式化时间（月）
    formatMonthDate(date) {
      return pulicMethods.formateMonthDate(date);
    },
    // 格式化时间（月chart）
    formatChartMonthData(date) {
      return pulicMethods.formatChartMonthData(date);
    },
    // 格式化时间（年 chart数据）
    formatChartYearData(date) {
      return pulicMethods.formatChartYearData(date);
    },
    /* 格式化图表数据（一周 一月 半年 全部) */
    formatChartData(data, times) {
      const currentData = {
        xData: [],
        yData: [],
        maxNum: '',
        minNum: '',
      };
      if (times < data.length) {
        /* 第一遍筛选 */
        const allData = data.filter((item, index) => index >= (data.length - times));
        // 格式化时间
        currentData.xData = allData.map((item) => {
          const currentX = this.formatChartYearData(item.x);
          return currentX;
        });
        currentData.yData = allData.map(item => item.y);
        currentData.maxNum = Math.max.apply(null, currentData.yData);
        currentData.minNum = Math.min.apply(null, currentData.yData);
      } else {
        // 格式化时间
        currentData.xData = data.map((item) => {
          const currentX = this.formatChartYearData(item.x).toString();
          return currentX;
        });
        currentData.yData = data.map(item => item.y);
        currentData.maxNum = Math.max.apply(null, currentData.yData);
        currentData.minNum = Math.min.apply(null, currentData.yData);
      }
      return currentData;
    },
    /* 格式化图表数据两条折现（一周 一月 半年 全部) */
    formatChartDataTwo(data) {
      const currentData = {
        xData: [],
        yOne: [],
        yTwo: [],
        maxNum: '',
        minNum: '',
      };
      // if (times < data.length) {
      //   /* 第一遍筛选 */
      //   const allData = data.filter((item, index) => index >= (data.length - times));
      //   // 格式化时间
      //   currentData.xData = allData.map((item) => {
      //     const currentX = this.formatChartMonthData(item.x);
      //     return currentX;
      //   });
      //   currentData.yOne = allData.map(item => item.y1);
      //   currentData.yTwo = allData.map(item => item.y2);
      //   const y1max = Math.max.apply(null, currentData.yOne);
      //   const y1min = Math.min.apply(null, currentData.yOne);
      //   const y2max = Math.max.apply(null, currentData.yTwo);
      //   const y2min = Math.min.apply(null, currentData.yTwo);
      //   currentData.maxNum = y1max > y2max ? y1max : y2max;
      //   currentData.minNum = y1min > y2min ? y2min : y1min;
      // }
      // 格式化时间
      currentData.xData = data.map((item) => {
        const currentX = this.formatChartYearData(item.x).toString();
        return currentX;
      });
      currentData.yOne = data.map(item => item.y1);
      currentData.yTwo = data.map(item => item.y2);
      const y1max = Math.max.apply(null, currentData.yOne);
      const y1min = Math.min.apply(null, currentData.yOne);
      const y2max = Math.max.apply(null, currentData.yTwo);
      const y2min = Math.min.apply(null, currentData.yTwo);
      currentData.maxNum = y1max > y2max ? y1max : y2max;
      currentData.minNum = y1min > y2min ? y2min : y1min;
      return currentData;
    },
    /* 复制 */
    copyText(name) {
      const input = document.createElement('input');
      input.setAttribute('id', 'copyInput');
      if (name === 'weixin') {
        input.setAttribute('value', 'Bgainkefu');
        document.getElementsByTagName('body')[0].appendChild(input);
        document.getElementById('copyInput').select();
        document.execCommand('copy');
        this.$toast('复制成功');
      } else if (name === 'email') {
        input.setAttribute('value', 'CS@fin-bee.com');
        document.getElementsByTagName('body')[0].appendChild(input);
        document.getElementById('copyInput').select();
        document.execCommand('copy');
        this.$toast('复制成功');
      }
      document.getElementById('copyInput').remove();
    },
    /* 展示弹出窗 */
    showInfoPop() {
      this.popsShow = true;
    },
    /* 隐藏弹窗 */
    hidePop() {
      this.popsShow = false;
    },
    /* 初始化净值走势和收益率展示数据 */
    initChartShowData(type, data) {
      if (type === 'netWorth') { // 净值走势
        const formatNetWorthData = this.formatChartData(data, 365);
        const lastIndex = formatNetWorthData.xData.length - 1;
        this.netWorthDate = formatNetWorthData.xData[lastIndex];
        this.netWorthValue = formatNetWorthData.yData[lastIndex];
        if (formatNetWorthData.xData[lastIndex].toString().length === 1) {
          this.netWorthValue = 'formatNetWorthData.xData[lastIndex].toString()}.000';
        } else if (formatNetWorthData.xData[lastIndex].toString().length === 3) {
          this.netWorthValue = 'formatNetWorthData.xData[lastIndex].toString()}00';
        } else if (formatNetWorthData.xData[lastIndex].toString().length === 4) {
          this.netWorthValue = 'formatNetWorthData.xData[lastIndex].toString()}0';
        }
      } else if (type === 'profit') { // 收益率
        const formatProfitData = this.formatChartDataTwo(data);
        const lastIndex = formatProfitData.xData.length - 1;
        console.log(formatProfitData);
        this.profitDate = formatProfitData.xData[lastIndex];
        this.profitBTC = `${Math.floor(formatProfitData.yOne[lastIndex] * 10000) / 100}%`;
        this.profitUSD = `${Math.floor(formatProfitData.yTwo[lastIndex] * 10000) / 100}%`;
      }
    },
    /* 改变折线图（净值走势 收益率） */
    changeTab(type) {
      if (type === 'trend') { // 净值走势
        this.tabChangeViews = true;
        this.changeChart = 0;
        this.tabsTimeState = 3;
        this.initTrendChart(this.formatChartData(this.teamDetailInfo.nav_data, 365));
        this.initChartShowData('netWorth', this.teamDetailInfo.nav_data);
      } else if (type === 'profit') { // 收益率
        this.tabChangeViews = false;
        this.changeChart = 1;
        this.tabsTimeState = 3;
        this.initProfitChart(this.formatChartDataTwo(this.allYearData));
        this.initChartShowData('profit', this.allYearData);
      }
    },
    /* 改变时间Tab（一周 一月 半年 一年） */
    /* 初始化净值走势折线图 */
    initTrendChart(chartData) {
      this.myChart = EChart.init(document.getElementById('myChart'));
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
            console.log(params[0].value);
            if (params[0].value.toString().length === 1) {
              console.log(params[0].value);
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
    /* 初始化收益率折线图 */
    initProfitChart(chartData) {
      this.myChart = EChart.init(document.getElementById('myChart'));
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
    Toast.loading({
      mask: false,
      duration: 0,
      message: '加载中...',
    });
    if (this.$route.params.id) {
      const { id } = this.$route.params;
      // 根据id获取team数据
      this.getTeamDetailInfo(id).then(
        () => {
          Toast.clear();
          try {
            /* 初始化净值走势图表 */
            this.initTrendChart(this.formatChartData(this.teamDetailInfo.nav_data, 365));
            /* 初始化净值走势展示数据 */
            this.initChartShowData('netWorth', this.teamDetailInfo.nav_data);
          } catch (e) {
            throw new Error(e);
          }
        },
        (error) => {
          Toast.clear();
          if (error.status) {
            Toast(errorMessage[error.status]);
          } else {
            Toast('网络错误');
          }
        },
      );
    } else {
      Toast.clear();
    }
  },
  beforeDestroy() {
    Toast.clear();
  },
};
</script>

<style lang="scss" >
  /*tips样式处理*/
  .tipOne{
    display: inline-block;
    width: 160px;
    color: #FFFFFF;
    background: rgba(0,0,0,0.8);
    font-size: 12px;
    margin-left: 70px;
  }
  .tipTwo{
    display: inline-block;
    width: 160px;
    color: #FFFFFF;
    background: rgba(0,0,0,0.8);
    font-size: 12px;
  }
  .tipThree{
    position: absolute;
    left: -150px;
    top: -20px;
    display: block;
    width: 180px;
    color: #FFFFFF;
    background: rgba(0,0,0,0.8);
    font-size: 12px;
    text-align: right;
  }
  /*tab切换样式*/
  .SelectedStyle{
    background: url("../../assets/images/detail/Tab-button.png");
    background-size: 90px 30px;
    color: #33312B!important;
  }
  /*时间Tab切换样式*/
  .timeTabSelectedStyle{
    border-bottom: solid 2px rgba(196,171,98,1)!important;
  }
  .raceDetail{
    .contentContainer{
      overflow: scroll;
      background: url("../../assets/images/detail/background.png");
      background-size: 375px 1258px;
      /*头部*/
      /*title样式特别设置*/
      .capital-title-short{
        width: 160px;
        height: 44px;
        margin: 15px auto 5px;
        background: url("../../assets/images/detail/background-title.png") no-repeat;
        background-size: 160px 44px;
        font-size: 20px;
        text-align: center;
        line-height: 44px;
        color: #000;
      }
      .capital-title-middle{
        width: 240px;
        height: 44px;
        margin: 15px auto 5px;
        background: url("../../assets/images/detail/background-title.png") no-repeat;
        background-size: 240px 44px;
        font-size: 20px;
        text-align: center;
        line-height: 44px;
        color: #000;
      }
      .capital-title-long{
        width: 320px;
        height: 44px;
        margin: 15px auto 5px;
        background: url("../../assets/images/detail/background-title.png") no-repeat;
        background-size: 320px 44px;
        font-size: 20px;
        text-align: center;
        line-height: 44px;
        color: #000;
      }
      /*最近的数据*/
      .latestInfo{
        color:rgba(196,171,98,1);
        /*最新数据*/
        .latestData{
          display: flex;
          >div{
            width: 50%;
          }
         .netValue{
           display: flex;
           flex-direction: column;
           align-items: flex-start;
           justify-content: center;
           padding-left: 55px;
           >div{
             display: flex;
             align-items: center;
             >span{
               font-size:12px;
               font-weight:600;
               line-height:24px;
             }
             .arrow-icon{
               margin-left: 5px;
               width: 11px;
               height: 12px;
             }
           }
           >span{
             font-size:20px;
             font-weight:600;
             line-height:25px
           }
         }
        }
        /*最近数据*/
        .recentData{
          display: flex;
          color:rgba(196,171,98,1);
          padding-bottom: 25px;
          .recentData-item{
            width: 33.33%;
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            >div{
              padding-top: 5px;
              display: flex;
              align-items: center;
              .icon-tips{
                width: 12px;
                height: 12px;
                margin-left: 5px;
              }
              >span{
                font-size:12px;
                font-weight:600;
                line-height:16px;
              }
            }
            >span{
              padding-top: 5px;
              font-size:13px;
              font-weight:600;
              line-height:16px;
            }
          }
        }
      }
      /*团队数据*/
      .teamInfo{
        .module-title{
          padding-left: 15px;
          margin: 0;
          font-size:18px;
          font-weight:600;
          color:rgba(196,171,98,1);
        }
        .teamInfo-content{
          padding: 0 30px;
          color:rgba(248,227,158,1);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .teamInfo-item{
            width: 30%;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            background: #191818;
            >span{
              padding: 5px 0 0 0;
              font-size:11px;
              font-weight:200;
              line-height:20px;
              text-align: center;
            }
            >span:nth-child(2){
              padding:0 0 5px 0;
            }
          }
        }
      }
      /*业绩分析*/
      .analysis{
        padding-top: 25px;
        /*头部*/
        .module-title{
          padding-left: 15px;
          margin: 0;
          font-size:18px;
          font-weight:600;
          color:rgba(196,171,98,1);
        }
        /*tabs切换*/
        .tabs{
          display: flex;
          padding: 16px 40px;
          justify-content: space-around;
          >span{
            width: 90px;
            height: 30px;
            font-size:15px;
            font-weight:600;
            color:rgba(196,171,98,1);
            line-height:30px;
            text-align: center;
          }
        }
        /*时间Tabs切换*/
        .timeChange{
          display: flex;
          justify-content: space-around;
          >span{
            height: 30px;
            padding: 0 5px;
            border-bottom: 2px solid rgba(15,15,15,0);;
            font-size:14px;
            font-weight:600;
            color:rgba(196,171,98,1);
            line-height:27px;
          }
        }
        /*echart图*/
        .chartInfo{
          padding: 2px 16px 10px 16px;
          .showInfo-one{
            padding: 0 8px 5px 8px;
            display: flex;
            justify-content: space-between;
            >div{
              >span{
                font-size:12px;
                color:rgba(248,227,158,1);
                line-height:20px;
              }
            }
          }
          .showInfo-two{
            padding: 0 8px 5px 8px;
            >div{
              >span{
                font-size:12px;
                color:rgba(248,227,158,1);
                line-height:20px;
              }
            }
            >div:nth-child(2){
              display: flex;
              justify-content: space-between;
              >div{
                >span{
                  font-size:12px;
                  color:rgba(248,227,158,1);
                  line-height:20px;
                }
              }
            }
          }
          .lineChart{
            height: 160px;
            width: 100%;
          }
        }
      }
      /*团队介绍*/
      .teamIntroduction{
        padding:0 15px;
        .module-title{
          padding-left: 15px;
          margin: 0;
          font-size:18px;
          font-weight:600;
          color:rgba(196,171,98,1);
        }
        .teamIntroduction-content{
          padding:15px 0 0 15px;
          display: flex;
          color:rgba(196,171,98,1);
          .team-icon{
            width:73px;
            height: 73px;
            margin-right: 10px;
            flex-shrink: 0;
          }
          .teamIntroduction-info{
            >p{
              margin: 0;
            }
            >p:nth-child(1){
              font-size:15px;
              font-weight:600;
              line-height:20px
            }
            >p:nth-child(2){
              font-size:11px;
              font-weight:600;
              line-height:17px;
            }
          }
        }
      }
      /*咨询购买*/
      .buttons{
        padding: 15px 0 50px 0;
        display: flex;
        justify-content: space-around;
        >button{
          width: 172px;
          height: 43px;
          border: none;
          color: #FFFFFF;
          border-radius: 4px;
          font-size:20px;
        }
        >button:nth-child(1){
          background:#D6C983;
        }
        >button:nth-child(2){
          background:#9B9B9B;
        }
      }
    }
    .popInfo{
      width: 275px;
      .popTitle{
        padding: 8px;
        font-size:18px;
        font-weight:normal;
        color:rgba(28,52,107,1);
        line-height:18px;
        text-align:center;
      }
      .weixin{
        padding: 8px 0 8px 20px;
        display: flex;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:15px;
        opacity:0.74;
        .copy-icon{
          width: 14px;
          height:14px;
          margin-left: 5px;
        }
      }
      .buttonContainer{
        padding: 30px;
        display: flex;
        justify-content: center;
        >button{
          width: 156px;
          height: 32px;
          background: #C4AB62;
          color:#FFFFFF;
          border: none;
          border-radius: 20px;
          font-size:19px;
          font-weight:normal;
          color:rgba(255,255,255,1);
        }
      }
    }
  }
</style>
