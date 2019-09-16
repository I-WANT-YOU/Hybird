<template>
  <div class="home">
    <div class="league-match-wrap">
      <img
        class="league-match"
        src="../../assets/images/trading-competition/home/league-match.png"
        alt
      />
      <img class="trophy" src="../../assets/images/trading-competition/home/trophy.png" alt />
    </div>
    <div class="first-season">
      <div class="img-wrap">
        <img src="../../assets/images/trading-competition/home/icon.png" class="icon" alt />
      </div>
      <div class="first-season-title">
        <img src="../../assets/images/trading-competition/home/left.png" class="border" alt />
        <img src="../../assets/images/trading-competition/home/first.png" class="text" alt />
        <img src="../../assets/images/trading-competition/home/right.png" class="border" alt />
      </div>
      <div class="first-season-time">2019.05.31 ~ 2019.08.23</div>
      <div class="datas">
        <div class="datas-card-wrap">
          <div v-for="(item,key) in topList" @click="onSkip(item)" :key="key" class="datas-card">
            <img
              src="../../assets/images/trading-competition/home/an-crown.png"
              class="an-crown"
              alt
            />
            <div class="title">
              <div class="one">
                <span>{{item.product_name}}</span>
              </div>
              <div class="text">{{fundType(item.fund_product_type)}}</div>
            </div>
            <div class="score">
              <div>综合得分</div>
              <div class="text">{{item.score || '200.00'}}</div>
            </div>
            <div class="echarts">
              <div>
                <span class="text">最大回撤比</span>
                <span class="num">{{item.max_draw_down_rate}}</span>
              </div>
              <div>
                <span class="text">ROI</span>
                <span class="num">{{item.roi}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="showAll">
      <span @click="showAll">查看全部榜单</span>
    </div>
    <div class="two-season">
      <div class="two-season-title">第二赛季即将开始</div>
      <div class="time">
        <div class="num">{{dateTime.dd}}</div>
        <div class="text">天</div>
        <div class="num">{{dateTime.hh}}</div>
        <div class="text">时</div>
        <div class="num">{{dateTime.mm}}</div>
        <div class="text">分</div>
        <div class="num">{{dateTime.ss}}</div>
        <div class="text">秒</div>
      </div>
      <div class="icons">
        <div class="icons-title">亮点抢先看</div>
        <div class="icon-wrap">
          <div class="icon">
            <div class="img">
              <img
                src="../../assets/images/trading-competition/home/icon-reward.png"
                class="icon-reward"
                alt
              />
            </div>
            <div class="text">
              <div>1000 BTC</div>
              <div>丰厚奖励</div>
            </div>
          </div>
          <div class="icon">
            <div class="img">
              <img
                src="../../assets/images/trading-competition/home/icon-elite.png"
                class="icon-elite"
                alt
              />
            </div>
            <div class="text">
              <div>100+</div>
              <div>量化精英集合</div>
            </div>
          </div>
          <div class="icon">
            <div class="img">
              <img
                src="../../assets/images/trading-competition/home/icon-fund.png"
                class="icon-fund"
                alt
              />
            </div>
            <div class="text">
              <div>冠军基金</div>
              <div>开放直投</div>
            </div>
          </div>
          <div class="icon">
            <div class="img">
              <img
                src="../../assets/images/trading-competition/home/icon-bgp.png"
                class="icon-bgp"
                alt
              />
            </div>
            <div class="text">
              <div>BGP参与</div>
              <div>有奖竞猜</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block"></div>
    <div class="team">
      <div class="team-title">团队追踪</div>
      <div class="team-info">停赛期间将持续跟进团队表现</div>
      <div class="update-time">数据更新于 {{upDate}}</div>
      <div class="buttons">
        <div
          :class="['button', active === 'all'
            ? 'active': '']"
          @click="change('all')"
        >全部</div>
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
      <div class="table-wrap">
        <HomeTable :tableData="tableData" />
        <div v-show="showMores" v-if="(type === null || type === 'all')" class="more">
          <span @click="more">{{moreText}}</span>
          <img
            src="../../assets/images/trading-competition/home/more.png"
            @click="more"
            class="icon-more"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dayjs from 'dayjs';
import { createNamespacedHelpers } from 'vuex';
import HomeTable from './components/HomeTable.vue';

const { mapActions, mapState, mapGetters } = createNamespacedHelpers('race/raceInfo');


const fundType = {
  CTA: 'CTA',
  Arbitrage: '套利',
  HighFrequency: '高频',
  MixedStrategies: '混合',
};

