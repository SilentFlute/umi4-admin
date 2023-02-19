import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => (
  new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(true);
      },
      time
    )
  })
);

const handleCommonRes = (data: Record<string, unknown> | Record<string, unknown>[], code = 0) => ({
  data,
  code,
  message: !code ? '成功' : '失败'
});

const userApi = {
  //登录
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);

    switch(true) {
      case username === 'admin' && password === 'ant.design':
      case username === 'user' && password === 'ant.design':
      case type === 'mobile':
        res.send(
          handleCommonRes({
            token: 'Bearer xxx',
            type
          })
        );
        return;
    }

    res.send(
      handleCommonRes(
        {
          token: 'Wrong Bearer',
          type
        },
        10001
      )
    );
  },
  //用户信息
  'GET /api/currentUser': async (req: Request, res: Response) => {
    await waitTime(2000);

    if(!req.headers.authorization) {
      res.status(401).send();
      return;
    }

    res.send(
      handleCommonRes({
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      })
    );
  },
  //用户权限
  'POST /api/authority': async (req: Request, res: Response) => {
    await waitTime(1500);

    res.send(
      handleCommonRes({
        authority: [
          '/',
          '/about/u/1',
          '/about/u/2',
          '/about/m',
          '/about/um',
          '/teacher/u',
          '/teacher/m',
          '/teacher/um',
          '/student',
          '/about/m/update'
        ]
      })
    );
  },
  //菜单
  'POST /api/menu': async (req: Request, res: Response) => {
    await waitTime(1000);

    res.send(
      handleCommonRes([
        {
          id: 1,
          key: '1',
          path: '/',
          redirect: '',
          label: '首页'
        },
        {
          id: 2,
          key: '2',
          label: '关于',
          path: '/about',
          redirect: '/about/m',
          children: [
            {
              id: 21,
              key: '2-1',
              label: '关于你',
              path: '/about/u',
              redirect: '/about/u/1',
              pid: 2,
              children: [
                {
                  id: 211,
                  key: '2-1-1',
                  label: '关于你1',
                  path: '/about/u/1',
                  redirect: '',
                  pid: 21
                },
                {
                  id: 212,
                  key: '2-1-2',
                  label: '关于你2',
                  path: '/about/u/2',
                  redirect: '',
                  pid: 21
                }
              ]
            },
            {
              id: 22,
              key: '2-2',
              path: '/about/m',
              redirect: '',
              label: '(页面元素权限)关于我',
              pid: 2
            },
            {
              id: 23,
              key: '2-3',
              path: '/about/um',
              redirect: '',
              label: '关于你和我',
              pid: 2
            }
          ]
        },
        {
          id: 3,
          key: '3',
          label: '教师',
          path: '/teacher',
          redirect: '/teacher/u',
          children: [
            {
              id: 31,
              key: '3-1',
              path: '/teacher/u',
              redirect: '',
              label: '(403)关于你教师',
              pid: 3
            },
            {
              id: 32,
              key: '3-2',
              path: '/teacher/m',
              redirect: '',
              label: '关于我教师',
              pid: 3
            },
            {
              id: 33,
              key: '3-3',
              path: '/teacher/um',
              redirect: '',
              label: '关于你和我教师',
              pid: 3
            }
          ]
        },
        {
          id: 4,
          key: '4',
          label: '(404)学生',
          path: '/student',
          redirect: '',
        }
      ])
    );
  },
  //登出
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    res.send(
      handleCommonRes({})
    );
  },
  //验证码
  'GET /api/login/captcha': async (req: Request, res: Response) => {
    await waitTime(2000);
    return res.send(
      handleCommonRes({
        captcha: 'captcha-xxx'
      })
    );
  }
};

export default userApi;