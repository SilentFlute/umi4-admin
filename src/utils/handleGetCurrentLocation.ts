/**
 * 获取当前位置信息的方法
 * @description 该方法获得的返回值是从第一个菜单到最后一个菜单, 如果是有n级菜单,
 * 那么只有最后一个可被选中, 其余都不可被选中, 都是展开的菜单
 * @param currentMenuItem 当前菜单项, 当url中的pathname不在菜单中, 则该值为undefined
 * @param indexAllMenuItemById 通过id索引菜单项的映射
 * @returns API.MenuItem[] | []
 */
const handleGetCurrentLocation = (
  currentMenuItem: API.MenuItem | undefined,
  indexAllMenuItemById: IndexAllMenuItemByKey<'id'>
): API.MenuItem[] | [] => {
  let res: API.MenuItem[] = [];

  if(!currentMenuItem) return res;

  res.push({
    id: currentMenuItem.id,
    key: currentMenuItem.key,
    path: currentMenuItem.path,
    label: currentMenuItem.label,
    redirect: currentMenuItem.redirect
  });

  if(currentMenuItem.pid) {
    res = [
      ...res,
      ...handleGetCurrentLocation(indexAllMenuItemById[currentMenuItem.pid], indexAllMenuItemById)
    ];
  }

  return res.reverse();
};

export default handleGetCurrentLocation;
