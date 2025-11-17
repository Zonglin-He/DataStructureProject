<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="16">
        <graph-canvas :vertex-count="form.vertexCount" :edges="edges" :highlight-edges="highlightEdges" />
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>图参数</template>
          <el-form label-width="80px" size="small">
            <el-form-item label="节点数">
              <el-input-number v-model="form.vertexCount" :min="2" />
            </el-form-item>
          </el-form>
          <div class="edges">
            <div class="edges-header">
              <span>边 (无向)</span>
              <el-button type="primary" link @click="addEdge">新增</el-button>
            </div>
            <el-table :data="edges" border size="small" height="220">
              <el-table-column prop="from" label="From" width="70">
                <template #default="scope">
                  <el-input-number v-model="scope.row.from" :min="0" :max="form.vertexCount - 1" />
                </template>
              </el-table-column>
              <el-table-column prop="to" label="To" width="70">
                <template #default="scope">
                  <el-input-number v-model="scope.row.to" :min="0" :max="form.vertexCount - 1" />
                </template>
              </el-table-column>
              <el-table-column prop="weight" label="W" width="80">
                <template #default="scope">
                  <el-input-number v-model="scope.row.weight" :min="0" />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template #default="scope">
                  <el-button type="danger" link @click="removeEdge(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="actions">
            <el-button size="small" @click="loadDemo">加载示例</el-button>
            <el-button size="small" type="primary" :loading="loading" @click="run">运行 Kruskal</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="result-row">
      <el-col :span="16">
        <step-player :total="steps.length" v-model="currentIndex" />
        <el-card v-if="currentStep" class="table-card">
          <template #header>当前 Step</template>
          <el-descriptions :column="1" size="small">
            <el-descriptions-item label="候选边">
              {{ currentStep?.candidateEdge.from }} - {{ currentStep?.candidateEdge.to }} ({{ currentStep?.candidateEdge.weight }})
            </el-descriptions-item>
            <el-descriptions-item label="是否加入">{{ currentStep?.chosen ? '是' : '否' }}</el-descriptions-item>
            <el-descriptions-item label="连通块数量">{{ currentStep?.components }}</el-descriptions-item>
          </el-descriptions>
          <el-divider />
          <el-table :data="parentTable" size="small" border>
            <el-table-column prop="vertex" label="顶点" width="70" />
            <el-table-column prop="parent" label="parent" />
            <el-table-column prop="rank" label="rank" />
          </el-table>
          <el-divider />
          <disjoint-set-forest
            :parent="currentStep?.parentSnapshot"
            :rank="currentStep?.rankSnapshot"
            :highlight="highlightVertices"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card v-if="result" class="table-card">
          <template #header>最终 MST</template>
          <p>总权重：{{ result?.totalWeight }}，边数：{{ result?.mstEdges.length }}</p>
          <el-table :data="result?.mstEdges" size="small" border>
            <el-table-column prop="from" label="From" width="70" />
            <el-table-column prop="to" label="To" width="70" />
            <el-table-column prop="weight" label="W" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import GraphCanvas from '../components/GraphCanvas.vue';
import StepPlayer from '../components/StepPlayer.vue';
import DisjointSetForest from '../components/DisjointSetForest.vue';
import type { EdgeInput } from '../types/graph';
import type { KruskalResponse, KruskalStep } from '../api/kruskal';
import { runKruskal } from '../api/kruskal';

const demoEdges: EdgeInput[] = [
  { from: 0, to: 1, weight: 7 },
  { from: 0, to: 2, weight: 9 },
  { from: 0, to: 5, weight: 14 },
  { from: 1, to: 2, weight: 10 },
  { from: 1, to: 3, weight: 15 },
  { from: 2, to: 3, weight: 11 },
  { from: 2, to: 5, weight: 2 },
  { from: 3, to: 4, weight: 6 },
  { from: 4, to: 5, weight: 9 }
];

const form = reactive({
  vertexCount: 6
});

const edges = ref<EdgeInput[]>(JSON.parse(JSON.stringify(demoEdges)));
const steps = ref<KruskalStep[]>([]);
const result = ref<KruskalResponse | null>(null);
const currentIndex = ref(0);
const loading = ref(false);

const currentStep = computed(() => steps.value[currentIndex.value]);
const parentTable = computed(() => {
  if (!currentStep.value) return [];
  return currentStep.value.parentSnapshot.map((parent, idx) => ({
    vertex: idx,
    parent,
    rank: currentStep.value?.rankSnapshot[idx]
  }));
});

const highlightEdges = computed(() => {
  const step = currentStep.value;
  if (!step) return [];
  const highlights: { from: number; to: number; state: 'candidate' | 'mst' }[] = [];
  step.currentMstEdges.forEach(edge => {
    highlights.push({ ...edge, state: 'mst' });
  });
  if (step.candidateEdge) {
    highlights.push({ ...step.candidateEdge, state: step.chosen ? 'mst' : 'candidate' });
  }
  return highlights;
});

const previousStep = computed(() =>
  currentIndex.value > 0 ? steps.value[currentIndex.value - 1] : null
);

const highlightVertices = computed(() => {
  const set = new Set<number>();
  const step = currentStep.value;
  const prev = previousStep.value;
  if (!step) return [];
  if (step.candidateEdge) {
    set.add(step.candidateEdge.from);
    set.add(step.candidateEdge.to);
  }
  if (prev) {
    step.parentSnapshot.forEach((parent, idx) => {
      if (parent !== prev.parentSnapshot[idx]) {
        set.add(idx);
        if (parent !== null && parent !== undefined) {
          set.add(parent);
        }
        if (prev.parentSnapshot[idx] !== null && prev.parentSnapshot[idx] !== undefined) {
          set.add(prev.parentSnapshot[idx]);
        }
      }
    });
  }
  return Array.from(set);
});

const loadDemo = () => {
  form.vertexCount = 6;
  edges.value = JSON.parse(JSON.stringify(demoEdges));
};

const addEdge = () => {
  edges.value.push({ from: 0, to: 0, weight: 1 });
};

const removeEdge = (index: number) => {
  edges.value.splice(index, 1);
};

const run = async () => {
  try {
    loading.value = true;
    const data = await runKruskal({ vertexCount: form.vertexCount, edges: edges.value });
    steps.value = data.steps;
    result.value = data;
    currentIndex.value = 0;
    ElMessage.success('计算完成');
  } catch (error: any) {
    const message = error?.message ?? '';
    if (!error?.response || message.toLowerCase().includes('network')) {
      ElMessage.error(`无法连接后端 ${import.meta.env.VITE_API_BASE ?? 'http://localhost:8080'}，请先启动 Spring Boot 或修改 .env`);
    } else {
      ElMessage.error(error.response?.data?.error ?? message ?? '请求失败');
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.edges {
  margin-top: 12px;
}

.edges-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.result-row {
  margin-top: 12px;
}

.table-card {
  margin-top: 12px;
}
</style>
