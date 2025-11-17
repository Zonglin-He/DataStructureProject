<template>
  <div class="player" v-if="total > 0">
    <div class="controls">
      <el-button size="small" @click="emit('update:modelValue', 0)">|◀</el-button>
      <el-button size="small" @click="step(-1)" :disabled="modelValue <= 0">◀</el-button>
      <el-button size="small" @click="togglePlay">{{ playing ? '暂停' : '播放' }}</el-button>
      <el-button size="small" @click="step(1)" :disabled="modelValue >= total - 1">▶</el-button>
      <el-button size="small" @click="emit('update:modelValue', total - 1)">▶|</el-button>
      <span>Step {{ modelValue + 1 }} / {{ total }}</span>
    </div>
    <el-slider :max="total - 1" :min="0" :step="1" :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch, ref } from 'vue';

const props = defineProps<{ total: number; modelValue: number }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();
const playing = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const stop = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const togglePlay = () => {
  playing.value = !playing.value;
  if (playing.value) {
    timer = setInterval(() => {
      if (props.modelValue >= props.total - 1) {
        stop();
        playing.value = false;
        return;
      }
      emit('update:modelValue', props.modelValue + 1);
    }, 800);
  } else {
    stop();
  }
};

const step = (offset: number) => {
  const next = Math.min(props.total - 1, Math.max(0, props.modelValue + offset));
  emit('update:modelValue', next);
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue >= props.total - 1) {
      stop();
      playing.value = false;
    }
  }
);

onBeforeUnmount(stop);
</script>

<style scoped>
.player {
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.controls span {
  margin-left: auto;
  font-weight: 600;
}
</style>
