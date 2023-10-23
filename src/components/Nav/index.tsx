import type { FC } from 'react';
import { Link } from 'umi';
import Avatar from '../Avatar';
import './index.less';

const Nav: FC = () => {

  return (
    <div className="container">
      <div className="former">
        <div className="left">
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0 15px',
              lineHeight: 1,
            }}
          >
            <img
              alt="logo"
              src="/logo.svg"
              className="logo"
            />
            <h1
              style={{
                margin: 0,
                color: '#fff',
                fontSize: '18px',
              }}
            >UMI4 Admin</h1>
          </Link>
        </div>
      </div>
      <div className="latter">
        <Avatar />
      </div>
    </div>
  );
};

export default Nav;
