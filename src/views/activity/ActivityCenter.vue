<template>
  <div class="activity__container">
    <nav-bar title="活动中心" :show-arrow="false" />
    <!--会员值-->
    <div class="member-num">
      <div class="background">
        <div class="member-info">
          <span>普通会员</span>
          <span>0/1000</span>
        </div>
        <div class="member-level">
          <img src="../../assets/images/active/level-one.svg"/>
        </div>
      </div>
    </div>
    <!--会员积分和签到-->
    <div class="member-account">
      <!--积分-->
      <div class="member-integral">
        <div>
          <div>
            <span>1000000</span><span>积分</span>
          </div>
          <div>
            <span>FBP明细</span>
          </div>
        </div>
        <div>
          <img src="../../assets/images/active/integral.svg" alt="."/>
        </div>
      </div>
      <!--签到-->
      <div class="member-sign">
        <div>
          <span>已签到</span>
          <span>每日签到</span>
        </div>
        <div>
          <img src="../../assets/images/active/sign.svg" alt="."/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BgainNavBar from '@/components/BgainNavBar.vue';

export default {
  name: 'ActivityCenter',
  components: {
    NavBar: BgainNavBar,
  },
};
</script>

<style lang="scss" scoped>
.activity__container{
  font-family: PingFangSC-Medium sans-serif;
  /*会员*/
  .member-num{
    margin-top:9px;
    display: flex;
    justify-content: center;
    .background{
      width: 335px;
      height: 140px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-shadow: 0 4px 14px 0;
      border-radius: 6px;
      background: url('../../assets/images/active/member-background.svg');
      background-size:100% 100%;
      .member-info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        color: #FFFFFF;
        padding-left: 26px;
        >span:nth-child(1){
          margin-top: 34px;
          font-size: 23px;
          line-height: 32px;
        }
        >span:nth-child(2){
          line-height: 21px;
          margin-top: 2px;
          font-size: 15px;
          letter-spacing: 0.14px;
        }
      }
      .member-level{
        padding-right: 15px;
      }
    }

  }
  /*积分和签到*/
  .member-account{
    margin-top: 28px;
    display: flex;
    display: flex;
    justify-content: space-between;
    .member-integral{
      padding-left: 30px;
      display: flex;
      justify-content: space-between;
      >div:nth-child(1){
        >div:nth-child(1){
          color: #333333;
          >span:nth-child(1){
            font-size: 20px;
            line-height: 28px;
          }
          >span:nth-child(2){
            font-size: 10px;
            line-height: 14px;
          }
        }
        >div:nth-child(2){
          >span{
            display: block;
            font-size: 12px;
            color: #999999;
            line-height: 17px;
          }
        }
      }
      >div:nth-child(2){
        margin-left: 14px;
        >img{
          width: 46px;
          height: 46px;
        }
      }
    }
    .member-sign{
      padding-right: 30px;
      display: flex;
      justify-content: flex-end;
      >div:nth-child(1){
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        >span:nth-child(1){
          font-size: 13px;
          color: #333333;
          line-height: 28px;
        }
        >span:nth-child(2){
          font-size: 12px;
          color: #999999;
          line-height: 17px;
        }
      }
      >div:nth-child(2){
        margin-left: 14px;
        >img{
          width: 46px;
          height: 46px;
        }
      }
    }
  }
}
</style>
