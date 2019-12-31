<template>
  <div class="wrap">
    <BgainNavBar title="团队详情" />
    <div v-if="activeTable==='first'" class="con">
      <!--团队简介-->
      <div class="name">
        <div class="name-wrap">
          <i class="icon none">{{teamDetailInfo.rank_all}}</i>
          <span>{{teamDetailInfo.team_name}}</span>
          <i class="icon none"></i>
        </div>
      </div>
      <div class="info">
        <div class="title">管理人 : {{teamDetailInfo.administrator}}</div>
        <div class="more-info">{{teamDetailInfo.team_introduction}}</div>
      </div>
      <!--最终成绩-->
      <div class="results">
        <div class="title">最终成绩</div>
        <div class="result-card-wrap">
          <div class="result-card">
            <div>综合得分</div>
            <div>{{teamDetailInfo.score}}</div>
          </div>
          <div class="result-card">
            <div>赛终净值</div>
            <div>{{teamDetailInfo.nav}}</div>
          </div>
          <div class="result-card">
            <div>赛终规模</div>
            <div>{{teamDetailInfo.size}}</div>
          </div>
          <div class="result-card">
            <div>净盈亏</div>
            <div>{{teamDetailInfo.net_profit_season}}</div>
          </div>
          <div class="result-card">
            <div>年化收益率</div>
            <div>{{teamDetailInfo.return_rate_annual_percent}}</div>
          </div>
          <div class="result-card">
            <div>赛季ROI</div>
            <div>{{teamDetailInfo.roi_season_percent}}</div>
          </div>
          <div class="result-card">
            <div>最大回撤比</div>
            <div>{{teamDetailInfo.max_draw_down_rate_percent}}</div>
          </div>
          <div class="result-card">
            <div>卡玛比</div>
            <div>{{teamDetailInfo.risk_benefit_ratio}}</div>
          </div>
          <div class="result-card">
            <div>夏普率</div>
            <div>{{teamDetailInfo.sharpe_ratio}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="con">
      <!--团队简介-->
      <div class="name">
        <div class="name-wrap">
          <i class="icon none">{{showData.rank}}</i>
          <span>{{showData.product_name}}</span>
          <i class="icon none"></i>
        </div>
      </div>
      <div class="info">
        <div class="title">管理人 : {{showData.team_name}}</div>
        <div class="more-info">{{showData.team_profile}}</div>
      </div>
      <!--最终成绩-->
      <div class="results">
        <div class="title">最终成绩</div>
        <div class="result-card-wrap">
          <div class="result-card">
            <div>赛季ROI</div>
            <div>{{showData.season_roi +'%'}}</div>
          </div>
          <div class="result-card">
            <div>赛终净值</div>
            <div>{{showData.nav}}</div>
          </div>
          <div class="result-card">
            <div>赛季最大回撤</div>
            <div>{{showData.max_drawdown+'%'}}</div>
          </div>
          <div class="result-card">
            <div>赛季最大杠杆</div>
            <div>{{showData.max_margin}}</div>
          </div>
          <div class="result-card">
            <div>赛终规模</div>
            <div>{{showData.asset}}</div>
          </div>
          <div class="result-card">
            <div>净盈亏</div>
            <div>{{showData.pnl}}</div>
          </div>
          <div class="result-card">
            <div>年化收益率</div>
            <div>{{showData.annulized_roi+'%'}}</div>
          </div>
          <div class="result-card">
            <div>卡玛比</div>
            <div>{{showData.calmar_ratio}}</div>
          </div>
          <div class="result-card">
            <div>夏普率</div>
            <div>{{showData.sharpe_ratio}}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import Footer from './components/home/TradingFooter.vue';


const { mapActions, mapState } = createNamespacedHelpers('race/raceInfo');
export default {
  name: 'HistoryDetail',
  components: {
    Footer,
    BgainNavBar,
  },
  data() {
    return {
      activeTable: '',
      showData: {},
    };
  },
  methods: {
    ...mapActions(['getTeamDetailInfo']),
  },
  computed: {
    ...mapState(['teamDetailInfo']),
  },
  async mounted() {
    if (this.$route.query.data) {
      this.activeTable = 'second';
      this.showData = JSON.parse(this.$route.query.data);
    }
    if (this.$route.query.id) {
      this.activeTable = 'first';
      this.openLoading();
      try {
        await this.getTeamDetailInfo(this.$route.query.id);
        this.loading.clear();
      } catch (error) {
        this.loading.clear();
        throw error;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .con {
    flex: 1;
    background: url("../../assets/images/trading-competition-two/history/wrap-bg.png");
    background-size: 100% 100%;
    .name {
      justify-content: center;
      font-size: 18px;
      display: flex;
      margin-top: 20px;
      margin-left: 10px;
      font-weight: 600;
      .name-wrap {
        padding: 7px 10px 10px;
        display: flex;
        background-size: 100% 100%;

        > span {
          background: linear-gradient(
            0deg,
            rgba(45, 164, 240, 1) 0%,
            rgba(255, 255, 255, 1) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .icon {
          width: 21.5px;
          height: 27.5px;
          background-size: 100% 100%;
          margin: -7px 5px 0;
          text-align: center;
          color: #fff;
          font-size: 9px;
          box-sizing: border-box;
          padding-top: 12px;
          padding-right: 1px;
          &.none {
            opacity: 0;
          }
        }
      }
    }
    .info {
      width: 354px;
      margin: 10px auto;
      background: #132a5c;
      border-radius: 10px;
      color: #ffffff;
      font-size: 15px;
      box-sizing: border-box;
      padding: 10px;
      .more-info {
        margin-top: 5px;
        font-size: 14px;
        line-height: 23px;
      }
    }
    .results {
      margin-top: 15px;
      color: #ffffff;
      box-sizing: border-box;
      padding: 0 30px;
      .title {
        opacity: 0.8;
        font-size: 20px;
      }
      .result-card-wrap {
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .result-card {
          width: 90px;
          height: 47.5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #132a5c;
          border-radius: 10px;
          font-size: 11px;
          margin-top: 10px;
          opacity: 0.8;
          > div {
            margin: 2px 0;
          }
        }
      }
    }
  }
}
</style>
