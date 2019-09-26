<template>
  <div class="trading-competition-two">
    <!-- <BgainNavBar title="交易比赛"/> -->
    <div class="trading-competition-two-bg">
      <div class="trading-competition-two-bg-one"></div>
      <div class="trading-competition-two-bg-two"></div>
      <div class="trading-competition-two-bg-three"></div>
      <div class="trading-competition-two-bg-four"></div>
      <div class="trading-competition-two-bg-five"></div>
    </div>

    <div class="trading-competition-two-info">
      <div class="none">我的BGP</div>
      <img src="../../assets/images/trading-competition-two/home/bgain.png" class="bgain-text" alt />
      <img
        src="../../assets/images/trading-competition-two/home/golden.png"
        class="golden-text"
        alt
      />
      <div class="none">我的BGP</div>
    </div>

    <div class="trading-competition-two-title">
      <div class="league-match">
        <img
          src="../../assets/images/trading-competition-two/home/league-match.png"
          alt
          class="league-match-img"
        />
        <img src="../../assets/images/trading-competition-two/home/hot.png" alt class="hot-img" />
      </div>
    </div>

    <div class="league-icons">
      <div class="league-icons-wrap">
        <div class="league-icons-item">
          <img
            src="../../assets/images/trading-competition-two/home/wallet.png"
            alt
            class="wallet-img"
          />
        </div>
        <img
          src="../../assets/images/trading-competition-two/home/wallet-text.png"
          alt
          class="league-icons-text wallet-text"
        />
      </div>
      <div class="league-icons-wrap">
        <div class="league-icons-item">
          <img src="../../assets/images/trading-competition-two/home/hand.png" alt class="hand-img" />
        </div>
        <img
          src="../../assets/images/trading-competition-two/home/hand-text.png"
          alt
          class="league-icons-text"
        />
      </div>
      <div class="league-icons-wrap">
        <div class="league-icons-item">
          <img src="../../assets/images/trading-competition-two/home/lamp.png" alt class="lamp-img" />
        </div>
        <img
          src="../../assets/images/trading-competition-two/home/lamp-text.png"
          alt
          class="league-icons-text"
        />
      </div>
    </div>

    <div class="steps-wrap">
      <div class="home-con-step">
        <img
          src="../../assets/images/trading-competition-two/home/two-step.png"
          class="home-con-step-title"
        />
        <div class="home-con-steps">
          <div class="home-con-steps-title-test">
            <div>
              <div class="time-text">开始</div>
              <span class="time">2019.09.23</span>
            </div>
            <div>
              <div class="time-text">结束</div>
              <span class="time">2019.12.31</span>
            </div>
          </div>
          <div class="home-con-steps-bg">
            <div class="home-con-steps-steps">
              <div
                v-for="item in 4"
                :key="item"
                :class="['stepline-wrap', item === 1 ? 'one' : 'other']"
              >
                <div
                  :class="['step', item === stepActive ? 'active' : '',
                    item < stepActive ? 'actived' : '']"
                >
                  <span></span>
                  <i></i>
                  <span></span>
                </div>
                <div class="line" ref="step-line">
                  <div
                    :class="['line-bg', item <= stepActive ? 'active' : '']"
                    :style="{width: item < stepActive ? '100%'
                      : item === stepActive ? `${stepWidth}px` : ''}"
                  >
                    <div
                      :class="['line-time-tip',
                    item === (stepActive && stepActive !== 1)  ? 'active' : '',]"
                      :ref="item === (stepActive && stepActive !== 1) ? `stepTip` : ''"
                    >
                      <div>还剩{{surplusDateText}}天</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="home-con-steps-text">
            <div>10.01</div>
            <div>第一月度</div>
            <div>第二月度</div>
          </div>
        </div>
      </div>
    </div>

    <div class="trading-competition-two-table-title">
      <img
        src="../../assets/images/trading-competition-two/home/table-title.png"
        alt
        class="table-title-img"
      />
      <div>数据更新于{{upDateTime}}</div>
      <div @click="goHistory">
        <span>历史榜单</span>
        <img
          src="../../assets/images/trading-competition-two/home/next-two.png"
          alt
          class="table-next-img"
        />
      </div>
    </div>

    <div class="trading-competition-two-table-wrap">
      <div class="trading-competition-two-table-bg">
        <div class="header"></div>
        <div class="body"></div>
        <div class="footer"></div>
      </div>

      <div class="table-tab-buttons">
        <div>
          <div :class="[tabActive === 'cta' ? 'active' : '']" @click="changTab('cta')">CTA(BTC计价)</div>
          <img
            v-show="tabActive === 'cta'"
            src="../../assets/images/trading-competition-two/home/table-tab-active.png"
            alt
          />
        </div>
        <div>
          <div :class="[tabActive === 'mid' ? 'active' : '']" @click="changTab('mid')">市场中性(BTC计价)</div>
          <img
            v-show="tabActive === 'mid'"
            src="../../assets/images/trading-competition-two/home/table-tab-active.png"
            alt
          />
        </div>
        <div>
          <div :class="[tabActive === 'no' ? 'active' : '']" @click="changTab('no')">不限策略(USD计价)</div>
          <img
            v-show="tabActive === 'no'"
            src="../../assets/images/trading-competition-two/home/table-tab-active.png"
            alt
          />
        </div>
      </div>

      <div class="table-tab-table">
        <HomeTable :tableData="showData" :failedData="failedData" :activeStatu="tabActive" />
      </div>

      <div v-show="showMoreText" class="table-more">
        <div @click="showMore">
          <span class="more">{{isShowMore ? '收起更多' : '查看更多'}}</span>
          <span :class="['more-icon', isShowMore ? 'active' : '']"></span>
        </div>
      </div>
    </div>

    <div class="trading-competition-two-spot-wrap">
      <div class="spot-title linear">赛事看点</div>
      <div class="spot-con">
        <div class="spot-con-item">
          <img
            src="../../assets/images/trading-competition-two/home/spot1.png"
            class="spot-con-item-icon"
          />
          <div class="spot-con-item-text">
            <div>顶尖交易团队</div>
            <div>多样化投资策略</div>
          </div>
        </div>
        <div class="spot-con-item">
          <img
            src="../../assets/images/trading-competition-two/home/spot2.png"
            class="spot-con-item-icon"
          />
          <div class="spot-con-item-text">
            <div>永续赛季</div>
            <div>持续追踪表现</div>
          </div>
        </div>
        <div class="spot-con-item">
          <img
            src="../../assets/images/trading-competition-two/home/spot3.png"
            class="spot-con-item-icon"
          />
          <div class="spot-con-item-text">
            <div>专业投资人评委</div>
            <div>长期追踪、定期点评</div>
          </div>
        </div>
        <div class="spot-con-item">
          <img
            src="../../assets/images/trading-competition-two/home/spot4.png"
            class="spot-con-item-icon"
          />
          <div class="spot-con-item-text">
            <div>严格比赛规则</div>
            <div>交易风险可控</div>
          </div>
        </div>
      </div>
    </div>

    <trading-footer class="footer" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import { formatDate } from '@utils/tools';
