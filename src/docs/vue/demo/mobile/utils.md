# 工具方法

对项目中可复用的js代码可以放在utils目录下

## tab页签管理

utils/tab: tab页是有缓存的,在tab页切换是不会刷新页面; 当从一个tab页跳转到另外一个tab页时,需要刷新跳转后的tab页、关闭跳转前的tab页.

实现方式: 通过传递路由query.$tab的参数值来判断是否关闭、刷新. query.tab = encodeURIComponent(JSON.stringfy({close:true,refresh:true})),如下:

```js
import { useRouter } from '@lincy-vue/core';
const router = useRouter();

router.push({
  name: 'user',
  query: {
    $tab: encodeURIComponent(JSON.stringfy({close:true,refresh:true}));
  }
})

// 通过统一方法简化传值
import TabUtil from '@/utils/tab';

// 没有其他query参数
const query = TabUtil.createTabRouteQuery({
  close: true,
  refresh: true
});
router.push({
  name: 'user',
  query
})

// 有其他query参数
const query = TabUtil.createTabRouteQuery({
  close: true,
  refresh: true
},{
  userId: 12345
});
router.push({
  name: 'user',
  query
});

```

## 格式化器

utils/formaters: 日期、金额等格式化统一定义在该文件中

```js
import { formatMoney } from '@lincy-js/utils/number';
import moment from 'moment';

export default {
  money (num, decimal = 2) {
    return formatMoney(num, decimal, '¥');
  },
  dateToMinute (d) {
    return moment(d).format('YYYY-MM-DD HH:mm');
  }
};
```

js文件中使用格式化方法:

```js
import Formaters from '@/utils/formaters';

Formaters.money(123);

```

vue模板文件中使用格式化方法:

```vue
<template>
  <div>{{ $Formaters.money(123) }}</div>
</template>

```

## 过滤器

utils/filters: 字符串过滤处理等

```js

export default {
  prefix (url) {
    if (url && url.startsWith('http')) {
      return url;
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`;
      return url;
    }
  }
};

```

js文件中使用过滤方法:

```js
import Filters from '@/utils/filters';

Filters.prefix('');

```

vue模板文件中使用过滤方法:

```vue
<template>
  <div>{{ $Filters.prefix('') }}</div>
</template>

```

## 本地图片引用

utils/images: 统一管理对assets/images的图片引用

```js

import Logo from '@/assets/images/logo.png';
import DefaultHeadImage from '@/assets/images/defaultHeadImage.png';

// 图片统一管理
export {
  Logo,
  DefaultHeadImage
};


```

js文件中图片

```js
import Images from '@/utils/images';

Images.Logo

```

vue模板文件中使用图片:

```vue
<template>
  <img :src="$Images.Logo">
</template>

```

## 字典统一管理

utils/dictionary: 获取各种字典数据,统一在此类处理
