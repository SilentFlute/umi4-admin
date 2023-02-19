/**
 * 获取 通过key索引菜单项的映射 的方法
 * @param menu 菜单数据
 * @param key 菜单数据的key
 * @returns 通过[key]索引菜单项的映射
 */
const handleGetAllMenuItemByKey = <T>(
  menu: API.MenuData,
  key: 'id' | 'path'
): IndexAllMenuItemByKey<T> => {
  let byId = {};

  menu.forEach((item: API.MenuItem) => {
    byId[item[key]] = item;

    if(item.children) {
      byId = {
        ...byId,
        ...handleGetAllMenuItemByKey(item.children, key)
      };
    }
  });

  return byId as IndexAllMenuItemByKey<T>;
};

export default handleGetAllMenuItemByKey;