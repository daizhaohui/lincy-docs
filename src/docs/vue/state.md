# 状态管理

## 全局状态

- 定义全局状态

::: tip 提示
 不要把大的数据定义在全局状态中,全局状态默认会自动保存到localStorage中,浏览器localStorage的存储限制存储5M的数据
:::

```js
import { Module, Observable, Action, Persist } from '@lincy-vue/core/state';

@Persist()   // SettingState的所有添加了@Observable的属性值被保存起来，下次打开页面状态自动恢复，如果只保存指定的属性，@Persist()添加到要对应的属性上
@Module("settings")
export default class SettingState{

  // 当前皮肤设置（整体风格)
  @Observable('')
  static currentTheme

  // 当前导航菜单模式
  @Observable('sider')
  static currentMenuLayout

  // 是否多tab页签
  @Observable(0)
  static isTabsMode

  // 是否显示页脚
  @Observable(1)
  static showFooter

  // 当前语言
  @Observable('zh_CN')
  static currentLanguage

  // 定义更新状态值方法(可以一次修改多个值): update({ currrentTheme: '',isTabsMode: 1})
  @Action()
  static update(){}
  
}

```

<b>装饰器定义：</b>

| 名称 | 作用 | 参数描述 | 作用域 
| :----:| :----: | :---- | :---- |
| Module | 状态模块定义 | 参数:状态的模块名称，必选; | 定义在类上 |
| Observable | 指定属性可悲观测变化 | 参数：默认值，必选; | 定义在类属性上 |
| Persist | 持久化类属性值 | 非必选; | 定义在类（持久化类所有属性）、类属性上（持久化改属性） |
| Action | 指定了action的方法，可以一次修改多个@Observable的属性 | 参数： 含有@Observable属性名的对象 | 定义在函数上

- 更新全局状态

```js

import SettingState from '@/state/settingState';

export default defineComponent({
  components: {},
    setup() {

    const handleFinish = values => {
      // 更新一个状态值
      SettingState.isTabMode = 1;

      // 更新多个个状态值
      SettingState.update({
        isTabMode: 1,
        currentLanguage: 'en_US'
      })    
    };

    return {
      handleFinish
    };
  },
});

```

- 访问全局状态
  
```js

import SettingState from '@/state/settingState';

export default defineComponent({
  components: {},
    setup() {
    // 访问状态值
    const currentLanguage = SettingState.currentLanguage;
    // 打印所有状态值
    console.log(SettingState.toString());

    return {
      formState,
      handleFinish
    };
  },
});

```

::: tip 提示
 请不要在定义组件的外部更新、获取状态。如下面错误使用的代码例子
:::

```js
import SettingState from '@/state/settingState';

// 错误更新状态的用法
SettingState.update({
  isTabMode: 1,
  currentLanguage: 'en_US'
});    
// 错误获取状态的用法
SettingState.currentLanguage = '';

export default defineComponent({
  components: {},
  setup() {

  };
});

```

- 全局数据加密存储

默认情况下，全局状态数据会加密保存到localStorage中

```js
// 自定义数据加解密
import {setEnDesCrypt} from '@lincy-vue/core/state';

// value为字符串，返回为加密后的字符串
const  enCrypt = (value)=>{
  return value;
};

// value为字符串，返回为解密后的字符串
const desCrypt = (value)=>{
  return value;
};

// 第一个参数为加密函数，第二个参数为解密函数
setEnDesCrypt(enCrypt,desCrypt)
```

## 本地存储

```js
import LocalStorage from '@lincy-vue/core/state/localStorage';

// 根据key值获取json对象
LocalStorage.getJSON('key');
// 根据key值获取值
LocalStorage.get('key');
const value = '123';
// 存储值，如果value值为object，将被序列化json字符串存储，可以通过getJSON方法获取原始对象值
LocalStorage.set('key',value);
// 移除指定的存储项
LocalStorage.removeItem('key');
// 清除所有存储项
LocalStorage.clear();

```

## 会话存储

```js
import SessionStorage from '@lincy-vue/core/state/sessionStorage';

// 根据key值获取json对象
SessionStorage.getJSON('key');
// 根据key值获取值
SessionStorage.get('key');
const value = '123';
// 存储值，如果value值为object，将被序列化json字符串存储，可以通过getJSON方法获取原始对象值
SessionStorage.set('key',value);
// 移除指定的存储项
SessionStorage.removeItem('key');
// 清除所有存储项
SessionStorage.clear();
```

## cookie存储

```js
import Cookies from '@lincy-vue/core/state/cookies';

/*--设置值--*/

//创建简单的cookie
Cookies.set('name', 'value');
//创建有效期为7天的cookie
Cookies.set('name', 'value', { expires: 7 });
//为当前页创建有效期7天的cookie
Cookies.set('name', 'value', { expires: 7, path: '' });
}

/*--取值--*/

Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined
//获取所有cookie
Cookies.get(); // => { name: 'value' }

/*--删除值--*/

Cookies.remove('name');
//如果值设置了路径，那么不能用简单的delete方法删除值，需要在delete时指定路径
Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // 删除失败
Cookies.remove('name', { path: '' }); // 删除成功
//注意，删除不存在的cookie不会报错也不会有返回

/*--json相关--*/

//如果你通过set方法，传入Array或类似对象，而不是简单的string，那么会将你传入的数据用JSON.stringify转换为string保存。
Cookies.set('name', { foo: 'bar' });
Cookies.get('name'); // => '{"foo":"bar"}'
Cookies.get(); // => { name: '{"foo":"bar"}' }

/*--withConverter方法--*/
//通过withConverter方法也可以覆写默认的encode、decode实现，并返回一个新的cookie实例。

document.cookie = 'escaped=%u5317';
document.cookie = 'default=%E5%8C%97';
const NewCookies = Cookies.withConverter({
    read: function (value, name) {
      if ( name === 'escaped' ) {
        return unescape(value);
      }
    },
    write: function (value, name) {
        // Write converter
    }
});
NewCookies.get('escaped'); // 北
NewCookies.get('default'); // 北
NewCookies.get(); // { escaped: '北', default: '北' }

```

<b>set方法支持的属性:</b>
| 属性 | 类型 | 描述 |
| :----:| :----: | :---- |
| expires | Number/Date | 定义有效期。如果传入Number，那么单位为天，你也可以传入一个Date对象，表示有效期至Date指定时间。默认情况下cookie有效期截止至用户退出浏览器 |
| path | String | 表示此cookie对哪个地址可见。默认为”/” |
| domain | String | 表示此cookie对哪个域名可见。设置后cookie会对所有子域名可见。默认为对创建此cookie的域名和子域名可见 |
| secure | Boolean | 表示cookie传输是否仅支持https。默认为不要求协议必须为https |

## 状态配置

app.config.js中对应state配置节点

```js
export default {
  ...,
  state:{
  }
}
```

state的配置定义：

| 名称 | 类型 | 描述 |
| :----:| :----: | :---- |
| persisted | boolean | 全局状态数据是否要持久化，默认值为true |
| encrypted | boolean | 全局状态数据是否要加密，默认值为true |
| storageKey | string | 全局状态数据保存到localStorage的key值，默认值为'__state__'  |
