# 字符串

一些常用的操作字符串的方法

| 方法 |  描述 |
| :----:| :----: |
| [isEmail](#判断邮箱) | 是否是email |
| [isPhone](#判断手机号) | 是否是手机号 |
| [isChinese](#判断中文)| 是否是中文 |
| [isTelephone](#判断电话号码)| 是否是电话号码 |
| [isIdentifyNo](#判断身份证号)| 是否是身份证号 |
| [getIdentifyInfo](#获得身份信息)| 获得身份信息  |
| [isLetter](#只能是英文字母)| 只能输入26个英文字母  |
| [isIntLetter](#只能是数字、字母或下划线)| 只能输入由数字、26个英文字母或者下划线组成的字符串 |
| [isPostcode](#是否是邮编)| 是否是邮编 |
| [trim](#去掉空格) | 去掉空格 |
| [validPassword](#验证密码) | 验证密码  |
| [padStart](#左补齐) |  左补齐指定字符到指定的长度 |
| [padEnd](#右补齐) | 右补齐指定字符到指定的长度  |

## 判断邮箱

```js
/**
 * 是否是email
 * @param email
 */
declare function isEmail(email:string):boolean
```

## 判断手机号

```js
declare function isPhone(phone:string):boolean
```

## 判断中文

```js
declare function isChinese(chinese:string):boolean
```

## 判断电话号码

```js
declare function isTelephone(telephone:string):boolean
```

## 判断身份证号

```js
declare function isIdentifyNo(no:string):boolean
```

## 获得身份信息

```js
declare interface IdCardInfo {
  /**
   *性别：M或F
   */
  gender:string;
  /**
   *出生日期：yyyy-mm-dd
   */
  birthday:string;
}
declare function getIdentifyInfo(no:string):IdCardInfo
```

## 只能是英文字母

```js
declare function isLetter(letter:string,isUpper?:boolean):boolean{
 ...
}
```

## 只能是数字、字母或下划线

```js
// 只能输入由数字、26个英文字母或者下划线组成的字符串
declare function  isIntLetter(val:string):boolean
```

## 是否是邮编

```js
declare function  isPostcode(code:string):boolean{
 ...
}
```

## 去掉两边空格

```js
declare function trim(val:string):string
```

## 验证密码

```js
declare interface PasswordOption {
  /**
   * 包含大写字母,默认为true
   */
  hasUpperLetter:boolean; 
  /**
   * 包含小写字母,默认为true
   */
  hasLowerLetter:boolean;
   /**
   * 包含特殊字符,默认为true
   */
  hasSpecialLetter:boolean;
  /**
   * 包含数字,默认为true
   */
  hasNumber:boolean;
   /**
   * 密码最小长度，默认为6
   */
  minLength:number,
  /**
   * 密码最大长度，默认为18
   */
  maxLength:number
}
declare function validPassword(val:string,option?:PasswordOption):boolean
```

## 左补齐

```js
/**
 * 左补齐
 * @param str 要补齐的字符串
 * @param length 补起后字符串长度
 * @param pad 补起字符
 * @returns 
 */
declare function   padStart(str:string, length:number,pad:string):string
```

## 右补齐

```js
/**
 * 右补齐
 * @param str 要补齐的字符串
 * @param length 补起后字符串长度
 * @param pad 补起字符
 * @returns 
 */
declare function padEnd(str:string, length:number,pad:string):string
```

## 使用示例

```vue
<script>
import {
  isEmail,
  isPhone,
  isIdentifyNo,
  padStart,
  padEnd
} from "@lincy-js/utils/string";
import {reactive,defineComponent} from '@lincy-vue/core';

export default defineComponent({
  setup() {
     const rulesRef = reactive({
     email: [
        {
          required: true,
          validator: (rule, value) => {
            console.log(value);
            if (isEmail(value)) {
              return Promise.resolve();
            } else {
              return Promise.reject("enter the correct  email");
            }
          },
          trigger: "change"
        }
      ],
     )}
  }
)}

padStart("6069",8,"****"); // 输出: ****6069
padEnd("6069",8,"****"); // 输出: 6069****

</script>

```
