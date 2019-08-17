import { get } from 'lodash';
import * as Auth from '@utils/auth';
import UserService from '@api/user';
import * as types from '../mutationTypes';

const state = {
  basicInfo: {},
  balance: [],
  isSignInInfo: {},
  referInfo: {},
};

const getters = {
  bonusSummary: state => get(state.referInfo.bonus_summary, 'all', 0),
  inviteeDetailsList: state => get(state.referInfo, 'invitee_details_list', []),
  rewardRecordList: state => get(state.referInfo, 'reward_record_list', []),
  everyTokens: state => get(state.referInfo.bonus_summary, 'every_tokens', {}),
};

const mutations = {
  [types.GET_USER_SUMMARY](state, payload) {
    state.basicInfo = payload;
  },
  [types.GET_USER_BALANCE_SUMMARY](state, payload) {
    state.balance = payload;
  },
  [types.GET_USER_IS_SIGN_IN](state, payload) {
    state.isSignInInfo = payload;
  },
  [types.GET_USER_REFER](state, payload) {
    state.referInfo = payload;
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

  // 判断用户是否签到
  async getUserIsSignIn({ commit }) {
    try {
      const response = await UserService.getUserIsSignIn();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_IS_SIGN_IN, data);
    } catch (error) {
      throw error;
    }
  },

  // 邀友返利
  async getReferInfo({ commit }) {
    try {
      const response = await UserService.getReferInfo();
      const data = await Auth.handlerSuccessResponse(response);
      commit(types.GET_USER_REFER, data);
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
