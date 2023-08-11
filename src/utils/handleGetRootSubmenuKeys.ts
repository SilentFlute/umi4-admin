/**
 * 获取子菜单的父级菜单keys的方法
 * @param menu 菜单数据
 * @returns 父级菜单key数组
 */
const handleGetRootSubmenuKeys = (menu: API.MenuData): React.Key[] => {
  const keys: React.Key[] = [];

  menu.forEach((item: API.MenuItem) => {
    if(item.children) {
      keys.push(item.key);
    }
  });

  return keys;
};

export default handleGetRootSubmenuKeys;
