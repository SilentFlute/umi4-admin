import { useParams } from 'umi';

const Index = () => {

  const params = useParams();
  
  console.log(params);

  return (
    <div>{`/about/u/${params.id}`}</div>
  );
};

export default Index;