export default {
  name: '',
  components: {
    HomeTable,
  },
  async mounted() {
    this.timer();
    try {
      await this.getHomeData({ type: null, symbol: 'limit' });
      this.tableData = this.tabList.map(item => ({
        id: item.fcat_product_id,
        date: item.rank_all,
        nav: item.nav,
        day: item.ror,
        name: item.fcat_product_name,
        pull: item.rank_all_arrow,
      }));
      await this.getHomeTop1();
      this.topList = this.top;
    } catch (error) {
      throw error;
    }
  },
  methods: {
    ...mapActions(['getHomeData', 'getHomeTop1']),
    timer() {
      this.timeFun = setInterval(() => {
        this.time = new Date() * 1;
      }, 1000);
    },
    timeAddZero(text) {
      return text.toString().length === 2 ? text : `0${text}`;
    },
    fundType(fund) {
      return fundType[fund];
    },
    async change(text) {
      this.type = text === 'all' ? null : text;
      this.showMores = text === 'all';
      this.active = text;
      try {
        await this.getHomeData({ type: text === 'all' ? null : text, symbol: 'limit' });
        this.tableData = this.tabList.map(item => ({
          id: item.fcat_product_id,
          date: text === 'all' ? item.rank_all : item.rank_group,
          nav: item.nav,
          day: item.ror,
          name: item.fcat_product_name,
          pull: text === 'all' ? item.rank_all_arrow : item.rank_group_arrow,
        }));
      } catch (error) {
        throw error;
      }
    },
    async more() {
      this.showMores = false;
      await this.getHomeData({ type: this.type, symbol: 'all' });
      this.tableData = this.tabList.map(item => ({
        id: item.fcat_product_id,
        date: this.type ? item.rank_group : item.rank_all,
        nav: item.nav,
        day: item.ror,
        name: item.fcat_product_name,
        pull: this.type ? item.rank_group_arrow : item.rank_all_arrow,
      }));
    },
    showAll() {
      this.$router.push('/rank-history');
    },
    onSkip(item) {
      this.$router.push(`/raceDetail/${item.product_id}`);
    },
  },
  data() {
    return {
      time: new Date() * 1,
      moreText: '查看更多',
      type: null,
      active: 'all',
      showMores: true,
      tableData: [],
      topList: [],
    };
  },
  computed: {
    ...mapState(['homeInfo']),
    ...mapGetters(['top', 'tabList', 'updateTime']),
    // 倒计时
    dateTime() {
      const endTime = Dayjs('2019-09-23 18:00') * 1;
      const time = endTime - this.time;
      let dd;
      let hh;
      let mm;
      let ss;
      if (time > 0) {
        dd = parseInt((time) / (60 * 60 * 24 * 1000), 0);
        hh = parseInt(((time) / (60 * 60 * 1000)) % 24, 0);
        mm = parseInt(((time) / (60 * 1000)) % 60, 0);
        ss = parseInt(((time) / 1000) % 60, 0);
      } else {
        dd = 0;
        hh = 0;
        mm = 0;
        ss = 0;
      }

      return {
        dd: this.timeAddZero(dd),
        hh: this.timeAddZero(hh),
        mm: this.timeAddZero(mm),
        ss: this.timeAddZero(ss),
      };
    },
    upDate() {
      return Dayjs(this.updateTime).format('YYYY-MM-DD HH:mm');
    },
  },
  beforeDestroy() {
    clearInterval(this.timeFun);
  },
};
</script>

