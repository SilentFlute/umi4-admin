import type { FC } from 'react';
import { history } from 'umi';
import { Button, Result } from 'antd';

const _404: FC = () => {

  return (
    <Result
      title="404"
      status="404"
      subTitle="对不起, 您访问的页面不存在"
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
};

export default _404;
