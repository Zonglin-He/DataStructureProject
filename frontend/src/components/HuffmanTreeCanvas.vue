<template>
  <div
    class="tree"
    :class="{ dragging: isDragging }"
    v-if="layout.nodes.length"
    @wheel.prevent="onWheel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endPan"
    @pointerleave="endPan"
    @pointercancel="endPan"
  >
    <svg :width="layout.width" :height="layout.height">
      <g :transform="transformValue">
        <g v-for="edge in layout.edges" :key="edge.id">
          <line :x1="edge.from.x" :y1="edge.from.y" :x2="edge.to.x" :y2="edge.to.y" class="edge" />
          <text :x="edge.labelX" :y="edge.labelY" class="edge-label">{{ edge.label }}</text>
        </g>
        <g v-for="node in layout.nodes" :key="node.id">
          <circle :cx="node.x" :cy="node.y" r="20" class="node" :class="{ leaf: node.charValue }" />
          <text :x="node.x" :y="node.y - 8" class="label">
            {{ node.charValue ? displayChar(node.charValue) : '·' }}
          </text>
          <text :x="node.x" :y="node.y + 12" class="freq">{{ node.frequency }}</text>
        </g>
      </g>
    </svg>
    <el-button class="reset" size="small" @click.stop="resetView">重置视图</el-button>
    <div class="hint">滚轮缩放，按住拖拽以平移</div>
  </div>
  <div v-else class="empty">暂无 Huffman 树数据</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { HuffmanNodeDTO } from '../api/huffman';

const props = defineProps<{ nodes: HuffmanNodeDTO[] | null }>();

interface LayoutNode {
  id: string;
  x: number;
  y: number;
  frequency: number;
  charValue: string | null;
}

interface LayoutEdge {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: '0' | '1';
  labelX: number;
  labelY: number;
}

const layout = computed(() => {
  const nodes = props.nodes ?? [];
  if (!nodes.length) {
    return { nodes: [] as LayoutNode[], edges: [] as LayoutEdge[], width: 300, height: 200 };
  }
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  const childIds = new Set<string>();
  nodes.forEach(node => {
    if (node.leftId) childIds.add(node.leftId);
    if (node.rightId) childIds.add(node.rightId);
  });
  const root = nodes.find(node => !childIds.has(node.id));
  if (!root) {
    return { nodes: [] as LayoutNode[], edges: [] as LayoutEdge[], width: 300, height: 200 };
  }

  const horizontal = 90;
  const vertical = 110;
  const margin = 40;
  let currentX = 0;
  const positioned = new Map<string, LayoutNode>();
  const edges: LayoutEdge[] = [];
  let maxDepth = 0;

  const assign = (nodeId: string, depth: number) => {
    const node = nodeMap.get(nodeId);
    if (!node) return;
    if (node.leftId) assign(node.leftId, depth + 1);
    const x = margin + currentX * horizontal;
    const y = margin + depth * vertical;
    currentX++;
    positioned.set(nodeId, {
      id: nodeId,
      x,
      y,
      frequency: node.frequency,
      charValue: node.charValue ?? null
    });
    if (node.rightId) assign(node.rightId, depth + 1);
    maxDepth = Math.max(maxDepth, depth);
  };

  assign(root.id, 0);

  nodes.forEach(node => {
    const from = positioned.get(node.id);
    if (!from) return;
    if (node.leftId) {
      const to = positioned.get(node.leftId);
      if (to) {
        edges.push(createEdge(node.id + 'L', from, to, '0'));
      }
    }
    if (node.rightId) {
      const to = positioned.get(node.rightId);
      if (to) {
        edges.push(createEdge(node.id + 'R', from, to, '1'));
      }
    }
  });

  const width = Math.max(positioned.size * horizontal + margin * 2, 360);
  const height = Math.max((maxDepth + 1) * vertical + margin, 240);

  return { nodes: Array.from(positioned.values()), edges, width, height };
});

const createEdge = (id: string, from: LayoutNode, to: LayoutNode, label: '0' | '1'): LayoutEdge => {
  const labelX = (from.x + to.x) / 2;
  const labelY = (from.y + to.y) / 2 - 8;
  return { id, from, to, label, labelX, labelY };
};

const displayChar = (char: string) => {
  if (char === ' ') return '空';
  if (char === '\n') return '↵';
  return char;
};

const scale = ref(1);
const translate = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const lastPoint = ref({ x: 0, y: 0 });

const transformValue = computed(() => `translate(${translate.value.x}, ${translate.value.y}) scale(${scale.value})`);

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const onWheel = (event: WheelEvent) => {
  const delta = event.deltaY < 0 ? 1.1 : 0.9;
  scale.value = clamp(scale.value * delta, 0.4, 2.5);
};

const onPointerDown = (event: PointerEvent) => {
  isDragging.value = true;
  lastPoint.value = { x: event.clientX, y: event.clientY };
};

const onPointerMove = (event: PointerEvent) => {
  if (!isDragging.value) return;
  translate.value = {
    x: translate.value.x + (event.clientX - lastPoint.value.x),
    y: translate.value.y + (event.clientY - lastPoint.value.y)
  };
  lastPoint.value = { x: event.clientX, y: event.clientY };
};

const endPan = () => {
  isDragging.value = false;
};

const resetView = () => {
  scale.value = 1;
  translate.value = { x: 0, y: 0 };
};

watch(
  () => props.nodes,
  () => resetView()
);
</script>

<style scoped>
.tree {
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  border: 1px solid #ebeef5;
  cursor: grab;
}

.tree.dragging {
  cursor: grabbing;
}

svg {
  width: 100%;
  height: auto;
}

.edge {
  stroke: #909399;
  stroke-width: 2;
}

.edge-label {
  fill: #606266;
  font-size: 12px;
}

.node {
  fill: #fff;
  stroke: #1f2d3d;
  stroke-width: 2;
}

.node.leaf {
  fill: #fef0f0;
}

.label,
.freq {
  text-anchor: middle;
  font-size: 12px;
  fill: #303133;
}

.freq {
  font-size: 11px;
}

.reset {
  position: absolute;
  top: 10px;
  right: 10px;
}

.hint {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 12px;
  color: #909399;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 6px;
}

.empty {
  text-align: center;
  color: #909399;
  padding: 16px;
}
</style>
