# 状态管理

[框架状态管理说明](/docs/vue/state.html)

## 定义状态

按业务模块划分状态类,每个状态类统一在state/index.js导出，如下：

```js
import Notice from './notice';
import Settings from './settings';
import Menu from './menu';
import UserInfo from './userInfo';

// 导出状态
export default {
  Notice,
  Settings,
  Menu,
  UserInfo
};

```

## 使用状态

js文件中使用状态

```js
import GlobalState from '@/state';

GlobalState.Menu.menuId = '';  // GlobalState.[状态类名].[状态类属性名]

```

vue模板文件中使用状态

```vue
<template>
  <a-badge
    :count="$States.Notice.count"   // $States.[状态类名].[状态类属性名]
  >
    <icon-bell :class="['g-layout-icon',{'right-content-dark':theme==='dark'||theme===''}]" />
  </a-badge>
</tempalte>

```
