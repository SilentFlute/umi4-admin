/**
 * 递归处理嵌套数据的方法
 * @param data 数据
 * @param datumCb 对单条数据进行操作的回调
 * @returns 处理过的数据
 */
const handleRecursiveNestedData = <T extends { children?: T[] }>(
  data: T[] | undefined,
  datumCb: (datum: T) => T
): T[] | [] => (
  data
    ? data.map((datum) => (
      datum.children
        ? {
          ...datum,
          children: handleRecursiveNestedData(datum.children, datumCb)
        }
        : datumCb(datum)
    ))
    : []
  );

export default handleRecursiveNestedData;
