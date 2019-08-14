<template>
  <div class="know-bgain">
    <div class="banner"></div>
    <div class="know-bgain-con">
      <div class="title">平台介绍</div>
      <div
        class="text"
      >Bgain一站式数字资产管理平台，创立于2019年，是优质的数字资产直投首选平台。多年的一二级市场投资经验，使Bgain更了解投资者需求，专业基础+丰富实践=优质的产品。Bgain团队专注研发多样化的数币金融产品，包括活、定期理财，量化基金直投，FOF等，以满足投资者的个性化需求。</div>
      <div
        class="text"
      >在安全方面，Bgain选择与亚太最大的托管机构cobo合作，协同托管，冷热分离存储，HSM银行级安全防护，多重签名机制；平台承诺10%管理规模备付准备金，最大程度保障投资者资金安全；同时自建风控系统，自动预警，7*24小时人工监测，所有资产标的由平台千万美元级自有资金实测后上线，持续追踪，优化资产池。</div>
      <div class="title">创始团队</div>
      <div
        class="text"
      >Bgain的创始团队来自IBM、360、Google、Uber等一线互联网公司以及高盛、UBS、Morgan Stanley等顶尖金融服务公司，拥有来自on Capital等区块链投资及Amazon、eBay等互联网金融领域的顾问团。Bgain的合作网络遍及中国、新加坡、香港、台湾、硅谷、伦敦、以色列等全球科技与金融中心，覆盖全球资产，服务全球用户。</div>
      <div class="title">联系我们</div>
      <div class="text">邮箱地址：CS@bgain.com</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnowBgain',
};
</script>

<style lang="scss" scoped>
.know-bgain {
  display: flex;
  flex-direction: column;
  .banner {
    width: 100%;
    height: 130px;
    background: url("../../assets/images/community/community.png");
    background-size: 100% 100%;
  }
  .know-bgain-con {
    margin: 0 21px 10px;
    .title {
      font-size: 16px;
      color: #333333;
      font-weight: 600;
      margin: 30px 0 10px;
    }
    .text {
      font-size: 13px;
      color: #666666;
      line-height: 26px;
    }
  }
}
</style>
