# 自定义组件

在components/index.js文件中统一导出全局组件

## 抽屉

components/drawerLayout：类似qq的抽屉组件

### 属性

|  属性名 | 描述 | 类型 | 默认
| :----:| :----: | :----: | :----: |
| show-drawer | hide or display drawer | Boolean | false |
| drawer-width | width of drawer(px) | Number | 80% of the container(parentNode) width |
| drawable-distance | farthest distance to draw(px) | Number | same as drawer-width prop |
| z-index | z-index of drawer | Number | 999999 |
| content-drawable | whether to make content-wrapper drawable | Boolean | false |
| backdrop | whether to show backdrop | Boolean | true |
| backdrop-opacity-range | the opacity range of backdrop[min,max] | Array | [0,0.4] |
| enable | is drawer enable | Boolean | true |
| animatable | is drawer animate during moving | Boolean | true |
| reverse | is drawer slide out from right | Boolean | false |

### 事件

|  事件 | 描述 | 参数
| slide-start | drawer start to slide (fired when touchdown) | -  |
| slide-move | drawer sliding (fired when touchmove) | pos(int) |
| slide-end | drawer sliding (fired when touchend or transitionend) | visible(boolean) |
| mask-click | touch(click) on mask | - |

### 例子

```vue
<drawer-layout
  ref="drawer"
  :drawer-width="800"
  :enable="true"
  :animatable="true"
  :z-index="0"
  :drawable-distance="Math.floor(800/3)"
  :content-drawable="true"
  :backdrop="true"
  :backdrop-opacity-range="[0,0.4]"
  @slide-start="handleSlideStart"
  @slide-move="handleSlideMove"
  @slide-end="handleSlideEnd"
  @mask-click="handleMaskClick">
    <div class="drawer-content" slot="drawer">
      <!-- drawer-content -->
    </div>
    <div slot="content">
      <!-- main-content -->
    </div>
</drawer-layout>

```

## 图片验证码组件

components/imageVerify: 随机生成4位字母数字验证码，通过canvas技术绘制

## 上拉刷新、下拉加载组件

components/loadMore

```js

const TOPSTATUS = {
  Wait: 'wait', // 等待
  Pulling: 'pulling', // 下拉
  Limit: 'limit', // 超过触发值
  Loading: 'loading', // 正在加载
  Loaded: 'loaded' // 刷新完成
};
const BOTTOMSTATUS = {
  Wait: 'wait', // 等待
  Loading: 'loading', // 正在加载
  Nodata: 'nodata', // 暂无数据
  Error: 'error', // 错误
  Loaded: 'loaded' // 加载完毕
};

 props: {
    // 顶部下拉刷新状态: TopStatus.Loading/Loaded
    topStatus: {
      type: String,
      default: TOPSTATUS.Wait
    },
    // 底部上拉加载更多状态: BottomStatus.Loading/Loaded/Nodata/Error
    bottomStatus: {
      type: String,
      default: BOTTOMSTATUS.Wait
    },
    // 不启用loadMore功能（上拉、下拉更新）
    disableLoadMore: {
      type: Boolean,
      default: false
    },
    // 禁止下拉刷新
    disableTop: {
      type: Boolean,
      default: false
    },
    // 禁止上拉加载
    disableBottom: {
      type: Boolean,
      default: false
    },
    // 下拉移动比例
    distanceIndex: {
      type: Number,
      default: 2
    },
    // 触发上拉无限滚动距离
    bottomDistance: {
      type: Number,
      default: 20
    },
    // 下拉距离触发值
    topDistance: {
      type: Number,
      default: 100
    },
    // 下拉刷新状态提示:
    topChangeText: {
      type: Object,
      default () {
        return {
          pulling: '下拉刷新...',
          limit: '释放刷新',
          loading: '正在加载...',
          loaded: '加载完成'
        };
      }
    },
    // 上拉加载状态提示
    bottomChangeText: {
      type: Object,
      default: () => {
        return {
          loading: '正在加载...',
          loaded: '加载完成',
          nodata: '暂无更多数据',
          error: '请求数据出错，请点击重试'
        };
      }
    }
  },
  emits: {
    // 刷新事件
    'top-load': null,
    // 下拉加载更多事件
    'bottom-load': null,
    // 滚动事件
    'more-scroll': null
  },

```

## 基础页面组件

components/pageWrapper

- 封装了components/loadMore组件，可以通过配置属性置顶页面是否可以上拉刷新，下拉加载功能
- 封装了导航条功能，可以通过配置是否显示导航条
- 统一使用pageWrapper组件去开发其他页面组件

例1: 通过#nav-left、#nav-right插槽重写导航条左、右边按钮, #nav-title重写标题，disable-load-mores=true关闭上拉刷新、下拉加载功能

``` vue
<template>
  <page-wrapper
    :title="$t('home.category')"
    :disable-load-more="true"
  >
    <template #nav-left>
      <show-drawer-button />
    </template>
    <template #nav-right>
      <van-icon
        name="ellipsis"
        size="20"
      />
    </template>
     <template #title>
      <input >
     </template>
  </page-wrapper>
</template>
```

例2: show-nav-bar控制是否显示导航栏;top-status控制下拉刷新的状态;bottom-status控制上拉加载的状态;

``` vue
<template>
  <page-wrapper
     :title="$t('home.home')"
    :show-nav-bar="showNavBar"
    :top-status="topStatus"
    :bottom-status="bottomStatus"
    @top-load="onTopLoad"  
    @bottom-load="onBottomLoad"
    @more-scroll="onMoreScroll"
  >
    <div>
    </div>
  </page-wrapper>
</template>
```
