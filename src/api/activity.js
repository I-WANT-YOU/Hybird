import request from '@utils/request';
import { handlerResponse } from '@/utils/auth';

class ActivityService {
  static async login({ username, password, geetestOptions }) {
    try {
      const requestOptions = {
        url: '/auth/signin',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: {
          username,
          password,
          ...geetestOptions,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getGeetestOptions() {
    try {
      const requestOptions = {
        url: '/auth/get-geetest-settings',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ActivityService;
