# 生命周期

## App生命周期

### App生命周期函数

| 事件 | 描述 | 参数 |
| :----:| :----: | :----: |
| beforeCreate(appConfig:any) | 创建App前 | [appConfig](./app-config.html) |
| created(appContext:IAppContext) | 创建App后 | [IAppContext](#app上下文) |
| mounted(appContext:IAppContext) | App加载后 | [IAppContext](#app上下文) |
| unmounted(appContext:IAppContext) | App卸载后 | [IAppContext](#app上下文) |

### App插件

插件文件：在plugins目录下新增app.js文件

```js
import {setLocale,useI18n,Languages}  from  '@lincy-vue/core/lang';
import {useAuth} from  '@lincy-vue/core/auth';

export default{

  beforeCreate(appConfig){
    // 可以修改appConfig的值
  },

  created(appContext){
    // 设置语言
    setLocale(Languages.en_US);
    // 可以从后台获取多语言设置并注册
    useI18n({
      messages:{
        en_US:{
          "login":{
            "title":"login in1",
            "info":"hello world"
          }
        }
      }
    });
  },
  mounted(appContext){
    // 设置权限数据
    const auth = useAuth();
    const arr = [];
    arr.push(auth.create("login",1));
    arr.push(auth.create("next",0));
    arr.push(auth.create("update",1));
    arr.push(auth.create("http",1));
    arr.push(auth.create("test1",2,"test"));
    arr.push(auth.create("test1",1,"test"));
    auth.init('menu',arr);
  }
  unmounted(appContext){
    // 资源释放
  }
}


```

## 组件生命周期

### 组件生命周期函数

| 事件 | 描述 | 参数 |
| :----:| :----: | :----: |
| created(context:IComponentContext) | 组建创建后 | [IComponentContext](#组件上下文) |
| beforeMount(context:IComponentContext) | 组件加载前 | [IComponentContext](#组件上下文) |
| mounted(context:IComponentContext) | 组件加载后 | [IComponentContext](#组件上下文) |
| beforeUpdate(context:IComponentContext) | 组件更新前 | [IComponentContext](#组件上下文) |
| updated(context:IComponentContext) | 组件更新后 | [IComponentContext](#组件上下文) |
| beforeUnmount(context:IComponentContext) | 组件卸载前 | [IComponentContext](#组件上下文) |
| unmounted(context:IComponentContext) | 组件卸载后 | [IComponentContext](#组件上下文) |

### 组件插件

插件文件：plugins/component.js

```js
export default{
  created(context){
    
  },
  beforeMount(context){
   
  },
  mounted(context){
  
  },
  beforeUpdate(context){
   
  },
  updated(context){
  
  },
  beforeUnmount(context):void{
   
  },
  unmounted(context):void{
  
  }
}

```

## App上下文

<b>IAppContext定义:</b>

| 属性 | 类型 | 详细 |
| :----:| :----: | :----: |
| appInstance | [IApp](#app实例) | App实例  |
| appConfig | [PlainObject](./app-config.md) | App配置文件信息 |

## 组件上下文

<b>IComponentContext</b>

| 属性 | 类型 | 详细 |
| :----:| :----: | :----: |
| instance | Object | 组件vue实例  |
| appConfig | [PlainObject](./app-config.md) | App配置文件信息 |
| currentRoute | [IRouteLocationRaw](../guide/router.html#路由信息) | 当前路由的详细信息 |
| isRouteComponent | Boolean | 组件是否路由组件 |

## App实例

接口定义：

```js
IApp {
  /**
   * 注册全局组件
   * @param name string 组件名称
   * @param comp {Function | Object}  组件
   */
  component(name:string,component:any):void;
  /**
   * 注册全局指令
   * @param name 指令名称
   * @param directive 指令定
   */
  directive(name:string,directive):void;
  /**
   * 安装 Vue.js 插件。如果插件是一个对象，它必须暴露一个 install 方法。如果它本身是一个函数，它将被视为安装方法。
   * @param plugin  {Object | Function}
   * @param options 可选配置
   */
  use(plugin:any,options?:any):void;
  /**
   * 设置一个可以被注入到应用范围内所有组件中的值。组件应该使用 inject 来接收 provide 的值。
   * @param name 名称
   * @param value 值
   */
  provide(name:string|symbol,value:any):void;
  /**
   * 注册全局服务
   * @param name 名称
   * @param instance 服务实例
   */
  registerGlobalService(name:string,instance:any):void;
  /**
   * 使用全局服务
   * @param name 名称
   * @return instance 服务实例
   */
  useGlobalService(name:string,instance:any):void;
}

```

### 注册全局组件

component方法注册全局组件

```js
import {useApp} from '@lincy-vue/core';

const appInstance = useApp();

// register an options object
appInstance.component('my-component', {
  /* ... */
  template:'<h1>{{count}}</h1>',
  data:()=>{
    return {
      count:0
    }
  }
});

```

### 注册指令

directive方法注册指令

```js
import {useApp} from '@lincy-vue/core';

const appInstance = useApp();

let customDirectvie = {
    bind:function(el,binding,vnode){ },
    inserted:function(el,binding,vnode){ },
    update:function(el,binding,vnode){ },
    componentUpdated:function(el,binding,vnode){ },
    unbind:function(el,binding,vnode){ },
}
appInstance.directive('custom-directvie', customDirectvie);

```

### use(vue插件)

```js
import {useApp} from '@lincy-vue/core';

const appInstance = useApp();

const myPlugin = {
  install(vue,options){
   // 1. 添加全局方法或 property
  vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加实例方法
  vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
  }
}

appInstance.use(myPlugin);

```

### 注入全局值

provide注入全局值

```js
import {useApp} from '@lincy-vue/core';

const appInstance = useApp();

// provide注入全局值
appInstance.provide('user','admin');

// 组建中inject引入值
const myComponent = {
  inject: ['user'],
  template: `
    <div>
      {{ user }}
    </div>
  `
};

```

### 全局服务

registerGlobalService方法注册全局服务，useGlobalService方法获取全局服务

```js

import {useApp} from '@lincy-vue/core';

const appInstance = useApp();
const util = {
  formatDate(date){}
};

// 全局注入服务实例
appInstance.registerGlobalService('util',util);

// 引用服务第一种方法：
this.$util.format(Date.now());
// 引用服务第二种方法：
appInstance.useGlobalService('util');


```
