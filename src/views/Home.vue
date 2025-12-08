<template>
  <div class="home-container">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <h2>Welcome to Qiankun Micro Frontend</h2>
        </div>
      </template>

      <div class="content">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="intro">
              <p>This is the main application based on Vue 3 + Qiankun micro frontend architecture.</p>
              <p>You can navigate to different micro applications through the sidebar menu.</p>
            </div>
          </el-col>
        </el-row>

        <el-divider />

        <el-row :gutter="20" class="stats-row">
          <el-col :span="8">
            <el-card shadow="hover" class="stat-card">
              <el-statistic title="Micro Apps" :value="microApps.length">
                <template #prefix>
                  <el-icon><Grid /></el-icon>
                </template>
              </el-statistic>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card shadow="hover" class="stat-card">
              <el-statistic title="Current App" :value="currentApp || 'Main App'">
                <template #prefix>
                  <el-icon><Monitor /></el-icon>
                </template>
              </el-statistic>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card shadow="hover" class="stat-card">
              <el-statistic title="Status" value="Running">
                <template #prefix>
                  <el-icon class="success-icon"><CircleCheck /></el-icon>
                </template>
              </el-statistic>
            </el-card>
          </el-col>
        </el-row>

        <el-divider />

        <el-row :gutter="20" class="apps-row">
          <el-col :span="24">
            <h3>Available Micro Applications</h3>
          </el-col>

          <el-col :span="12" v-for="app in microApps" :key="app.name">
            <el-card shadow="hover" class="app-card">
              <div class="app-info">
                <h4>{{ app.label }}</h4>
                <p>Route: {{ app.activeRule }}</p>
                <el-button
                  type="primary"
                  size="small"
                  @click="navigateToApp(app.activeRule)"
                >
                  Open App
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Grid, Monitor, CircleCheck } from '@element-plus/icons-vue'
import { useMicroAppStore } from '../store'

const router = useRouter()
const microAppStore = useMicroAppStore()

const microApps = computed(() => microAppStore.getApps)
const currentApp = computed(() => microAppStore.getCurrentApp)

const navigateToApp = (route) => {
  router.push(route)
}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.welcome-card {
  max-width: 1200px;
  margin: 0 auto;
}

.card-header h2 {
  margin: 0;
  color: #409eff;
}

.content {
  padding: 20px 0;
}

.intro {
  text-align: center;
  margin-bottom: 20px;
}

.intro p {
  font-size: 16px;
  color: #606266;
  line-height: 1.8;
  margin: 10px 0;
}

.stats-row {
  margin: 30px 0;
}

.stat-card {
  text-align: center;
}

.success-icon {
  color: #67c23a;
}

.apps-row {
  margin-top: 30px;
}

.apps-row h3 {
  margin-bottom: 20px;
  color: #303133;
}

.app-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.app-card:hover {
  transform: translateY(-5px);
}

.app-info h4 {
  margin: 0 0 10px 0;
  color: #409eff;
}

.app-info p {
  margin: 10px 0;
  color: #909399;
  font-size: 14px;
}
</style>
