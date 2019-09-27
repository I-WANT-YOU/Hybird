<template>
    <div class="raceDetailTeamInfo">
      <p class="title">团队详情</p>
      <div class="teamInfo">
        <van-image class="logo-icon" :src="profile.team_logo" alt=""/>
        <div class="info-detail">
          <p class="teamName">{{profile.team_name}}</p>
          <p>管理人：{{profile.manager_name}}</p>
          <p>{{profile.team_introduction}}</p>
        </div>
      </div>
      <div class="buttons">
        <button>咨询</button>
        <button>跟投</button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Image } from 'vant';

export default {
  name: 'RaceDetailTeamInfo',
  components: {
    'van-image': Image,
  },
  computed: {
    ...mapGetters('race/raceInfo', ['profile']),
  },
};
</script>

<style lang="scss" scoped>
  .raceDetailTeamInfo{
    p{
      margin: 0;
    }
    font-family:PingFang SC sans-serif;
    background: url("../../../../assets/images/trading-competition-two/detail/content/bg-three.png");
    color: white;
    .title{
     margin-left: 25px;
     height:19px;
     font-size:14px;
     font-weight:400;
     color:rgba(42,85,231,1);
     line-height:19px;
     background:linear-gradient(0deg,rgba(45,164,240,1) 0%, rgba(255,255,255,1) 100%);
     -webkit-background-clip:text;
     -webkit-text-fill-color:transparent;
   }
    .teamInfo{
      display: flex;
      margin-top: 18px;
      .logo-icon{
        margin-left: 38px;
        width: 63px;
        height: 64px;
      }
      .info-detail{
        margin-left:26px;
        >p:nth-child(1){
          font-size:12px;
          font-family:SourceHanSansCN sans-serif;
          font-weight:200;
          color:rgba(42,85,231,1);
        }
        >p:nth-child(2){
          margin-top: 8px;
          font-size:10px;
          font-family:Adobe Heiti Std sans-serif;
          font-weight:normal;
          color:rgba(255,255,255,1);
        }
        >p:nth-child(3){
          margin-top: 5px;
          width:208px;
          font-size:9px;
          font-family:SourceHanSansCN sans-serif;
          font-weight:200;
          color:rgba(255,255,255,1);
          line-height:1.2;
        }
      }
    }
    .buttons{
      padding:66px 10px 30px;
      display: flex;
      justify-content: space-between;
      >button{
        width:172px;
        height:44px;
        background:rgba(82,148,212,1);
        border-radius:3px;
        border: none;
        font-size:15px;
        font-family:Lantinghei SC sans-serif;
        font-weight:600;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>
