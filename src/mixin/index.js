import { Toast } from 'vant';

export default {
  data() {
    return {
      loading: null,
    };
  },
  methods: {
    openLoading() {
      this.loading = Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...',
      });
    },
  },
  destroyed() {
    if (this.loading) {
      this.loading.clear();
    }
  },
};
