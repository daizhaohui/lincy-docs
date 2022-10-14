# 路由管理

## 路由接口

### 路由配置信息

```js

interface IRouteConfig{
  /**
  * 路径（必须）
  */
  path: string; 
  /**
  * 组件（必须）
  */
  component: any;
  /**
  * 路由名称（必须),全局唯一
  */
  name: string;
  /**
   * 重定向路径
   */
  redirect?:string;
  /**
  * 元数据
  */
  meta?:any; 
  /**
  * 嵌套子路由,只能嵌套3层子路由
  */
  children?:IRouteConfig[];
}
```

### 路由定位选项

```js

interface IRouteLocationRaw{
   /**
     * 路由名称，必选
   */
  readonly name: string;
  /**
  * hash值,可选: #abc
  */
  hash?: string;
  /**
   *  查询参数,可选
   */
  query?: any;
  /**
   * 路由动态参数,可选
   */
  params?:any;
}

```

### 路由定位信息

```js

interface IRouteLocationNormalized{
  /**
   * 标准化的路由地址
   */
  fullPath:string;
  /**
   * 编码 URL 的 pathname 部分，与路由地址有关。
   */
  path:string;
  /**
   * hash值：#abc
   */
   hash:string;
  /**
   * 路由名称
   */
   name: string;
  /**
   * 从 URL 的 search 部分提取的已解码查询参数的字典
   */
   query: any;
  /**
   * 从 path 中提取的已解码参数字典
   */
   params: any;
  /**
   * IRouteConfig中的meta元数据
   */
   meta: any;
}

```

## 路由服务

```js
interface IRouterService{
 /**
   * 通过在历史堆栈中推送一个 entry，以编程方式导航到一个新的 URL
   * @param options 路由名称：login'或则选项对象：{name:'login',query:{},hash:'',params:{}}
   */
  push(options: IRouteLocationRaw | string):void;
  /**
   * 通过替换历史堆栈中的当前 entry，以编程方式导航到一个新的 URL。
   * @param options 路由名称：'login'或则选项对象{name:'login',query:{},hash:'',params:{}}
   */
  replace(options: IRouteLocationRaw | string):void;
  /**
   * 回退，等价与go(-1)
   */
  back():void;
  /**
   * 前进，相当于go(1)
   */
  forward():void;
  /**
   * 跳转到之前或之后
   * @param delta 跳转历史位置：-1,-2,1,2
   */
  go(delta:number):void;
  /**
   * 获取当前route
   */
  getCurrentRoute():IRouteLocationNormalized;
   /**
   * 获取路由配置信息
   * @param name  路由名
   */
  getRouteConfig(name:string):IRouteConfig|null;
  /**
   * 获取父路由
   * @param name 路由名称
   */
   getParentRouteConfig(name:string):IRouteConfig|null;
  /**
   * 动态添加路由配置meta对象的属性值，不存在添加，存在就覆盖原有值
   * @param name 路由名
   * @param meta 要添加对象键值
   */
  addRouteMeta(name:string,meta:any):void
  /**
   * 获取路由配置meta对象
   * @param name 
   */
  getRouteMeta(name:string):any;
 
}

```

