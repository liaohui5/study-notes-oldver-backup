树形结构是一种分层的非线性结构数据, 对于前端来说, 最常见的 DOM 树就是一个典型的树形结构数据

## 二叉树

二叉树(Binary Tree) 是一种非线性数据结构，代表着祖先与后代之间的派生关系，

体现着“一分为二”的分治逻辑。与链表类似，二叉树的基本单元是节点，每个节点包含一个唯一的 key 和两个指针(一般是`left`和`right`)

> 二叉树的一些概念

- 根节点: 位于二叉树顶层的节点(开始节点, 没有父节点)
- 叶节点: 最底端的节点(没有子节点)
- 子树: 以当前节点为参照物(rootNode), 如图: 15 的左子树(就是 13,12,14), 右子树(就是 20,18,25,11)

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20230710222547.png)

> 二叉树的遍历

- 层序遍历(广度优先)

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202307102228833.png)

- 前序/中序/后序遍历(深度优先)

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202307102231321.png)

## 二叉搜索树

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20230710224450.png)

二叉搜索树(binary search tree 简称 BST) 也叫 二叉排序树(binary sort tree)

二叉搜索树的特点: 以当前节点为参照物, 左节点的 key 一定比当前节点 key 小, 右节点的 key 一定比当前节点的 key 大

> 二叉搜索树中的一些概念:

- 前驱节点: 当前节点左子树 key 最大的节点(如图: 7 的前驱就是 5)
- 后继节点: 当前节点右子树 key 最小的节点(如图: 7 的后继就是 8)

