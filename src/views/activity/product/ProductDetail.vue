<template>
  <div class="product-detail__container">
    <nav-bar title="商品详情页"/>
    <div class="product-detail__content">
      <swipe @change="onChange" style="height: 240px">
        <swipe-item :key="image" v-for="image in images">
          <VanImage :src="image" width="100%" height="240px"/>
        </swipe-item>

        <div class="custom-indicator" slot="indicator">
          <span class="indicator__index--current">{{ current + 1 }}</span>
          <span class="indicator__index--center">/</span>
          <span class="indicator__index--total">{{images.length}}</span>
        </div>
      </swipe>

      <product-info-card :data-source="product" />
      <product-detail-card :data-source="product" />
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import {
  Swipe, SwipeItem, Image, Toast,
} from 'vant';
import ProductDetailCard from './components/ProductDetailCard.vue';
import ProductInfoCard from './components/ProductInfoCard.vue';
import BgainNavBar from '@/components/BgainNavBar.vue';

const { mapActions, mapState } = createNamespacedHelpers('activity');

export default {
  name: 'ProductDetail',
  components: {
    NavBar: BgainNavBar,
    Swipe,
    SwipeItem,
    VanImage: Image,
    ProductInfoCard,
    ProductDetailCard,
  },
  data() {
    return {
      current: 0,
    };
  },
  computed: {
    ...mapState(['product']),
    images() {
      return JSON.parse(get(this.product, 'detail_png_url', '[]'));
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    try {
      Toast.loading({
        duration: 0,
      });
      await this.getBgpProductDetail(id);
      Toast.clear();
    } catch (error) {
      Toast(error);
    }
  },
  methods: {
    ...mapActions(['getBgpProductDetail']),
    onChange(index) {
      this.current = index;
    },
  },
};
</script>

<style lang="scss" scoped>
  .product-detail__container {
    height: 100%;
    background: #f8f8f8;

    .product-detail__content {
      .custom-indicator {
        position: absolute;
        right: 16px;
        bottom: 16px;
        padding: 0 8px;
        border-radius: 10px;
        color: #fff;
        background: rgba(0,0,0,0.30);
        line-height: 18px;
        font-size: 16px;

        .indicator__index--current {
          font-size: 16px;
        }
        .indicator__index--center {
          font-size: 13px;
        }
        .indicator__index--total {
          font-size: 12px;
        }
      }
    }
  }
</style>
