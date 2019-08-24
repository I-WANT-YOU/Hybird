import { get } from 'lodash';
import * as types from '../../mutationTypes';
import raceService from '@/api/raceInfo';
import { handlerSuccessResponse } from '@/utils/auth';

const state = {
  teamDetailInfo: {},
  homeInfo: {}, // 首页主要信息
  top1: [],
  homeComments: {}, // 评论
  homeReports: {}, // 媒体报道
};
// sorted_list
const getters = {
  top: state => get(state.top1, 'list', []),
  tabList: state => get(state.homeInfo, 'sorted_list', []),
  commentList: state => get(state.homeComments, 'sorted_list', []),
  updateTime: state => get(state.homeInfo, 'update_time', 1566389006000),
};
const mutations = {
  [types.GET_TEAM_DETAIL](state, payload) {
    state.teamDetailInfo = { ...payload };
  },
  [types.GET_HOME_DATA](state, payload) {
    state.homeInfo = { ...payload };
  },
  [types.GET_HOME_COMMENTS](state, payload) {
    state.homeComments = { ...payload };
  },
  [types.GET_HOME_REPORTS](state, payload) {
    state.homeReports = { ...payload };
  },
  [types.GET_HOME_TOP1](state, payload) {
    state.top1 = { ...payload };
  },
};

const actions = {
  // 获取团队详细信息
  async getTeamDetailInfo({ commit }, teamId) {
    try {
      const response = await raceService.getTeamDetailInfo(teamId);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_TEAM_DETAIL, data);
    } catch (error) {
      throw error;
    }
  },
  // 获取首页主要信息
  async getHomeData({ commit }, { type, symbol }) {
    try {
      const response = await raceService.getHomeData(type, symbol);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_HOME_DATA, data);
    } catch (error) {
      throw error;
    }
  },
  // 获取首页top
  async getHomeTop1({ commit }, teamId) {
    try {
      const response = await raceService.getHomeTop1(teamId);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_HOME_TOP1, data);
    } catch (error) {
      throw error;
    }
  },
  // 获取首页精彩评论
  async getHomeComments({ commit }, teamId) {
    try {
      const response = await raceService.getHomeComments(teamId);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_HOME_COMMENTS, data);
    } catch (error) {
      throw error;
    }
  },
  // 获取首页媒体报道
  async getHomeReports({ commit }, teamId) {
    try {
      const response = await raceService.getHomeReports(teamId);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_HOME_REPORTS, data);
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