<style lang="scss" scoped>
.home {

  width: 100%;
  overflow-y: scroll;
  background: url("../../assets/images/trading-competition/home/bg_home.jpg");
  background-size: 100% 100%;
  padding-top: 51px;
  .league-match-wrap {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 12.5px;
    z-index: 1;
    .league-match {
      width: 206px;
      height: 86px;
      border: 0;
      position: relative;
      z-index: 1;
    }
    .trophy {
      margin-top: -29px;
      position: absolute;
      width: 46px;
      height: 46px;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
    }
  }
  .first-season {
    .img-wrap {
      text-align: center;
      margin-bottom: 6.5px;
      .icon {
        width: 44px;
        height: 15.5px;
      }
    }
    .first-season-title {
      display: flex;
      align-items: center;
      justify-content: center;
      .border {
        width: 68.5px;
        height: 18.5px;
      }
      .text {
        width: 188.5px;
        height: 20.5px;
        margin: 0 2.5px 0 5.5px;
      }
    }
    .first-season-time {
      margin-top: 5.5px;
      text-align: center;
      color: #fbe6a2;
      font-size: 12px;
      font-family: Lantinghei SC;
      font-weight: 200;
    }
    .datas {
      margin-top: 18px;
      .datas-card-wrap {
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 15px;
        .datas-card {
          width: 99.5px;
          height: 95.5px;
          background: url("../../assets/images/trading-competition/home/first-bg.png");
          background-size: 100% 100%;
          position: relative;
          .an-crown {
            position: absolute;
            width: 28px;
            height: 25.5px;
            right: 0;
            top: 0;
            transform: translate(30%, -50%);
          }
          .title {
            display: flex;
            padding: 0 3px 0 5px;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            font-size: 6.5px;
            color: rgba(251, 230, 162, 1);
            .text {
              background: url("../../assets/images/trading-competition/home/name-bg.png")
                no-repeat;
              background-size: 100% 100%;
              width: 25px;
              text-align: center;
            }
          }
          .score {
            font-size: 8px;
            font-weight: normal;
            color: rgba(196, 171, 98, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 5px 0 10px;
            .text {
              font-size: 15px;
              font-weight: 600;
              color: rgba(251, 230, 162, 1);
            }
          }
          .echarts {
            width: 100%;
            font-size: 8px;
            display: flex;
            color: rgba(251, 230, 162, 1);
            padding-left: 3px;
            > div {
              flex: 1;
              display: flex;
              flex-direction: column;
              text-align: center;
              .text {
                color: rgba(196, 171, 98, 1);
              }
              .num {
                margin-top: 3px;
              }
            }
          }
        }
      }
    }
  }
  .showAll {
    margin: 5px auto 25px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      padding: 8px 15px 15px 15px;
      background: url("../../assets/images/trading-competition/home/show-all.png");
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(196, 171, 98, 1);
    }
  }
  .two-season {
    width: 354px;
    background: rgba(25, 24, 24, 1);
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    .two-season-title {
      width: 150px;
      height: 25px;
      line-height: 25px;
      background: url("../../assets/images/trading-competition/home/two.png");
      background-size: 100% 100%;
      margin-top: -2px;
      font-size: 13px;
      font-family: Lantinghei SC;
      color: rgba(28, 28, 28, 1);
      text-align: center;
      margin-bottom: 12px;
    }
    .time {
      display: flex;
      padding-left: 44px;
      margin-bottom: 24px;
      .num {
        width: 42px;
        height: 49px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 234, 154, 1);
        margin-right: 3.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("../../assets/images/trading-competition/home/num-bg.png");
        background-size: 100% 100%;
      }
      .text {
        font-size: 12px;
        font-family: PingFang;
        color: rgba(196, 171, 98, 1);
        margin-right: 18px;
        padding-top: 36px;
      }
    }
    .icons {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 20px;
      .icons-title {
        font-size: 12px;
        font-family: Lantinghei SC;
        font-weight: 600;
        color: rgba(233, 207, 135, 1);
        text-align: center;
        margin-bottom: 10px;
      }
      .icon-wrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        box-sizing: border-box;
        .icon {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          .img {
            width: 43px;
            height: 43px;
            margin-bottom: 22px;
            background: url("../../assets/images/trading-competition/home/icon-bg.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 7.5px;
            img {
              &.icon-reward {
                width: 16px;
                height: 24px;
              }
              &.icon-elite {
                width: 22px;
                height: 22px;
              }
              &.icon-fund {
                width: 25px;
                height: 23px;
              }
              &.icon-bgp {
                width: 20.5px;
                height: 22.5px;
              }
            }
          }
          .text {
            text-align: center;
            font-size: 10px;
            font-family: Lantinghei SC;
            font-weight: 600;
            color: rgba(196, 171, 98, 1);
            line-height: 14.5px;
          }
        }
      }
    }
  }
  .block {
    width: 100%;
    height: 15px;
  }
  .team {
    background: rgba(25, 24, 24, 1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    .team-title {
      width: 122px;
      height: 26px;
      line-height: 26px;
      margin: -2px auto 7px;
      background: url("../../assets/images/trading-competition/home/two.png");
      background-size: 100% 100%;
      font-size: 13px;
      font-family: Lantinghei SC;
      font-weight: 600;
      color: rgba(28, 28, 28, 1);
      text-align: center;
    }
    .team-info {
      margin: 0 auto;
      font-size: 11px;
      font-family: Lantinghei SC;
      font-weight: 200;
      color: rgba(251, 230, 162, 1);
      margin-bottom: 16px;
    }
    .update-time {
      margin-bottom: 11px;
      padding-left: 14px;
      font-size: 12px;
      font-family: Lantinghei SC;
      font-weight: 200;
      color: rgba(251, 230, 162, 1);
    }
    .buttons {
      display: flex;
      margin-bottom: 12px;
      box-sizing: border-box;
      padding-left: 15px;
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
        font-size: 15px;
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
    .table-wrap {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
      .more {
        margin-top: 20px;
        font-size: 11px;
        font-family: Lantinghei SC;
        color: rgba(233, 207, 135, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-more {
          width: 10px;
          height: 10.5px;
          margin-left: 5.5px;
        }
      }
    }
  }
}
</style>
