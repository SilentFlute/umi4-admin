[简体中文](./README.md) | English

The recommended `node` version is `18.14.2`, and the recommended `yarn` version is `1.22.x`

# Overview

A lightweight development framework built with [umi4](https://umijs.org/), integrated conventional routing, custom layout(including custom routing rendering), retrieve menu data from server side, and global state management and permission verification, newest pkg and the best development experience, clone to use

# Git Work Flow
```
Legal format of commit log were shown as bellow(emoji and module are optional):

[<emoji>] [revert: ?]<type>[(scope)?]: <message>

💥 feat(module): added a great feature
🐛 fix(module): fixed some bugs
📝 docs(module): updated the documentation
🌷 UI(module): modified the style
🏰 chore(module): made some changes to the scaffold
🌐 locale(module): made some small contributions to i18n

Other commit types: refactor, perf, workflow, build, CI, typos, tests, types, wip, release, dep
```

# Mock
Built in `mock service`, start development even backend is not ready~~they always do that~~

## Interface Response Format
```
/**
 * response body
 * @description data
 * @description code 0 success, other failure
 * @description message
 */
type ResponstBody<T> = {
  data: T;
  code: number;
  message: string;
};
```
This is a common response format, it's suit for most developer, and i choose it as a conventional response format

# Proxy
Nothing much to say, `proxy` is nessary for morden web app development

# Environment Variable
Custom environment variable should start with `UMI_APP_`, and write to `.env` file, so we can visit it via `process.env.UMI_APP_xxx`

Should i commmit `.env` file to my `git` repository? good question, refer to these 2 articles:

[Should I commit my .env file?](https://github.com/motdotla/dotenv#should-i-commit-my-env-file)

[Should I have multiple .env files?](https://github.com/motdotla/dotenv#should-i-have-multiple-env-files)

I agree not to commit the `.env` file to the repo and to have only one `.env` file, cuz the config in it is not safe for commit to repo, additionally, each environment has different config, we can share `.env` file separately with ohter collaborators via email or IM sorftware if we need to collaborate on development

In other words: one `.env` file on the developer's computer for development, and one `.env` file on the test server and one on the online server for testing and production packaging respectively.

# Route
Conventional routing. And which specific route is valid is depends on the data returned from menu interface, the data returned from menu interface will be displayed in the left menu bar. While a route(menu data) has been returned by an interface, it's considered valid since it's provided by the interface. However, due to the use of conventional routing, the route will be rendered correctlly only when it has been created in the project directory

Additionally, the route of login page doesn't need to be returned by menu interface(otherwise it will displayed in the left menu bar), it doesn't use route-based logic to determine it's location (cuz it's not returned by the menu interface). The specific routing and redirection logic can be viewed in `/src/utils/handleRedirect.ts`

# Menu
The menu is returned by server side, and stored in global state, the format of return data should like this: [ItemType](https://ant.design/components/menu#itemtype) which can be consumed by[Menu](https://ant.design/components/menu), and don't include `access` field any more. The menu data of current user is what can be accessed by current user, but not all operations within the page may be accessible to the current user. Page authentication mainly prevents the current user from opening other users' routes (such as opening bookmarks saved by other users). The permission content will be described later, and the `ts` definition for the menu is as bellow:
```
/**
 * @description id Data's id

 * @description pid Data's parent id

 * @description key The unique identifier of the menu item, use `string` type instead `React.Key`:
 https://ant.design/components/menu-cn#itemtype,
 otherwise there may be a problem where the menu item can't be selected due to an incorrect key type

 * @description lable Menu's title

 * @description hideInMenu Should hidden in menu bar or not

 * @description path Route path, each menu will have this field whether it has `children` field or not,
 for menus without `children` field, it will redirect to this value, while for menus with `children` field,
 it will redirect to `redirect` field. Cuz having `children` field which means this menu is expandable,
 at this time, the `path` with `children` only represents it's position, rather than a truly valid route

 * @description redirect Redirect route path, only the menu which has `children` field has this field,
 when selectable menu whithin the `children` field of this menu, this value will be the
 1st selectable menu's `path`, when there are no selectable menu in `children` field of this menu,
 but still have `children` field, the value is the path of the first selectable menu item in its
 children's children, that's say no matter how, this value is always the 1st valid route,
 check menu data in the mock data out for specifics. Also, this field should be an optional field
 theoretically, however, in order to make it easier for the backend to process, it's written as a
 fixed field over here, in data where this field is not necessary, the backend can return an
 empty string

 * @description children Sub menu
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
```

# Layout
Abandoned the default `/src/app.tsx` layout and switched to using a custom layout: `/src/layouts/index.tsx`

## Implement Custom Rendering In Custom Layout
`/src/layouts/index.tsx` won't disturb the login page, beside: when user is login already, if user access login page again at this time(e.g. user manually enter the login page or access it through a bookmark) it will be redirected to a non-login page(if there is a `redirect` field then redirect to `redirect`, or redirect to index page), check this file out for specific codes: `/src/components/LayoutWrapper.tsx`

# Page Title
Using `umi4`'s global `title` config, each page's `location` info and menu data returned from interface implemented dynamic page title for each page, check this out for details: `/src/components/LayoutWrapper.tsx`

# Data Flow(State Management)
Using [dva](https://dvajs.com/) instead of `initial-state` of `umi4` ~~i won't tell u that it's because i abandoed the default `/src/app.tsx` layout, which resulted in the inability to use `initial-state` and `dva` is the only `react` state management solution i know how to use ;)~~ and we can consider combining [dva_umi4](https://umijs.org/docs/max/dva) and [@umijs/plugin-dva](https://v3.umijs.org/plugins/plugin-dva) together 

# Request
The request lib is [axios](https://github.com/axios/axios) of course, and the structure of request codes are as bellow:
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
│   │   │   ├── services.ts
//...
```
The request codes for `pageA` are all in `serveces.ts`

# Permission
```
/**
 * Page permission type
 * @description key is route's path, value is permisson array
 */
type PageAuthority = {
  [path: string]: string[];
}
```

```
/**
 * permission type for elements within a page
 * @description key is permission name, value is a specific permission string
 */
type Authority = {
  [key: string]: string;
}
```

The details of permission logic:

  1. page permission(for entire page): `/src/components/PageAccess.tsx`
      1. have permission: render page normally(`children`)
      2. don't have permission: return[result_antd](https://ant.design/components/result-cn)component's[403](https://ant.design/components/result-cn#components-result-demo-403)result

The processing of page authorization has been placed in `/src/layouts/index.tsx`, cuz this component is the parent of all pages that require authorization processing, making it the most suitable location for handing this

  2. page internal(for certain elements in the page): `/src/components/Access.tsx`
      1. have permission: render elements normally(`children`)
      2. don't have permission:
          1. dont't have `fallback`: render nothing
          2. have `fallback`: render `fallback`

The processing of certain elements's permission in the page requires using the `<Access />` component to be separately processed in each individual page

Both the user info and user permission returned by backend after login are stored in global state, which is `dva`

# Lint
This part refer to [12 essential ESLint rules for React](https://blog.logrocket.com/12-essential-eslint-rules-react/), and i have made some additional configurations as well:
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
And the shortcut config of course:
```
{
  "key": "alt+f",
  "command": "eslint.executeAutofix"
}
```
For me, this can imporve experience of programming greatly, i think it should be the same for you all, so i recommend everyone to config it this way

***Finally, happy hacking my friend ;)***
