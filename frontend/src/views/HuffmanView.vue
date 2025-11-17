<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>输入文本</template>
          <el-input v-model="text" type="textarea" :rows="8" placeholder="请输入要编码的文本" />
          <div class="actions">
            <el-button type="primary" size="small" :loading="loading" @click="run">生成编码</el-button>
          </div>
          <el-alert title="Huffman 以 8bit 原文 vs. 实际编码位数对比压缩率" type="info" :closable="false" show-icon />
        </el-card>
        <el-card v-if="result" class="stats-card" shadow="hover">
          <template #header>压缩统计</template>
          <el-descriptions :column="1" size="small">
            <el-descriptions-item label="原始位数">{{ result?.originalBits }}</el-descriptions-item>
            <el-descriptions-item label="压缩后位数">{{ result?.compressedBits }}</el-descriptions-item>
            <el-descriptions-item label="压缩率">
              {{ compressionRate }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>Huffman 树</template>
          <huffman-tree-canvas :nodes="result?.nodes ?? null" />
        </el-card>
        <el-card class="stats-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>编码表</span>
              <el-space>
                <el-button size="small" @click="copyCodes" :disabled="!result">复制编码</el-button>
                <el-button size="small" @click="downloadEncoding" :disabled="!result">导出 JSON</el-button>
              </el-space>
            </div>
          </template>
          <el-table v-if="codesTable.length" :data="codesTable" border size="small">
            <el-table-column prop="char" label="字符" width="100" />
            <el-table-column prop="frequency" label="频次" width="100" />
            <el-table-column prop="code" label="编码" />
          </el-table>
          <div v-else class="empty">暂无数据</div>
        </el-card>
        <el-card v-if="result" class="stats-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>编码结果 (前 256 位)</span>
              <el-button size="small" @click="copyEncodedBits">复制全部编码</el-button>
            </div>
          </template>
          <div class="encoded">{{ previewBits }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="result-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>树节点列表</template>
          <el-table v-if="result" :data="result.nodes" border size="small">
            <el-table-column prop="id" label="节点" width="160" />
            <el-table-column prop="charValue" label="字符" width="120">
              <template #default="scope">
                <span v-if="scope.row.charValue">{{ displayChar(scope.row.charValue) }}</span>
                <span v-else>内部节点</span>
              </template>
            </el-table-column>
            <el-table-column prop="frequency" label="频率" width="120" />
            <el-table-column prop="leftId" label="左子" width="160" />
            <el-table-column prop="rightId" label="右子" width="160" />
            <el-table-column prop="code" label="编码" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { HuffmanResponse } from '../api/huffman';
import { encodeHuffman } from '../api/huffman';
import HuffmanTreeCanvas from '../components/HuffmanTreeCanvas.vue';

const text = ref('ALGORITHMS ARE FUN!');
const result = ref<HuffmanResponse | null>(null);
const loading = ref(false);

const codesTable = computed(() => {
  if (!result.value) return [];
  return Object.entries(result.value.codes).map(([char, code]) => ({
    char,
    code,
    frequency: result.value?.nodes.find(node => node.charValue === char)?.frequency ?? 0
  }));
});

const previewBits = computed(() => {
  if (!result.value) return '';
  return result.value.encodedBits.slice(0, 256);
});

const compressionRate = computed(() => {
  if (!result.value || result.value.originalBits === 0) return '-';
  const rate = (result.value.compressedBits / result.value.originalBits) * 100;
  return rate.toFixed(2) + '%';
});

const displayChar = (char: string) => {
  if (char === ' ') return '[空格]';
  if (char === '\n') return '[换行]';
  return char;
};

const requireResult = () => {
  if (!result.value) {
    ElMessage.warning('请先生成编码');
    return false;
  }
  return true;
};

const copyCodes = async () => {
  if (!requireResult()) return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(result.value!.codes, null, 2));
    ElMessage.success('编码表已复制');
  } catch {
    ElMessage.error('复制失败，请检查浏览器权限');
  }
};

const copyEncodedBits = async () => {
  if (!requireResult()) return;
  try {
    await navigator.clipboard.writeText(result.value!.encodedBits);
    ElMessage.success('编码结果已复制');
  } catch {
    ElMessage.error('复制失败，请检查浏览器权限');
  }
};

const downloadEncoding = () => {
  if (!requireResult()) return;
  const payload = {
    input: text.value,
    codes: result.value!.codes,
    encodedBits: result.value!.encodedBits,
    stats: {
      originalBits: result.value!.originalBits,
      compressedBits: result.value!.compressedBits
    }
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `huffman-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  ElMessage.success('已导出 Huffman 数据');
};

const run = async () => {
  if (!text.value.trim()) {
    ElMessage.warning('请输入文本');
    return;
  }
  try {
    loading.value = true;
    result.value = await encodeHuffman({ text: text.value });
    ElMessage.success('编码完成');
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

.actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.empty {
  text-align: center;
  color: #909399;
  padding: 16px;
}

.stats-card {
  margin-top: 16px;
}

.encoded {
  word-break: break-all;
  font-family: 'JetBrains Mono', Consolas, monospace;
  background: #f5f7fa;
  padding: 12px;
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.result-row {
  margin-top: 16px;
}
</style>
