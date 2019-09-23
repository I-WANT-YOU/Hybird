<template>
  <div class="tables">
    <table class="my-table">
      <thead>
        <tr class="tr-line">
          <th class="tip-wrap">
            <span>排名</span>
            <span :class="['i', rank === '1' ? 'active' : '']" @click="sort('rank')"></span>
            <span class="b" @click="onToast('排名根据赛季ROI')"></span>
          </th>
          <th class="name-wrap">基金名称</th>
          <th>
            <span>净值</span>
            <span :class="['i', nav === '1' ? 'active' : '']" @click="sort('nav')"></span>
          </th>
          <th class="tip-wrap">
            <span>成立以来</span>
            <span :class="['i', ror === '1' ? 'active' : '']" @click="sort('ror')"></span>
            <span class="b" @click="onToast('成立以来净值涨跌幅')"></span>
          </th>
          <th>赛季ROI</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr v-for="(tr,key) in tableArr" :key="key" class="tr-line">
          <td class="table-rank">
            <span>{{tr.rank}}</span>
            <img
              v-if="tr.change * 1 === 1"
              src="../../../assets/images/trading-competition-two/home/rank-up.png"
              alt
              class="table-rank-img"
            />
            <img
              v-else-if="tr.change * 1 === -1"
              src="../../../assets/images/trading-competition-two/home/rank-down.png"
              alt
              class="table-rank-img"
            />
            <div v-else class="table-rank-img" />
          </td>
          <td>{{tr.product_name}}</td>
          <td>{{tr.nav}}</td>
          <td>{{tr.ror}}%</td>
          <td>{{tr.roi_season ? tr.roi_season + '%' : '--'}}</td>
        </tr>
        <tr v-for="(tr,key) in failedArr" :key="key" class="failed-team">
          <td class="table-rank">
            <span>--</span>
            <img
              v-if="tr.change * 1 === 1"
              src="../../../assets/images/trading-competition-two/home/rank-up.png"
              alt
              class="table-rank-img"
            />
            <img
              v-else-if="tr.change * 1 === -1"
              src="../../../assets/images/trading-competition-two/home/rank-down.png"
              alt
              class="table-rank-img"
            />
            <div v-else class="table-rank-img" />
          </td>
          <td>{{tr.product_name}}</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr v-for="tr in benchmark" :key="tr.product_name" class="benchmark">
          <td colspan="2">
            <span>基准参考值</span>
            <span class="b b1" @click="onToast('基准参考值为Bgain联合市场中多个优秀量化投资管理人共同打造的数字资产量化投资系列指数。')"></span>
          </td>
          <td>{{tr.nav}}</td>
          <td></td>
          <td>{{tr.roi_season}}{{tr.roi_season ? '%' : ''}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'TradingCompetitionTwoHomeTable',
  data() {
    return {
      tableArr: [],
      failedArr: [],
      benchmark: {},
      rank: '1',
      nav: '0',
      ror: '0',
    };
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  watch: {
    tableData(newData) {
      this.getData(newData);
    },
  },
  computed: {
    active() {
      if (this.rank === '1') {
        return 'rank';
      }
      if (this.ror === '1') {
        return 'ror';
      }
      if (this.roi_season === '1') {
        return 'roi_season';
      }
      return 'rank';
    },
  },
  methods: {
    getData(data) {
      this.benchmark = data.filter(item => item.compare_to_benchmark * 1 === 0);
      this.tableArr = data.filter(item => item.compare_to_benchmark * 1 !== 0)
        .filter(item => item.success)
        .sort((a, b) => a[this.active] * 1 - b[this.active] * 1);
      this.failedArr = data.filter(item => !item.success);
    },
    onToast(text) {
      Toast(text);
    },
    sort(text) {
      this.change(text, this[text]);
      this.sortArray(text, this[text]);
    },
    sortArray(text, statu) {
      if (statu === '0') {
        this.tableArr = this.tableArr.sort((a, b) => b[text] * 1 - a[text] * 1);
      } else {
        this.tableArr = this.tableArr.sort((a, b) => a[text] * 1 - b[text] * 1);
      }
    },
    change(text, statu) {
      this.rank = '0';
      this.nav = '0';
      this.ror = '0';
      if (statu === '0') {
        this[text] = '1';
      }
    },
    // onSkip(productId) {
    // this.$router.push({
    //   name: 'CompetitionDetail',
    //   query: {
    //     productId,
    //   },
    // });
    // },
  },
};
</script>

<style lang="scss" scoped>
.tables {
  .my-table {
    width: 100%;
    color: #ffffff;
    font-size: 9px;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid #0c3268;

      th,
      td {
        height: 41px;
      }
    }

    .table-tbody {
      text-align: center;

      .product-name {
        max-width: 70px;
      }

      .table-rank {
        display: flex;
        justify-content: center;
        align-items: center;

        .table-rank-img {
          width: 4px;
          height: 7px;
          margin-left: 5px;
        }
      }

      .failed-team {
        color: #999999;
      }

      .benchmark {
        color: #1c7bff;
        border-bottom: 0;
      }
    }
  }

  .i {
    display: inline-block;
    position: relative;
    top: -2px;
    width: 5px;
    min-width: 5px;
    height: 3px;
    background: url("../../../assets/images/trading-competition-two/home/down.png");
    background-size: 5px 3px;
    margin-left: 5px;
    &.active {
      background: url("../../../assets/images/trading-competition-two/home/up.png");
      background-size: 5px 3px;
    }
  }

  .b {
    display: inline-block;
    position: relative;
    margin-left: 4px;
    width: 7px;
    height: 9px;
    border-radius: 50%;
    background: url("../../../assets/images/trading-competition-two/home/an.png")
      no-repeat;
    background-size: 7px 7px;
  }

  .b1 {
    background: url("../../../assets/images/trading-competition-two/home/an2.png")
      no-repeat;
    width: 7px;
    height: 9px;
    background-size: 7px 7px;
  }
}
</style>
