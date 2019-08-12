<template>
  <div class="product-buy__container">
    <nav-bar title="兑换确认" />
    <product-buy-info-card />
  </div>
</template>

<script>
import BgainNavBar from '@/components/BgainNavBar.vue';
import ProductBuyInfoCard from './components/ProductBuyInfoCard.vue';

export default {
  name: 'ProductBuy',
  components: {
    ProductBuyInfoCard,
    NavBar: BgainNavBar,
  },
};
</script>

<style scoped>
  .product-buy__container {
    height: 100%;
    background: #f8f8f8;
  }
</style>
