<template>
  <div class="history-table">
    <table class="my-table">
      <thead class="table-thead">
        <tr class="tr-line">
          <th class="tip-wrap">
            <span>最终排名</span>
          </th>
          <th class="name-wrap">基金名称</th>
          <th>
            <span>赛季ROI</span>
          </th>
          <th>赛季最大回撤</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr v-for="(tr,key) in tableData" :key="key" class="tr-line" @click="onSkip(tr)" v-show="key!==0">
          <td class="table-rank">
            <span>{{tr.rank}}</span>
          </td>
          <td>{{tr.product_name}}</td>
          <td>{{tr.season_roi+'%'}}</td>
          <td>{{tr.max_drawdown+'%'}}</td>
          <td>详情</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SecondSeasonHistoryTable',
  props: {
    tableData: {
      type: Array,
    },
  },
  methods: {
    onSkip(item) {
      this.$router.push({
        path: '/trading-competition-history-detail',
        query: {
          data: JSON.stringify(item),
        },
      });
    },
  },
};
</script>

<style lang="scss">
.history-table {
  user-select: none;

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

    .table-thead {
      .tip-wrap {
        width: 50px;
      }

      .name-wrap{
        width: 80px;
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
    }
  }
}
</style>