```typescript
interface TreeNode {
  key: number;
  value: unknown;
  left: TreeNode | null;
  right: TreeNode | null;
}

class BinarySearchTree {
  // 树的根节点
  public rootNode: TreeNode | null = null;

  // 创建树节点
  public createTreeNode(key: number, value: unknown): TreeNode {
    return {
      key,
      value,
      left: null,
      right: null,
    };
  }

  // 是否有某个 key
  public hasKey(key: number): boolean {
    let has = false;
    if (this.rootNode === null) {
      return has;
    }
    this.forEach((item) => {
      if (item.key === key) {
        has = true;
        return false;
      }
    });
    return has;
  }

  // 插入节点
  public insert(key: number, val: any): void {
    if (this.hasKey(key)) {
      throw new Error(`[insert]key '${key}' is reduplicated`);
    }
    const node = this.createTreeNode(key, val);
    if (this.rootNode) {
      this.insertNode(this.rootNode, node);
    } else {
      this.rootNode = node;
    }
  }

  // 插入节点的具体操作
  private insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.key < node.key) {
      // 左侧插入节点
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 向右插入节点
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // 广度优先: 先序遍历树所有节点(推荐,性能最好,而且可以停止遍历)
  public forEach(handler: (node: TreeNode) => void | false) {
    const stack: TreeNode[] = [this.rootNode!];
    while (stack.length) {
      const node = stack.shift()!; // 先取左边的节点然后取右边的
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
      const isContinue = handler(node);
      if (isContinue === false) {
        // 如果 return false ??停止遍历
        break;
      }
    }
  }

  // 深度优先(递归): 先序遍历找节点
  public traverseNodes(order: 'pre' | 'mid' | 'post', handler: (node: TreeNode) => void) {
    // 先序遍历: 最先处理当前节点
    function preTraverse(node: TreeNode | null) {
      if (node !== null) {
        handler(node);
        preTraverse(node.left);
        preTraverse(node.right);
      }
    }

    // 中序遍历: 左边的,然后处理当前节点(节点是升序的)
    function midTraverse(node: TreeNode | null) {
      if (node !== null) {
        midTraverse(node.left);
        handler(node);
        midTraverse(node.right);
      }
    }

    // 后序遍历: 左边,右边,最后处理当前节点
    function postTraverse(node: TreeNode | null) {
      if (node !== null) {
        postTraverse(node.left);
        postTraverse(node.right);
        handler(node);
      }
    }

    switch (order) {
      case 'pre':
        preTraverse(this.rootNode);
        break;

      case 'mid':
        midTraverse(this.rootNode);
        break;

      case 'post':
        postTraverse(this.rootNode);
        break;

      default:
        throw new TypeError('[traverseNodes]unknown type');
    }
  }

  // 返回树中的 key 最小的 node
  public min(): TreeNode | null {
    let node = this.rootNode;
    if (!node) {
      return null;
    }
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // 返回树中的 key 最大的 node
  public max(): TreeNode | null {
    let node = this.rootNode;
    if (!node) {
      return null;
    }
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  // 搜索某个值
  search(key: number): null | TreeNode {
    let target: TreeNode | null = null;
    if (this.rootNode === null) {
      return target;
    }
    this.forEach((node) => {
      if (node.key === key) {
        target = node;
        return false;
      }
    });
    return target;
  }

  // 移除某个 key
  // TODO: 策略模式优化代码
  public remove(key: number) {
    let target: TreeNode | null = this.rootNode!;
    let parent: TreeNode = target!;
    let isLeft: boolean = false;

    // 先找到要删除的节点
    while (target!.key !== key) {
      parent = target;

      if (key < target.key) {
        // 向左查找
        target = target.left;
        isLeft = true;
      } else {
        // 向右查找
        target = target.right;
        isLeft = false;
      }

      // 没有找到要删除的节点
      if (target === null) {
        throw new Error(`[remove]not found key '${key}' in tree`);
      }
    }

    // 根据不同的情况删除节点
    // 1. 删除的节点是没有子节点的叶子节点
    if (target.left === null && target.right === null) {
      if (target === this.rootNode) {
        this.rootNode = null;
      } else if (isLeft) {
        parent.left = null;
      } else {
        parent.right = null;
      }

      return target;
    }

    // 2. 删除的节点有一个left节点(没有 right 节点)
    else if (target.right === null) {
      if (target === this.rootNode) {
        this.rootNode = target.left;
      } else if (isLeft) {
        parent.left = target.left;
      } else {
        parent.right = target.left;
      }

      return target;
    }

    // 3. 删除的节点有一个 right 节点(没有 left 节点)
    else if (target.left === null) {
      if (target === this.rootNode) {
        this.rootNode = target.right;
      } else if (isLeft) {
        parent.left = target.right;
      } else {
        parent.right = target.right;
      }

      return target;
    }

    // 4. 删除的节点既有 left 也有 right 节点
    else {
      let successorParent = target;
      let successor = target!.right; // 后继节点(在右子树中寻找)
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      // 替换要删除的目标节点的 left 和 right
      if (target === this.rootNode) {
        this.rootNode = successor;
      } else if (isLeft) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }

      // 修改后继节点的 left 值
      successor.left = target.left;

      // 如果当前找到的后继不是 target.right 那么也就是说后继节点
      // 就有自己的 right 节点, 那么就必须修改后继节点的 right 值
      // 如图中要删除15的时候,那么后继节点就是 18, 18 有自己的
      // right 节点
      if (target.right !== successor) {
        successorParent.left = successor.right;
        successor.right = target.right;
      }

      return target;
    }
  }
}

const bst = new BinarySearchTree();
const items = [11, 7, 15, 5, 9, 13, 20, 3, 8, 10, 12, 14, 18, 25, 19];
for (const item of items) {
  bst.insert(item, item);
}

// 遍历
bst.forEach((item) => {
  console.info(item.value);
});

// 第一种情况: 叶子节点
bst.remove(8);

// 第二种情况: 只有一个 left/right 节点
bst.remove(5);
bst.remove(18);

// 第三种情况: 有 left 并且也有 right 节点
bst.remove(9);
bst.remove(15);

console.log(bst);
```

> 二叉搜索树的缺陷

如果插入的 key 是递增的序列, 那么二叉树的深度非常大 也就是说一边特别多, 另外一边几乎没有, 两边极度不平衡
(所以: 二叉搜索树是一种非平衡树) 几乎就已经退化成了一个链表

```typescript
const bst = new BinarySearchTree();
bst.insert(1, 1)
bst.insert(2, 2)
bst.insert(3, 3)
bst.insert(4, 4)
bst.insert(5, 5)
```
![bst-linkdlist](https://raw.githubusercontent.com/liaohui5/images/main/images/20230713003509.png)

## 红黑树

红黑树是一种平衡树

