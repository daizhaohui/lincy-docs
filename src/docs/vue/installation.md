# 安装

使用[lincy-vue-cli](#命令行工具-cli) 来构建一个项目，它为现代前端工作流程提供了功能齐备的构建设置。

## npm

```bash
# 从本地包安装
$ npm install -g <path>/lincy-vue-cli-1.0.0.tgz
```

## 命令行工具 (CLI)

为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了功能齐备的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、lint校验、mock功能、按需编译、以及生产环境可用的构建版本。更多详情可查阅 [CLI 的文档](/docs/vue/cli/config.html)。

运用命令行工具快速构建 vue 项目:

<b>第一步：创建模板工程</b>
```bash
$ lincy-vue-cli create <project-name>
$ cd <project-name>
```
<b>第二步：安装依赖包</b>

  如果没有链接lincy的npm库，要修改工程根目录下的package.json文件的内容：
  
  <font size=2 color=#F4A460>"@lincy-vue/cli": "1.0.0"</font>=><font size=2 color=#F4A460>"@lincy-vue/cli": "file:[path]/lincy-vue-cli-1.0.0.tgz"</font>

  <font size=2 color=#F4A460>"@lincy-vue/core": "1.0.0"</font>=><font size=2 color=#F4A460>"@lincy-vue/core": "file:[path]/lincy-vue-core-1.0.0.tgz"</font>

  <font size=2 color=#F4A460>"@lincy-vue/exten": "1.0.0"</font>=><font size=2 color=#F4A460>"@lincy-js/utils": "file:[path]/lincy-js-utils-1.0.0.tgz"</font>


  [path]为*.tgz文件的相对路径

```bash
$ npm install
```
<b>第三步：启动App</b>

```bash
$ npm start
```

