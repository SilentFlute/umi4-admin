/**
 * 递归构造新的菜单数据的方法
 * @param menu 菜单数据
 * @param itemCb 对菜单项进行操作的回调
 * @returns 新的菜单数据
 */
const handleConstructNewMenu = (
  menu: API.MenuItem[],
  itemCb: (item: API.MenuItem) => API.MenuItem
): API.MenuItem[] => (
  menu.map((item) => (
    item.children
      ? {
        ...item,
        children: handleConstructNewMenu(item.children, itemCb)
      }
      : itemCb(item)
  ))
);

export default handleConstructNewMenu;