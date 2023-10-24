import { useParams } from 'umi';

const Index = () => {

  const params = useParams();
  
  console.log(params);

  return (
    <div>{`动态路由: /about/u/${params.id}`}</div>
  );
};

export default Index;
