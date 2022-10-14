# Mock

## 添加http请求mock

第一步：开启mock,修改cli.config.js的mock配置节点：

```js
// cli.config.js，mock的设置只有在development模式下有效
export default function(mode){
  if(mode==='development'){
    return {
      ...
      mock:{
        enabled:true // 设置mock有效，自动加载mock目录下的文件
      }
    }
  } else if(mode==='production'){
    return {
      ...
    }
  }
}
```

第二步：在mock目录下添加新的xxx.js文件

::: tip 提示
不要修改mock/index.js文件
:::

- export default方式导出
- 定义的属性格式1(rurl是字符串匹配): 'rtype rurl': template|function(options)  
- 定义的属性格式2（正则表达式匹配: 'rtype regexp:rurl': template|function(options)

```js
export default {
  'GET /list': {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  },
  'POST /list/post': {
    userId:1,
    userName:'李刚'
  },
  'GET /list/products': [{...},{...}],
  // 正则匹配，需要添加regexp:前缀, 表达式两边不带/
  'GET regexp:\/api\/v1\/index-infos(|\\?\s*)': {data:[]}
}
```

::: tip 提示
rurl进行正则匹配时,rurl是前后不带/的正则表达式。

<font color=blue>正确 regexp:\/api\/v1\/index-infos(|\\?\s*)</font>

<font color=red>错误 regexp:/\/api\/v1\/index-infos(|\\?\s*)/</font>
:::

- 参数 rurl：可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。`例如：'/domian/list.json' 或  regexp:\/domain\/list\.json`。
- 参数 rtype：可选。表示需要拦截的 Ajax 请求类型。`例如 GET、POST、PUT、DELETE 等`。
- 参数 template：可选。表示数据模板，可以是对象或字符串。`例如 { 'data|1-10':[{}] }、'@EMAIL'`。
- 参数 function(options)：可选。表示用于生成响应数据的函数, options指向本次 [请求选项集](./http.html#请求参数)

请参照mockjs官方文档: [Mock](http://mockjs.com/0.1/#mock)   [Github](https://github.com/nuysoft/Mock/wiki)

## mock接口

```js
import mock from '@lincy-vue/utils/mock';

mock(rurl,rtype,template|function(options));
```

## Mock配置

cli.config.js的mock配置节点

| 名称 | 类型 | 描述 |
| :----:| :----: | :---- |
| enabled | boolean | 是否开启mock，默认值为true |
| timeout | String / Number | 指定被拦截的 Ajax 请求的响应时间，单位是毫秒。值可以是正整数，例如 400，表示 400 毫秒 后才会返回响应内容；也可以是横杠 '-' 风格的字符串，例如 '200-600'，表示响应时间介于 200 和 600 毫秒之间。默认值是'200-600'。|
