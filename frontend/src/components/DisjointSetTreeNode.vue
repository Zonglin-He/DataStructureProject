<template>
  <li class="tree-node">
    <div class="node-chip" :class="chipClass">
      <span class="vertex">{{ node.vertex }}</span>
      <span class="meta">p={{ node.parent }}</span>
      <span class="meta">r={{ node.rank }}</span>
    </div>
    <transition-group v-if="children.length" name="fade" tag="ul" class="children">
      <DisjointSetTreeNode
        v-for="child in children"
        :key="child.vertex"
        :node="child"
        :highlight-set="highlightSet"
      />
    </transition-group>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DisjointSetNode } from '../types/disjoint-set';

defineOptions({ name: 'DisjointSetTreeNode' });

const props = defineProps<{ node: DisjointSetNode; highlightSet?: Set<number> }>();

const children = computed(() => [...props.node.children].sort((a, b) => a.vertex - b.vertex));
const isRoot = computed(() => props.node.parent === props.node.vertex);
const isHighlighted = computed(() => props.highlightSet?.has(props.node.vertex) ?? false);

const chipClass = computed(() => ({
  root: isRoot.value,
  highlight: isHighlighted.value
}));
</script>

<style scoped>
.tree-node {
  list-style: none;
  text-align: center;
  padding: 12px 8px 4px;
  position: relative;
}

.tree-node::before,
.tree-node::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #dcdfe6;
  width: 50%;
  height: 12px;
}

.tree-node::after {
  right: auto;
  left: 50%;
  border-left: none;
}

.tree-node:only-child::after,
.tree-node:only-child::before {
  display: none;
}

.tree-node:only-child {
  padding-top: 0;
}

.tree-node:first-child::before,
.tree-node:last-child::after {
  border-top: none;
}

.tree-node:last-child::after {
  border-left: 1px solid transparent;
}

.children {
  display: flex;
  justify-content: center;
  padding-left: 0;
}

.node-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #fff;
  border: 2px solid #409eff;
  font-size: 12px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.node-chip.root {
  background: #ecf5ff;
}

.node-chip.highlight {
  background: #fdf6ec;
  border-color: #e6a23c;
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(230, 162, 60, 0.4);
}

.vertex {
  font-weight: 700;
}

.meta {
  color: #606266;
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
