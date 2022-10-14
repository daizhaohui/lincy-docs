# 动态换肤

:::tip

- themes目录下的每一个子目录对应一个皮肤，子目录名为皮肤名
- 添加新的皮肤需要重新启动程序才会生效
- 可以同时支持全局样式换肤、动态变量值换肤两种方式；两种方式可以混合使用
- modifyVars.json优先级高于*.less文件,即modifyVars.json定义的同名样式变量会覆盖index.less定义的样式变量
- 皮肤目录/modifyVars.json的同名样式变量将覆盖themes/modifyVars.json的样式变量
- 皮肤目录/index.less的同名样式定义（变量、函数、样式名等）将覆盖themes/index.less的定义
:::

## 默认样式

- themes/index.less 文件定义默认的样式： 变量、样式名
- themes/modifyVar.json 文件覆盖样式变量（优先级比*.less文件高）,通常用来覆盖引用的第三方UI库定义的样式变量

## 开启皮肤功能

如何开启皮肤功能？如何设置默认皮肤？

请设置theme.enabled，theme.default

```js

/**
 * cli.config.js配置文件中的defaultTheme
 */


module.exports = (env)=>{
  if(env==='development'){
    return {
      ...,
      // 皮肤设置
      theme:{
        enabled:true, // 启动皮肤功能，默认是false
        default:'', // 应用启动时默认皮肤，默认是空
      }
    };
  }
  else if(env==='production'){
    return {
      ...,
       // 皮肤设置
      theme:{
        enabled:true, // 启动皮肤功能，默认是true
        default:'', // 应用启动时默认皮肤，默认是空
      }
    };
  }
  return {};
};

```

## 全局样式换肤

第一步：在src/themes目录下添加皮肤目录,添加的目录名就是皮肤名

第二步：皮肤目录下添加皮肤样式文件index.less，定义全局less变量，全局样式

第三步：重新运行app

添加dark和light两种皮肤例子

```less
// dark/index.less
@primary-color: #868080; // 全局主色
@link-color: #b5d1cd; // 链接色
@success-color: #52c41a;

// light/index.less
@primary-color: rgb(49, 59, 202);  // 全局主色
@link-color: #2e08d6; // 链接色
@success-color: #40990c;

```

## 动态变量值换肤

第一步：在src/themes目录下添加皮肤目录,添加的目录名就是皮肤名
第二步：皮肤目录下添modifyVars.json文件
第三步：modifyVars.json文件中定义变量值，变量值请参照使用的ui组件库定义的值

```js
// ant disign vue 皮肤变量值
 {
  "@primary-color": "red", // 全局主色
  "@link-color": "#1890ff", // 链接色
  "@success-color": "#52c41a", // 成功色
  "@warning-color": "#faad14" // 警告色
}

```

:::tip
  index.less、modifyVars.json可以同时使用
:::

## 切换皮肤

```js

/**
 * 皮肤方法
 */

/**
   * 设置皮肤
   * @param  name 皮肤名称
   */
  export declare function setTheme(name:string):void;
  /**
   * 恢复默认皮肤(配置文件设置的默认皮肤)
   */
   export declare function resetTheme():void;
  /** 
   * 获取配置中设置的默认皮肤
   */
   export declare function getDefaultTheme():string|null;
  /**
   * 清除皮肤（不使用皮肤样式）
   */
   export declare function clearTheme():void;
   /**
    * 是否有可用的皮肤
   */
  export function hasTheme():boolean;

```

设置皮肤:

```js

import {setTheme} from '@lincy-vue/core/theme';
setTheme('dark');

```

## 样式文件引用

themes/index.less 对样式文件的引用

```less
// ant design vue 
@import '~ant-design-vue/dist/antd.less';
// vant
@import '~vant/lib/index.less';
// element plus
@import 'element-plus/lib/theme-chalk/index.css';
element-plus不支持less样式，可以使用[全局样式换肤](#全局样式换肤)模式, [参照官放文档](https://element-plus.gitee.io/#/zh-CN/component/custom-theme)。


```
