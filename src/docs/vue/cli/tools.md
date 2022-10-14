# 命令行工具

## 新建App

创建名为demo的js工程

create指令

```sh
lincy-vue-cli create demo

```

创建名为demo的ts工程 (默认为js工程)

-p命令参数

```sh
lincy-vue-cli create demo -p ts

```

## 启动App

serve指令，-t命令参数指定平台，不指定默认pc， mobile为移动端h5

```sh
lincy-vue-cli serve

lincy-vue-cli serve -t mobile 

```

## 构建App

-m 命令参数指定构建环境（development开发、production生产）
-t 命令参数指定平台，不指定默认pc， mobile为移动端h5

```sh

lincy-vue-cli build -m development

lincy-vue-cli build -m production 

lincy-vue-cli build -m production -t mobile

```

## 分析构建代码

添加--report

```sh

lincy-vue-cli build -m development --report

lincy-vue-cli build -m production --report

```

## 编译皮肤

-e 参数指定要编译的皮肤名，不指定-e将默认编译src/themes目录下的所有皮肤

```sh

lincy-vue-cli build -m development -e dark

lincy-vue-cli build -m production -e dark

lincy-vue-cli serve -e dark

```

:::tip
皮肤修改需要重新启动才能生效，如果皮肤较多，会导致启动比较慢，可以在启动时指定要调适的皮肤名加快调试速度: lincy-vue-cli serve -e dark
:::
