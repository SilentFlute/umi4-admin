import { Fragment, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import { Spin } from 'antd';
import { Helmet, useLocation, connect } from 'umi';
import type { UserConnectedProps } from '@/models/user';
import LoginPage from '@/pages/user/login';
import cfg from '../../config/config';

type Props = {
  children: ReactElement;
} & UserConnectedProps;

//登录页不走/src/layouts, 登录完之后的页面才走/src/layouts
const LayoutWrapper: FC<Props> = (props) => {
  const { pathname } = useLocation();
  const {
    dispatch, children,
    user: { isLogin, layoutWrapperLoading, indexValidMenuItemByPath },
  } = props;
  const tabTitle = indexValidMenuItemByPath[pathname]?.label;
  const projectTitle = cfg.title;
  const title = tabTitle ? `${tabTitle} - ${projectTitle}` : projectTitle;

  useEffect(
    () => {
      //调用户信息相关接口查询登录状态(401表示未登录)
      dispatch?.({
        type: 'user/getUserInfoAuthorityMenu',
        payload: {
          type: 'relay',
        },
      });
    },
    [ dispatch ],
  );

  //进任何页面都需要先loading
  let pageContent = (
    <Spin
      size="large"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );

  //页面不loading
  /**
    一开始我是这么写的:
    if(!layoutWrapperLoading) {
      if(isLogin){
        if(pathname === '/user/login') {
          登录过了, 此时页面url还是登录页的时候我希望不再进入登录页而是直接跳转离开
          handleRedirect();
          这里如果使用了history.push则会报如下的错误:
          Warning: Cannot update a component (`BrowserRoutes`) while rendering a different component (`LayoutWrapper`).
          To locate the bad setState() call inside `LayoutWrapper`, follow the stack trace as described in
          https://reactjs.org/link/setstate-in-render
          大意是不能在render的时候更新路由, 也就是调history.push更新BrowserRoutes
          使用window.location.href = 'xxx';的方式用户会再一次看到整个页面的loading, 体验不好
          后来我将逻辑写到用户登录状态确认之后, 也就是全局状态管理中: /src/models/user.ts就可以了
          搜索 handleRedirect 即可找到相应的代码
        }
      }
    }
   */
  if(!layoutWrapperLoading) {
    if(isLogin) {
      if(pathname !== '/user/login') {
        pageContent = children;
      }
    }else{
      //只要没登陆过就渲染登录页而不是跳转到登录页, 因为登录页不走/src/layouts
      pageContent = <LoginPage />;
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {pageContent}
    </Fragment>
  );
};

export default connect(
  ({ user }: { user: UserConnectedProps['user'] }) => ({
    user,
  }),
)(LayoutWrapper);
