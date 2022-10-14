# 状态管理

[框架状态管理说明](/docs/vue/state.html)

## 定义状态

按业务模块划分状态类,每个状态类统一在state/index.js导出，如下：

```js
import UserInfo from './userInfo';
import Settings from './settings';

// 导出状态
export default {
  UserInfo,
  Settings
};


```

## 使用状态

js文件中使用状态

```js
import GlobalState from '@/state';

GlobalState.UserInfo.userName = '王刚';  // GlobalState.[状态类名].[状态类属性名]

```

vue模板文件中使用状态

```vue
<template>
  <div>
    {{  $States.UserInfo.userName }}
  </div>
</tempalte>

```
