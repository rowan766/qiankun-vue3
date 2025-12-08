<template>
  <div class="main-layout">
    <el-container>
      <!-- Header Navigation Bar -->
      <el-header class="header">
        <div class="header-left">
          <h2>Micro Frontend Main App</h2>
        </div>
        <div class="header-right">
          <span class="username">{{ userInfo?.name || 'User' }}</span>
          <el-button type="danger" size="small" @click="handleLogout">
            Logout
          </el-button>
        </div>
      </el-header>

      <el-container>
        <!-- Sidebar Menu -->
        <el-aside width="200px" class="aside">
          <el-menu
            :default-active="activeMenu"
            class="menu"
            @select="handleMenuSelect"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span>Home</span>
            </el-menu-item>

            <el-sub-menu index="sub-apps">
              <template #title>
                <el-icon><Grid /></el-icon>
                <span>Micro Apps</span>
              </template>
              <el-menu-item
                v-for="app in microApps"
                :key="app.name"
                :index="app.activeRule"
              >
                {{ app.label }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <!-- Main Content Area -->
        <el-main class="main">
          <!-- Loading Indicator -->
          <Loading v-if="isLoading" />

          <!-- Micro App Container -->
          <div id="subapp-container" class="subapp-container"></div>

          <!-- Router View (for main app pages) -->
          <router-view v-show="!currentApp"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, Grid } from '@element-plus/icons-vue'
import { useUserStore, useMicroAppStore } from '../store'
import Loading from '../components/Loading.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const microAppStore = useMicroAppStore()

// User info
const userInfo = computed(() => userStore.getUserInfo)

// Current active menu
const activeMenu = computed(() => route.path)

// Current active micro app
const currentApp = computed(() => microAppStore.getCurrentApp)

// Loading state
const isLoading = computed(() => microAppStore.isLoading)

// Micro apps list
const microApps = ref([
  { name: 'subapp-vue', label: 'Vue Sub App', activeRule: '/subapp/vue' },
  { name: 'subapp-react', label: 'React Sub App', activeRule: '/subapp/react' }
])

onMounted(() => {
  microAppStore.setMicroApps(microApps.value)
})

// Handle menu selection
const handleMenuSelect = (index) => {
  router.push(index)
}

// Handle logout
const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.main-layout {
  height: 100vh;
  width: 100%;
}

.el-container {
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #409eff;
  color: white;
  padding: 0 20px;
}

.header-left h2 {
  margin: 0;
  font-size: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.username {
  font-size: 14px;
}

.aside {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
}

.menu {
  border: none;
  height: 100%;
}

.main {
  background-color: #fff;
  padding: 20px;
  position: relative;
  overflow: auto;
}

.subapp-container {
  width: 100%;
  height: 100%;
}
</style>
