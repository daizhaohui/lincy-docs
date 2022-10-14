# 接口请求

## 规范

- 按业务模块划分接口文件
- api/index.js导出模块接口

```js
import Home from './home';
import Address from './address';
import Good from './good';
import Cart from './cart';
import User from './user';

export default {
  Home,
  Address,
  Good,
  Cart,
  User
};
```

## 模块接口定义

[框架接口请求说明](/docs/vue/http.html)

```js
import { useHttp } from '@lincy-vue/core';
const { Http, HttpMethod } = useHttp();

export default class ProductApi {
  @Http('/user/info')
  static getUserInfo () { }

  @Http('/user/info', HttpMethod.Put)
  static updateUserInfo () { }

  @Http('/user/login', HttpMethod.Post)
  static login () { }

  @Http('/user/logout', HttpMethod.Post)
  static logout () { }

  @Http('/user/register', HttpMethod.Post)
  static register () { }
}

```

## 使用接口

Promise方式

```js
import Api from '@/api';

 Api.User.getUserInfo().then(res => {
  const { data, code } = res.data;
}).catch(e => {
  console.log(e);
});
```

await 方式

```js
import Api from '@/api';

const res = await  Api.User.getUserInfo;
const { data, code } = res.data;

```