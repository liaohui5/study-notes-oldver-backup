使用 Vue.js 实现了经典游戏 `别踩白块儿` 的功能, 但是美中不足的是: 
会 `大量操作dom, 性能并不理想`,但是我暂时也没有想到好的解决办法

```vue
<template>
  <div class="main">
    <div class="container">
      <div ref="blocks" class="blocks" :style="{ top: `-${blockHeight}px` }">
        <!-- eslint-disable-next-line vue/no-template-key -->
        <template v-for="(row, rowKey) in blocks">
          <div
            class="box"
            :class="item === 0 ? 'bg-white' : 'bg-black'"
            :style="{ height: `${blockHeight}px` }"
            v-for="(item, key) in blocks[rowKey]"
            :key="`${rowKey}-${key}`"
            @click="clickBlock(rowKey, key, item)"
          ></div>
        </template>
      </div>
    </div>

    <!-- buttons -->
    <div class="btns">
      <button @click="startGame">开始游戏</button>
      <p>得分: {{ score }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    created() {
      this.initGame();
    },
    data: () => ({
      speed: {
        step: 5,
        timeout: 20,
      },
      score: 0, // 分数
      isPlaying: false, // 是否正在玩
      blocks: [
        // [0,1,0] 0: 白色块 1:黑色块
      ],
    }),
    methods: {
      initGame() {
        this.score = 0; // 得分
        this.timer = null; // 控制滚动定时器
        this.blockHeight = 120; // 每个方块的高度
        this.top = -this.blockHeight; // 初始化top高度
        // 默认渲染5行
        for (let i = 0; i < 5; i++) {
          this.newRowBlocksGenerator();
        }
      },

      // 开始游戏
      startGame() {
        if (!this.isPlaying) {
          this.isPlaying = true;
          this.scrollViewer();
        }
      },

      // 滚动屏幕
      scrollViewer() {
        this.timer = setInterval(() => {
          this.top += this.speed.step;
          this.$refs.blocks.style.top = `${this.top}px`;
          console.info("cur-top:", this.top);
          if (this.top === 0) {
            this.isGameOverScrollBottom();
            // this.updateBlocks();
            // TODO: 不能滚动到最底部自动更新视图
            // 因为频繁更新视图会让dom无法点击, 所以只能:
            // 点击正确一个加分后手动更新格子
          }
        }, this.speed.timeout);
      },

      // 更新格子
      updateBlocks() {
        this.newRowBlocksGenerator();
        this.blocks.pop();
        this.top -= this.blockHeight;
      },

      // 滚动到底部判断是否游戏结束: blocks 数组的最后一个数组是否有1
      isGameOverScrollBottom() {
        const lastRow = this.blocks[this.blocks.length - 1];
        const hasBlack = lastRow.find((item) => item === 1);
        hasBlack && this.gameOver();
      },

      // 点击色块: 如果白色就游戏结束, 黑色就生成新的一行, 并修改为白色
      clickBlock(row, key, type) {
        if (!this.isPlaying) return;
        if (type === 0) {
          this.gameOver();
          return;
        }
        this.$set(this.blocks[row], key, 0);
        this.score += 1;
        this.updateBlocks();
      },

      // 生成新的一行, 随机生成色块
      newRowBlocksGenerator() {
        const randomKey = Math.floor(Math.random() * 3);
        const row = [0, 0, 0];
        row[randomKey] = 1;
        this.blocks.unshift(row);
      },

      // 游戏结束
      gameOver() {
        clearInterval(this.timer);
        alert("游戏结束");
        window.location.reload(true);
      },
    },
  };
</script>

<style lang="scss">
  /* 每个盒子的高度 */

  .main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* border: 1px solid #eee; */
    .btns {
      padding: 20px 0;
      text-align: center;
    }

    .container {
      width: 300px;
      height: 480px;
      /* background: red; */
      position: relative;
      top: 0;
      left: 0;
      overflow: hidden;
      border: 1px solid #eee;
      .blocks {
        position: absolute;
        /* top: -$blockHeight; */
        top: 0;
        left: 0;
        width: 300px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .box {
          width: 100px;
          /* height: $blockHeight; */
          border: 1px solid #eee;
          box-sizing: border-box;
          translate: all 1s;
          &.bg-black {
            background-color: black;
          }
          &.bg-white {
            background-color: white;
          }
        }
      }
    }
  }
</style>
```
