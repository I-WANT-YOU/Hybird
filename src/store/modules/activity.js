import * as Auth from '@utils/auth';
import ActivityService from '@api/activity';
import * as types from '../mutationTypes';

const state = {
  sign: {},
  products: {},
  bannerList: {},
  recordList: {},
  detailList: {},
};

const getters = {
};

const mutations = {
  [types.GET_SIGN_INFO](state, payload) {
    state.sign = payload;
  },
  [types.GET_BGP_PRODUCTS](state, payload) {
    state.products = payload;
  },
  [types.GET_BANNER_LIST](state, payload) {
    state.bannerList = payload;
  },
  [types.GET_BGP_RECORD](state, payload) {
    state.recordList = payload;
  },
  [types.GET_BGP_DETAIL_LIST](state, payload) {
    state.detailList = payload;
  },
};

const actions = {
  async sign({ commit }) {
    try {
      const response = await ActivityService.sign();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_SIGN_INFO, data);
    } catch (error) {
      throw error;
    }
  },

  // 首页数据列表
  async getBgpProducts({ commit }) {
    try {
      const response = await ActivityService.getBgpProducts();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_PRODUCTS, data);
    } catch (error) {
      throw error;
    }
  },
  // 首页banner
  async getBanner({ commit }) {
    try {
      const response = await ActivityService.getBanner();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BANNER_LIST, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取用户BGP记录
  async getBGPRecord({ commit }) {
    try {
      const response = await ActivityService.getBGPRecord();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_RECORD, data);
    } catch (error) {
      throw error;
    }
  },

  // 获取用户BGP记录
  async getBGPDetailList({ commit }) {
    try {
      const response = await ActivityService.getBGPDetailList();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_BGP_DETAIL_LIST, data);
    } catch (error) {
      throw error;
    }
  },
  //
  async getBgpProductDetail({ commit }, id) {
    try {
      const response = await ActivityService.getBgpProductDetail(id);
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_PRODUCT_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },

  async getBgpTransferDetails({ commit }) {
    try {
      const response = await ActivityService.getBgpTransferDetails();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_TRANSFER_DETAILS, data);
    } catch (error) {
      throw error;
    }
  },

  async getBgpTransferHistory({ commit }) {
    try {
      const response = await ActivityService.getBgpTransferHistory();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_TRANSFER_HISTORY, data);
    } catch (error) {
      throw error;
    }
  },

  async addOrUpdateAddress({ commit }, params) {
    try {
      const response = await ActivityService.addOrUpdateAddress(params);
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_TRANSFER_HISTORY, data);
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
