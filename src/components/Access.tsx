import type { FC, ReactElement } from 'react';
import { ConnectProps, connect } from 'umi';
import type { UserModelState } from '@/models/user';

type Props = {
  authority: string;
  user: UserModelState;
  children: ReactElement;
  fallback?: ReactElement;
} & ConnectProps;

//处理页面元素权限的组件
const Access: FC<Props> = (props): ReactElement | null => {
  const { user, authority, fallback, children } = props;
  const { authority: userAuthority } = user;
  const accessible = userAuthority.some((item: string) => item === authority);

  let res = null;

  if(accessible) {
    res = children;
  }else if(fallback) {
    res = fallback;
  }

  return res;
};

export default connect(
  ({ user }: { user: UserModelState }) => ({
    user
  })
)(Access);