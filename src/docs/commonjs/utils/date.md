# 日期

```js
import dayjs from '@lincy-js/utils/dayjs';
dayjs().format('yyyy-MM-dd');

```

请参照[dayjs官方文档](https://dayjs.fenxianglu.cn/category/parse.html#实例)

引入国际化

```js
import dayjs from '@lincy-js/utils/dayjs';

// 配置第一个
dayjs.locale() // 'en'

dayjs.locale('de') // use loaded locale globally
dayjs.locale('en') // switch back to default English locale globally

```