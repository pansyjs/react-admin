import axios from 'axios';
import router from 'umi/router';
import { message, notification } from 'antd';
import { AJAX_DEFAULT_CONFIG } from '@/config';
import {
  requestSuccess,
  requestFail,
  responseSuccess,
  responseFail
} from '@/config/interceptors/axios';

axios.defaults.timeout = AJAX_DEFAULT_CONFIG.timeout;
axios.defaults.baseURL = AJAX_DEFAULT_CONFIG.baseURL;
axios.defaults.withCredentials = AJAX_DEFAULT_CONFIG.withCredentials;

// 添加拦截器
axios.interceptors.request.use(requestSuccess, requestFail);
axios.interceptors.response.use(responseSuccess, responseFail);

export const request = (config) => {
  return axios(config)
    .then((response) => {
      if (response.data && response.data.code !== 200) {
        message.error(response.data.message);
      }
      return response;
    })
    .catch((error) => {
      if (!error.response) {
        return console.log('Error', error.message);
      }

      const status = error.response.status;

      notification.error({
        message: `请求错误 ${status}`,
        description: ''
      });

      if (status === 401) {
        router.push('/user/login');
      }

      // 开发调试
      console.log(
        `【${config.method} ${config.url}】请求失败，响应数据：%o`,
        error.response
      );

      return { code: status, message: '' };
    });
};
