import axios from 'axios';

import * as Auth from './auth';
import baseUrl from '../config/baseUrl';

const request = axios.create({
  timeout: 5000,
  baseURL: baseUrl,
});

request.interceptors.request.use(
  (config) => {
    const requestConfig = config;
    const accessToken = Auth.getToken();
    const appType = Auth.getClientType();
    const type = 'Client-OS';

    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (appType) {
      requestConfig.headers[type] = appType;
    }

    requestConfig.headers.language = 'ZH_CN';

    return requestConfig;
  },
  error => Promise.reject(error),
);

request.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      Auth.removeToken();
    }
    return Promise.reject(error);
  },
);

export default request;
