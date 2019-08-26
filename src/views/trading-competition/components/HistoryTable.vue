<template>
  <Table
    :data="tableData"
    @row-click="onSkip"
    cell-class-name="cell"
    header-cell-class-name="cell"
    :header-cell-style="headerCell"
    :cell-style="headerCell"
    class="table"
  >
    <TableColumn width="60" prop="rank">
      <template slot-scope="scope">
        <div class="data-wrap">
          <span class="text">{{scope.row.rank}}</span>
          <img
            v-show="scope.row.pull == 1"
            src="../../../assets/images/trading-competition/home/nameup.png"
            class="pull"
            alt
          />
          <img
            v-show="scope.row.pull == -1"
            src="../../../assets/images/trading-competition/home/namedown.png"
            class="pull"
            alt
          />
        </div>
      </template>
      <template v-slot:header>
        <div class="header-rank">最终排名</div>
      </template>
    </TableColumn>
    <TableColumn label="参赛组名称">
      <template slot-scope="scope">
        <span class="name-wrap">{{scope.row.name}}</span>
      </template>
    </TableColumn>
    <TableColumn prop="score">
      <template slot-scope="scope">
        <div class="year-wrap">
          <span class="year-text">{{scope.row.score}}</span>
          <span
            :class="['year-arrow',scope.row.navPull == -1
          ? 'year-up' :scope.row.navPull == 1
          ? 'year-down' : '']"
          ></span>
        </div>
      </template>
      <template v-slot:header>
        <div class="mask-wrap">
          <span>综合得分</span>
        </div>
      </template>
    </TableColumn>
    <TableColumn prop="roi">
      <template v-slot:header>
        <div class="mask-wrap">
          <span>赛季ROI</span>
        </div>
      </template>
    </TableColumn>
    <TableColumn width="40" label="操作">
      <template>
        <span class="detail-info">详情</span>
      </template>
    </TableColumn>
  </Table>
</template>

<script>
import {
  Table, TableColumn,
} from 'element-ui';

export default {
  name: 'HomeTable',
  components: {
    Table,
    TableColumn,
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  data() {
    return {
      headerCell: {
        background: 'rgba(25, 24, 24, 1)',
        color: '#FBE6A2',
        'font-weight': 400,
        'border-color': 'rgba(206,175,95,1)',
      },
    };
  },
  methods: {
    onSkip(item) {
      this.$router.push(`/history-detail/${item.id}`);
    },
  },
};
</script>

<style lang="scss">
.table {
  background: rgba(25, 24, 24, 1);
  width: 100%!important;
  font-size: 12px;
  opacity: 0.8;
  text-align: center;
  margin: 0 0 0 0!important;
  .el-table__body-wrapper{
    margin-top: 10px!important;
  }
  .mask-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .pull {
      width: 10px;
      height: 6px;
      background: url("../../../assets/images/trading-competition/home/sort-pull.png")
        no-repeat;
      background-size: 100% 100%;
      margin-left: 3px;
      &.up {
        background-size: 100% 100%;
        background: url("../../../assets/images/trading-competition/home/sort-down.png")
          no-repeat;
      }
    }
  }
  .data-wrap {
    background: rgba(25, 24, 24, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      width: 14px;
      margin-right: 2px;
      display: inline-block;
    }
    .pull {
      display: inline-block;
      width: 7.5px;
      height: 8px;
    }
  }
  .ascending {
    .sort-caret.ascending {
      border-bottom-color: #a9a9a9;
    }
  }
  .descending {
    .sort-caret.descending {
      border-top-color: #a9a9a9;
    }
  }
}

thead {
  .cell {
    font-size: 12px;
  }
}
.el-table__body-wrapper {
  margin-top: 20px;
}

tbody {
  .cell {
    border-top: 0.25px solid;
    text-align: center;
  }
}

.el-table::before {
  background-color: rgba(25, 24, 24, 1);
}

.has-gutter {
  .cell {
    text-align: center;
    padding: 0;
  }
}

.el-table__row {
  height: 44.5px;
  td {
    height: 44.5px;
    .cell {
      background: rgba(25, 24, 24, 1);
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
.hidden-columns {
  display: none;
}
</style>
