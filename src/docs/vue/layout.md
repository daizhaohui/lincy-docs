# 布局

## 移动端rem转换

- 开发中, 样式文件中还是以px为单位, 在cliConfig.js配置中设计的px尺寸大小 [rem配置](./cli/config.html#rem配置)
- 代码中可以使用useRem方法，把px转换成rem值
  
在方法中把px转换成rem(1rem=10px): useRem

```js
import { useRem, computed } from '@lincy-vue/core';

export default defineComponent({
  setup(){
    const headerStyle = computed(() => {
      return `position:absolute;left:0;right:0;top:${useRem(props.showNavBar ? 46 : 0).toString()};height:${useRem(props.headerHeight).toString()};`;
    });

    return {
      headerStyle
    }
  }
});
```

在vue模板文件中把px转换成rem(1rem=10px): $rem

```vue
<template>
  <van-icon
    name="bars"
    :style="{fontSize:$rem(20).toString()}"
    @click="onShowDrawer"
  />
</template>
<script src="./index.js" lang="js"></script>

```

在样式文件中设置rem值（1rem=10px), 1px

```less
   ul {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 1rem 0;
        li {
          flex: 1;
          padding: 0.5rem 0;
          text-align: center;
          font-size: 1.5rem;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }

```
