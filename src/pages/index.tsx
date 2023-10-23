import { PureComponent } from 'react';
import { connect } from 'umi';
import type { UserConnectedProps } from '@/models/user';

class Index extends PureComponent<UserConnectedProps> {

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
  ({ user }: { user: UserConnectedProps['user'] }) => ({
    user,
  }),
)(Index);
