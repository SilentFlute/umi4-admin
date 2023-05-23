// import 'umi/typings';
/// reference path="./node_modules/@types/react/index.d.ts" />

/**
 * 页面权限类型
 * @description key是路由path, value是权限数组
 */
type PageAuthority = {
  [path: string]: string[];
}
/**
 * 权限类型
 * @description key是权限名称, value是具体的权限字符串
 */
type Authority = {
  [key: string]: string;
}

/**
 * 通过path索引有效菜单项的映射(也就是可以被选中, 可以更改url pathname的菜单项)
 * @description key是path, value是API.MenuItem
 */
type IndexValidMenuItemByPath = {
  [path: string]: API.MenuItem;
}

/**
 * 通过API.MenuItem的key索引所有菜单项的映射(包括不可以被选中, 不可以更改url pathname的菜单项)
 * @description key是API.MenuItem的key, value是API.MenuItem
 */
type IndexAllMenuItemByKey<T> = {
  [key: API.MenuItem[T]]: API.MenuItem;
}

declare namespace API {
  /**
   * 响应体
   * @description data 数据
   * @description code 返回码: 0 成功, 其他 失败
   * @description message 消息: 返回的消息
   */
  type ResponstBody<T> = {
    data: T;
    code: number;
    message: string;
  };

  /**
   * 登录数据
   * @description token token票据
   */
  type LoginData = {
    token: string;
  };

  /** 登录响应结果 */
  type LoginResponse = ResponstBody<LoginData>;

  /** 用户信息数据 */
  type UserInfo = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  /** 用户信息响应结果 */
  type UserInfoResponse = ResponstBody<UserInfo>;

  /**
   * 用户权限
   * @description authority 权限数组(包含页面和页面内元素的权限)
   */
  type UserAuthorityData = {
    authority: string[];
  }

  /** 用户权限响应结果 */
  type UserAuthorityResponse = ResponstBody<UserAuthorityData>;

  /**
   * 菜单项
   * @description id 数据库中数据的id
   * @description pid 数据库中数据的id(父级的id)
   * @description key 菜单项的唯一标志, 使用string类型代替React.Key: 
   * https://ant.design/components/menu-cn#itemtype, 不然会出现key类型不对导致的菜单项无法被选中的问题
   * @description lable 菜单的标题
   * @description hideInMenu 在菜单中隐藏
   * @description path 路由路径,
   * 有无children的菜单都会有这个字段, 无children的菜单跳转这个值, 有children的跳redirect,
   * 因为有children表示这个菜单是可展开的, 此时有children的path只是表示它的一个位置, 而非真正有效的路由
   * @description redirect 重定向路由路径,
   * 只有有children的菜单有, 当这个菜单的children中有可选中的菜单时, 这个值为第一个可选中的菜单的path,
   * 当这个菜单的children中没可以选中的菜单, 而是还有children时,
   * 该值就是它children中的children的第一个可选中的菜单的path,
   * 就是无论如何, 这个值都是第一个有效路由, 具体可看mock数据中的菜单数据
   * 以及这个字段理论上来说应该是可选的字段, 但为了让后端容易处理, 这里写成固定有的字段,
   * 在不需要这个字段的数据中后端返回空串即可
   * @description children 子菜单
   */
  type MenuItem = {
    id: number;
    pid?: number;
    key: string;
    path: string;
    redirect: string;
    hideInMenu?: boolean;
    label: React.ReactElement | string;
    children?: MenuItem[];
  }

  /** 菜单数据 */
  type MenuData = MenuItem[];

  /** 菜单数据响应结果 */
  type MenuDataResponse = ResponstBody<MenuData>;

  /** 用户信息权限菜单响应结果 */
  type UserInfoAuthMenuResponse = (UserInfoResponse | UserAuthorityResponse | MenuDataResponse)[];

  /** 用户权限菜单响应结果 */
  type UserAuthMenuResponse = (UserAuthorityResponse | MenuDataResponse)[];

  /** 登出响应结果 */
  type LogoutResponse = ResponstBody<Record<string, never>>;

  /** 登录参数 */
  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  /** 验证码数据 */
  type CaptchaData = {
    captcha: string;
  }

  /** 验证码响应结果 */
  type CaptchaResponse = ResponstBody<CaptchaData>;
}