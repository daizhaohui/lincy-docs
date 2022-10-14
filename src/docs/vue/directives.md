# 扩展指令

| 指令 |  描述 |
| :----:| :----: |
| v-clipboard | [剪贴板](#剪贴板) 指定的数据复制到剪贴板上|
| v-debounce | [防重复点击](#防重复点击) 防止快速连击点击事件|
| v-inputFilter | [输入过滤](#输入过滤)  对输入框的输入字符进行限制输入 |
| v-auth | [授权](#输入过滤)  判断按钮功能权限使用 |

## 使用指令

```js
// app启动的时候注册一下需要使用的指令，通常可以在app.js文件里添加
import {useDirective} from '@lincy-vue/core';
import debounce from '@lincy-vue/core/directives/debounce';
import inputFilter from '@lincy-vue/core/directives/inputFilter';
import auth from '@lincy-vue/core/directives/auth';

// 扩展指令
useDirective(debounce);
useDirective(inputFilter);
useDirective(auth);

```

## 剪贴板

- 拷贝数据： v-clipboard:="data"
- 拷贝成功事件：v-clipboard:success="copyDataSuccess"
- 拷贝出错事件：v-clipboard:error="copyDataError"

```vue
<template>
  <div>
    <div v-clipboard="data" v-clipboard:success="copyDataSuccess" v-clipboard:error="copyDataError">
      clipboard
    </div>
  </div>
</template>
<script>

export default defineComponent({
  setup(){
    const copyDataSuccess = (value)=>{
      alert(JSON.stringify(value));
    };

    const copyDataError = (err)=>{
       console.log(err);
    };

    return {
      copyDataSuccess,
      copyDataError,
      data:'copy data',
      money:''
    }
  }
});

```

## 防重复点击

 `v-debounce="[btnClick,1000]": btnClick为点击事件处理，1000为点击延时时间（单位为毫秒）`

```vue
<template>
  <div>
    <div>
      <button v-debounce="[btnClick,1000]">
      debounce
      </button>
    </div>
  </div>
</template>

<script>

export default defineComponent({
  setup(){
    const btnClick = ()=>{
       console.log(Date.now());
    };

    return {
     btnClick
    }
  }
});

```

## 输入过滤

v-input-filter，对不符合条件的字符限制输入

- 金额输入限制: v-input-filter:Price="2", 2为小数点后的位数
- 只能输入整数：v-input-filter:Int
- 只能输入字母：v-input-filter:Letter
- 只能输入小写字母：v-input-filter:LowerLetter
- 只能输入大写字母：v-input-filter:UpperLetter
- 只能输入整数或字母：v-input-filter:IntLetter
- 只能输入非特殊字符：v-input-filter:NoSpecial
- 只能输入自定义字符：v-input-filter:Custom="正则表达式"

```vue
<template>
  <div>
      <input v-input-filter:Price="2" v-model="money"/>
      <input v-input-filter:Int v-model="money"/>
    </div>
  </div>
</template>

<script>

export default defineComponent({
  setup(){
    return {
      money:'0.00'
    }
  }
});

```

## 权限

v-auth指令参数格式: 功能权限标识 ｜ 操作权限（默认1为有权限，可选） ｜ 资源类型（默认为功能权限，可选）
如： v-auth="'audit'" 等同于 v-auth="'audit|1|func'" 等同于 v-auth="'audit|1'"

```vue
<template>
  <div>
      <a-button v-auth="'audit'">审核</a-button>
      或
      <a-button v-auth="auditCode">审核</a-button>
    </div>
  </div>
</template>

<script>

export default defineComponent({
  setup(){
    return {
      auditCode: 'audit'
    }
  }
});

```
