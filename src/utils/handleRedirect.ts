import { history } from 'umi';

/**
 * 重定向的方法
 * @description 如果是登录页, url上有redirect参数则跳转到redirect参数, 同时要考虑redirect的有效性,
 * 没有就跳第一个有效路由; 非登录页, 看该页面的路由是否有效, 有效就跳转,
 * 无效就看是否有子路由, 有就跳它的第一个子路由, 也就是看这个路由是不是有子路由, 是在Menu中可展开的形式,
 * 没有也跳, 此时就交由umi处理404的情况
 * @param isLoginPage 是否是登录页
 * @param indexAllMenuItemByPath IndexAllMenuItemByKey<'path'>
 * @param indexValidMenuItemByPath IndexValidMenuItemByPath
 * @returns Promise<boolean>
 */
const handleRedirect = (
  isLoginPage: boolean,
  indexAllMenuItemByPath: IndexAllMenuItemByKey<'path'>,
  indexValidMenuItemByPath: IndexValidMenuItemByPath
): Promise<boolean> => (
  new Promise((resolve) => {
    let routePath = Object.keys(indexValidMenuItemByPath)[0];

    if(isLoginPage) {
      const queryString = window.location.search;
  
      if(queryString) {
        const matchedRes = queryString.match(/redirect=(.*)/);
  
        if(matchedRes) {
          //还要考虑redirect参数是否有效
          const decodeRedirect = decodeURIComponent(matchedRes[1]);
          //有效: 跳转
          if(indexValidMenuItemByPath[decodeRedirect]) {
            routePath = decodeRedirect;
          }else if(indexAllMenuItemByPath[decodeRedirect]) {
            //无效
            //有子路由: 跳子路由
            routePath = indexAllMenuItemByPath[decodeRedirect].redirect;
          }else{
            //无子路由: 还是要跳, 此时就是交由umi处理404的情况了
            routePath = decodeRedirect;
          }
        }
      }
    }else{
      const {
        location: { search, pathname }
      } = window;

      //考虑url上有查询字符串参数的情况
      //有效
      if(indexValidMenuItemByPath[pathname]) {
        routePath = `${pathname}${search}`;
      }else if(indexAllMenuItemByPath[pathname]) {
        //无效
        //有子路由: 跳子路由
        routePath = `${indexAllMenuItemByPath[pathname].redirect}${search}`;
      }else{
        //无子路由: 也跳, 此时交由umi处理404的情况
        routePath = `${pathname}${search}`;
      }
    }

    history.push(routePath);

    return resolve(true);
  })
);

export default handleRedirect;
