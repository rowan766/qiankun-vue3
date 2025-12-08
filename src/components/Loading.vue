<template>
  <div class="loading-container">
    <div class="loading-spinner">
      <el-icon class="is-loading" :size="40">
        <Loading />
      </el-icon>
      <p class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'

defineProps({
  text: {
    type: String,
    default: 'Loading...'
  }
})
</script>

<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: #606266;
}

.is-loading {
  color: #409eff;
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