| 参数 | 类型 | 描述 |
| :----:| :----: | :----: |
| options | [IRouteConfig](#路由配置信息) | 路由可选配置 |
| route | [IRouteConfig](#路由配置信息) | 路由配置 |

返回值：[IRouteLocationNormalized](#路由定位信息)

<strong>如何调用路由服务？</strong>

- 方式一：

```js
import {useRouter} from '@lincy-vue/core';

const router = useRouter();
router.push('home')


```

- 方式二：只能在组件实例中使用

```vue
<template>
  <div>
    <button @click="goHome" />
  </div>
</template>

<script>
  export default {

    methods:{
      goHome(){
        this.$router.push('home')
      }
    }

  }

</script>

```

## 路由传值

传递query值给页面组件

```js

//  vue2.0用法, vue3.0用useRouter()
  export default {
    methods:{
      goAbout(){
         this.$router.push({
          name:'about',
          query:{
            from:'home'
            id:1,
            ...
          }
        });
      
      }
    }
  }

```

页面组件获取传递过来的query值

```js

//  vue2.0用法, vue3.0用useRoute()
  export default {
    mounted(){
      const query = this.$route.query;
      console.log(query.from);
      console.log(query.id);
    }
  }

```

传递params值(路径参数)给页面组件

```js
  import {useRouter} from '@lincy-vue/core';
  export default defineComponent({
    setup() {
     const handleFinish = (values: FormState) => {
      const router = useRouter();
      router.push({
        name:'home',
        params:{
          id:1
        };
      });
    };
    return {
      handleFinish,
    };
  },
});

```

页面组件获取传递过来的params值(路径参数)

```js
import {useRoute} from '@lincy-vue/core';
  export default defineComponent({
    setup() {
      // 获取当前路由
       const route = useRoute();
       console.log(route.params.id);
    };
    return {
    };
  },
});

```

## 路由钩子

### 钩子返回值

::: tip 提示
组件钩子beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave（或onBeforeRouteLeave、onBeforeRouteUpdate)，全局路由钩子beforeEach、beforeResolve 必须要有以下返回值:
:::

- true: 继续导航
- false: 取消导航
- [IRouteLocationRaw](#路由定位选项): 重定向到一个不同的位置
- 回调函数(vm:any):any: 仅适用于 beforeRouteEnter：导航完成后执行的回调。接收路由组件实例作为参数。

```js
beforeRouteEnter((to,from)=>{
  return (vm)=>{
    // vm为组件实例
  }
});

// 错误的例子
beforeEach((to, from) => {
  // 没有任何返回
})

```

### 组件路由钩子

在路由页面组件中使用路由的钩子函数

- 方式一

```vue
<template>
  <div>
  </div>
</template>

<script>
import { reactive,toRefs,onBeforeRouteLeave,onBeforeRouteUpdate } from '@lincy-vue/core';

  export default {
    setup() {
      const state = reactive({
        title:'about'
      });

      // 导航离开该组件的对应路由时调用，可以访问this
      onBeforeRouteLeave((to,from)=>{
        console.log('BeforeRouteLeave');
        return true;
      });

      // 在当前路由改变 ，可以访问this
      // 在当前路由改变，但是该组件被复用时调用
      // 对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
      // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。   
      onBeforeRouteUpdate((to,from)=>{
        console.log('BeforeRouteUpdate');
        return true
      });
      
      return { 
        ...toRefs(state),
      }
    }
  }
</script>
```

- 方式二

```vue
<template>
  <div>
  </div>
</template>

<script>

  export default {
    data(){
      return {}
    }

    methods:{

    }
  
  // 进入路由时，不能访问this,通过返回回调函数访问组件实列
  beforeRouteEnter(to, from) {
    return (vm:any)=>{
      // vm为组件实例
    }
  },
  // 返回true，继续路由
  beforeRouteUpdate(to, from) {
    return true;  
  },
  // 返回false来终止路由
  beforeRouteLeave(to, from) {
    return false;
  },
      
  }
</script>
```

### 全局路由钩子

在plugins目录下新增router.js文件,`只添加需要处理的钩子函数`

第一次添加router.js文件，需要重新运行，即执行npm start。 修改router.js的内容，不需要重新运行。

```js

export default {   
  beforeEach(to:IRouteLocationNormalized,from:IRouteLocationNormalized){
    if (to.matched.length ===0) {  //如果未匹配到路由
      return ({name:'notFound'}); // {name:'',params:{},hash:'',query:{}}
    } 
    //如果匹配到正确跳转
    return true;
  },
 
  beforeResolve(to:IRouteLocationNormalized,from:IRouteLocationNormalized){
    console.log('beforeResolve: common');
    return true;
  },

  afterEach(to,from,failure){
    console.log('afterEach: common');
  },

  onError(handler){
    console.log('onError: common');
  }
}

```

| 参数 | 类型 | 描述 |
| :----:| :----: | :----: |
| handler | (error: any) => any | 要注册的错误处理器 |
| failure | Object | 回调以验证导航 |
| to | [IRouteLocationNormalized](#iroutelocationnormalized) | 路由定位信息 |
| from | [IRouteLocationNormalized](#iroutelocationnormalized) | 路由定位信息 |

<b>failure定义</b>

| 属性 | 类型 | 描述 |
| :----:| :----: | :----: |
| to | [IRouteLocationNormalized](#iroutelocationnormalized) | 路由定位信息 |
| from | [IRouteLocationNormalized](#iroutelocationnormalized) | 路由定位信息 |
| type | string | 导航失败的类型 |

<b>type导航失败的类型定义:</b>

| 成员 | 值 | 描述 |
| :----:| :----: | :----: |
| aborted | 4 | 终止导航是指由于导航守卫返回 false 或调用 next(false) 而失败的导航 |
| cancelled | 8 | 取消导航是指由于最近的导航完成启动（不一定是完成）而失败的导航 |
| duplicated | 16 | 重复导航是指在启动时已经在同一位置失败的导航 |

## 路由元数据

有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的meta属性来实现，并且它可以在路由地址和导航守卫上都被访问到。定义路由的时候你可以这样配置 meta 字段：

```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // authCode不为空,只有经过身份验证的用户才能创建帖子
        meta: { authCode: '001' }
      },
      {
        path: ':id',
        component: PostsDetail
        // 任何人都可以阅读文章
        meta: {}
      }
    ]
  }
];
```

那么如何访问这个 meta 字段呢？

```js
beforeEach((to, from) => {
  // 判断有没有权限访问页面，没有跳转没有权限访问提示页面
  if (to.meta.authCode && !hasAuth(to.meta.authCode)) {
    return ({name:'page403'});
  }
  return true;
})

```

## 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```html

/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+

```

借助 router，使用嵌套路由配置，就可以很简单地表达这种关系。

路由配置

```js
export defalut {
  routes:[
    {
      { name:'login',path: '/login', component: Login }
      { name:'user',path: '/user/:id', component: User }
      ...
    }
  ]
}
```

app.vue的根组件

```vue
<template>
  <div class="app">
    <router-view class="router-view" />
  </div>
</template>
```

这里的`<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件,同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。例如，在 User 组件的模板添加一个 `<router-view>`:

User组件

```vue
<template>
  <div class="user">
    <router-view class="router-view" />
  </div>
</template>
```

要在嵌套的出口中渲染组件，需要在路由配置中使用 children 配置：

```js
// 路由配置
export defalut {
  routes:[
    {
      { name:'login',path: '/login', component: Login },
      { 
        name:'user',
        path: '/user/:id', 
        component: User,
        chidren:[
          {
            name: 'profile',
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'profile',
            component: UserProfile
          },
          {
            name: 'posts',
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'posts',
            component: UserPosts
          }
        ]
      }
      ...
    }
  ]
}
```

::: tip 提示
要注意，以 / 开头的嵌套路径会被当作根路径,最多可以嵌套三层路由。
:::

此时，按照上面的配置，当你访问 /user/userHome 时，在 User 的 router-view 里面什么都不会呈现，因为没有匹配到嵌套路由。也许你确实想在那里渲染一些东西。在这种情况下，你可以提供一个空的嵌套路径：

```js
const routes = [
  {
    name:'user',
    path: '/user/:id',
    component: User,
    children: [
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { name:'userHome',path: '', component: UserHome },
      // ...其他子路由
    ],
  },
]
```

## 路由配置

app.config.js中routes配置节点：

```js
export default {
  routes:[
    {
      name:'root', // 路由名，必选
      component:Login, // 组件，必选
      redirect:'/login', // 重定向路径
      path:'/', // 匹配路径 ，必选
      meta:{} // 元数据，任意值
    },
    {
      name:'home',
      component:Home,
      path:'/home/:id',
    },
    {
      path: '/:pathMatch(.*)',   // 找不到匹配的任何路径时
      name: 'bad-not-found', 
      component: NotFound
    }
  ]
}

```

routes的配置项支持的属性：

| 属性 | 类型 | 必选 | 描述 |
| :----:| :----: | :----: | :---- |
| name | String |  是  | 路由名，可以通过路由名进行页面跳转
| component | Vue Component |  是  | 组件
| path | String |  是   | 匹配路径
| redirect | String |  否  | 重定向路径
| meta | any |  否  | 自定义的原数据，用在一些特定场景使用，如权限判断
