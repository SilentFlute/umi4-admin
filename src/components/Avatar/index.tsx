import type { FC } from 'react';
import { connect } from 'umi';
import { Dropdown, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import type { UserConnectedProps } from '@/models/user';
import './index.less';

const Avatar: FC<UserConnectedProps> = (props) => {
  const {
    user: { data }, dispatch,
  } = props;

  const handleLogout = () => {
    dispatch?.({
      type: 'user/logout',
    });
  };

  const items = [
    {
      key: 'logout',
      label: (
        <a
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0 8px',
          }}
        >
          <LogoutOutlined />
          <span>退出登录</span>
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
    >
      <Space className="avatar-container">
        <img
          alt="avatar"
          src={data.avatar}
          className="avatar"
        />
        <span className="username">{data.name}</span>
      </Space>
    </Dropdown>
  );
};

export default connect(
  ({ user }: { user: UserConnectedProps['user'] }) => ({
    user,
  }),
)(Avatar);
