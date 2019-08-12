import * as Auth from '@utils/auth';
import UserService from '@api/user';
import * as types from '../mutationTypes';

const state = {
  basicInfo: {},
  balance: [],
};

const getters = {
};

const mutations = {
  [types.GET_USER_SUMMARY](state, payload) {
    state.basicInfo = payload;
  },
  [types.GET_USER_BALANCE_SUMMARY](state, payload) {
    state.balance = payload;
  },
};

const actions = {
  // 获取用户信息
  async getUserSummary({ commit }) {
    try {
      const response = await UserService.getUserSummary();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_SUMMARY, data);
    } catch (error) {
      throw error;
    }
  },
  async getUserBalanceSummary({ commit }) {
    try {
      const response = await UserService.getUserBalanceSummary();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_BALANCE_SUMMARY, data);
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
