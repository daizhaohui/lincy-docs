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

const LoadMoreTopStatus = TopStatus;
const LoadMoreBottomStatus = BottomStatus;
// 自定义的全局事件名
const GlobalEvents = {
  // 菜单点击事件
  OnToggleDrawer: 'toggleDrawer'
};

export {
  Themes,
  LoadMoreTopStatus,
  LoadMoreBottomStatus,
  GlobalEvents
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
