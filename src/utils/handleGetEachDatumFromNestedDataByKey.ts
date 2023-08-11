/**
 * 获取 从嵌套数据中通过key索引每一条数据的映射 的方法
 * @param data 数据
 * @param key 数据的key
 * @returns 通过key索引每一条数据的映射
 */
const handleGetEachDatumFromNestedDataByKey = <T extends { children?: T[] }>(
  data: T[],
  key: keyof T //确定key的类型为T的键名
): Record<string, T> => {
  //显式声明byKey的类型
  let byKey: Record<string, T> = {};

  data.forEach((datum) => {
    //添加类型检查, 避免undefined作为对象的键名
    if(typeof datum[key] !== 'undefined') {
      //强制转换为字符串类型, 避免非字符串类型作为对象的键名
      byKey[String(datum[key])] = datum;
    }

    if(datum.children) {
      byKey = {
        ...byKey,
        ...handleGetEachDatumFromNestedDataByKey(datum.children, key)
      };
    }
  });

  return byKey;
};

export default handleGetEachDatumFromNestedDataByKey;
