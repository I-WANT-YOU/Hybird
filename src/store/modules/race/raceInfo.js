import { get } from 'lodash';
import { formatDate } from '@utils/tools';
import raceService from '@/api/raceInfo';
import { handlerSuccessResponse, handlerSuccessResponseV2 } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  teamDetailInfo: {
    allYearData: [],
    halfYearData: [],
    monthData: [],
    weekData: [],
  },
  homeInfo: {}, // 首页主要信息
  top1: [],
  homeComments: {}, // 评论
  homeReports: {}, // 媒体报道
  rankList: {},
  // 二期
  raceHome: {},
  raceDetail: {},
};
// sorted_list
const getters = {
  top: state => get(state.top1, 'list', []),
  tabList: state => get(state.homeInfo, 'sorted_list', []),
  commentList: state => get(state.homeComments, 'sorted_list', []),
  updateTime: state => get(state.homeInfo, 'update_time', 1566389006000),
  historyList: state => get(state.rankList, 'sorted_list', []),
  allYearData: state => state.teamDetailInfo.return_rate_data,
  halfYearData: state => state.teamDetailInfo.half_year_rate_data,
  monthData: state => state.teamDetailInfo.month_rate_data,
  weekData: state => state.teamDetailInfo.week_rate_data,
  // 二期
  featuredProducts: state => get(state.raceHome, 'featured_products', []),
  upDate: state => get(state.raceHome, 'update_time', '2019-09-18T06:00:00'),
  comments: state => get(state.raceHome, 'comments', []),
  mediaReports: state => get(state.raceHome, 'media_reports', []),
  rankingAll: state => get(state.raceHome, 'ranking_all', []),
  rankingCTA: state => get(state.raceHome, 'ranking_cta', []),
  rankingMarketNeutral: state => get(state.raceHome, 'ranking_market_neutral', []),
  rankingUnlimited: state => get(state.raceHome, 'ranking_unlimited', []),
  // 二期详情
  productName: state => get(state.raceDetail, 'productName', '产品名称'), // 产品名称
  createDate: state => formatDate(get(state.raceDetail, 'establishDate', '2019-09-20 06:00'), 'YYYY.MM.DD'), // 成立日期
  size: state => get(state.raceDetail, 'size', '0'), // 当前规模
  sharpeRatio: state => get(state.raceDetail, 'sharpeRatio', '0'), // 夏普率
  maxDrawDownRate: state => get(state.raceDetail, 'maxDrawDownRate', '0'), // 最大回撤
  calmarRatio: state => get(state.raceDetail, 'calmarRatio', '0'), // 卡玛比
  benchmarkNav: state => get(state.raceDetail, 'benchmarkNav', '0'), // 基准净值
  nav: state => get(state.raceDetail, 'nav', '0'), // 基准净值
  change: state => get(state.raceDetail, 'change', '0'), // 上升
  pnl: state => get(state.raceDetail, 'pnl', '0'), // 赛季净盈亏
  roiSeason: state => get(state.raceDetail, 'roi_season', '0'), // 赛季ROI
  roiAnnual: state => get(state.raceDetail, 'roi_annual', '0'), // 年化收益率
  ror7Days: state => get(state.raceDetail, 'ror7Days', '0'), // 近一周
  rank7Days: state => get(state.raceDetail, 'rank7Days', '0'), // 近一周排名
  ror28Days: state => get(state.raceDetail, 'ror28Days', '0'), // 近一月
  rank28Days: state => get(state.raceDetail, 'rank28Days', '0'), // 近一月排名
  ror: state => get(state.raceDetail, 'ror', '0'), // 成立以来
  rank: state => get(state.raceDetail, 'rank', '0'), // 成立以来排名
  margin: state => get(state.raceDetail, 'margin', '0'), // 净杠杆
  profile: state => get(state.raceDetail, 'profile', {}), // 团队介绍
  navDate: state => get(state.raceDetail, 'navData', []), // 净值
  compareData: state => get(state.raceDetail, 'compareData', []), // Bgain指数
  weekDataTwo: state => get(state.raceDetail, 'week_rate_data', []), // 周
  monthDataTwo: state => get(state.raceDetail, 'month_rate_data', []), // 月
  halfYearDataTwo: state => get(state.raceDetail, 'half_year_rate_data', []), // 半年
  allYearDataTwo: state => get(state.raceDetail, 'return_rate_data', []), // 全部
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
  [types.GET_RANK_LIST](state, payload) {
    state.rankList = { ...payload };
  },
  // 二期
  [types.GET_RACE_HOME](state, payload) {
    state.raceHome = { ...payload };
  },
  [types.GET_RACE_DETAIL](state, payload) {
    state.raceDetail = { ...payload };
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

  // 获取排行榜
  async getRank({ commit }, fundType) {
    try {
      const response = await raceService.getRank(fundType);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_RANK_LIST, data);
    } catch (error) {
      throw error;
    }
  },

  // 二期首页
  async getRaceHome({ commit }) {
    try {
      const response = await raceService.getRaceHome();
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_RACE_HOME, data);
    } catch (error) {
      throw error;
    }
  },

  // 二期详情
  async getRaceDetail({ commit }, detailId) {
    try {
      const response = await raceService.getRaceDetail(detailId);
      const data = await handlerSuccessResponseV2(response);
      commit(types.GET_RACE_DETAIL, data);
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
