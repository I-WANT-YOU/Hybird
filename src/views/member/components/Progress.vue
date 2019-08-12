<template>
  <div class="progress-wrap">
    <div class="progress">
      <div class="level">V1</div>
      <div class="progress-bar">
        <div class="bg"></div>
        <div class="show" :style="{width:progressNum}">
          <div class="tip">{{option.membership_amount}}</div>
        </div>
      </div>
      <div class="level-next">
        <div class="bg"></div>
        <div class="text">{{next && next.level}}</div>
      </div>
    </div>
    <div class="progress-text">
      <span>{{level}}</span>
      <span class="level-next">{{next && next.text}}</span>
    </div>
  </div>
</template>
<script>
// "member_ship_level": "V1", 当前等级
// "membership_amount": 0, 会员值
// "next_min_membership_num": 1000, 到下一级
const level = [
  {
    level: 'V1',
    text: '普通会员',
  },
  {
    level: 'V2',
    text: '初级会员',
  },
  {
    level: 'V3',
    text: '金牌会员',
  },
  {
    level: 'V4',
    text: '钻石会员',
  },
  {
    level: 'V5',
    text: '至尊会员',
  },
];
export default {
  name: 'Progress',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  computed: {
    next() {
      const index = level.findIndex(item => item.level === this.option.member_ship_level);
      return level[index + 1];
    },
    level() {
      return level.find(item => item.level === this.option.member_ship_level).text;
    },
    progressNum() {
      return `${(this.option.membership_amount / this.option.next_min_membership_num) * 222}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-wrap {
  width: 300px;
  margin-top: 19px;
  .progress {
    display: flex;
    align-items: center;
    padding: 0 13px;
    margin-bottom: 10px;
    .level {
      width: 30px;
      height: 18px;
      line-height: 18px;
      background: #e0c085;
      border-radius: 4px;
      font-size: 12px;
      color: #654400;
      text-align: center;
    }
    .level-next {
      width: 30px;
      height: 18px;
      line-height: 18px;
      position: relative;
      .bg {
        width: 100%;
        height: 100%;
        opacity: 0.4;
        background: #fae3bd;
        position: absolute;
        border-radius: 4px;
        z-index: 1;
      }
      .text {
        width: 100%;
        height: 100%;
        text-align: center;
        position: absolute;
        font-size: 12px;
        color: #e0c085;
        z-index: 2;
      }
    }
    .progress-bar {
      width: 222px;
      height: 4px;
      position: relative;
      .bg {
        width: 100%;
        height: 100%;
        opacity: 0.4;
        background: #fae3bd;
        position: absolute;
      }
      .show {
        position: absolute;
        background: #e0c085;
        height: 100%;
        z-index: 10;
        .tip {
          position: absolute;
          width: 34px;
          height: 19px;
          right: -17px;
          top: -26px;
          line-height: 16px;
          text-align: center;
          font-size: 11px;
          color: #654400;
          background: url("../../../assets/images/member/progress.svg");
        }
      }
    }
  }
  .progress-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .level-next {
      opacity: 0.8;
      font-size: 14px;
      color: #fae8c1;
    }
  }
}
</style>
