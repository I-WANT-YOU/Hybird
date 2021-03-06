import request from '@utils/request';
import requestV2 from '@utils/requestV2';
import { handlerResponse } from '@utils/auth';

class AssetsService {
  // 获取队伍详细信息
  static async getTeamDetailInfo(teamId) {
    try {
      const requestOptions = {
        url: `/fcat/get-team-detail-end/${teamId}`,
        method: 'get',
      };
      const response = await requestV2(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取首页主要信息
  static async getHomeData(type, symbol) {
    try {
      const requestOptions = {
        url: '/fcat/get-fcat-rank-end',
        method: 'post',
        data: {
          fund_product_type: type,
          symbol,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取首页主要信息
  static async getHomeTop1() {
    try {
      const requestOptions = {
        url: '/fcat/get-top1',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取首页精彩评论
  static async getHomeComments() {
    try {
      const requestOptions = {
        url: '/fcat/get-comments',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取首页报道
  static async getHomeReports() {
    try {
      const requestOptions = {
        url: '/fcat/news/get-publish-news',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取榜单信息
  static async getRank(fundType) {
    try {
      const requestOptions = {
        url: '/fcat/get-fcat-rank-by-date',
        method: 'post',
        data: {
          fund_product_type: fundType,
          symbol: 'all',
          date: '2019-08-23',
        },
      };
      const response = await requestV2(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 二期首页
  static async getRaceHome() {
    try {
      const requestOptions = {
        url: '/cat/index',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 二期首页排行榜（包含首页排行榜 历史列表和详情 总共一个接口）
  static async getRaceRankingList() {
    try {
      const requestOptions = {
        url: '/cat/index/season2',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      return (error);
    }
  }

  // 二期详情
  static async getRaceDetail(detailId) {
    try {
      const requestOptions = {
        url: `/cat/detail/${detailId}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AssetsService;
