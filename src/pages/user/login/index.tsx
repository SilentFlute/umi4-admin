import type { FC } from 'react';
import { useState, Fragment } from 'react';
import { Alert, message, Tabs } from 'antd';
import { SelectLang, connect } from 'umi';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import { retrieveCaptcha } from '@/services/user';
import type { UserConnectedProps } from '@/models/user';
import styles from './index.less';

const LoginMessage: FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Index: FC<UserConnectedProps> = (props) => {
  const [ type, setType ] = useState<string>('account');
  const { user, dispatch } = props;

  const handleSubmit = async (values: API.LoginParams) => {
    dispatch({
      type: 'user/login',
      payload: values
    });
  };

  const { data, loginBtnLoading } = user;

  const { status, type: loginType } = data;

  return (
    <div className={styles.container}>
      <div
        className={styles.lang}
        data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={
            <img
              alt="logo"
              src="/logo.svg"
            />
          }
          title="Ant Design"
          subTitle="Ant Design 是西湖区最具影响力的 Web 设计规范"
          initialValues={{
            autoLogin: true
          }}
          submitter={{
            submitButtonProps: {
              loading: loginBtnLoading
            }
          }}
          actions={[
            '其他登录方式',
            <AlipayCircleOutlined
              key="AlipayCircleOutlined"
              className={styles.icon} />,
            <TaobaoCircleOutlined
              key="TaobaoCircleOutlined"
              className={styles.icon} />,
            <WeiboCircleOutlined
              key="WeiboCircleOutlined"
              className={styles.icon} />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            centered
            activeKey={type}
            onChange={setType}
            items={[
              {
                key: 'account',
                label: '账户密码登录'
              },
              {
                key: 'mobile',
                label: '手机号登录'
              }
            ]}
          />
          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content="账户或密码错误(admin/ant.design)"
            />
          )}
          {type === 'account' && (
            <Fragment>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="用户名: admin or user"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="密码: ant.design"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </Fragment>
          )}
          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <Fragment>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder="验证码"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} 获取验证码`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const res = await retrieveCaptcha({
                    phone,
                  });
                  if (res.code) {
                    return;
                  }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </Fragment>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox
              noStyle
              name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default connect(
  ({ user }: { user: UserConnectedProps['user'] }) => ({
    user
  })
)(Index);
