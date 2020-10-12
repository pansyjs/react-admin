import React from 'react';
import { notification } from 'antd';
import { ResponseError } from 'umi-request';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { history, RequestConfig } from 'umi';
import { fetchCurrent } from '@/services/user';
import RightContent from '@/components/right-content';
import Footer from '@/components/footer';
import { NO_LOGIN_WHITELIST } from '@/config';
import { getCookie, removeCookie } from '@/utils/cookie';
import logo from '@/assets/logo.svg';
import defaultSettings from '../config/default-settings';

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { data } = await fetchCurrent();
      return data;
    } catch (error) {
      history.push('/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (NO_LOGIN_WHITELIST.indexOf(history.location.pathname) === -1) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;

      // 如果没有登录，重定向到 login
      if (!currentUser?.userid && NO_LOGIN_WHITELIST.indexOf(location.pathname) === -1) {
        history.push('/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
    logo: logo
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  const httpCode = error?.response?.status;

  // 登录过期
  if (httpCode === 401) {
    removeCookie();
    history.replace('/login');
    return;
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.code === 200,
        errorMessage: resData.message,
      }
    }
  },
  requestInterceptors: [
    (url, options) => {
      const token = getCookie();
      // token 不存在，则跳转到登录页面
      if (!token) {
        removeCookie();
        history.replace('/login');
      }
      return {
        url: `${url}`,
        options: {
          ...options,
          headers: {
            ...options.headers,
            authorization: `Bearer ${token}`
          }
        },
      };
    }
  ]
};

// antd 配置
// 具体请查看 https://ant.design/components/config-provider-cn/#API
export const antd: ConfigProviderProps = {
  autoInsertSpaceInButton: false
}
