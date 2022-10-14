# 权限管理

## 权限接口

```js

IAuthService{

  /**
   * 初始化权限数据
   * @param defaultType  默认的权限资源类型
   * @param data  权限数据
   */
  init(defaultType:string,data:IResourceAuthority[]):void;
  /**
   * 是否有指定的操作权限
   * @param resourceID  资源唯一标识
   * @param authority  操作权限，默认为1
   * @param resourceType  资源类型，默认为init方法指定的defaultType
   */
  has(resourceID:string,authority?:number,resourceType?:string):boolean;
  /**
   * 获取有指定操作权限权限的某种资源
   * @param resourceType 资源类型，默认为init方法指定的defaultType
   * @param authority  操作权限，默认为1
   */
  get(resourceType?:string,authority?:number):string[];
  /**
   * 添加资源权限
   * @param data  资源权限集合
   */
  add(data:IResourceAuthority[]):void;
  /**
   * 创建一个资源权限
   * @param resourceID 资源唯一标识
   * @param authority 操作权限，默认为1
   * @param resourceType 资源类型，默认为init方法指定的defaultType
   */
  create(resourceID:string,authority?:number,resourceType?:string):IResourceAuthority;
  /**
   * 清除所有权限数据
   */
  clear():void;
}

```

## 资源权限

```js
/**
 * 对某种资源类型下的某个资源具有什么样的权限
 */
IResourceAuthority {
  /**
   * 资源类型
   */
  resourceType:string;
  /**
   * 资源唯一标识
   */
  resourceID:string;
  /**
   * 资源访问的权限，通常1表示有权限,0表示没有权限
   */
  authority?:number;
}
```

## 初始化权限数据

通常在登录时，从后端接口获取权限数据，然后在转换成前端的权限对象数据.

```js

import {useAuth} from  '@lincy-vue/core/auth';

const auth = useAuth();
const arr = [];
arr.push(auth.create("menu1"));
arr.push(auth.create("menu2"));
arr.push(auth.create("audit"));
auth.add(arr);

```

::: tip 提示
权限数据对象发生变化时，默认情况下会自动保存在localStorage中，页面刷新会自动从localStorage中恢复权限数据对象。
如果要修改默认行为，请修改[权限配置](#权限配置)
:::

，

## 判断权限

<b>限数据初始化完后，就可以调用权限接口判断是否有操作权限</b>

```js

import {useAuth} from  '@lincy-vue/core/auth';

const auth = useAuth();
// 是否对菜单1有权限
auth.has("menu1")
// 是否有审核权限
auth.has("audit")

```

<b>在组件实例中直接通过this.$auth判断权限</b>

```vue

<template>
  <div>
    {{this.$auth.has("audit")? "ok":"sorry"}}
  </div>
</template>

<script>
export default {

}

</script>

```

<b>通过指令v-auth判断权限</b>

```vue

<template>
  <div>
   <button v-auth="'audit'">
      审核 
   <button>
  </div>
</template>
<script>

export default {

}

</script>
```

v-auth指令参数格式: 资源唯一标识 ｜ 操作权限 ｜ 资源类型,  v-auth="'audit'" 等同于 v-auth="'audit|1|func'"  等同于  v-auth="'audit|1'"

## 权限配置

app.config.js中对应auth配置节点

```js
export default {
  ...,
  auth:{
  }
}
```

auth的配置定义：

| 名称 | 类型 | 描述 |
| :----:| :----: | :---- |
| autoSave | Boolean | 是否自动保存权限数据到localStorage,默认值true|
| storageKey | String | 存储key,默认值'__auth__'|
| defaultResourceType | String |  默认的资源类型, 默认值'func' |
