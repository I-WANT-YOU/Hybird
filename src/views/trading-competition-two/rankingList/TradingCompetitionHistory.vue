<template>
  <div class="history-wrap">
     <BgainNavBar title="历史榜单"/>
    <div class="con">
      <div class="title">
        <span @click="changeSeasonRiskList('first')">第一赛季排行榜</span>
        <span @click="changeSeasonRiskList('second')">第二赛季排行榜</span>
      </div>
      <div class="trading-competition-history-table-wrap">
        <div class="trading-competition-history-table-bg">
          <div class="header"></div>
          <div class="body"></div>
          <div class="footer"></div>
        </div>

        <div class="tabs">
          <div v-for="(tabsItem,tabsIndex) in  currentTabList" :key="tabsIndex"  @click="changeTab(tabsItem.value)">
            <span :class="{active: tabActive === tabsItem.value}">{{tabsItem.name}}</span>
            <img
              src="../../../assets/images/trading-competition-two/home/table-tab-active.png"
              alt
              v-show="tabActive === tabsItem.value"
              class="tab-img"
            />
          </div>
          <!--<div @click="changeTab('CTA')">-->
            <!--<span :class="{active: tabActive === 'CTA'}">CTA</span>-->
            <!--<img-->
              <!--src="../../../assets/images/trading-competition-two/home/table-tab-active.png"-->
              <!--alt-->
              <!--v-show="tabActive === 'CTA'"-->
              <!--class="tab-img"-->
            <!--/>-->
          <!--</div>-->
          <!--<div @click="changeTab('Arbitrage')">-->
            <!--<span :class="{active: tabActive === 'Arbitrage'}">套利</span>-->
            <!--<img-->
              <!--src="../../../assets/images/trading-competition-two/home/table-tab-active.png"-->
              <!--alt-->
              <!--v-show="tabActive === 'Arbitrage'"-->
              <!--class="tab-img"-->
            <!--/>-->
          <!--</div>-->
          <!--<div @click="changeTab('HighFrequency')">-->
            <!--<span :class="{active: tabActive === 'HighFrequency'}">高频</span>-->
            <!--<img-->
              <!--src="../../../assets/images/trading-competition-two/home/table-tab-active.png"-->
              <!--alt-->
              <!--v-show="tabActive === 'HighFrequency'"-->
              <!--class="tab-img"-->
            <!--/>-->
          <!--</div>-->
          <!--<div @click="changeTab('MixedStrategies')">-->
            <!--<span :class="{active: tabActive === 'MixedStrategies'}">混合</span>-->
            <!--<img-->
              <!--src="../../../assets/images/trading-competition-two/home/table-tab-active.png"-->
              <!--alt-->
              <!--v-show="tabActive === 'MixedStrategies'"-->
              <!--class="tab-img"-->
            <!--/>-->
          <!--</div>-->
        </div>
        <div class="table-wrap">
          <Table :tableData="list" />
        </div>
      </div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import Footer from '../components/home/TradingFooter.vue';
import Table from '../components/home/HistoryTable.vue';


const { mapActions, mapGetters } = createNamespacedHelpers('race/raceInfo');

export default {
  name: 'TradingCompetitionHistory',
  components: {
    BgainNavBar,
    Table,
    Footer,
  },
  data() {
    return {
      tabActive: 'CTA',
      list: [],
      currentTabList: [], // 当前激活的TabList列表
      tabOne: [
        {
          name: 'CTA',
          value: 'CTA',
        },
        {
          name: '套利',
          value: 'Arbitrage',
        },
        {
          name: '高频',
          value: 'HighFrequency',
        },
        {
          name: '混合',
          value: 'MixedStrategies',
        },
      ], // 第一赛季
      tabTwo: [
        {
          name: 'CTA(BTC)',
          value: 'CTA',
        },
        {
          name: '市场中性(BTC)',
          value: 'MixedStrategies',
        },
        {
          name: '不限策略(USDT)',
          value: 'HighFrequency',
        },
      ], // 第二赛季
    };
  },
  mounted() {
    this.currentTabList = this.tabOne;
    window.scrollTo(0, 0);
    this.openLoading();
    this.getApi();
  },
  computed: {
    ...mapGetters(['historyList']),
  },
  methods: {
    ...mapActions(['getRank']),
    async getApi() {
      try {
        await this.getRank(this.tabActive);
        this.list = this.historyList.map(item => ({
          rank: item.rank,
          name: item.fcat_product_name,
          score: item.score,
          roi: item.roi_season,
          id: item.fcat_product_id,
        }));
        this.loading.clear();
      } catch (error) {
        this.loading.clear();
        throw error;
      }
    },
    changeTab(tab) {
      this.tabActive = tab;
      this.openLoading();
      this.getApi();
    },

    // 改变tabList列表
    changeSeasonRiskList(val) {
      if (val === 'first') {
        this.currentTabList = this.tabOne;
        this.tabActive = 'CTA';
      }
      if (val === 'second') {
        this.currentTabList = this.tabTwo;
        this.tabActive = 'CTA';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.history-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: PingFang SC sans-serif;

  .con {
    flex: 1;
    background: url("../../../assets/images/trading-competition-two/history/wrap-bg.png")
      no-repeat;
    background-size: 375px 100%;
    position: relative;

    .trading-competition-history-table-wrap {
      width: 100%;
      position: relative;
      padding: 0 28px 30px 24px;
      box-sizing: border-box;
      z-index: 0;

      .trading-competition-history-table-bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        z-index: -1;
        .header {
          width: 98%;
          height: 36px;
          margin-left: 7px;
          margin-bottom: -1px;
          background: url("../../../assets/images/trading-competition-two/home/table-header.png")
            no-repeat;
          background-size: 100% 36px;
        }
        .body {
          flex: 1;
          width: 100%;
          background: url("../../../assets/images/trading-competition-two/home/table-body.png")
            no-repeat;
          background-size: 375px 100%;
        }
        .footer {
          width: 98.9%;
          margin-left: 2.04px;
          margin-top: -1px;
          background: url("../../../assets/images/trading-competition-two/home/table-footer.png")
            no-repeat;
          height: 46px;
          background-size: 100% 46px;
        }
      }

      .tabs {
        padding: 34px 0 25px 0;
        font-size: 9px;
        color: #ffffff;
        display: flex;
        justify-content: space-around;

        > div {
          margin: 0 10px;
          display: flex;
          flex-direction: column;
          align-items: center;

          span {
            &.active {
              color: #1c7aff;
            }
          }

          img {
            margin-top: 7px;
            width: 4px;
            height: 4px;
          }
        }
      }

      .table-wrap {
        width: 100%;
      }
    }

    .title {
      margin-top: 10px;
      display: flex;
      justify-content: center;
     >span{
      width: 45%;
       font-size: 14px;
       color: rgba(42, 85, 231, 1);
       line-height: 43px;
       text-align: center;
       border:1px solid #1c7aff;
       background: linear-gradient(
           0deg,
           rgba(45, 164, 240, 1) 0%,
           rgba(255, 255, 255, 1) 100%
       );
       -webkit-background-clip: text;
       -webkit-text-fill-color: transparent;
     }
    }
  }
}
</style>
