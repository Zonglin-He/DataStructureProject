<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="16">
        <graph-canvas :vertex-count="form.vertexCount" :edges="edges" :step="currentStep" />
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>参数配置</template>
          <el-form label-width="80px" size="small">
            <el-form-item label="节点数">
              <el-input-number v-model="form.vertexCount" :min="2" />
            </el-form-item>
            <el-form-item label="起点">
              <el-input-number v-model="form.source" :min="0" :max="form.vertexCount - 1" />
            </el-form-item>
            <el-form-item label="是否有向">
              <el-switch v-model="form.directed" />
            </el-form-item>
          </el-form>
          <div class="edges">
            <div class="edges-header">
              <span>边列表 (from, to, weight)</span>
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
            <el-button size="small" type="primary" :loading="loading" @click="run">运行 Dijkstra</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="result-row">
      <el-col :span="16">
        <step-player :total="steps.length" v-model="currentIndex" />
        <el-card v-if="currentStep" class="table-card">
          <template #header>当前 Step 状态</template>
          <el-table :data="distanceTable" size="small" border>
            <el-table-column prop="vertex" label="顶点" width="70" />
            <el-table-column prop="distance" label="dist" />
            <el-table-column prop="parent" label="parent" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card v-if="result" class="table-card">
          <template #header>最终结果</template>
          <el-descriptions :column="1" size="small">
            <el-descriptions-item label="可达节点">{{ reachableCount }}</el-descriptions-item>
            <el-descriptions-item label="Step 数">{{ steps.length }}</el-descriptions-item>
          </el-descriptions>
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
import type { DijkstraResponse, DijkstraStep, GraphRequest } from '../api/dijkstra';
import { runDijkstra } from '../api/dijkstra';
import type { EdgeInput } from '../types/graph';

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
  vertexCount: 6,
  directed: false,
  source: 0
});

const edges = ref<EdgeInput[]>(JSON.parse(JSON.stringify(demoEdges)));
const steps = ref<DijkstraStep[]>([]);
const result = ref<DijkstraResponse | null>(null);
const currentIndex = ref(0);
const loading = ref(false);

const payload = computed<GraphRequest>(() => ({
  vertexCount: form.vertexCount,
  directed: form.directed,
  source: form.source,
  edges: edges.value
}));

const currentStep = computed(() => steps.value[currentIndex.value]);
const distanceTable = computed(() => {
  if (!currentStep.value) return [];
  return Object.entries(currentStep.value.distance).map(([vertex, dist]) => ({
    vertex,
    distance: dist ?? 'INF',
    parent: currentStep.value?.parent[Number(vertex)] ?? '-'
  }));
});

const reachableCount = computed(() => {
  if (!result.value || steps.value.length === 0) return 0;
  const last = steps.value[steps.value.length - 1];
  return Object.values(last.distance ?? {}).filter(v => v !== null).length;
});

const loadDemo = () => {
  form.vertexCount = 6;
  form.source = 0;
  form.directed = false;
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
    const data = await runDijkstra(payload.value);
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
