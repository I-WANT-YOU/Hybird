<template>
  <div class="history-wrap">
     <BgainNavBar title="历史榜单"/>
    <div class="con">
      <div class="title">
        <span @click="changeSeasonRiskList('second')" :class="{activeSeasonClass:activeSeason==='secondSeason'}">第二赛季排行榜</span>
        <span @click="changeSeasonRiskList('first')" :class="{activeSeasonClass:activeSeason==='firstSeason'}">第一赛季排行榜</span>
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
        </div>
        <div class="table-wrap">
          <Table v-if="activeSeason!=='secondSeason'" :tableData="list" />
          <SecondSeasonHistoryTable v-else  :tableData="list"/>
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
import SecondSeasonHistoryTable from './components/SecondSeasonHistoryTable.vue';


const { mapActions, mapGetters } = createNamespacedHelpers('race/raceInfo');

export default {
  name: 'TradingCompetitionHistory',
  components: {
    BgainNavBar,
    Table,
    Footer,
    SecondSeasonHistoryTable,
  },
  data() {
    return {
      activeSeason: 'secondSeason', // 赛季tab
      tabActive: 'cta',
      list: [],
      currentTabList: [], // 当前激活的TabList列表
      tabOne: [ // 第一赛季
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
      ],
      tabTwo: [ // 第二赛季
        {
          name: 'CTA(BTC)',
          value: 'cta',
        },
        {
          name: '市场中性(BTC)',
          value: 'marketNeutral',
        },
        {
          name: '不限策略(USD)',
          value: 'mixed',
        },
      ],
    };
  },
  async mounted() {
    this.currentTabList = this.tabTwo;
    window.scrollTo(0, 0);
    await this.getSecondSeasonInfo();
    this.list = this.ctaRankingList;
  },
  computed: {
    ...mapGetters(['historyList', 'ctaRankingList', 'marketNeutralRankingList', 'mixedRankingList']),
  },
  methods: {
    ...mapActions(['getRank', 'getRaceRankingList']),

    /* 接口方法 */

    // 获取第二赛季信息
    async getSecondSeasonInfo() {
      try {
        this.openLoading();
        await this.getRaceRankingList();
        this.loading.clear();
      } catch (errorMessage) {
        console.log(errorMessage);
      }
    },

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
      if (this.activeSeason === 'firstSeason') {
        this.tabActive = tab;
        this.openLoading();
        this.getApi();
      }
      if (this.activeSeason === 'secondSeason') {
        this.tabActive = tab;
        if (this.tabActive === 'cta') {
          this.list = this.ctaRankingList;
        }
        if (this.tabActive === 'marketNeutral') {
          this.list = this.marketNeutralRankingList;
        }
        if (this.tabActive === 'mixed') {
          this.list = this.mixedRankingList;
        }
      }
    },

    // 改变tabList列表
    changeSeasonRiskList(val) {
      if (val === 'first') {
        this.activeSeason = 'firstSeason';
        this.currentTabList = this.tabOne;
        this.tabActive = 'CTA';
        this.openLoading();
        this.getApi();
      }
      if (val === 'second') {
        this.activeSeason = 'secondSeason';
        this.currentTabList = this.tabTwo;
        this.tabActive = 'cta';
        this.list = this.ctaRankingList;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.path !== '/trading-competition-history-detail') {
      from.meta.keepAlive = false;
      console.log(from.meta.keepAlive);
      next();
    } else {
      from.meta.keepAlive = true; // B 跳转到 A 时，让 A 缓存，即不刷新
      next();
    }
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
      .activeSeasonClass{
        color: rgba(42, 85, 231, 1);
      }
     >span{
       width: 45%;
       font-size: 14px;
       line-height: 43px;
       text-align: center;
       border:1px solid #1c7aff;
       color: #708090;
     }
    }
  }
}
</style>
