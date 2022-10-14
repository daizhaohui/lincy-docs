# 实用工具

## 对象深度克隆

```js
import clone from '@lincy-vue/core/utils/clone';

const obj = {
    id:123,
    name: 'name1',
    arr:[1,2,3],
    objArr:[{
        uid:123,
        uname:'uname'
    },{
        uid:456,
        uname:'uname1'  
    }],
    user:{
        age: 18,
        sex: '男'
    }
};

// 对象的深度拷贝
clone(obj);

```

## 对象深度合并

```js
import merge from '@lincy-vue/core/utils/merge';

merge(target,obj1,obj2,...);

let obj1 = { a: { b: 1, c: 1 } };
let obj2 = { a: { b: 2 } };
let obj3 = {};
// 调用assignDeep方法
merge(obj3, obj1, obj2);
console.log(obj3); // { a: { b: 2, c: 1 } }

let obj4 = { a: { b: 1, c: [1, 2, 3] } };
let obj5 = { a: { b: 2, c: [1, 4], d:'d' } };
merge(obj4,obj5); 
console.log(obj4); // { a: { b: 2, c: [1, 4], d:'d' } };

let obj6 = [1,2,3];
let obj7 = [4,5];
merge(obj6, obj7); 
console.log(obj6);// [4,5,3]

```

## 日期转换

请参照 [lincy-js/utils/dayjs](../docs/commonjs/utils/date.html)

## 复制数据到剪贴板

```js
import clipboard from '@lincy-vue/core/utils/clipboard';

clipboard('abcdef');
// 传入的参数不是字符串,将尝试调用JSON.stringify(input)转换成字符串
clipboard({
  name: 'name',
  url: 'http://www.xxx.com/yyy/'
});

```
