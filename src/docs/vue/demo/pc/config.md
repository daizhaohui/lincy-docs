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
  name: 'org',
  component: () => import(/* webpackChunkName: "org" */ '@/pages/system/org'),
  path: 'org',
  meta: {
    title: '机构管理', // 显示的标题 （导航或tab页签标题)
    closable: false,  // 是否可以关闭tab页签,默认false（不关闭）
    tabIndex: 0,    //  tab页签的固定位置,起始值0开始,不设置tabIndex,打开时会默认放在末尾位置, 默认为不设置
    auth:'', // 授权代码（唯一), 设置改值后访问该路由页面时候将进行权限检查
  }
},

```

## 按需加载组件配置

config/components.js

为了减少打包的体积，按需使用ant-design-vue提供的组件。只引用使用到的组件，如下：

```js
import {
  Button, Input, Result, Divider, Row, Col, ...
} from 'ant-design-vue';
export default {
  Button,
  Input,
  Result,
  Divider,
  Row,
  Col,
  ...
};

```

## 菜单配置

config/menu.js

建立显示的菜单与路由组件的关系; 如果菜单在后端配置，就可以去掉config/menu.js文件，不在前端配置。
