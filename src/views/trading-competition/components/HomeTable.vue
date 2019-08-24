<template>
  <Table
    :data="tableData"
    cell-class-name="cell"
    header-cell-class-name="cell"
    :header-cell-style="headerCell"
    :cell-style="headerCell"
    style="width: 100%;"
    class="table"
    @row-click="onClick"
  >
    <TableColumn width="40" prop="date">
      <template slot-scope="scope">
        <div class="data-wrap">
          <span>{{scope.row.date}}</span>
          <span
            :class="['pull',scope.row.pull == 1
          ? 'up' :scope.row.pull == -1
          ? 'down' : '']"
          ></span>
        </div>
      </template>
      <template v-slot:header>
        <div class="data-name">排名</div>
      </template>
    </TableColumn>
    <TableColumn label="参赛组名称">
      <template slot-scope="scope">
        <span>{{scope.row.name}}</span>
        <span></span>
      </template>
    </TableColumn>
    <TableColumn prop="nav">
      <template slot-scope="scope">
        <div class="year-wrap">
          <span class="year-text">{{scope.row.nav}}</span>
          <span
            :class="['year-arrow',scope.row.navPull == -1
          ? 'year-up' :scope.row.navPull == 1
          ? 'year-down' : '']"
          ></span>
        </div>
      </template>
      <template v-slot:header>
        <div class="mask-wrap">
          <span>当前净值</span>
          <span :class="['pull', nav === '1' ? 'up' : '']" @click="sortNav"></span>
        </div>
      </template>
    </TableColumn>
    <TableColumn prop="day">
      <template v-slot:header>
        <div class="mask-wrap">
          <span>日增长率</span>
          <span :class="['pull', day === '1' ? 'up' : '']" @click="sortDay"></span>
        </div>
      </template>
    </TableColumn>
    <TableColumn width="40" label="操作">
      <!-- <template slot-scope="scope"> -->
      <template slot-scope>
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
      option: [],
      day: '0',
      nav: '0',
    };
  },
  mounted() {
    this.option = this.tableData;
  },
  methods: {
    onClick(row) {
      console.log(row);
      // this.$router.push(`/detail/${row.id}`);
    },
    sortDay() {
      this.change('day', this.day);
      this.sort('day', this.day);
    },
    sortNav() {
      this.change('nav', this.nav);
      this.sort('nav', this.nav);
    },
    sort(text, statu) {
      console.log(text);
      if (text === 'day') {
        if (statu === '0') {
          this.option = this.tableData.sort((a, b) => b[text].slice(0, b[text].length - 1)
            - a[text].slice(0, a[text].length - 1));
        } else {
          this.option = this.tableData.sort((a, b) => a[text].slice(0, a[text].length - 1)
            - b[text].slice(0, b[text].length - 1));
        }
      } else if (statu === '0') {
        this.option = this.tableData.sort((a, b) => b[text] - a[text]);
      } else {
        this.option = this.tableData.sort((a, b) => a[text] - b[text]);
      }
    },
    change(text, statu) {
      this.day = '0';
      this.nav = '0';
      if (statu === '0') {
        this[text] = '1';
      }
    },
    xiazai() {
      window.location.href = 'https://fir.im/ngaw';
    },
  },
};
</script>

<style lang="scss">
.table {
  background: rgba(25, 24, 24, 1);
  width: 330px !important;
  font-size: 12px;
  opacity: 0.8;
  text-align: center;
  margin-top: 10px;
  .mask-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .pull {
      width: 10px;
      height: 6px;
      background: url("../../../assets/images/trading-competition/home/sort-pull.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 3px;
      &.up {
        background-size: 100% 100%;
        background: url("../../../assets/images/trading-competition/home/sort-down.png") no-repeat;
      }
    }
  }
  .data-wrap {
    background: rgba(25, 24, 24, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    .pull {
      display: inline-block;
      width: 7.5px;
      height: 8px;
      background-size: 100% 100%;
      &.up {
        background-size: 100% 100%;
        background: url("../../../assets/images/trading-competition/home/namedown.png")
          no-repeat;
      }
      &.down {
        background-size: 100% 100%;
        background: url("../../../assets/images/trading-competition/home/nameup.png")
          no-repeat;
      }
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
    color: rgba(169, 169, 169, 1);
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
.data-name {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
}
.hidden-columns {
  display: none;
}
.detail-info{
  opacity: 0.5;
}
</style>