// import BgainNavBar from '@component/BgainNavBar.vue';
import Bridge from '@/config/bridge';
import TradingFooter from './components/TradingFooter.vue';
import HomeTable from './components/TradingCompetitionTwoHomeTable.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('race/raceInfo');

export default {
  name: 'TradingCompetitionTwo',
  components: {
    // BgainNavBar,
    HomeTable,
    TradingFooter,
  },
  data() {
    return {
      stepActive: 3,
      surplusDate: 0,
      surplusDateText: 31,
      stagesTotalDay: 31,
      isStepWidth: false,
      setpTime: new Date(),
      setpList: {
        8: 1,
        9: 2,
        10: 3,
        11: 4,
      },
      tabActive: 'cta',
      tableData: [],
      isShowMore: false,
      upDateTime: '2019.09.23 18:00',
    };
  },
  async mounted() {
    this.isStepWidth = true;
    this.changeStep();
    this.openLoading();
    try {
      await this.getRaceHome();
      this.tableData = this.rankingCTA;
      this.upDateTime = formatDate(this.upDate, 'YYYY.MM.DD HH:mm');
      this.loading.clear();
    } catch (error) {
      Toast('网络错误');
      this.loading.clear();
      throw error;
    }
  },
  methods: {
    ...mapActions(['getRaceHome']),
    changeStep() {
      const lastDay = new Date(this.setpTime.getFullYear(),
        this.setpTime.getMonth() + 1, 0).getDate();
      this.stagesTotalDay = lastDay;
      this.surplusDate = this.setpTime.getDate();
      this.surplusDateText = this.stagesTotalDay - this.surplusDate;
      this.stepActive = this.setpList[this.setpTime.getMonth()];
    },
    changTab(tab) {
      if (tab !== this.tabActive) {
        this.tabActive = tab;
      }
      if (tab === 'mid') {
        this.tableData = this.rankingMarketNeutral;
      } else if (tab === 'cta') {
        this.tableData = this.rankingCTA;
      } else if (tab === 'no') {
        this.tableData = this.rankingUnlimited;
      }
    },
    showMore() {
      this.isShowMore = !this.isShowMore;
    },
    goFund() {
      try {
        Bridge.sendMessage({
          module: 'active',
          action: 'goFundPage',
        });
      } catch (error) {
        window.location.href = 'http://m.bgain.com/#/product/fund';
      }
    },
    goHistory() {
      this.$router.push('/trading-competition-history');
    },
  },
  computed: {
    ...mapGetters([
      'featuredProducts', 'upDate',
      'rankingAll', 'rankingCTA',
      'rankingMarketNeutral', 'rankingUnlimited',
    ]),
    stepWidth() {
      if (this.isStepWidth && this.stepActive === 1) {
        return this.$refs['step-line'][this.stepActive - 1].offsetWidth * ((this.surplusDate - 23) / 7);
      }

      if (this.isStepWidth && this.stepActive !== 1) {
        return this.$refs['step-line'][this.stepActive - 1].offsetWidth * (this.surplusDate / this.stagesTotalDay);
      }

      return '';
    },
    failedData() {
      if (!this.isShowMore) {
        return [];
      }
      return this.tableData.filter(item => !item.success);
    },
    showMoreText() {
      if (this.tableData.length > 11) {
        return true;
      }
      return false;
    },
    showData() {
      const tableArr = this.tableData.filter(item => item.success);
      const date = tableArr.sort((a, b) => a.rank - b.rank).slice(0, 11);
      if (this.isShowMore) {
        return this.tableData;
      }

      if (date.some(item => item.compare_to_benchmark * 1 === 0)) {
        return date;
      }

      return date.concat(this.tableData.find(item => item.compare_to_benchmark * 1 === 0));
    },
  },
};
</script>

