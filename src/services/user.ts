import request from '@/utils/request';

//登录
export const userLogin = (params: Record<string, unknown>): Promise<API.LoginResponse> => (
  request.post('/api/user/login', params)
);

//获取用户信息
export const retrieveUserInfo = (): Promise<API.UserInfoResponse> => (
  request.get('/api/user/info')
);

//获取用户权限
export const retrieveUserAuthority = (): Promise<API.UserAuthorityResponse> => (
  request.get('/api/user/authority')
);

//获取菜单数据
export const retrieveMenuData = (): Promise<API.MenuDataResponse> => (
  request.get('/api/user/menu')
);

//获取用户信息和权限以及菜单
export const retrieveUserInfoAuthorityMenu = async (): Promise<API.UserInfoAuthMenuResponse> => (
  Promise.all([
    retrieveUserInfo(),
    retrieveUserAuthority(),
    retrieveMenuData()
  ])
);

//获取用户权限以及菜单
export const retrieveUserAuthorityMenu = async (): Promise<API.UserAuthMenuResponse> => (
  Promise.all([
    retrieveUserAuthority(),
    retrieveMenuData()
  ])
);

//登出
export const userLogout = (): Promise<API.LogoutResponse> => (
  request.post('/api/user/logout')
);

//获取验证码
export const retrieveCaptcha = (params: Record<string, string>): Promise<API.CaptchaResponse> => (
  request.get('/api/user/captcha', { params })
);