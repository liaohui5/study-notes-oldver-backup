图是一种非线性的数据结构, 有 `顶点(vertex)` 和 `边(edge)` 组成

图的一些概念请[参考这里](https://www.hello-algo.com/chapter_graph/graph/#_1)

![graph](https://raw.githubusercontent.com/liaohui5/images/main/images/202307151904315.png)

```typescript
// 使用邻接表实现
class Graph {
  // 顶点
  public vertexes: string[] = [];

  // 边
  public edges = new Map<string, string[]>();

  // 添加顶点
  public addVertex(vertex: string) {
    if (this.vertexes.includes(vertex)) {
      throw new Error(`[addVertex]vertex '${vertex}' is already exists in graph`);
    }
    this.vertexes.push(vertex);
    this.edges.set(vertex, []);
  }

  // 移除顶点
  public removeVertex(targetVertex: string) {
    if (!this.vertexes.includes(targetVertex)) {
      throw new Error(`[addVertex]vertex '${targetVertex}' not found in graph`);
    }

    // remove vertex in this.vertexes and this.edges
    this.vertexes = this.vertexes.filter(item => item !== targetVertex);
    this.edges.delete(targetVertex);

    // remove vertex in other edges
    for (const [key, edges] of this.edges) {
      this.edges.set(key, edges.filter(item => item !== targetVertex));
    }
  }

  // 添加边(无向图)
  public addEdge(vertex1: string, vertex2: string) {
    if (!this.vertexes.includes(vertex1)) {
      throw new Error(`[addEdge]vertex '${vertex1}' not found in graph`);
    }
    if (!this.vertexes.includes(vertex2)) {
      throw new Error(`[addEdge]vertex '${vertex2}' not found in graph`);
    }
    this.edges.get(vertex1)!.push(vertex2);
    this.edges.get(vertex2)!.push(vertex1);
  }

  // 移除边
  public removeEdge(targetVertex: string, targetEdge: string) {
    if (!this.vertexes.includes(targetVertex)) {
      throw new Error(`[addEdge]vertex '${targetVertex}' not found in graph`);
    }
    let edges = this.edges.get(targetVertex)!;
    if (edges.includes(targetEdge)) {
      edges = edges.filter(item => item !== targetEdge);
      this.edges.set(targetVertex, edges);
    }
  }

  // 广度遍历
  public bfs(startVertex: string, handler: (vertex: string) => false | void) {
    if (!this.vertexes.includes(startVertex)) {
      throw new Error(`[bfs]vertex '${startVertex}' not found in graph`);
    }
    const handleRecords: string[] = []; // 记录顶点是否处理过

    const queue = [startVertex];
    while (queue.length) {
      const currentVertex = queue.shift()!; // 队列先进先出

      // 处理当前节点: 如果返回 false 就停止遍历
      const isContinue = handler(currentVertex);
      handleRecords.push(currentVertex);
      if (isContinue === false) {
        break;
      }

      // 获取与当前顶点相连的其他顶点 & 将没有访问过的放入队列中
      const linkedVertexes = this.edges.get(currentVertex)!;
      for (let i = 0; i < linkedVertexes.length; i++) {
        const linkedItem = linkedVertexes[i];

        // 在待处理队列和已访问的记录中都没有的情况下才需要加入待处理队列
        if (!handleRecords.includes(linkedItem) && !queue.includes(linkedItem)) {
          queue.push(linkedItem);
        }
      }
    }
  }

  // 深度遍历
  public dfs(startVertex: string, handler: (vertex: string) => void) {
    if (!this.vertexes.includes(startVertex)) {
      throw new Error(`[dfs]vertex '${startVertex}' not found in graph`);
    }

    // 遍历顶点相邻的其他节点
    const accessRecords: string[] = [];
    const traverseSiblingVertex = (vertex: string) => {
      handler(vertex); // 递归的方式无法直接停止,跳到最顶层,只能一层一层退出
      accessRecords.push(vertex);
      const linkedVertexes = this.edges.get(vertex)!;
      for (let i = 0; i < linkedVertexes.length; i++) {
        const linkedItem = linkedVertexes[i];
        if (!accessRecords.includes(linkedItem)) {
          traverseSiblingVertex(linkedItem);
        }
      }
    }
    traverseSiblingVertex(startVertex);
  }

  // 实现 toString, 方便调试
  public toString() {
    let str = "";
    for (let i = 0; i < this.vertexes.length; i++) {
      const vertex = this.vertexes[i];
      const edges = this.edges.get(vertex)!;
      str += `${vertex} -> `;
      for (let j = 0; j < edges.length; j++) {
        const edge = edges[j];
        str += `${edge} `;
      }
      str = str.trim();
      str += "\n";
    }
    return str;
  }

}

const graph = new Graph();

"abcdefghi".split('').forEach(item => graph.addVertex(item));

graph.addEdge('a', 'b');
graph.addEdge('a', 'c');
graph.addEdge('a', 'd');
graph.addEdge('c', 'd');
graph.addEdge('c', 'g');
graph.addEdge('d', 'g');
graph.addEdge('d', 'h');
graph.addEdge('b', 'e');
graph.addEdge('b', 'f');
graph.addEdge('e', 'i');
graph.addEdge('f', 'i');

graph.removeVertex('e');

graph.removeEdge('a', 'c');

console.info(graph.toString());

graph.bfs(graph.vertexes[0], item => {
  console.info(item);
  // 找到了想要的顶点就可以停止遍历
  // if (item === 'e') {
  //   return false;
  // }
});


// g.dfs(g.vertexes[0], item => {
//   console.info(item);
// });

```