<style lang="scss" scoped>
.trading-competition-two {
  position: relative;

  .trading-competition-two-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -999;
    display: flex;
    flex-direction: column;

    .trading-competition-two-bg-one {
      height: 223px;
      background: url("../../assets/images/trading-competition-two/home/wrap-bg1.png")
        no-repeat center center;
      background-size: 375px 100%;
    }

    .trading-competition-two-bg-two {
      height: 279px;
      background: url("../../assets/images/trading-competition-two/home/wrap-bg2.png")
        no-repeat;
      background-size: 375px 100%;
      margin-top: -1px;
    }

    .trading-competition-two-bg-three {
      flex: 1;
      background: url("../../assets/images/trading-competition-two/home/wrap-bg3.png")
        no-repeat;
      background-size: 375px 100%;
      margin-top: -1px;
    }

    .trading-competition-two-bg-four {
      flex: 1;
      background: url("../../assets/images/trading-competition-two/home/wrap-bg4.png")
        no-repeat;
      background-size: 375px 100%;
      margin-top: -1px;
    }

    .trading-competition-two-bg-five {
      height: 40px;
    }
  }

  .trading-competition-two-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 26px 0;

    .bgain-text {
      width: 44px;
      height: 17px;
      margin-right: -5px;
    }

    .golden-text {
      width: 59px;
      height: 15px;
      margin-left: -5px;
    }

    > div {
      width: 44px;
      height: 13px;
      text-align: center;
      line-height: 13px;
      font-size: 9px;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 1);
      border-radius: 7px;

      &.none {
        opacity: 0;
      }
    }
  }

  .trading-competition-two-title {
    margin-top: 20px;

    .league-match {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .league-match-img {
        width: 295px;
        height: 134px;
        margin-left: 25px;
      }

      .hot-img {
        position: absolute;
        right: 37px;
        top: -14px;
        width: 23px;
        height: 27px;
      }
    }
  }

  .league-icons {
    display: flex;
    justify-content: center;

    .league-icons-wrap {
      margin: 0 18px;
      display: flex;
      flex-direction: column;

      .league-icons-item {
        height: 22px;
        line-height: 22px;
        text-align: center;
        margin-bottom: 4px;

        .wallet-img {
          width: 16px;
          height: 19px;
        }

        .hand-img {
          width: 22px;
          height: 14px;
        }

        .lamp-img {
          width: 18px;
          height: 22px;
        }
      }

      .league-icons-text {
        width: 32px;
        height: 9px;
      }

      .wallet-text {
        width: 32px;
        height: 9px;
      }
    }
  }

  .steps-wrap {
    margin: 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .home-con-step {
      .home-con-step-title {
        width: 55px;
        height: 14px;
        margin-bottom: 10px;
      }

      .home-con-steps {
        width: 321px;
        height: 4px;

        .home-con-steps-title-test {
          color: #ffffff;
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          margin-bottom: 20px;

          .time-text {
            text-align: center;
            margin-bottom: 3px;
          }

          .time {
            color: rgba(29, 123, 255, 1);
            font-size: 8px;
          }
        }

        .home-con-steps-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 321px;
          margin-top: -8px;

          .stepline-wrap {
            display: flex;
            align-items: center;

            &.one {
              width: 40px !important;
            }

            &.other {
              flex: 1;
            }

            .step {
              width: 4px;
              height: 4px;
              border-radius: 100%;
              background: #f9f9f9;
              &.active {
                height: 8px;
                width: 8px;
                background: url("../../assets/images/trading-competition-two/home/step-active.png")
                  no-repeat;
                background-size: 8px 8px;
                display: flex;
                align-items: center;

                > span {
                  flex: 1;
                  height: 1px;
                  background: #0b51ac;
                }

                > i {
                  width: 4px;
                  height: 4px;
                  background: #2a55e7;
                  border-radius: 50%;
                }
              }

              &.actived {
                width: 4px;
                height: 4px;
                background: #2a55e7;
              }
            }

            .line {
              flex: 1;
              height: 1px;
              display: flex;
              align-items: center;
              background: #c9c9c9;

              .line-bg {
                height: 1px;
                position: relative;
                &.active {
                  background: #0b51ac;
                }
                .line-time-tip {
                  position: absolute;
                  top: -22px;
                  right: -23px;
                  width: 46px;
                  height: 20px;
                  background: url("../../assets/images/trading-competition-two/home/step-time-tip.png")
                    no-repeat;
                  background-size: 46px 20px;
                  display: none;
                  font-size: 8px;
                  font-family: Adobe Heiti Std;
                  color: #ffffff;
                  padding-top: 2px;
                  padding-left: 2px;
                  box-sizing: border-box;

                  > div {
                    text-align: center;
                    padding-right: 7px;
                  }

                  &.active {
                    display: block;
                  }
                }
              }
            }
          }
        }

        .home-con-steps-text {
          color: #ffffff;
          width: 100%;
          display: flex;
          margin-top: 12px;
          font-size: 8px;

          > div:nth-child(1) {
            margin-left: 33px;
          }

          > div:nth-child(2) {
            margin-left: 68px;
          }

          > div:nth-child(3) {
            margin-left: 60px;
          }
        }
      }
    }
  }

  .trading-competition-two-table-title {
    margin: 90px 0 10px;
    padding: 0 16px 0 23px;
    display: flex;
    font-size: 9px;

    .table-title-img {
      width: 69px;
      height: 14px;
    }

    > div:nth-child(2) {
      flex: 1;
      font-size: 8px;
      font-family: PingFang SC;
      color: rgba(153, 153, 153, 1);
      padding: 4px 0 0 12px;
    }

    > div:nth-child(3) {
      display: flex;
      color: #ffffff;
      display: flex;
      padding-top: 3px;

      .table-next-img {
        width: 9px;
        height: 9px;
        margin-left: 3px;
      }
    }
  }

  .trading-competition-two-table-wrap {
    width: 100%;
    position: relative;
    padding: 0 28px 0 25px;
    box-sizing: border-box;

    .trading-competition-two-table-bg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      z-index: -5;
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
        width: 98.8%;
        margin-left: 2.04px;
        margin-top: -3px;
        background: url("../../assets/images/trading-competition-two/home/table-footer.png")
          no-repeat;
        height: 46px;
        background-size: 100% 46px;
      }
    }

    .table-tab-buttons {
      color: #ffffff;
      font-size: 12px;
      font-family: PingFang SC;
      display: flex;
      padding-top: 33px;
      justify-content: center;
      margin-bottom: 10px;

      > div {
        text-align: center;

        > img {
          width: 4px;
          height: 4px;
        }

        > div {
          margin: 0 7px;
          &.active {
            color: #1c7aff;
          }
        }
      }
    }

    .table-tab-table {
      width: 100%;
    }
  }

  .table-more {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2a55e7;
    font-size: 10px;
    margin: 24px 0 5px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .more-icon {
        width: 9px;
        height: 9px;
        background: url("../../assets/images/trading-competition-two/home/blue-down.png");
        background-size: 9px 9px;
        margin-left: 5px;

        &.active {
          background: url("../../assets/images/trading-competition-two/home/blue-up.png");
          background-size: 9px 9px;
        }
      }
    }
  }

  .trading-competition-two-spot-wrap {
    width: 358px;
    margin: 60px 0 0 17px;
    padding-bottom: 68px;

    .spot-title {
      height: 14px;
      font-size: 14px;
      margin-bottom: 7px;
    }

    .spot-con {
      height: 147px;
      padding: 33px 0 0 45px;
      box-sizing: border-box;
      background: url("../../assets/images/trading-competition-two/home/sopt-bg.png")
        no-repeat;
      background-size: 358px 147px;
      display: flex;
      flex-wrap: wrap;

      .spot-con-item {
        padding: 0;
        height: 30px;
        font-size: 9px;
        color: #ffffff;
        display: flex;

        &:nth-child(1),
        &:nth-child(3) {
          margin-right: 40px;
        }

        .spot-con-item-icon {
          width: 14px;
          height: 14px;
          margin: -2px 8px 0 0;
        }

        .spot-con-item-text {
          width: 100px;

          > div {
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  .linear {
    background: linear-gradient(
      0deg,
      rgba(45, 164, 240, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .footer {
    margin-bottom: -40px;
  }
}
</style>
