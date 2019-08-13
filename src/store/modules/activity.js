import { get } from 'lodash';
import * as Auth from '@utils/auth';
import ActivityService from '@api/activity';
import router from '@router/index';
import * as types from '../mutationTypes';

const state = {
  sign: {},
  products: {},
  product: {},
  address: {},
  buyResult: {},
};

const getters = {
  isEnoughBgp: state => get(state.product, 'fbpis_enough', true),
  isEnoughLevel: state => get(state.product, 'in_membership_level', true),
  isEnoughStock: state => get(state.product, 'stock', -1) !== 0,
  orderId: state => get(state.buyResult, 'order_id', -1),
};

const mutations = {
  [types.GET_SIGN_INFO](state, payload) {
    state.sign = payload;
  },
  [types.GET_BGP_PRODUCTS](state, payload) {
    state.products = payload;
  },
  [types.GET_BGP_PRODUCT_DETAIL](state, payload) {
    state.product = payload;
  },
  [types.GET_ADDRESS_DETAIL](state, payload) {
    state.address = payload;
  },
  [types.GET_PRODUCT_BUY_RESULT](state, payload) {
    state.buyResult = payload;
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

  async getBgpProducts({ commit }) {
    try {
      const response = await ActivityService.getBgpProducts();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_PRODUCTS, data);
    } catch (error) {
      throw error;
    }
  },

  async getBgpProductDetail({ commit }, id) {
    try {
      const response = await ActivityService.getBgpProductDetail(id);
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_BGP_PRODUCT_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },

  async buyBgpProduct(context, id) {
    try {
      const response = await ActivityService.buyBgpProduct(id);
      const data = await Auth.handlerSuccessResponseV2(response);
      router.push({
        name: 'product-result',
        params: {
          id,
          orderId: data.order_id,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async getBuyProductResultByOrderId({ commit }, id) {
    try {
      const response = await ActivityService.getBuyProductResultByOrderId(id);
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_PRODUCT_BUY_RESULT, data);
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
  async getAddressDetail({ commit }) {
    try {
      const response = await ActivityService.getAddressDetail();
      const data = await Auth.handlerSuccessResponseV2(response);
      commit(types.GET_ADDRESS_DETAIL, data);
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
