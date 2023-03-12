/**
 * 获取 从嵌套数据中通过key索引每一条数据的映射 的方法
 * @param data 数据
 * @param key 数据的key
 * @returns 通过key索引每一条数据的映射
 */
const handleGetEachDatumFromNestedDataByKey = <T extends { children?: T[] }>(
  data: T[],
  key: string
): Record<string, T> => {
  let byKey = {};

  data.forEach((datum) => {
    byKey[datum[key]] = datum;

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