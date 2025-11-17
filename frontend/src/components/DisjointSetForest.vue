<template>
  <transition-group v-if="forest.length" tag="div" class="forest" name="fade">
    <div v-for="root in forest" :key="root.vertex" class="set-card">
      <div class="set-header">集合根 {{ root.vertex }}</div>
      <ul class="tree-root">
        <DisjointSetTreeNode :node="root" :highlight-set="highlightSet" />
      </ul>
    </div>
  </transition-group>
  <div v-else class="empty">暂无并查集数据</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DisjointSetNode } from '../types/disjoint-set';
import DisjointSetTreeNode from './DisjointSetTreeNode.vue';

const props = defineProps<{ parent?: number[]; rank?: number[]; highlight?: number[] }>();

const highlightSet = computed(() => new Set(props.highlight ?? []));

const forest = computed<DisjointSetNode[]>(() => {
  const parent = props.parent ?? [];
  if (!parent.length) {
    return [];
  }
  const nodes: DisjointSetNode[] = parent.map((value, idx) => ({
    vertex: idx,
    parent: value ?? idx,
    rank: props.rank?.[idx] ?? 0,
    children: []
  }));

  nodes.forEach(node => {
    const parentIdx = parent[node.vertex] ?? node.vertex;
    if (parentIdx !== node.vertex && nodes[parentIdx]) {
      nodes[parentIdx].children.push(node);
    }
  });

  nodes.forEach(node => {
    node.children.sort((a, b) => a.vertex - b.vertex);
  });

  return nodes.filter(node => (parent[node.vertex] ?? node.vertex) === node.vertex);
});
</script>

<style scoped>
.forest {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.set-card {
  flex: 1 1 240px;
  min-width: 240px;
  background: #f5f7fa;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e4e7ed;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}

.set-header {
  font-weight: 600;
  margin-bottom: 12px;
}

.tree-root {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.empty {
  text-align: center;
  color: #909399;
  padding: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
