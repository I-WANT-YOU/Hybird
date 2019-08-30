<template>
  <div class="add-community">
    <div class="title"></div>
    <!-- eslint-disable -->
    <div
      class="con"
    >Bgain自有社群数十个，曾举办过《从投机到稳健——Bgain的数字资管新主张》《二级市场的机遇与风险》《究竟如何在跌宕起伏的市场中实现稳健盈利》等线上直播交流活动，Bgain联合创始人、量化经理人等资产管理专家和量化领域专业人士现身分享，交流投资理财知识，行情判断等。在Bgain社群接收官方的一手讯息推送，不时举办社群福利活动，加息券、BGP好礼相送，欢迎大家入群学习交流。</div>
    <!-- eslint-enable -->
    <div class="account">
      <span>微信账号</span>
      <span class="copy" @click="copyText(value)">
        Bgainkefu
        <i class="icon"></i>
      </span>
    </div>
  </div>
</template>
<script>
import { copyText } from '@utils/tools';

export default {
  name: 'AddCommunity',
  data() {
    return {
      value: 'Bgainkefu',
    };
  },
  methods: {
    copyText(text) {
      return copyText(text);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-community {
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    height: 130px;
    font-size: 26px;
    color: #fff7e9;
    background: url("../../assets\/images/community/addBagin.png");
    background-size: 100% 100%;
  }
  .con {
    margin: 20px;
    font-size: 13px;
    color: #666666;
    line-height: 26px;
  }
  .account {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 7px 20px 0;
    font-size: 15px;
    color: #333333;
    .copy {
      font-size: 14px;
      color: #666666;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        margin-left: 5px;
        width: 15px;
        height: 15px;
        background: url("../../assets\/images/community/copy.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>
