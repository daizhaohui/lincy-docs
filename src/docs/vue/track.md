# 埋点管理

## 添加埋点步骤

第一步：app.config.js配置埋点

第二步：plugins/track.js埋点插件中时间实现保存埋点方法

第三步：指令方式或手动方式添加埋点

## 埋点接口

```js
/**
 * 数据埋点
 * @param trackId  埋点id
 * @param eventType  埋点事件类型
 * @param data 埋点数据
 * */
track(trackId:string,eventType:TrackEventType,data:any);

/**
 * 埋点事件类型
 * */
enum TrackEventType{
  Click = 1, // 点击
  Exposure =2,  // 曝光
  Away=3, // 离开
};

/**
 * 埋点事件定义类型，定义触发什么事件进行埋点
 * */
enum TrackDefineType{
  Click = 1, // 点击时
  Exposure =2, // 曝光时
  Away=3, // 离开时
  ClickExposure=4, // 点击和曝光时
  ClickAway=5, // 点击和离开时
  ExposureAway=6, // 曝光和离开时
  ClickExposureAway=7 // 点击、曝光、离开时
};

/**
 * 埋点定义，对应app.config.js中track节点的defines中的对象结构
 * */
ITrackDefine {
{
  id:string, // 埋点唯一id
  eventType:TrackDefineType, // 埋点事件定义类型
  [key:string]:any  // 其他自定义属性
}

/**
 *  埋点事件参数
 * */
ITrackEventArgument{
  id:string,// 埋点唯一id
  eventType:TrackEventType,// 埋点事件定义类型
  define:ITrackDefine, // 埋点定义
  data:any // 埋点数据
}

```

## 埋点插件

在plugins目录下新增track.js文件

```js
export default{
  /**
   * 保存埋点数据到后台
   * @param items 埋点数据项信息,items中的每个数据对象结构：
      {
        trackId:string // 埋点id
        trackEventType:TrackEventType, // 事件类型（1，2，3）
        trackDefine:ITrackDefine, // 埋点定义
        trackData:any // 埋点数据
      }
   * @param callback 保存后的回调，告知是否数据成功保存到后台
   **/
  saveTrackData(items:[],callback:any):void{
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(items));
    // tslint:disable-next-line:no-unused-expression
    callback && callback(true);
  }

  /**
   * 点击埋点事件
   **/
  onClick(e:ITrackEventArgument):void{

  }

  /**
   * 曝光埋点事件
   **/  
  onExposure(e:ITrackEventArgument):void{

  }

  /**
   * 离开埋点事件
   **/ 
  onAway(e:ITrackEventArgument):void{

  }
}
```

## 埋点配置

在app.config.js中track配置节点中配置

```js

export default class{
  track:{
    // 保存埋点
    saveTrackData:{
      isDefault:true, // 是否执行默认行为，默认值为true
      maxCacheItems:10, // 最大缓存的埋点项个数，默认值：10
      timeInterval:1000, // 自动提交保存埋点数据的时间间隔，默认值：1000
      cacheToLocalStorage:false, // 是否退出时，自动保存缓存中的埋点项，默认值：false
      cacheKey:'__cache_track__' // 保存到localStorage的key值，默认值：'__cache_track__'
    },
    // 埋点定义
    defines:[
      {
        id:1, // 埋点唯一id
        eventType:1, // 埋点定义类型，TrackDefineType （值1，2，3，4，5，6，7）
      },
      {
        id:2,
        eventType:1,
      },
      {
        id:3,
        eventType:7
      }
    ]
  }
}
```

## 指令方式埋点

v-track指令,格式 `v-track:埋点唯一标识="埋点数据（多个以｜分隔）"` <br/>
比如： v-track:1="'w1|1|w1_1'", 1为埋点唯一标识，'w1|1|w1_1'为埋点数据，并转换成对象 {1:'w1',2:'1',3:'w1_1'}给对应的事件方法

```vue
<template>
    <div class="track">
      <div class="title">{{title}}</div>
          <div>
              <a-button class="btn" v-track:1="'w1|1|w1_1'"
                type="primary"
              >
                Waiting  
              </a-button>
              <a-button class="btn" v-track:2="'f1|2|f1_1'"
                type="primary"
              >
                For  
              </a-button>
              <a-button class="btn" v-track:3="'m1|3|m1_1'"
                type="primary"
              >
                Me  
              </a-button>
              <a-button class="btn" v-track:4="testTrack"
                type="primary" @click="test"
              >
                test
              </a-button>
          </div>
          <div class="scroll">
            <div  class="sbtn" 
                type="primary" 
            >
                s1
             </div>
            <div  class="sbtn" 
                type="primary" 
            >
               s2
             </div>
             <div  class="sbtn" 
                type="primary" 
            >
                s3
             </div>
             <div  class="sbtn" 
                type="primary" 
            >
                s4
             </div>
             <div  class="sbtn" 
                type="primary" 
            >
                s5
             </div>
             <div  class="sbtn" 
                type="primary"  v-track:5="'exposure5_6|4|exp_6'"
            >
                s6
             </div>

          </div>
    </div>
</template>

<script>

import { reactive,toRefs,defineComponent} from '@lincy-vue/core';

export default defineComponent({
  setup() {
    const state = reactive({
      title:'not found',
      visible: true
    });

    const testTrack = {
      a1: 'a1_1',
      b1: 'b1_1'
    }

    return { 
      ...toRefs(state),
      testTrack
    }
  },
  methods:{
  }
})
</script>

```

## 手动方式埋点

```js
import {track} from '@lincy-vue/core/track';

track('t_1',1,{
  business:'add_user'
})

```

组件实例中调用this.$track

```vue
<template>
</template>

<script>

export default {
    data(){
      return {};
    }

    created(){
      this.$track('t_2',2,{
        business:'page_created'
      })
    }

}
</script>

```