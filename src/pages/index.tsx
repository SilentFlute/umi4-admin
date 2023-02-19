import { PureComponent } from 'react';
import { ConnectProps, connect } from 'umi';
import type { UserModelState } from '@/models/user';

type Props = {
  user: UserModelState;
} & ConnectProps;

class Index extends PureComponent<Props> {

  render() {
    const { user } = this.props;
    const { data } = user;
    const { name } = data;

    return (
      <div>{name}</div>
    );
  }
}

export default connect(
  ({ user }: { user: UserModelState }) => ({
    user
  })
)(Index);