# 自定义组件

在components/index.js文件中统一导出全局组件

## 主框架布局

components/layouts 目录存放主框架布局的一些组件

### 抽屉设置组件

 components/layouts/drawerSetting

 添加新的子项设置:

 第一步： 请在components/settings目录下添加子项组件
 第二步： 在components/settings/index.js 中配置新添加的子项组件

 drawerSetting组件会读取components/settings/index.js配置，按配置的顺序显示配置子组件

### 页脚组件

 components/layouts/footer

### 页头组件

components/layouts/header

- 顶部菜单组件： components/layouts/header/menuNavHeader
- 顶部右边固定功能菜单组件: components/layouts/header/rightContent

添加顶部右边的功能菜单项：

第一步： 请在components/headers目录下添加子组件
第二步： 在components/headers/index.js中配置新添加的子组件

rightContent组件会读取components/headers/index.js配置，按配置的顺序显示配置子组件

### 侧边栏菜单组件

components/layouts/siderMenu

### 主布局组件

components/layouts/main: 定义了头、侧边栏、抽屉、页头、页脚的布局组件

## 图标组件

- 图标统一在components/icons中定义
- components/icons/index.js 统一按需导出ant-design-vue的内置图标
- 自定义的图标也需要在components/icons目录下定义,并在index.js导出
- 图标组件的名字统统一以icon-命名

## 基础表格组件

components/baseTable

对ant-design-vue的Table表格组件进行了封装,具有原始的所有的功能，项目中表格组件统一使用这个，方便统一设置表格的样式、功能。

```js
 <base-table
  :columns="columns"
  :row-key="record => record.code"
  :data-source="dataSource"
  :pagination="false"
>
  <template #operation="{ record }">
    <list-operation-button
      name="icon-edit"
      @click="onEditOrg(record)"
    >
      修改
    </list-operation-button>

    <popconfirm
      title="确定删除该机构吗？"
      @confirm="onConfirmDel(record)"
    >
      <list-operation-button
        name="icon-delete"
      >
        删除
      </list-operation-button>
    </popconfirm>
  </template>
</base-table>

```

## 基础查询条件组件

components/queryCondition： 规范化了查询条件的布局，会根据设置的查询条件的数量自动调整显示的布局

```js
 <query-condition
  :count="2"   // 查询条件数量
  :model="formState" // 查询项输入状态
  :rules="[]"   // 输入验证规则
  @reset="onReset"  // 重置按钮事件
  @query="onQuery" // 查询事件
>
  <template #condition1>
    <a-form-item
      ref="orgName"
      label="机构名称"
      name="orgName"
    >
      <a-input v-model:value="formState.orgName" />
    </a-form-item>
  </template>
  <template #condition2>
    <a-form-item
      ref="orgCode"
      label="机构代码"
      name="orgCode"
    >
      <a-input v-model:value="formState.orgCode" />
    </a-form-item>
  </template>
</query-condition>
```

## 基础的路由页组件

components/pageWrapper: 统一使用该组件定义路由组件页

## tab页签管理组件

components/routerTab: 管理多tab页签组件

- 可以保存已打开tab页的状态，通过属性autoSaveState设置，默认为true（自动保存状态，下车重新打开页面时会自动恢复之前打开的tab）
- 设置tab插入位置、是否可以关闭 [配置](./config.md#路由扩展配置)

## 弹出确认框组件

components/popconfirm: 统一的弹出确认框

## 表格操作按钮组件

components/listOperationButton

## 菜单树选择组件

components/menuTreeSelect

## 机构树选择组件

components/orgTreeSelect

## 机构树过滤组件

components/orgFilterTree

## 选择用户弹出框组件

components/userDialogSelect
