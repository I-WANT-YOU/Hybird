<template>
  <div class="wrap">
    <BgainNavBar title="历史榜单" />
    <div class="con">
      <div class="title-wrap">
        <div class="title">第一赛季冠军排行榜</div>
      </div>
      <div class="buttons">
        <div
          :class="['button', active === 'CTA'
            ? 'active': '']"
          @click="change('CTA')"
        >CTA</div>
        <div
          :class="['button', active === 'Arbitrage' ? 'active': '']"
          @click="change('Arbitrage')"
        >套利</div>
        <div
          :class="['button', active === 'HighFrequency' ? 'active': '']"
          @click="change('HighFrequency')"
        >高频</div>
        <div
          :class="['button', active === 'MixedStrategies' ? 'active': '']"
          @click="change('MixedStrategies')"
        >混合</div>
      </div>
      <HistoryTable class="table" :tableData="list" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BgainNavBar from '@component/BgainNavBar.vue';
import HistoryTable from './components/HistoryTable.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('race/raceInfo');
export default {
  name: 'RankHistory',
  components: {
    BgainNavBar,
    HistoryTable,
  },
  data() {
    return {
      active: 'CTA',
      list: [],
    };
  },
  computed: {
    ...mapGetters(['historyList']),
  },
  mounted() {
    this.getApi();
  },
  methods: {
    ...mapActions(['getRank']),
    async getApi() {
      await this.getRank(this.active);
      this.list = this.historyList.map(item => ({
        rank: item.rank,
        name: item.fcat_product_name,
        score: item.score,
        roi: item.roi_season,
        id: item.fcat_product_id,
      }));
    },
    change(text) {
      this.active = text;
      this.getApi();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/trading-competition/home/detail-bg.png");
  background-size: 100% 100%;
  .con {
    background: #191818;
    width: 354px;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 5px;
    .title-wrap {
      display: flex;
      align-items: center;
      .title {
        position: relative;
        top: -2px;
        display: inline-block;
        padding: 5px 20px;
        margin: 0 auto;
        font-size: 15px;
        text-align: center;
        background: url("../../assets/images/trading-competition/home/two.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .buttons {
      display: flex;
      margin-bottom: 12px;
      box-sizing: border-box;
      justify-content: space-around;
      margin-top: 10px;
      .button {
        width: 49.5px;
        height: 29px;
        border: 1px solid rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 5px 0px rgba(13, 3, 7, 0.75);
        opacity: 0.5;
        border-radius: 5.5px;
        line-height: 29px;
        text-align: center;
        margin: 0 9px;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(248, 226, 158, 1);
        &.active {
          color: rgba(25, 24, 24, 1);
          opacity: 1;
          border: 0;
          box-shadow: 0px 5px 5px 0px rgba(13, 3, 7, 0.75);
          background: linear-gradient(
            90deg,
            rgba(254, 233, 166, 1),
            rgba(204, 173, 93, 1)
          );
        }
      }
    }
    .table {
      margin: 20px auto 10px;
      width: 100%;
    }
  }
}
</style>
