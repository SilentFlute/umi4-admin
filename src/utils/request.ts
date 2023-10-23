import axios from 'axios';
import { getDvaApp } from 'umi';
import { notification } from 'antd';
import type { AxiosRequestHeaders } from 'axios/index';

const { UMI_APP_BASEURL } = process.env;

const instance = axios.create({ baseURL: UMI_APP_BASEURL });

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: localStorage.getItem('Authorization') || '',
    } as AxiosRequestHeaders;

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  //状态码为2xx的时候执行
  (response) => {
    const { data } = response;
    const { code } = data;

    if (code) {
      notification.error({
        message: data.message,
      });
    }

    return data;
  },
  //状态码不为2xx的时候执行
  (error) => {
    const { response } = error;
    const { status } = response;

    enum CodeMessage {
      '发出的请求有错误，服务器没有进行新建或修改数据的操作。' = 400,
      '用户未登录。' = 401,
      '用户得到授权，但是访问是被禁止的。' = 403,
      '发出的请求针对的是不存在的记录，服务器没有进行操作。' = 404,
      '请求的格式不可得。' = 406,
      '请求的资源被永久删除，且不会再得到的。' = 410,
      '当创建一个对象时，发生一个验证错误。' = 422,
      '服务器发生错误，请检查服务器。' = 500,
      '网关错误。' = 502,
      '服务不可用，服务器暂时过载或维护。' = 503,
      '网关超时。' = 504
    }

    notification.error({
      message: response.data.message || CodeMessage[status],
    });

    if (status === 401) {
      const {
        _store: { dispatch },
      } = getDvaApp();

      dispatch({
        type: 'user/resetLoginStatus',
      });
    }

    return Promise.reject(error);
  },
);

export default instance;
