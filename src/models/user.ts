import { history } from 'umi';
import {
  userLogin, retrieveUserInfo, retrieveUserInfoAuthorityMenu, userLogout,
  retrieveUserAuthorityMenu,
} from '@/services/user';
import type { Effect, Reducer, ConnectProps } from 'umi';
import handleRedirect from '@/utils/handleRedirect';
import handleGetRootSubmenuKeys from '@/utils/handleGetRootSubmenuKeys';
import handleGetEachDatumFromNestedDataByKey from '@/utils/handleGetEachDatumFromNestedDataByKey';
import handleGetIndexValidMenuItemByPath from '@/utils/handleGetIndexValidMenuItemByPath';

/**
 * 全局用户数据
 * @description isLogin 是否登录过
 * @description data 用户信息
 * @description menu 菜单数据
 * @description authority 权限数组
 * @description loginBtnLoading 按钮loading状态
 * @description rootSubmenuKeys 子菜单的父级菜单key
 * @description layoutWrapperLoading 布局外层容器loading状态
 * @description indexAllMenuItemById 通过id索引索引菜单项的映射
 * @description indexAllMenuItemByPath 通过path索引所有菜单项的映射
 * @description indexValidMenuItemByPath 通过path索引有效菜单项的映射
 */
type UserModelState = {
  isLogin: boolean;
  data: API.UserInfo;
  menu: API.MenuData;
  authority: string[];
  loginBtnLoading: boolean;
  rootSubmenuKeys: React.Key[];
  layoutWrapperLoading: boolean;
  indexAllMenuItemById: IndexAllMenuItemByKey<'id'>;
  indexValidMenuItemByPath: IndexValidMenuItemByPath;
  indexAllMenuItemByPath: IndexAllMenuItemByKey<'path'>;
}

export type UserConnectedProps = {
  user: UserModelState;
} & ConnectProps;

type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
    resetLoginStatus: Effect;
    getUserInfoAuthorityMenu: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
  };
}

/**
 * 请求顺序
 * @description 并发 | 继发
 */
type ReqOrder = 'concurrent' | 'relay';

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    data: {},
    authority: [],
    isLogin: false,
    rootSubmenuKeys: [],
    loginBtnLoading: false,
    layoutWrapperLoading: true,
    menu: [
      {
        id: 1,
        key: '1',
        path: '/',
        label: '首页',
        redirect: '',
      },
    ],
    indexAllMenuItemById: {
      1: {
        id: 1,
        key: '1',
        path: '/',
        label: '首页',
        redirect: '',
      },
    },
    indexAllMenuItemByPath: {
      '/': {
        id: 1,
        key: '1',
        path: '/',
        label: '首页',
        redirect: '',
      },
    },
    indexValidMenuItemByPath: {
      '/': {
        id: 1,
        key: '1',
        path: '/',
        label: '首页',
        redirect: '',
      },
    },
  },
  effects: {
    //登录
    *login({ payload }, { call, put }) {

      yield put({
        type: 'save',
        payload: {
          loginBtnLoading: true,
        },
      });

      const res: API.LoginResponse = yield call(userLogin, payload);

      //登录成功之后设置token并获取用户信息等数据
      if (!res.code) {
        localStorage.setItem('Authorization', res.data.token);

        yield put({
          type: 'getUserInfoAuthorityMenu',
          payload: {
            type: 'concurrent',
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            loginBtnLoading: false,
          },
        });
      }
    },
    //获取用户信息和权限以及菜单
    *getUserInfoAuthorityMenu({ payload }, { call, put }) {
      const { type }: { type: ReqOrder } = payload;
      
      let userInfoRes: API.UserInfoResponse = {
        data: {},
        code: 0,
        message: '',
      };

      let userAuthorityRes: API.UserAuthorityResponse = {
        data: {
          authority: [],
        },
        code: 0,
        message: '',
      };

      let menuRes: API.MenuDataResponse = {
        data: [],
        code: 0,
        message: '',
      };

      //用户在登录页登录完成之后执行
      if (type === 'concurrent') {
        const res: API.UserInfoAuthMenuResponse = yield call(retrieveUserInfoAuthorityMenu);
        userInfoRes = res[0] as API.UserInfoResponse;
        userAuthorityRes = res[1] as API.UserAuthorityResponse;
        menuRes = res[2] as API.MenuDataResponse;
      } else {
        //其他情形首先查询用户的登录状态, 未登录则不继续操作
        try {
          userInfoRes = yield call(retrieveUserInfo);
        } catch (error) {
          //接口报错了, 比如返回了401
          yield put({
            type: 'save',
            payload: {
              layoutWrapperLoading: false,
            },
          });

          return false;
        }

        const res: API.UserAuthMenuResponse = yield call(retrieveUserAuthorityMenu);
        userAuthorityRes = res[0] as API.UserAuthorityResponse;
        menuRes = res[1] as API.MenuDataResponse;
      }

      const indexAllMenuItemByPath = handleGetEachDatumFromNestedDataByKey(menuRes.data, 'path');
      const indexValidMenuItemByPath = handleGetIndexValidMenuItemByPath(menuRes.data);

      //在登录完获取菜单数据之后做是否需要重定向的操作
      yield call(
        handleRedirect,
        window.location.pathname === '/user/login',
        indexAllMenuItemByPath,
        indexValidMenuItemByPath,
      );

      yield put({
        type: 'save',
        payload: {
          isLogin: true,
          menu: menuRes.data,
          data: userInfoRes.data,
          loginBtnLoading: false,
          indexAllMenuItemByPath,
          indexValidMenuItemByPath,
          layoutWrapperLoading: false,
          authority: userAuthorityRes.data.authority,
          rootSubmenuKeys: handleGetRootSubmenuKeys(menuRes.data),
          indexAllMenuItemById: handleGetEachDatumFromNestedDataByKey(menuRes.data, 'id'),
        },
      });

      //为保证所有语句都return, 因此这里加一句这个
      return true;
    },
    //登出
    *logout({ payload }, { call, put }) {
      const res: API.LogoutResponse = yield call(userLogout, payload);

      if (!res.code) {
        yield put({
          type: 'resetLoginStatus',
        });
      }
    },
    //重置登录状态
    *resetLoginStatus(_, { put }) {
      localStorage.removeItem('Authorization');
      
      yield put({
        type: 'save',
        payload: {
          isLogin: false,
          loginBtnLoading: false,
        },
      });
      
      //当前页面不是登录页, 且没有redirect参数的时候再设置redirect参数
      //而且这个redirect参数要包含url pathname和查询字符串参数, 即pathname及其后面的所有字符
      if (window.location.pathname !== '/user/login') {
        if (!/redirect=/.test(window.location.search)) {
          const redirectValue = `${window.location.pathname}${window.location.search}`;
          history.push(`/user/login?redirect=${encodeURIComponent(redirectValue)}`);
        }
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default UserModel;
