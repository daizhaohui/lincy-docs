# 介绍

::: tip 提示
已经了解 Vue3  [V3.0官方文档](https://v3.cn.vuejs.org)！
:::

## lincy-vue 是什么

是一套用于构建用户界面的**渐进式框架**。基于V3.0框架基础之上封装的库，具有Vue3.0的全部功能，并在此功能基础上扩展页面路由、http请求、数据埋点、状态管理、多语言等等功能，并结合cli工具@lincy-vue/cli、@lincy-vue/exten功能扩展库使构建单页应用更加快速简单。

## 起步

<p>
  <ActionLink class="primary" url="installation.html">
    安装
  </ActionLink>
</p>

:::tip
官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识。如果你刚开始学习前端开发，将框架作为你的第一步可能不是最好的主意——掌握好基础知识再来吧！之前有其它框架的使用经验会有帮助，但这不是必需的
:::

尝试 lincy-vue 最简单的方法是使用 [Demo 例子](../demo/index.html)，你可以下载demo代码工程，跟着代码例子学习一些基础用法。

[安装教程](/guide/installation.html)给出了安装使用lincy-vue 的方式。请注意我们**不推荐**新手直接使用 `lincy-vue-cli`去构建一个单页应用。

## 简单入门

<font size=4>请先仔细阅读: [编码规范](./standard/project)</font>

### 创建一个页面组件

在pages目录添加一个目录counter,目录中添加index.js,index.less,index.vue三个文件

```vue
<template>
  <div class="counter-wrapper">
    <div class="counter" @click="increase">
      Counter: {{ data.counter }}
    </div>
  </div>
</template>

<script src="./index.js" lang="js"></script>
<style lang="less" scoped src='./index.less'></style>
```

```js
import { reactive } from "@lincy-vue/core";

export default {
  setup(){
    const data = reactive({
      counter: 0
    });
    const increase = ()=>{
      data.counter = data.counter + 1;
    };
    return {
      data,
      increase
    };
  }
};
```

```less
.counter-wrapper{
  .counter{
    font-size: 16px;
    margin: 60px 60px;
    color:@g_fontColor; // 引用全局变量，在themes/index.less文件定义
  }
}
```

### 配置页面路由

在app.config.js文件中，routes集合中添加一个路由配置 <font color=red size=2>(注意：不要放在最后一个位置)</font>

```js
import Counter from '../pages/counter';

export default{
  routes:[
    ...
    {
      name:'counter',  // 名字唯一
      component:Counter,
      path:'/counter',
    } 
    // 发在最后一个,没有匹配到以上的路由页面
    {
      name: 'notFound',
      path: '/:pathMatch(.*)', 
      component: NotFound
    }
  ],
  ...
};
```

### 定义全局样式变量

themes/index.less文件中定义的变量可以被全局引用

```less
@g_fontColor:blue;
@g_fontSize:24px;
```
### 添加接口请求

api目录下添加couter文件，文件中定义接口请求方法：
```js  
import { useHttp } from '@lincy-vue/core';
const { Http, HttpMethod} = useHttp();

export default class Counter{

  @Http("/counter")
  static getData();

  @Http("/counter",HttpMethod.Post)
  static postData();

}
```

调用接口方法

```js  
import CounterApi from 'api/counter';


CounterApi.getData().then(res=>{});

const data = {counter:1};
CouterApi.postData(data).then(res=>{});

```
