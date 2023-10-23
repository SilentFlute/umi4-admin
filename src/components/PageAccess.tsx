import type { FC, ReactElement } from 'react';
import { connect, history, useLocation } from 'umi';
import { Button, Result } from 'antd';
import authority from '@/pages/authority';
import type { UserConnectedProps } from '@/models/user';

type Props = {
  children: ReactElement;
} & UserConnectedProps;

//处理页面权限的组件, 放置在所有需要鉴权的页面的最外层
const PageAccess: FC<Props> = (props): ReactElement | null => {
  const { user, children } = props;
  const { authority: userAuthority } = user;
  const { pathname } = useLocation();
  //可选操作符用来处理子路由跳转的情形, 因为这里的权限都是有效路由的权限,
  //当遇到输入的是菜单组件中可展开的节点的path的时候就没有权限了, 此时可能会报错,
  //加可选操作符可避免这个报错导致的页面渲染问题
  const accessible = authority[pathname]?.some((item: string) => userAuthority.indexOf(item) !== -1);

  let res = children;

  if(!accessible) {
    res = (
      <Result
        title="403"
        status="403"
        subTitle="对不起, 您没有访问此页面的权限"
        extra={(
          <Button
            type="primary"
            onClick={
              () => history.push('/')
            }
          >返回首页</Button>
        )}
      />
    );
  }

  return res;
};

export default connect(
  ({ user }: { user: UserConnectedProps['user'] }) => ({
    user,
  }),
)(PageAccess);
