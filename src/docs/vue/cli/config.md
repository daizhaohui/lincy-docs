# 构建配置

构建环境分为development开发、production生产两种,配置节点不是在所有环境都有效。

```js
export default function(env){
    if(env==='development'){
        return {
            ...
        }
    }
    else if(env==='production'){
        return {
            ...
        }
    }
}

```

配置节点

| 配置节点名 | 有效环境 | 描述 |
| :----:| :----: | :---- |
| devServer | development | [本地调试配置](#本地调试配置) : 设置本地调试的端口和接口代理 |
| mock | development/production | [Mock配置](#Mock配置) : 接口数据模拟 |
| theme | development/production | [皮肤配置](#皮肤配置) : 皮肤配置 |
| injects | development/production | [首页内容插入配置](#皮肤配置) : index.html插入指定内容配置 |
| designPx | development/production | [rem配置](#rem配置) : 设计尺寸设置 |
| alias | development/production | [别名配置](#别名配置) : 设置路径的别名
| splitChunks | production | [分离代码配置](#分离代码配置) : 分离包代码
| compress | production | [gzip压缩配置](#gzip压缩配置) : 对js、css文件进行gzip压缩
| cdn | development/production | [CDN配置](#CDN配置) : CDN地址替换配置功能 |
| defines | development/production | [编译全局常量配置](#编译全局常量配置) : 创建一个在编译时可以配置的全局常量 |

## 本地调试配置

```js
export default function(env){
 if(env==='development'){
  return {
    devServer:{
      // 本定启动App的端口号
      port: 8080,
      // 接口代理配置，同webpack的proxy设置
      proxy: {} 
    }
  }
 } 
}
```

[devServer.proxy配置方法](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)

## Mock配置

```js
export default function(env){
 if(env==='development'){
  return {
   mock:{
    enabled:true,  // 是否启用mock，在正式发布生产环境时，务必设置为false
    timeout:'200-800'  
   }
  }
 } 
 else if(env==='production'){
  return {
   mock:{
    enabled:false,  
    timeout:'200-800'  
   }
  }
 }
}
```

[Mock配置](../mock.html##Mock配置)

## 皮肤配置

```js
export default function(env){
 if(env==='development'){
   return {
    theme:{
      enabled:false, // 是否启动动态换肤，默认为false，为true时才会编译动态皮肤样式
      default:'' // 应用启动时，默认的皮肤名
    }
   }
 }
 else if(env==='production'){
  return {
    theme:{
      enabled:false,
      default:''
    }
  }
 }
}

```

:::tip
可以指定只编译特定的皮肤  [编译皮肤](./tools.html#编译皮肤)
:::

## 首页内容插入配置

injects配置节点，为{position,content}对象数组

- position为插入位置：header(html的header节点位置插入内容)，body（html的body节点位置插入内容)
- content: 插入的内容字符串

```js
export default function(env){
 if(env==='development'){
   return {
    injects:[
      {
        position: 'header',  
        content: '<script src="https://www.xxx.yyy/a.js">'
      },
      {
        position: 'body',  
        content: '<style>.page{width:'200px';}</style>'
      }
    ]
   }
 }
 else if(env==='production'){
  return {
    injects:[]
  }
 }
}
```

## rem配置

designPx为设计尺寸（px值),框架会根据给定的尺寸按rem:px=1:10(1rem=10px)的换算比例计算

```js
export default function(env){
 if(env==='development'){
   return {
     designPx: 750 // 页面的设计尺寸为750px
   }
 }
 else if(env==='production'){
  return {
    designPx: 750
  }
 }
```

## 别名配置

- alias设置别名的作用是为了让后续引用的地方减少路劲的复杂度
- 内置别名 '@' :  'src'

```js
export default function(env){
 if(env==='development'){
   return {
     alias:{
       'utils' : 'src/utils'
     }
   }
 }
 else if(env==='production'){
  return {
    alias:{}
  }
 }
}
```

## 分离代码配置

- 主要作用是提取依赖包代码到一个单独的JS文件，防止业务JS文件过大
- 配置格式：[name] : [包名1,包名2]
- 配置的包名可以模糊匹配（正则表达式）

```js
export default function(env){
 if(env==='production'){
  return {
    splitChunks: {
      vendors2: ['moment', 'lodash-es', '@ant-design/icons-vue/*', '@ant-design/icons-svg/*']
    }
  }
 }
}
```

## gzip压缩配置

- 设置js、css文件超过指定的大小进行gzip压缩，生成同名的.gz文件
- 通常对js、css文件比较大，网络传输是性能的瓶颈的时候开始功能

```js
export default function(env){
 if(env==='production'){
  return {
    compress: {
      enable: false, // 是否开始压缩， 默认: false（停用）
      threshold: 10240, // 只处理比这个值大的资源，按字节计算。 默认: 10240
      minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理。 默认: 0.8
      deleteOriginalAssets: false // 生成同名的.gz文件后，是否要删除源文件。 默认： false（不删除）
    }
  }
 }
}
```

## CDN配置

支持编译时生成js、css文件相对地址自动替换成cdn的地址。配置对象 { type, match, address }

- type: 文件类型css、js（目前只支持这两种文件)
- match: 匹配规则，设置为ture将匹配生成的所有js或css文件; 设置匹配函数过滤不需要替换的文件
- address: cdn地址

```js
export default function(env){
 if(env==='development'){
   return {
   
   }
 }
 else if(env==='production'){
  return {
     cdn:[
      {
        type: 'css',
        match: true,
        address: 'http://www.xxx.yyy/css'
      },
      {
        type: 'js',
        match: (name)=>{
          // 只有名字有vendors的js文件才被替换
          if(name.indexOf('vendors')!==-1) return true;
          return false;
        },
        address: 'http://www.xxx.yyy/js'
      }
    ]
  }
 }
}
```

## 编译全局常量配置

允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。

```js
export default function(env){
 if(env==='development'){
   return {
     defines:{
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object")
     }
   }
 }
 else if(env==='production'){
  return {
    defines:{}
  }
 }
}
```

:::tip
注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')。
:::
