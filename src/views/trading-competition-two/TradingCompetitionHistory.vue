<template>
  <div class="history-wrap">
    <div class="con">
      <div class="title">历史榜单</div>
      <div class="trading-competition-history-table-wrap">
        <div class="trading-competition-history-table-bg">
          <div class="header"></div>
          <div class="body"></div>
          <div class="footer"></div>
        </div>
        <div class="tabs">
          <div @click="changeTab('CTA')">
            <span :class="{active: tabActive === 'CTA'}">CTA</span>
            <img
              src="../../assets/images/trading-competition-two/home/table-tab-active.png"
              alt
              v-show="tabActive === 'CTA'"
              class="tab-img"
            />
          </div>
          <div @click="changeTab('Arbitrage')">
            <span :class="{active: tabActive === 'Arbitrage'}">套利</span>
            <img
              src="../../assets/images/trading-competition-two/home/table-tab-active.png"
              alt
              v-show="tabActive === 'Arbitrage'"
              class="tab-img"
            />
          </div>
          <div @click="changeTab('HighFrequency')">
            <span :class="{active: tabActive === 'HighFrequency'}">高频</span>
            <img
              src="../../assets/images/trading-competition-two/home/table-tab-active.png"
              alt
              v-show="tabActive === 'HighFrequency'"
              class="tab-img"
            />
          </div>
          <div @click="changeTab('MixedStrategies')">
            <span :class="{active: tabActive === 'MixedStrategies'}">混合</span>
            <img
              src="../../assets/images/trading-competition-two/home/table-tab-active.png"
              alt
              v-show="tabActive === 'MixedStrategies'"
              class="tab-img"
            />
          </div>
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
import Footer from './components/TradingFooter.vue';
import Table from './components/HistoryTable.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('race/raceInfo');

export default {
  name: 'TradingCompetitionHistory',
  components: {
    Table,
    Footer,
  },
  data() {
    return {
      tabActive: 'CTA',
      list: [],
    };
  },
  mounted() {
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
  },
};
</script>

<style lang="scss" scoped>
.history-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .con {
    flex: 1;
    background: url("../../assets/images/trading-competition-two/history/wrap-bg.png")
      no-repeat;
    background-size: 375px 100%;
    padding-bottom: 74px;
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
          background: url("../../assets/images/trading-competition-two/home/table-header.png")
            no-repeat;
          background-size: 100% 36px;
        }
        .body {
          flex: 1;
          width: 100%;
          background: url("../../assets/images/trading-competition-two/home/table-body.png")
            no-repeat;
          background-size: 375px 100%;
        }
        .footer {
          width: 98.9%;
          margin-left: 2.04px;
          margin-top: -1px;
          background: url("../../assets/images/trading-competition-two/home/table-footer.png")
            no-repeat;
          height: 46px;
          background-size: 100% 46px;
        }
      }

      .tabs {
        padding: 34px 0 15px 0;
        font-size: 9px;
        font-family: PingFang SC;
        color: #ffffff;
        display: flex;
        justify-content: center;

        > div {
          margin: 0 18px;
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
      text-align: center;
      font-size: 14px;
      font-family: PingFang SC;
      color: rgba(42, 85, 231, 1);
      line-height: 39px;

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
</style>
