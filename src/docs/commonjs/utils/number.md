# 数字

一些常用的操作数字的方法

| 方法 |  描述 |
| :----:| :----: |
| [isRange](#范围判断) | 数字指定范围判断 |
| [isRange](#生成随机数)| 生成指定范围内的随机数 |
| [numberToChinese](#转为大写金额)|  将数字转换为大写金额 |
| [formatMoney](#格式化为货币)| 将数字格式化指定格式的货币 |
| [formatPercent](#格式化为百分比)| 将数字格式化指定格式的百分比 |

## 范围判断

- 定义

```js
 /**
   * 数字指定范围判断
   * @param  val 要判断的数字
   * @param start 大于等于的数字
   * @param [end] 小于等于的数字, 可选。
   */
  declare function isRange(val:number,start:number,end?:number):boolean;
 ```

- 示例

```vue
<script>
import { isRange } from "@lincy-js/utils/number";

age: [
      {
        required: true,
        validator: (rule, value) => {
          if (isRange(value, 0, 200)) {
            return Promise.resolve();
          } else {
            return Promise.reject("enter the number between 0-200");
          }
        },
        trigger: "change"
      }
    ],

</script>

```
  
## 生成随机数

- 定义

```js
/**
   * 生成指定范围内的随机数
   * @param  min 最小值
   * @param  max 最大值
   */
  declare function random(min:number, max:number):number;
```

- 示例

```js
import { random } from "@lincy-js/utils/number";

// 生成1到10之间的随机数
 random(1,10)

```

## 转为大写金额

- 定义

```js
  /*将数字转换为大写金额*/
  declare function numberToChinese(n:number):string;
```

- 示例

```js
import { numberToChinese } from "@lincy-js/utils/number";

numberToChinese(1234.50); // 输出: 壹仟贰佰叁拾肆元伍角

```

## 格式化为货币

- 定义
  
```js
  /**
   * 数字格式化成金额
   * @param numberValue 要转换的数值
   * @param {places}  保留的小位数,默认为0 (四舍五入)
   * @param {symbol} 货币符号，默认为$
   * @param {thousand}  千分位字符,默认为,
   * @param {decimal} 小位数符合,默认为.
   * @returns 
   */
  declare function formatMoney(numberValue:number, places:number=0, symbol:string='$', thousand:string=',', decimal:string='.'):string
```

- 示例

```js
import { formatMoney } from "@lincy-js/utils/number";

formatMoney(54321); //输出： $54,321
formatMoney(54321,0,'¥'); //输出：'¥54,321'
formatMoney(54321,2,'¥'); //输出：'¥54,321.00'
formatMoney(54321.22,3,'¥',',','_'); //输出：'¥54,321_220'

```

## 格式化为百分比

- 定义
  
```js
 /**
   * 小数格式化成百分比
   * @param numberValue 要转换的数值
   * @param {places} 保留的小位数,默认为0 (四舍五入)
   */
  declare function formatPercent(numberValue:number,places:number=0):string
```

- 示例

```js
import { formatPercent } from "@lincy-js/utils/number";

formatPercent(0.1320); //输出: 13%
formatPercent(0.1360); //输出: 14%
formatPercent(0.13897,2); //输出: 13.90%
formatPercent(1.5,2); //输出: 150.00%'

```
