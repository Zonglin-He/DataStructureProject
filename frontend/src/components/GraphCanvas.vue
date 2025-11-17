<template>
  <div class="graph">
    <svg :width="size" :height="size">
      <g v-for="edge in decoratedEdges" :key="edge.id">
        <line
          :x1="edge.from.x"
          :y1="edge.from.y"
          :x2="edge.to.x"
          :y2="edge.to.y"
          :class="['edge', edge.state]"
        />
        <text :x="edge.mid.x" :y="edge.mid.y" class="weight">{{ edge.weight }}</text>
      </g>
      <g v-for="node in nodes" :key="node.id">
        <circle :cx="node.x" :cy="node.y" :r="node.r" :class="['node', node.state]" />
        <text :x="node.x" :y="node.y" class="label">{{ node.id }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DijkstraStep } from '../api/dijkstra';
import type { EdgeInput } from '../types/graph';

type HighlightEdge = { from: number; to: number; state: 'idle' | 'relax' | 'candidate' | 'mst' };

const size = 420;
const props = defineProps<{
  vertexCount: number;
  edges: EdgeInput[];
  step?: DijkstraStep;
  highlightEdges?: HighlightEdge[];
}>();

const nodes = computed(() => {
  const radius = size / 2 - 40;
  const center = size / 2;
  return Array.from({ length: props.vertexCount }, (_, idx) => {
    const angle = (2 * Math.PI * idx) / props.vertexCount;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    const visited = props.step?.visitedVertices?.includes(idx);
    const current = props.step?.currentVertex === idx;
    return {
      id: idx,
      x,
      y,
      r: current ? 22 : 18,
      state: current ? 'current' : visited ? 'visited' : 'idle'
    };
  });
});

const relaxPairs = computed(() => new Set((props.step?.relaxOps ?? []).map(op => `${op.from}-${op.to}`)));

const highlightMap = computed(() => {
  const map = new Map<string, HighlightEdge['state']>();
  (props.highlightEdges ?? []).forEach(edge => {
    map.set(`${edge.from}-${edge.to}`, edge.state);
    map.set(`${edge.to}-${edge.from}`, edge.state);
  });
  return map;
});

const decoratedEdges = computed(() => {
  const nodesById = Object.fromEntries(nodes.value.map(node => [node.id, node]));
  return props.edges.map((edge, idx) => {
    const from = nodesById[edge.from];
    const to = nodesById[edge.to];
    const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
    const key = `${edge.from}-${edge.to}`;
    const state = highlightMap.value.get(key) ?? (relaxPairs.value.has(key) ? 'relax' : 'idle');
    return { id: idx, from, to, mid, weight: edge.weight, state };
  });
});
</script>

<style scoped>
.graph {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 12px;
  display: flex;
  justify-content: center;
}

.edge {
  stroke: #909399;
  stroke-width: 2;
  opacity: 0.6;
}

.edge.relax {
  stroke: #67c23a;
  opacity: 1;
  stroke-width: 3;
}

.edge.candidate {
  stroke: #e6a23c;
  opacity: 1;
  stroke-width: 3;
  stroke-dasharray: 6 4;
}

.edge.mst {
  stroke: #409eff;
  opacity: 1;
  stroke-width: 3;
}

.node {
  stroke: #1f2d3d;
  stroke-width: 2;
  fill: #fff;
}

.node.visited {
  fill: #e1f3d8;
}

.node.current {
  fill: #f56c6c;
  stroke: transparent;
}

.label {
  font-size: 12px;
  fill: #1f2d3d;
  text-anchor: middle;
  dominant-baseline: middle;
}

.weight {
  font-size: 12px;
  fill: #606266;
  text-anchor: middle;
}
</style>
