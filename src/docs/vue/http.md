# 接口请求

## 定义方法

在api目录下添加接口文件test.js:

```js
import { useHttp } from '@lincy-vue/core';
const { Http, HttpMethod} = useHttp();

export default class TestApi{

  @Http("/queryTel/:tel")
  static get1(){}

  @Http("/v2ex/test",HttpMethod.Get)
  static get2(){}

  // 定义多个请求
  @Http("/v2ex/test",HttpMethod.Get)
  @Http("/queryTel")
  static get3(){}

}
```

<b>HttpMethod支持值</b>: Get，Post, Put, Delete, Options, Head, Patch


## 调用方法

```js

import TestApi from '../../Api/test';

// 接口请求返回Promise

// 单个http请求,pathParams为路径参数（/queryTel/:tel）
TestApi.get1({
  pathParams:{
    tel:'18916666069'
  }
}).then(res=>{}).catch(e=>{});

// 多个http请求：按装饰器件定义的顺序传递http请求的options数组，返回结果数组
 TestApi.get3([
    {
      params:{
        name:'java'
      }
    },
    {
      params:{
        tel:'18916666069'
      }
    },
]).then(res=>{
  console.log(res[0]);
  console.log(res[1]);
});
```

## 接口请求服务

第一种调用方法：

```js
import { useHttp } from '@lincy-vue/core';
const { getHttpService } = useHttp();

const httpService = getHttpService();
httpService.get();
```

第二种调用方法：只能在组件实例中调用

```js
this.$http;.get();
```

支持的方法：

```js

type HttpSpreadCallback = (...args:any[])=>void;

// url为http请求地址，options为请求参数配置
get(url:string,options:any):Promise;
post(url:string,options:any):Promise;
put(url:string,options:any):Promise;
delete(url:string,options:any):Promise;
head(url:string,options:any):Promise;
options(url:string,options:any):Promise;
patch(url:string,options:any):Promise;
// 多个Promise的http请求
all(iterable:Promise[]):Promise;
// 展开多个Promise
spread(callback:HttpSpreadCallback):void;
// 创建一个新的http请求实例
create(options:any):any;
```

## 请求参数

接口请求中的第二个参数options支持的属性如下

```js

{
  // `url` 是请求的接口地址，必填
  url: '/user',

  // `method` 是请求的方法
  method: 'get', // 默认值

  // 如果url不是绝对路径，那么会将baseURL和url拼接作为请求的接口地址
  // 用来区分不同环境，建议使用
  baseURL: 'https://some-domain.com/api/',

  // 用于请求之前对请求数据进行操作
  // 只用当请求方法为‘PUT’，‘POST’和‘PATCH’时可用
  // 最后一个函数需return出相应数据
  // 可以修改headers
  transformRequest: [function (data, headers) {
    // 可以对data做任何操作
    return data;
  }],

  // 用于对相应数据进行处理
  // 它会通过then或者catch
  transformResponse: [function (data) {
    // 可以对data做任何操作

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // URL中的路径参数  /abc/:id/:name 
  pathParams:{
    id:123,
    name:'name1'
  }

  // URL参数
  // 必须是一个纯对象或者 URL参数对象
  params: {
    ID: 12345
  },

  // 是一个可选的函数负责序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // 请求体数据
  // 只有当请求方法为'PUT', 'POST',和'PATCH'时可用
  // 当没有设置`transformRequest`时，必须是以下几种格式
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // 请求超时时间（毫秒）
  timeout: 1000,

  // 是否携带cookie信息
  withCredentials: false, // default

  // 统一处理request让测试更加容易
  // 
  /**
   * 使用该配置项目, 我们可以设置属于自己的请求方法,统一处理request让测试更加容易,返回一个Promise并提供一个可用的response
   */
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // 响应格式
  // 可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认值是json

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // 处理上传进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // 处理下载进度事件
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // 设置http响应内容的最大长度
  maxContentLength: 2000,

  // 定义可获得的http响应状态码
  // return true、设置为null或者undefined，promise将resolved,否则将rejected
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  // 最大重定向次数？没用过不清楚
  maxRedirects: 5, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  // 代理
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  cancelToken: new CancelToken(function (cancel) {
  })
}



```

## 请求拦截器

在plugins目录下添加http.js文件(接口请求插件): `添加那个拦截器函数就执行那个，不添加就不会拦截`

```js
export default{

  // 

  /**
   * 请求配置：可以在此方法设置请求头。如：可以此处统一加上用户令牌(token)的头信息
   * 返回修改后的options新值
   */
  requestConfig(options){
    options.headers = {...};
    console.log("requestConfig:"+ JSON.stringify(config));
    return options;
  },

  // 请求发生错误，返回Promise
  requestError(err){
    console.log("requestError:");
    console.log(err);
    return Promise.reject(err);
  },
  
  /**
   * 成功响应拦截器，如：根据接口返回的code判断用户令牌(token)是否失效，如果失效就跳转到登录页面重新登录更新令牌
   * 返回Promise
   */
  responseSuccess(res){
    console.log("responseSuccess:"+ JSON.stringify(res));
    return Promise.reject('ok');
  },

 // 响应失败，返回Promise
  responseFail(err){
    console.log("responseFail:");
    console.log(err);
    return Promise.reject(err);
  }
}
```

[请求参数:options](#请求参数)

## 接口请求配置

app.config.js中对应http配置节点，配置值将应用到每个http的请求上

```js
export default {
  ...,
  http:{
  }
}
```

http的配置定义：[同接口请求参数配置属性](#请求参数)

