<template>
  <div class="history-table">
    <Table :data="tableData" class="table-wraps">
      <TableColumn prop="rank" width="70px">
        <template v-slot:header>
          <div class="mask-wrap">
            <span>最终排名</span>
          </div>
        </template>
      </TableColumn>
      <TableColumn>
        <template v-slot:header>
          <div class="mask-wrap">
            <span>参赛组名称</span>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="table-text">{{scope.row.name}}</div>
        </template>
      </TableColumn>
      <TableColumn prop="score">
        <template v-slot:header>
          <div class="mask-wrap">
            <span>综合得分</span>
          </div>
        </template>
      </TableColumn>
      <TableColumn prop="roi" width="60px">
        <template v-slot:header>
          <div class="mask-wrap">
            <span>赛季ROI</span>
          </div>
        </template>
      </TableColumn>
      <TableColumn width="40px">
        <template v-slot:header>
          <div class="mask-wrap">
            <span>操作</span>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="table-buttons-wrap">
            <div class="table-buttons-button" @click="onSkip(scope.row.id)">详情</div>
          </div>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>

<script>
import {
  Table,
  TableColumn,
} from 'element-ui';

export default {
  name: 'HistoryTable',
  components: {
    Table,
    TableColumn,
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  methods: {
    onSkip(item) {
      this.$router.push(`/trading-competition-history-detail/${item}`);
    },
  },
};
</script>

<style lang="scss">
.history-table {
  .tables,
  .table-wraps,
  .table-no-header-wraps,
  .el-table__body {
    width: 100% !important;
    // background: #132a5c !important;
    th,
    td {
      font-size: 9px !important;
    }
  }

  .mark {
    width: 10px;
    height: 10px;
    margin-left: 5px;
  }

  .hidden-columns {
    display: none;
  }

  .el-table .cell,
  .el-table td div {
    overflow: visible;
    color: #ffffff;
  }

  .el-table__row {
    height: 50px !important;
  }

  .el-table__header-wrapper {
    width: 100% !important;
    background: #0f1f43 !important;
    font-size: 9px !important;
  }

  .table-no-header-wraps {
    .el-table__header-wrapper {
      display: none;
    }
  }

  .el-table__empty-block {
    width: 100% !important;
    height: 41px;
    line-height: 41px;
    font-size: 9px;
  }

  .el-table__empty-text {
    color: #909399;
    height: 41px;
    line-height: 41px;
  }

  .table-wraps {
    text-align: center;

    .el-table__row {
      background: #0f1f43;
      height: 41px !important;
    }
    .el-table__body tr.current-row > td {
      background-color: #0a152e !important;
    }
  }

  .el-table__header {
    width: 100% !important;
    font-size: 9px !important;
  }

  .table-buttons-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    .table-buttons-button {
      color: #ffffff;
    }

    &.none {
      opacity: 0;
    }
  }

  .none {
    opacity: 0;
  }

  // .el-table td,
  // .el-table th.is-leaf {
  //   border: 0;
  // }

  .el-table .cell,
  .el-table th div {
    overflow: visible;
    // padding: 0;

    &.is-leaf {
      background: #0f1f43;
    }

    &.mask-wrap {
      width: 100%;
      height: 41px;
      font-size: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Source Han Sans SC;
      background: #0f1f43;
      color: rgba(255, 255, 255, 1);
      // padding: 0;
    }
  }

  .el-table::before {
    background: #0f1f43;
  }

  .el-table__header {
    width: 100%;
    background: #0f1f43;
    .has-gutter {
      tr {
        width: 100%;
        background: #0f1f43;
        border-bottom: 1px solid #ffffff;
        th {
          background: #0f1f43;
          &.is-leaf {
            border-bottom: 1px solid #ffffff;
          }
        }
      }
    }
  }

  .table-text {
    text-align: center;
    color: #ffffff;
    font-size: 9px;
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
      width: 4px;
      height: 7px;
      margin-left: 5px;
    }
  }
}
</style>
