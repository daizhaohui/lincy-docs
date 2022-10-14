# 树操作

## 数据结构定义

```js
/**
 * 数据映射配置对象（业务数据到统一的数结点对象）
 */
declare interface IDataMapOptions {
  /**
   * 唯一标识的属性名称
   */
  id: string;
  /**
   * 父唯一标识的属性名称
   */
  parentId: string;
  /**
   * 显示名的属性名称
   */
  text: string;
  /**
   * 子的属性名称
   */
  children:string;
  /**
   * 树根节点id值（默认为'',可能定义为‘-1’或者其他值）
   */
  rootId:string;
}

/**
 * 树节点对象
 */
declare class  TreeNode{

   /**
   * 树节点唯一标识
   */
  id: string;
  /**
   * 树节点显示名称
   */
  text: string;
  /**
   * 树父节点
   */
  parent: TreeNode;
  /**
   * 子节点
   */
  children: TreeNode[];
  
  /**
   * 数组中依次存放从根节点到子节点路径上的所有节点
   */
  readonly path:TreeNode[];
  /**
   *节点所在text路径,数组中依次存放从根节点到子节点路径上的节点text
   */
  readonly textPath:string[];
  /**
   *节点所属层级,根节点level=0
   */
   readonly level:number;
}

 /** 
  *  添加节点数据参数
  */
declare interface ITreeNodeData {
  /**
   * 树节点唯一标识
   */
  id: string;
  /**
   * 树父节点唯一标识
   */
  parentId: string;
   /**
   * 树节点显示名称
   */
  text: string;
   /**
   * 附加数据（业务数据）
   */
  data?:any;
}

declare class Tree {
 /** 
   * 构造函数 
	 * @param data 业务数据（数组）
   * @param options  通过options配置可以支持对树形业务数据、扁平业务数据转换为统一的树结构
  */
  structor(data:any[],options?:IDataMapOptions);

  // 方法定义
  ...

}

```

## 数据映射

- 包含子的业务数据

```js

const data = [
   {
      id: '1',
      name: '华东区',
      pid: '-1',
      children:[
        {
           id: '12',
           name: '上海',
           pid: '1', 
           children:[]
        },
         {
           id: '13',
           name: '苏州',
           pid: '1', 
           children:[]
        }
      ]
   },
   {
      id: '2',
      name: '华北区',
      pid: '-1',
      children:[
        {
           id: '21',
           name: '沈阳',
           pid: '2', 
           children:[]
        },
         {
           id: '22',
           name: '大连',
           pid: '2', 
           children:[]
        }
      ]
   }

];

// 转换字段映射表, 设置children字段映射表示业务数据结构中包含子
const dataMap = {
  id: 'id',
  parentId: 'pid',
  text: 'name',
  children: 'children',
  rootId: '-1'  // -1表示是根节点的id值，不设置默认为空
};

const tree = new Tree(dataMap);

```

- 扁平业务数据

```js

const data = [
	{
		id: '1',
		name: '华东区',
		pid: '-1',
	},
	{
		id: '12',
		name: '上海',
		pid: '1',
	},
	{
    id: '13',
    name: '苏州',
    pid: '1',
	},
  {
  id: '2',
  name: '华北区',
  pid: '-1',
  },
  {
    id: '21',
    name: '沈阳',
    pid: '2',
  },
	{
    id: '22',
    name: '大连',
    pid: '2',
	}
];

// 转换字段映射表
const dataMap = {
  id: 'id',
  parentId: 'pid',
  text: 'name',
  rootId: '-1'  // -1表示是根节点的id值，不设置默认为空
};

const tree = new Tree(dataMap);

```

## 树操作方法

将数组转成树形结构，对树形结构做操作

| 方法 |  描述 |
| :----:| :----: |
| [add](#新增子节点) | 新增子节点 |
| [remove](#删除节点) | 根据id删除节点 |
| [getNode](#获得节点)|  通过id查找对应的节点 |
| [find](#查找节点)|  查询符合条件的节点 |
| [filter](#过滤树)|  根据条件对树形结构进行 返回新的树形结构 |
| [toArray](#转线性数据)|  将树形结构转成线性数据  |

### 新增子节点

```js

 /**
 * 新增子节点
 * @param treeNodeData 树节点数据
 */
declare function add(treeNodeData: ITreeNodeData): Tree
```

### 删除节点

```js
 /**
 * 根据id删除节点
 * @param id 要删除的节点的ID
 */
declare function remove(id: string | number ):void
```

### 获得节点

```js
/**
 * 通过id查找对应的节点
 * @param id 
 */
declare function getNode(id: string | number): TreeNode
```

### 查找节点

```js
// 参数类型
type TreeNodeFunc = (treeNode: TreeNode) => boolean;
 /**
 * 查询符合条件的节点
 * @param fuc 
 */
declare function  find(fuc: TreeNodeFunc): TreeNode[];
```

### 过滤树

```js
// 参数类型
type TreeNodeFunc = (treeNode: TreeNode) => boolean;
/**
 * 根据条件对树形结构进行过滤 返回新的树形结构
 * @param fuc 
 */
declare function  filter(fuc: TreeNodeFunc): TreeNode | null;
```

## 使用示例

```js

import Tree from '@lincy-js/utils/Tree';

const listData = [
{ a_id: "1", name: "根节点", p_id: "" },
{ a_id: "2", name: "子节点1", p_id: "1" },
{ a_id: "3", name: "子节点2", p_id: "1" },
{ a_id: "4", name: "子节点1的子节点", p_id: "2" },
];
const options = { id: 'a_id', parentId: 'p_id', text: 'name',rootId:'' };
const tree = new Tree(listData, options);
tree.rootNode.children
tree.add({ id: "5", text: "子节点2的子节点", parentId: "3" }).add({ id: "6", text: "子节点2的子节点2", parentId: "3" });
const treeNode1 = tree.getNode(6);

// 获取节点从根到当前节点的路径的节点对象TreeNode集合
treeNode1.path;
// 获取节点从根到当前节点的路径的节点名称的集合
treeNode1.textPath;
// 节点所在的层级
treeNode1.level;

tree.find((node:any) => { return node.id > 3});
tree.filter((node:any) => { return node.id > 4});
tree.remove(5).remove(6);

```
