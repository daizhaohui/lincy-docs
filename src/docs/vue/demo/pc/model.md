# 数据对象

## 业务数据对象

- 每个业务对象定义一个文件，放在model目录下。
- model/index.js 统一到处每个业务对象

## 常量定义

model/consts/index.js 定义常量

```js
// 皮肤
const Themes = {
  Default: '',
  Dark: 'dark',
  Light: 'light'
};

// 菜单布局
const MenuLayout = {
  // 测边菜单布局
  Sider: 'siderMenu',
  // 顶部菜单布局
  Top: 'topMenu',
  // 顶部和侧边菜单相结合
  SiderTop: 'siderTopMenu'
};


// 自定义的全局事件名
const GlobalEvents = {
  // 菜单点击事件
  OnMenuItemClick: 'menuItemClick',
  // 头靠右边项点击事件
  OnHeaderRightContentItemClick: 'headerRightContentItemClick',
  // 抽屉设置项设置改变事件
  OnDrawerItemSettingChanged: 'drawerSettingItemClick',
  // 点击logo事件
  OnLogoClick: 'logoClick',
  // 关闭了设置抽屉框
  OnCloseSettingDrawer: 'closeSettingDrawer',
  // 退出系统
  OnLogout: 'logout',
  // 视窗大小发生改变时
  OnWindowSizeChange: 'windowSizeChange',
  // 网页中所有元素加载完毕
  OnDocumentLoaded: 'documentLoaded',
  // 主布局框架组件加载完毕
  OnMainLayoutMounted: 'mainLayoutMounted',
  // 打开抽屉设置
  OnShowDrawerSetting: 'showDrawerSetting'
};


// api返回的code
const ApiCode = {
  Success: '00000'
};


export {
  Themes,
  MenuLayout,
  GlobalEvents,
  ApiCode
};


```

js文件使用常量

```js
import {Themes} from '@/state/consts';

Themes.Dark

```

vue模板文件中使用常量:

```vue
<template>
  {{ $Consts.Themes.Dark }}
</template>

```
