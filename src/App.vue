<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'

const route = useRoute()

// Check if current route is login page
const isLoginPage = computed(() => route.path === '/login')
</script>

<template>
  <div id="app">
    <!-- Show login page without layout -->
    <router-view v-if="isLoginPage" />

    <!-- Show main layout for other pages -->
    <MainLayout v-else />
  </div>
</template>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
