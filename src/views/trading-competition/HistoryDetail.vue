<template>
  <div class="wrap">
    <!--<BgainNavBar title="团队详情" />-->
    <div class="con">
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
// import BgainNavBar from '@component/BgainNavBar.vue';

const { mapActions, mapState } = createNamespacedHelpers('race/raceInfo');
export default {
  name: 'HistoryDetail',
  components: {
    // BgainNavBar,
  },
  methods: {
    ...mapActions(['getTeamDetailInfo']),
  },
  computed: {
    ...mapState(['teamDetailInfo']),
  },
  async mounted() {
    try {
      await this.getTeamDetailInfo(this.$route.params.id);
    } catch (error) {
      throw error;
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
    background: url("../../assets/images/trading-competition/home/bg.png");
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
        background: url("../../assets/images/trading-competition/home/two.png");
        background-size: 100% 100%;
        .icon {
          width: 21.5px;
          height: 27.5px;
          background: url("../../assets/images/trading-competition/home/award.jpg");
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
      background: #0f0f0f;
      border-radius: 10px;
      color: rgba(255, 234, 154, 1);
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
      color: rgba(248, 227, 158, 1);
      box-sizing: border-box;
      padding: 0 30px;
      .title {
        opacity: 0.5;
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
          background: rgba(25, 24, 24, 1);
          border-radius: 10px;
          font-size: 11px;
          margin-top: 10px;
          opacity: 0.5;
          > div {
            margin: 2px 0;
          }
        }
      }
    }
  }
}
</style>
