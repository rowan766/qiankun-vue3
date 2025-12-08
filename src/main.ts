import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { initQiankun } from './micro'

// Create Vue app instance
const app = createApp(App)

// Create Pinia store
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// Mount app
app.mount('#app')

// Initialize qiankun micro frontend
initQiankun()

console.log('Main app started successfully')
