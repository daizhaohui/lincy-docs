# 接口请求

## 规范

- 按业务模块划分接口文件
- api/index.js导出模块接口

```js
import User from './user';
import Org from './org';
import Role from './role';
import Menu from './menu';

export default {
  User,
  Org,
  Role,
  Menu
};

```

## 模块接口定义

[框架接口请求说明](/docs/vue/http.html)

```js
import { useHttp } from '@lincy-vue/core';
const { Http, HttpMethod } = useHttp();

export default class OrgApi {
  // 获取机构树
  @Http('/hrOrganization/tree')
  static getTree () { }

  @Http('/hrOrganization/add', HttpMethod.Post)
  static add () { }

  @Http('/hrOrganization/edit', HttpMethod.Post)
  static edit () { }

  @Http('/hrOrganization/delete', HttpMethod.Post)
  static del () { }

  @Http('/hrOrganization/detail')
  static detail () { }
}
```

## 使用接口

Promise方式

```js
import Api from '@/api';

 Api.Org.getTree().then(res => {
  const { data, code } = res.data;
}).catch(e => {
  console.log(e);
});
```

await 方式

```js
import Api from '@/api';

const res = await Api.Org.getTree();
const { data, code } = res.data;

```
