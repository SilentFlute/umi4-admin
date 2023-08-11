/**
 * 获取 通过path索引菜单项的映射 的方法
 * @param menu 菜单数据
 * @returns 通过path索引菜单项的映射
 */
const handleGetIndexValidMenuItemByPath = (
  menu: API.MenuData
): IndexValidMenuItemByPath => {
  let byPath: IndexValidMenuItemByPath = {};

  menu.forEach((item: API.MenuItem) => {
    if(!item.children) {
      byPath[item.path] = item;
    }else{
      byPath = {
        ...byPath,
        ...handleGetIndexValidMenuItemByPath(item.children)
      };
    }
  });

  return byPath;
};

export default handleGetIndexValidMenuItemByPath;
