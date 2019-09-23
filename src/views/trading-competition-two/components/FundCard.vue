<template>
  <div class="fund-card">
    <div class="currency">
      <div class="icon">{{fundDetail.currency}}</div>
    </div>
    <div class="fund-name linear">{{fundDetail.product_name}}</div>
    <div v-if="fundDetail.status === 'INITIAL'" class="initial">
      <img
        src="../../../assets/images/trading-competition-two/home/initial.png"
        class="initial-icon"
      />
      <div class="time">
        <span class="linear">{{formatType(fundDetail.strategy)}}</span>
        <span class="linear">|</span>
        <span class="linear">{{fundDetail.period}}天锁定期</span>
      </div>
    </div>
    <div v-else class="no-initial">
      <div class="no-initial-num">
        <div
          class="linear"
        >{{fundDetail.roi*1 > 0 ? '+' : ''}}{{(fundDetail.roi * 100).toFixed(2)}}%</div>
        <div class="linear">{{fundDetail.nav}}</div>
      </div>
      <div class="no-initial-text">
        <div class="linear">成立以来</div>
        <div class="linear">当前净值</div>
      </div>
    </div>
    <div class="buttons">
      <!-- <div class="buy">BGP跟投</div> -->
      <div class="start" @click="onBuy">{{fundDetail.min_invest_amt}}{{fundDetail.currency}}起投</div>
    </div>
    <div class="echarts"></div>
  </div>
</template>

<script>
import { getClientType } from '@utils/auth';
import Bridge from '@/config/bridge';

export default {
  name: 'FundCard',
  props: {
    fundDetail: {
      type: Object,
    },
  },
  mounted() {
    console.log('1');
  },
  methods: {
    onBuy() {
      if (getClientType) {
        Bridge.sendMessage({
          module: 'active',
          action: 'goFundDetail',
          params: `${this.fundDetail.id}`,
        });
      } else {
        window.location.href = `http://m.bgain.com/#/product/fund/noinitial/${this.fundDetail.id}`;
      }
    },
    formatType(type) {
      switch (type) {
        case 'SmartBeta':
          type = '指数型';
          break;
        case 'Arbitrage':
          type = '套利';
          break;
        case 'HighFrequency':
          type = '高频';
          break;
        case 'MixedStrategies':
          type = '混合';
          break;
        case 'CTA':
          type = 'CTA';
          break;
        default:
          break;
      }
      return type;
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-card {
  width: 137px;
  height: 97px;
  background: url("../../../assets/images/trading-competition-two/home/fund-card-bg.png")
    no-repeat;
  background-size: 137px 97px;
  border-radius: 8px;
  margin: 10px;
  position: relative;

  .currency {
    width: 37px;
    height: 28px;
    line-height: 28px;
    position: absolute;
    top: 0;
    right: -1px;
    background: url("../../../assets/images/trading-competition-two/home/currency.png")
      no-repeat;
    background-size: 37px 28px;
    .icon {
      text-align: center;
      color: #ffffff;
      font-size: 9px;
      transform: rotate(35deg);
      margin-right: -6px;
      margin-top: -3px;
    }
  }

  .fund-name {
    margin-top: 15px;
    font-size: 12px;
    line-height: 12px;
  }

  .initial {
    margin-bottom: 7px;

    .initial-icon {
      width: 26px;
      height: 11px;
      position: absolute;
      left: 0;
      top: 0;
    }

    .time {
      font-size: 12px;
      line-height: 24px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      > span:nth-child(2) {
        margin: -2px 3px 0;
      }
    }
  }

  .no-initial {
    display: flex;
    flex-direction: column;
    margin-top: 7px;
    padding: 0 10px;

    .no-initial-num {
      font-size: 10px;
      line-height: 10px;
      margin-bottom: 5px;

      > div {
        flex: 1;
      }
    }

    .no-initial-text {
      font-size: 8px;
      line-height: 8px;
      margin-bottom: 10px;

      > div {
        flex: 1;
      }
    }

    .no-initial-num,
    .no-initial-text {
      display: flex;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      width: 54px;
      height: 20px;
      line-height: 20px;
      margin: 0 3px;
      font-size: 8px;
      color: #ffffff;
      text-align: center;
      border-radius: 10px;

      &.buy {
        background: url("../../../assets/images/trading-competition-two/home/start.png")
          no-repeat;
        background-size: 54px 20px;
      }

      &.start {
        background: url("../../../assets/images/trading-competition-two/home/start.png")
          no-repeat;
        background-size: 54px 20px;
      }
    }
  }

  .echarts {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 25px;
    height: 42px;
    background: url("../../../assets/images/trading-competition-two/home/echarts.png")
      no-repeat;
    background-size: 137px 42px;
  }

  .linear {
    text-align: center;
    background: linear-gradient(
      0deg,
      rgba(45, 164, 240, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
