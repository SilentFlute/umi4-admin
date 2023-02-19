import { FC } from 'react';
import Access from '@/components/Access';
import authority from './_authority';

const { aboutMUpdate } = authority;

const Index: FC = () => {

  return (
    <div>
      <div>/about/m</div>
      <Access
        authority={aboutMUpdate}
        fallback={
          <div>冇权限显示/操作页面内的元素</div>
        }
      >
        <div>有权限显示/操作页面内的元素</div>
      </Access>
    </div>
  );
};

export default Index;