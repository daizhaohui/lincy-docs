# 相关配置

## 路由配置

config/routes.js

```js
const routes = [
  {
    name: 'root',
    redirect: '/login',
    path: '/'
  },
  {
    name: 'main',
    component: Main, // 主框架页面,在主框架中显示的页面路由，添加到其children中
    path: '/main',
    children: [
      {
        name: 'home', // 主页（名字设置为home）
        component: Home,
        path: 'home',
        meta: {
          title: '首页',
          closable: false
        }
      },
      {
        name: 'org',
        component: () => import(/* webpackChunkName: "org" */ '@/pages/system/org'),
        path: 'org',
        meta: {
          title: '机构管理',
          closable: false
        }
      },
    ]
  },
  // 登录
  {
    name: 'login',
    component: Login,
    path: '/login'
  },
  // 没有权限跳转页
  {
    name: 'page403',
    component: Page403,
    path: '/403'
  },
  // 服务器500错误跳转页
  {
    name: 'page500',
    component: Page500,
    path: '/500'
  },
  // 发在最后一个,没有匹配到以上的路由页面
  {
    name: 'page404',
    component: Page404,
    path: '/:pathMatch(.*)'
  }
];
export default routes;
```

### 固定的路由

login（登录), main(主框架), home(进入首页), page403(没有权限), page500(服务端出错),page404(路由地址不存在)

### 路由扩展配置

meta里定义了扩展功能的配置

```js
{
  name: 'home',
  component: Home,
  path: 'home',
  meta: {
    auth:'', // 授权代码（唯一), 设置改值后访问该路由页面时候将进行权限检查
  }
},

```

## 按需加载组件配置

config/components.js

为了减少打包的体积，按需使用vant提供的组件。只引用使用到的组件，如下：

```js
import {
  Button, Loading, Icon, Empty, ...
} from 'vant';

// 按需引用vant组件
export default {
  Icon,
  Empty,
  Button,
  Loading,
  ...
};

```
