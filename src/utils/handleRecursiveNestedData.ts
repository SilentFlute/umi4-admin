/**
 * 递归处理嵌套数据的方法
 * @param data 数据
 * @param datumCb 对单条数据进行操作的回调
 * @returns 处理过的数据
 */
const handleRecursiveNestedData = (
  data: API.MenuItem[],
  datumCb: (datum: API.MenuItem) => API.MenuItem,
): API.MenuItem[] => {

  const res = [] as API.MenuItem[];

  for (const datum of data) {
    if (datum.hideInMenu) {
      continue;
    }

    if (datum.children) {
      res.push({
        ...datum,
        children: handleRecursiveNestedData(datum.children, datumCb),
      });
    } else {
      res.push(datumCb(datum));
    }
  }

  return res;
};

export default handleRecursiveNestedData;
