# 钩子插件

## app生命周期钩子

plugins/app.js
加载语言包、权限等可以在mounted钩子函数中处理

[框架App生命周期说明](/docs/vue/app-cycle.html#App插件)

## 路由守卫钩子

plugins/router.js

页面访问权限、跳转登录等逻辑可以在beforeEach守卫钩子函数中处理

[框架路由守卫说明](/docs/vue/router.html#全局路由钩子)

## 接口请求钩子

plugins/http.js

接口请求头添加token、根据请求接口返回的code判断token是否过期等逻辑可以在此插件中处理

[框架接口拦截说明](/docs/vue/http.html#请求拦截器)
