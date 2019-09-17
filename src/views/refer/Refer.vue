<template>
  <div class="refer-wrap">
    <div class="con">
      <div class="info">
        <div class="asset">
          <div @click="onSkip" class="num">{{bonusSummary}}</div>
          <div class="text">
            <span>已得奖励(USDT)</span>
            <span @click="onTip" class="icon-wrap">
              <svg-icon icon-class="doubt" class="icon" />
            </span>
            <div :class="['tip',showTip ? '' : 'active']">
              <div class="tit">根据奖励发放时的币种汇率计算而得，此数据仅供参考</div>
              <div class="top"></div>
            </div>
          </div>
          <div class="refer">
            <div>
              <div class="refer-text">已邀请(人)</div>
              <div class="refer-num">{{info.num_of_people}}</div>
            </div>
            <div>
              <div class="refer-text">好友投资总额(USDT)</div>
              <div class="refer-num">{{info.friend_total_investment}}</div>
            </div>
            <div>
              <div class="refer-text">当前佣金比例(%)</div>
              <div class="refer-num">{{info.commission_ratio}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tabs">
        <div :class="['tab', active === '1' ? 'active' : '']" @click="onTab('1')">注册好友</div>
        <div :class="['tab', active === '2' ? 'active' : '']" @click="onTab('2')">奖励明细</div>
      </div>
      <div class="list">
        <ReferCard v-for="(item,key) in list" :key="key" :option="item" :tab="active" />
        <div class="blank" v-if="!list.length">
          <svg-icon icon-class="mine-fund-no-record" class="icon" />
          <div>暂无相关数据</div>
          <div>快去邀请好友赚奖励的~</div>
        </div>
      </div>
    </div>
    <div class="button" @click="onClick">我的邀请码 {{invitationCode}}</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Toast } from 'vant';
import { get } from 'lodash';
import { copyText } from '@utils/tools';
import Bridge from '@/config/bridge';
import ReferCard from './components/ReferCard.vue';
import errorMessage from '../../constants/responseStatus';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('user');
export default {
  name: 'Refer',
  components: {
    ReferCard,
  },
  methods: {
    ...mapActions(['getReferInfo', 'getUserSummary']),
    onTab(text) {
      this.active = text;
      if (text === '1') {
        this.list = this.inviteeDetailsList;
      } else {
        this.list = this.rewardRecordList;
      }
    },
    async handleSetToken() {
      try {
        await this.getUserSummary();
        await this.getReferInfo();
        this.list = this.inviteeDetailsList;
        this.info = this.referInfo;
      } catch (error) {
        if (error.status) {
          Toast(errorMessage[error.status]);
        } else {
          Toast('未登录');
        }
      }
    },
    onClick() {
      const inviteCode = get(this.basicInfo, 'invitation_code', '');
      if (inviteCode) {
        // Bridge.sendMessage({
        //   module: 'active',
        //   action: 'share',
        //   params: {
        //     type: 'web',
        //     url: `${
        //       window.location.origin
        //     }/active/invitee?invite_code=${inviteCode}`,
        //     title: '好友总动员，一起来赚钱，USDT免费送，独乐乐不如众乐乐~',
        //     des: '邀请越多得越多，更有免费收益拿',
        //   },
        // });
        copyText(inviteCode);
      }
    },
    onTip() {
      this.showTip = true;
      this.timer = setTimeout(() => {
        this.showTip = false;
      }, 3000);
    },
    onSkip() {
      this.$router.push('/refer-detail');
    },
    skipRules() {
      this.$router.push('/refer-rules');
    },
  },
  data() {
    return {
      active: '1',
      list: ['1'],
      info: {},
      time: null,
      showTip: false,
    };
  },
  computed: {
    ...mapGetters(['bonusSummary', 'inviteeDetailsList', 'rewardRecordList', 'invitationCode']),
    ...mapState(['referInfo', 'basicInfo']),
  },
  mounted() {
    window.skipRules = this.skipRules;
    Bridge.sendMessage({
      module: 'active',
      action: 'setTitle',
      params: '邀请记录',
    });
    Bridge.sendMessage(
      {
        module: 'active',
        action: 'getToken',
      },
      this.handleSetToken,
    );
  },
};
</script>

<style lang="scss" scoped>
.refer-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .con {
    display: flex;
    flex-direction: column;
    flex: 1;
    .info {
      height: 180px;
      display: flex;
      flex-direction: column;
      font-size: 28px;
      color: #ffffff;
      letter-spacing: 0;
      background: url("../../assets/images/refer.png");
      background-size: 100% 100%;
      box-sizing: border-box;
      .num {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 42px;
      }
      .text {
        font-size: 12px;
        text-align: center;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 35px;
        position: relative;
        .icon-wrap {
          margin-left: 5px;
          display: flex;
          align-items: center;
          .icon {
            width: 14px;
            height: 14px;
          }
        }
        .tip {
          position: absolute;
          left: 50px;
          top: 28px;
          width: 273px;
          height: 90px;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0.35px;
          line-height: 24px;
          z-index: 100;
          opacity: 0.6;
          background: #000000;
          .tit {
            display: flex;
            padding: 20px 12px 0 17px;
            text-align: left;
          }
          .top {
            position: absolute;
            width: 0;
            height: 0;
            top: -19px;
            left: 175px;
            border: 10px solid;
            border-color: transparent transparent #000000;
          }
          &.active {
            display: none;
          }
        }
      }
      .refer {
        display: flex;
        justify-content: space-between;
        padding-right: 14px;
        > div {
          flex: 1;
          font-size: 11px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .refer-text {
            text-align: center;
            opacity: 0.6;
          }
          .refer-num {
            text-align: center;
            margin-top: 6px;
            font-size: 14px;
          }
        }
      }
    }
    .tabs {
      height: 50px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .tab {
        padding: 17px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-bottom: transparent 1px solid;
        font-size: 15px;
        color: #333333;
        &.active {
          color: #ffb629;
          border-color: #ffb629;
        }
      }
    }
    .list {
      flex: 1;
      overflow-y: auto;
      .blank {
        font-size: 14px;
        color: #999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 88px;
        line-height: 22px;
        .icon {
          width: 102px;
          height: 78px;
          margin-bottom: 12px;
        }
      }
    }
  }

  .button {
    text-align: center;
    margin: 10px auto 15px;
    width: 331px;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #ffffff;
    background: url("../../assets/images/invitation.png");
    background-size: 100% 100%;
  }
}
</style>
