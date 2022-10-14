# Url

## 定义

```js

declare interface HashParamObject{
  [key:string]:string
}

declare interface  HashObject{
  /**
   * 路径部分
   */
  path?:string,
  /**
   *参数对象
   */
  params?: HashParamObject;
}

declare  class  Url{
  /**
   * 创建处理url的实例
   * @param url 标准的url地址
   */
  constructor(url: string);
  /**
   * 获取url参数:通过key获取对应的value,不传key返回全部的查询参数对象
   * @param  [key] 可选,查询参数值
   * @returns 返回this
   */
  getSearchParamValue(key?: string): any;
  /**
   * 获取hash上的参数:通过key获取对应的value,不传key返回全部的hash上的参数对象，如：#abc?a=1&b=b,返回{a:'1',b:'b'}
   * @param  [key] 可选,查询参数值
   * @returns 返回this
   */
  getHashParamValue(key?: string): any;
  /**
   * url添加单个查询参数
   * @param key
   * @param value  
   * @returns 返回this
   */
  addSearchParam(key: string, value: any): any;
  /**
   * url添加多个查询参数 
   * @param param {a:1,b:b}
   * @returns 返回this
   */
  addHashParam(param: {}): any;
  /**
   *Url实例转换成字符串: 标准的url字符串
   */
  toString():string;
  /**
   *协议
   */
  protocol: string;
   /**
   * 主机名
   */
  hostName: string;
  /**
   * 端口
   */
  port: string;
   /**
   * 路径部分
   */
  path: string;
   /**
   * 从问号 (?) 开始的 URL（查询部分
   */
  search: string;
  /**
   * hash对象表示,路径和参数
   */
  hash: HashObject
  /**
   * hash字符串
   */ 
  hashString: string; 
}


```

解析URL获得对应的属性，包括protocol，hostName，port，search，hash对象（路径和参数），hash.path，hash.params。
| 方法 |  描述 |
| :----:| :----: |
| [getSearchParamValue](#获取url参数) | 获取url参数 |
| [getHashParamValue](#获取hash参数)| 获取hash参数 |
| [addSearchParam](#添加查询参数) |  url添加查询参数（支持链式调用） |
| [addHashParam](#添加hash查询参数)|  url添加hash的查询参数（支持链式调用） |

## 获取url参数

```js
// 获取url参数:通过key获取对应的value,不传key返回全部的查询参数
declare function gejsearchParamValue(key?: string): any
```

## 获取hash参数

```js
// 获取hash参数:通过key获取对应的value,不传key返回全部的hash参数
declare function getHashParamValue(key?: string): any
```

## 添加查询参数

```js
//  url添加查询参数，可以是key,value的形式，也可以是对象的形式
declare function  addSearchParam(key: string, value: any | param: {}): any
```

## 添加hash查询参数

```js
// url添加hash的查询参数，可以是key,value的形式，也可以是对象的形式
declare function  addHashParam(key: string, value: any | param: {}): any
```

## 使用示例

```js
import URL from '@lincy-js/utils/url';
const url = new URL('https://www.capgemin.com:8080?a=1&b=2#a/b/c?c=1');
url.hostName
url.port
...
url.getSearchParamValue()
url.getSearchParamValue('a')
url.getHashParamValue('c')
url.addSearchParam('c', '3')
url.addSearchParam({ 'k': '9' })
url.addHashParam('c', '3')
url.addHashParam({ 'k': '9' })
...
```
