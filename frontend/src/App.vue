<template>
  <el-container class="layout">
    <el-aside width="220px" class="side">
      <h2>AlgoVis</h2>
      <el-menu :default-active="active" @select="handleSelect">
        <el-menu-item index="dijkstra">Dijkstra 可视化</el-menu-item>
        <el-menu-item index="kruskal">Kruskal 并查集</el-menu-item>
        <el-menu-item index="huffman">Huffman 编码</el-menu-item>
      </el-menu>
      <div class="tips">默认后端地址 http://localhost:8080</div>
    </el-aside>
    <el-container>
      <el-header>
        <h1>{{ title }}</h1>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const active = computed(() => (route.name as string) ?? 'dijkstra');
const title = computed(() => {
  switch (route.name) {
    case 'dijkstra':
      return 'Dijkstra 演示';
    case 'kruskal':
      return 'Kruskal 最小生成树';
    case 'huffman':
      return 'Huffman 编码';
    default:
      return 'AlgoVis';
  }
});

const handleSelect = (name: string) => {
  router.push({ name });
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.side {
  background-color: #1f2d3d;
  color: #fff;
  padding: 24px 12px;
}

.side h2 {
  margin: 0 0 16px;
}

.tips {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 16px;
}

el-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}
</style>
