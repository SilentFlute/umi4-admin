# 概览
[umi4](https://umijs.org/)搭建的轻量级开发框架, 参考了如下项目框架/文档搭建而成:
1. `umi4`脚手架生成的`simple`, `antd pro`项目模板以及`umi4`的文档: [umi4](https://umijs.org/)
2. [antd pro](https://pro.ant.design/zh-CN)的脚手架工具`@ant-design/pro-cli`生成的`umi3`的`antd pro`项目, 选`umi4`提示无法安装全部区块, 因此这里我选的是`umi3`, 以及`antd pro`的文档: [antd pro](https://pro.ant.design/zh-CN/docs/overview)
3. 2018, 2019年使用`umi2`, `umi3`搭建的项目以及`umi3`的文档: [umi3](https://v3.umijs.org/zh-CN)
4. `procomponents`的文档: [procomponents](https://procomponents.ant.design/components)

在使用自带布局`/src/app.tsx`的时候传`headerRender`设置自定义头部, 结果实际渲染出来的自定义头部`position: fixed;`在原本的头部上方, 将原本的头部覆盖了, 原来的头部还在, 我以为是替换, 没想到是覆盖在上面, 然后由于是固定定位, 导致自定义头部不但覆盖住了原来的头部, 还将左侧的菜单和中间的内容也覆盖住了, 需要去`/src/global.less`中写样式覆盖, 这让我百思不得其解, 对布局有一些高度定制化的需求因此最终使用了自定义布局的方案

`antd pro`全量区块不支持`umi4`, 想着`umi4`出来了, 肯定有比`umi2` `umi3`优越的地方, 打算直接使用`umi4`

约定式路由是因为我从`umi2`开始就一直使用的约定式的路由, 配置式路由用起来比较繁琐, 各种配置

而至于数据流(状态管理)方案的选择, 主要还是因为自定义布局方案导致, 次要原因是我用`dva`也很久了, 觉得挺顺手, 但如果没有高度自定义的布局的需求, `umi4`官方提供的[数据流](https://umijs.org/docs/max/data-flow)方案是非常棒的, 轻量级的全局状态管理方案, 使用起来也很方便: 按照约定的方式书写代码, 以自定义`hooks`的形式创建`store`, 使用的时候用`umi4`提供的`api`: `useModel`就可以了, 还做了类似[reselect](https://github.com/reduxjs/reselect)的性能优化, 个人觉得这个方式摒弃了稍有门槛的`redux`的写法, 而是对用户侧做了一个收敛, 使得用户使用起来更方便, 也更易理解, 但依旧是我们所熟悉的`flux`的思想, 是`flux`思想的另一种实现, 这里要给`umi`团队一个大大的赞, 云谦大佬[sorrycc](https://github.com/sorrycc), 虎哥[xiaohuoni](https://github.com/xiaohuoni), 我尤其对虎哥的这个帖子印象深刻: [开发中遇到的问题，已经处理的，在这里记录一下。给朋友们一个参考](https://github.com/umijs/umi/issues/246), 想当年我刚开始用`umi`的时候是之前公司的一个大佬郭老师[dxcweb](https://github.com/dxcweb)推荐我用的, 而虎哥的这个帖子给了我很大的帮助, 瑞思拜

以及控制台打开看到`antd`的各种已经废弃的报错, 虽然不影响使用, 但多了很多不必要的`error`, 严重影响开发时候的调试工作, 这是由于`antd`废弃了一些`api`, 而项目中还在使用导致的, 这个问题修改起来比较繁琐, 同时还有上面提到的几个点, 于是就有了这个项目

# Git工作流
这个地方用的依旧是[husky](https://github.com/typicode/husky)还有[lint-staged](https://github.com/okonet/lint-staged), 但只保留了提交的消息格式的校验(个人喜欢在开发的时候规范代码风格并调整, 在提交之前做校验体验不是太好, 这个可以因人而异进行调整), 这里我用的是[@umijs/fabric](https://github.com/umijs/fabric)工具集, `@umijs/fabric`也是从上面的参考中找到的. 以及提交消息格式也是参考了上面的项目([antd pro](https://pro.ant.design/zh-CN)), 详情可查看[Git Commit Message Convention](https://github.com/vuejs/core/blob/main/.github/commit-convention.md), 常用的提交格式如下:
```
合法的提交日志格式如下(emoji 和 模块可选填)：


[<emoji>] [revert: ?]<type>[(scope)?]: <message>

💥 feat(模块): 添加了个很棒的功能
🐛 fix(模块): 修复了一些 bug
📝 docs(模块): 更新了一下文档
🌷 UI(模块): 修改了一下样式
🏰 chore(模块): 对脚手架做了些更改
🌐 locale(模块): 为国际化做了微小的贡献

其他提交类型: refactor, perf, workflow, build, CI, typos, tests, types, wip, release, dep
```
也可以看看这个: [How to Write Better Git Commit Messages – A Step-By-Step Guide](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)

# Umi4配置
默认用的是`.umirc.ts`, 但还需要代理配置, 因此就放`config`目录了, 这样比较清晰, 也方便维护, 至于项目中获取配置, 我这里采用的是没用`defineConfig`的方式, 也可以将配置提取出来, 这样其他地方就都能用了, 参考这个: [有人知道什么方法能获取defineConfig的配置?](https://github.com/umijs/umi/discussions/7534#discussioncomment-4858138)

## 插件
这里并未使用[Umi Max](https://umijs.org/docs/max/introduce), 而是只使用了`umi4`的`dva`插件, 同时项目里也安装了, 根据文档[@umijs/plugin-dva](https://v3.umijs.org/zh-CN/plugins/plugin-dva)可知最终会优先使用项目中依赖的版本

# Mock
`/mock`这里配置的是`mock数据的服务`, 即本地的`express`接口服务, 详情可查看官方文档: [mock_umi4](https://umijs.org/docs/guides/mock), 只要项目根目录中有`/mock`目录且里面有[mock文件](https://umijs.org/docs/guides/mock#mock-%E6%96%87%E4%BB%B6), 那么该功能就会自动启动, 该服务和前端应用运行在同一个域名(不会引起`跨域`的问题)下, 因此当该服务启动了, 请求工具的`baseUrl`为`/`, 此时我们请求`/xxx`就会先到这个服务中进行检索, 匹配到了就走这个服务的接口, 否则就看代理: 如果代理功能开启, 且匹配到了代理服务就走代理, 否则就`404`, 以及`mock`服务的配置和开启不需要额外装`express`, 为了让`ts`类型检查不报错, 可以装个`@types/express`: `$ yarn add @types/express --dev`

## 接口返回格式
这里和[统一接口规范_antd pro](https://pro.ant.design/zh-CN/docs/request#%E7%BB%9F%E4%B8%80%E6%8E%A5%E5%8F%A3%E8%A7%84%E8%8C%83)有一定出入, 但也可以因人而异做修改, 这是项目中的定义:
```
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
```
`T`类型变量因实际返回的数据类型不同而不同, `message`字段告知前端该操作的一个结果描述, 成功或者失败的描述信息都使用这个字段

这个格式的数据需要在使用`antd`的`Table`或者`ProTable`的时候做一下处理, 也可以直接使用这个格式:
```
{
 list: any[],
 current?: number,
 pageSize?: number,
 total?: number,
}
```
这样更方便`antd`的`Table`使用, 但个人还是更倾向于一开始的格式, 所有数据格式都统一了, 而且也不是所有页面都有表格, 况且转换的操作也容易, 不过这个也因人而异, 可以自行修改

# 代理
详情可查看官方文档: [proxy_umi4](https://umijs.org/docs/guides/proxy#%E4%BB%A3%E7%90%86), 这里主要提一下: 当后端接口还没写好的时候我们单独使用`mock`功能即可, 不需要用代理, 因为最终的`target`不可用, 是`404`, 毕竟还没开发好, 以及如`mock`部分所述, `mock`和代理都启用, 优先级是: `mock` > 代理

# 环境变量
自定义环境变量应以`UMI_APP_`开头, 并写到`.env`中, 这样才能在代码中通过`process.env.UMI_APP_xxx`访问到, 项目中的`.env`文件目前只有一个值: `UMI_APP_BASEURL=/`, 克隆之后需要在项目中创建一个`.env`文件并在其中写入`UMI_APP_BASEURL=/`

如果不想以`UMI_APP_`开头, 则需要在`.env`中写完之后在配置的`define`中做配置, 比如:

`.env`:
```
domain=http://example.com
```
`/config/config.ts`:
```
//...
define: {
  "process.env": {
    domain: process.env.domain
  }
}
//...
```
这样项目中才能访问到`process.env.domain`, 以及如果配置中的`define`做了如上那样`process.env`的配置, 那所有环境变量(包括以`UMI_APP_`开头的环境变量)都要配置到其中, 不然访问`process.env`的时候将只能访问到`define`中配置的值, 因为这样配置之后`process.env`被覆盖了

更便捷的配置可以这样来:
```
//...
define: {
  "process.env": process.env
}
//...
```
这样所有环境变量都能通过`process.env`访问了, 无论是自带的还是自定义的

有需要的朋友还可以看看这两个`issue`:

[无法配置自定义的环境变量](https://github.com/umijs/umi/issues/7799)

[config中设置define后，命令行中设置的环境变量在app.tsx中无法找到](https://github.com/umijs/umi/issues/8329)

以及, 关于是否应该提交`.env`文件和是否应该有多个`.env`文件的问题可以看看这两个描述:

[Should I commit my .env file?](https://github.com/motdotla/dotenv#should-i-commit-my-env-file)

[Should I have multiple .env files?](https://github.com/motdotla/dotenv#should-i-have-multiple-env-files)

个人觉得也不应该提交`.env`以及只有一个`.env`即可, 因为里面的配置提交到库中不安全, 同时每个部署环境都有不同的配置, 协作开发的话单独发即可

但这个情况也不绝对, 需要在不同环境中使用不同配置, 推荐通过`umi`自带的环境变量`UMI_ENV`来完成, 详情可以查看官方文档: [UMI_ENV](https://umijs.org/docs/guides/env-variables#umi_env), 也可以结合这两个来看:

[umi_env 目前好像是覆盖方式，可以支持合并方式吗](https://github.com/umijs/umi/issues/2050)

[请问umi4还支持多config目录下多环境配置吗？](https://github.com/umijs/umi/discussions/8341)

以及`config`目录下的多环境配置我试了下暂时不行, 也可能是我姿势不对: [请问umi4还支持多config目录下多环境配置吗？#discussioncomment-4807605](https://github.com/umijs/umi/discussions/8341#discussioncomment-4807605), 根目录下`.umirc.ts`的我也没能成功进行多环境的配置, 了解用法的朋友希望能不吝赐教

# 路由
使用的是约定式路由. 路由功能的提供, `umi4`使用的是`react-router6`, 官方文档是这个: [React Router](https://reactrouter.com/en/main), 关于约定式路由的嵌套问题可以看这个: [约定式路由无法生成嵌套路由！！](https://github.com/umijs/umi/issues/8850)

以及具体哪一条路由有效, 要由菜单的数据决定, 以菜单数据为准, 而不是约定式路由, 因为菜单数据才能点击跳转, 以及初次打开页面和页面刷新的时候也是根据菜单数据来做判断的, 但约定式路由也需要在项目中创建好, 同时数量要大于等于菜单数据, 不然如果某个路由约定式路由没有, 而菜单数据中有, 点击菜单的时候可能就会与预期不符了, 因为这里在`/src/layouts/index.tsx`中根据菜单数据做了页面鉴权, 只要`url`中的`pathname`命中任意一条菜单数据就会被判定为有这个页面, 然后就会走鉴权的逻辑, 而此时又分两种情况:

1. 有权限: 鉴权通过, 渲染`<Outlet />`, 由于这个页面不在约定式路由中, 因此渲染的结果是`404`(这个是由`umi`处理的`404`的情况, 就是约定式路由中没有就会自动渲染的那个`404`页面)
2. 无权限: 鉴权未通过, 不会渲染`<Outlet />`, 而是渲染`403`(这个是`/src/components/PageAccess.tsx`渲染的`403`组件)

具体可以查看`/src/layouts/index.tsx`中渲染`<PageAccess />`部分的代码

另外登录页的路由不需要菜单接口返回(不然登录页就会显示在左侧菜单位置了), 登录页建好就行, 它不走路由判断逻辑(因为它不由菜单接口返回), 具体的路由判断跳转的逻辑可以查看`/src/utils/handleRedirect.ts`

## 在react组件之外进行跳转操作
这里`umi4`依旧保留了原来的`history` `api`: [history_umi4](https://umijs.org/docs/api/api#history), 详细的`api`的使用可以看这个: [history API Reference](https://github.com/remix-run/history/blob/main/docs/api-reference.md)

# 菜单
菜单由服务端返回, 也是存到全局状态中, 返回的数据的结构要是[Menu](https://ant.design/components/menu-cn)能消费的[ItemType](https://ant.design/components/menu-cn#itemtype), 同时不再包含`access`字段, 当前用户的菜单就是当前用户能访问的了, 只是页面内的操作不全是当前用户都能操作的, 页面鉴权主要是防止当前用户打开其他用户的路由(比如打开了其他用户存的书签)这样的情况, 权限内容在后面有描述, 以及菜单的`ts`定义如下:
```
/**
 * 菜单项
 * @description id 数据库中数据的id
 * @description pid 数据库中数据的id(父级的id)
 * @description key React.Key
 * @description lable 菜单的标题
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
  key: React.Key;
  path: string;
  redirect: string;
  label: React.ReactElement | string;
  children?: MenuItem[];
}
```

## 菜单图标
关于菜单图标的显示问题, 有需要的朋友可以参考如下几个`issue`:

[从服务端请求菜单时 icon 和 access 不生效](https://github.com/ant-design/ant-design-pro/issues/8101)

[菜单栏的三级菜单使用自定义icon无法显示，一二级菜单显示正常](https://github.com/ant-design/ant-design-pro/issues/9267)

[关于V5动态菜单图标的优雅解决问题](https://github.com/ant-design/ant-design-pro/issues/10158)

[从服务端请求菜单，一级菜单icon生效，二级菜单不生效](https://github.com/ant-design/ant-design-pro/issues/10178)

# 布局
舍弃了自带的`/src/app.tsx`布局, 转而使用自定义的布局: `/src/layouts/index.tsx`, 这个方式比较符合我这边项目的需求, 而且`issue`里面看到也有不少小伙伴有需求, 同时也是因为没使用自带的`layout`, `404`页面需要自己实现一下, 这个比较简单, 就不展开了

## 自定义布局中做自定义渲染
在布局中有些根据路由信息做自定义渲染的需求可以看看这个: [自定义layout组件，props里拿不到config的routes，没办法自己实现菜单的渲染？](https://github.com/umijs/umi/issues/10177), 其中我个人也回复了一下, 大意是使用`useLocation`来实现, 这是它的官方文档: [useLocation_React Router](https://reactrouter.com/en/main/hooks/use-location), 项目中我也是这么处理的

这里除了登录页不走`/src/layouts`之外, 我还做了额外的处理: 当用户已经登录, 此时如果再次访问登录页(比如用户手动输入或者通过书签进入登录页)会做重定向到非登录页(有`redirect`则重定向到`redirect`, 没有则到首页)的操作, 具体代码可以查看这个文件: `/src/components/LayoutWrapper.tsx`

# 标题
配置文件中有`title`配置项: [title_umi4](https://umijs.org/docs/api/config#title), 这个配置的是全局的标题, 每个页面都会使用这个标题, 如果需要动态配置标题, 每个页面不同, 则需要使用`Helmet`: [helmet_umi4](https://umijs.org/docs/api/api#helmet), 再配合当前页面的`location`信息和接口返回的菜单数据就可以了, 详情可以查看: `/src/components/LayoutWrapper.tsx`

# 数据流(状态管理)
由于舍弃了自带的`/src/app.tsx`布局使用自定义布局, 因此就没法使用自带的`initial-state`方案了, 作为从`umi`刚问世不久就开始使用`umi`的用户, 我个人更倾向于[dva](https://dvajs.com/), 这个方案需要配置开启, 并新建`/src/models`目录, 关于`dva`的解释除了`dva`官方文档之外, `umi4`的这个文档解释的也很清楚, 可以结合起来看: [dva_umi4](https://umijs.org/docs/max/dva), 同时还有`umi3`的文档可供参考: [@umijs/plugin-dva](https://v3.umijs.org/zh-CN/plugins/plugin-dva)

# 请求
这里的请求库用的是[axios](https://github.com/axios/axios), 这个库我从`umi2`一直用到现在, 之前写过几个`vue`的项目, 使用的也是这个, 由于之前项目的`axios`的配置可以直接复制过来, 以及这里没用`@umijs/max`, `umi`自带的请求方案无法发挥它的长处, 因此就直接使用`axios`了

请求代码的组织是`umi`一直保留的一个特性, 也是个人觉得很棒的一个设计, 就是将所有的请求都放到`/src/services`中, 确切的说是全局的(比如`登录`, `登出`, `请求菜单`等)放到`/src/services`目录中, 其余各个页面独有的请求则和页面文件放到一起, 比如:
```
//...
.
├── src
│   ├── layouts
│   │   ├── index.tsx
│   │   ├── index.less
│   ├── services
│   │   └── user.ts
│   ├── pages
│   │   ├── index.tsx
│   │   ├── index.less
│   │   ├── pageA
│   │   │   └── index.tsx
│   │   │   └── index.less
│   │   │   ├── services
│   │   │   │   └── pageA.ts
//...
```
或者直接用文件而不是目录, 但需要留意前面要加个`.`或者`_`, 不然`umi`会将它解析为路由:
```
//...
.
├── src
│   ├── layouts
│   │   ├── index.tsx
│   │   ├── index.less
│   ├── services
│   │   └── user.ts
│   ├── pages
│   │   ├── index.tsx
│   │   ├── index.less
│   │   ├── pageA
│   │   │   └── index.tsx
│   │   │   └── index.less
│   │   │   ├── _services.ts //或者.services.ts
//...
```
或者叫其他名字也行(比如`_api.ts`), 这个随意, 只是记得前面一定要加`.`或者`_`, 不然会被当做是一个路由, 建议就按照`umi`的约定使用`services`, 这样更统一, 也更易维护

关于约定式路由的判断规则可以看这个: [约定式路由_umi3](https://v3.umijs.org/zh-CN/docs/convention-routing#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1)

# 权限
这个地方是个重点, 同时也是一个需要自己实现的地方, 因为自带的权限控制需要`initial-state`, 而这个`initial-state`又依赖自带的`/src/app.tsx`布局, 刚好这里使用的是自定义的布局, 因此最终只能自己实现

这个逻辑在后端自然是`RBAC`的方案, 而前端关注的主要则是具体的权限, 具体逻辑如下:
1. 前后端约定每个页面的权限, 这里包括页面访问权限, 就是路由的权限和页面内各个操作元素的权限, 并在页面上写好, 代码里是写在`_authority.ts`中(以`object`的形式定义), 以`_`开头是因为这样才不会被算作一个路由
2. 后端返回当前登录用户的所有权限(类型是`string[]`), 前端取到之后和`_authority.ts`中的做对比, 从而达到鉴权的目的

权限我分成了页面和页面内元素的权限, 具体代码在这: 页面权限: `/src/components/PageAccess.tsx`, 页面内元素的权限: `/src/components/Access.tsx`, 前端权限的声明, 页面权限在这: `/src/pages/_authority.tsx`, 各个页面内权限写在各个页面的目录中, 比如: `/src/pages/about/m/_authority.ts`

页面权限需要根据不同的路由来决定, 因此它的类型定义如下:
```
/**
 * 页面权限类型
 * @description key是路由path, value是权限数组
 */
type PageAuthority = {
  [path: string]: string[];
}
```
而页面内元素的权限又有所不同, 一个个元素, 需要一个个独立的权限, 它的类型定义如下:
```
/**
 * 权限类型
 * @description key是权限名称, value是具体的权限字符串
 */
type Authority = {
  [key: string]: string;
}
```

参考`umi4`的[access_umi4](https://umijs.org/docs/max/access)文档自己实现了一个鉴权的组件:
  1. 页面权限: `/src/components/PageAccess.tsx`
      1. 有权限: 正常渲染页面(`children`)
      2. 没权限: 返回[result_antd](https://ant.design/components/result-cn)组件的[403](https://ant.design/components/result-cn#components-result-demo-403)结果

页面鉴权的处理放到了`/src/layouts/index.tsx`中, 因为这个组件是所有需要做鉴权处理的页面的父级, 在这处理最合适不过了

  2. 页面内部: `/src/components/Access.tsx`
      1. 有权限: 正常渲染元素(`children`)
      2. 没权限:
          1. 没`fallback`: 什么都不渲染
          2. 有`fallback`: 渲染`fallback`

页面内权限的处理需要使用`<Access />`组件在各个页面中单独处理

登录之后后端返回的用户信息和用户权限都放到全局状态也就是`dva`中

# tsconfig
这个来自[antd pro](https://pro.ant.design/zh-CN)的脚手架工具`@ant-design/pro-cli`生成的`umi3`的`antd pro`项目当中, 功能完备, 只做了一个修改: 将`ts`的类型声明文件的路径写到了里面的`include`字段中, 也就是将全局的`d.ts`文件放到了根目录

# lint
这部分参考了[12 essential ESLint rules for React](https://blog.logrocket.com/12-essential-eslint-rules-react/), 最终配置和`umi`自带的有很大的不同, 这里我只使用了`eslint`, 并且做了配置:
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
以及快捷键的设置:
```
//eslint格式化代码快捷键
{
  "key": "alt+f",
  "command": "eslint.executeAutofix"
}
```
按`alt+f`就自动修复问题, `ctrl+s`保存的时候自动修复问题并保存, 极大提升编码体验, 但我个人的习惯是按`alt+f`修复问题, 写完了再保存, 修复是修复, 保存是保存, 快捷键是否设置看个人喜好, 但保存的时候自动修复问题建议设置一下

`eslint`我调了两天才生效, 而且是莫名其妙就生效了, 不知道为何...

配置是通过`$ eslint --init`生成, 并且添加了热门流行的`eslint` `react`插件, `ts`插件, 以及个人习惯的一些规则, 这些规则可以自行调整, 同时需要留意的是, 如果在`lint`代码的时候报如下的错误:

`Failed to apply ESLint fixes to the document. Please consider opening an issue with steps to reproduce.`

这大概率是`eslint`的规则配置错了, 目前该仓库的`eslint`是没问题的, 当修改或者添加规则之后报错, 则应仔细检查规则是否修改/添加正确, 这里附上`eslint`的官方文档以供查阅: [ESLint](https://eslint.org/), 其他插件的文档可通过[npm](https://www.npmjs.com/)搜索之后在右侧`Homepage`位置找到官方文档