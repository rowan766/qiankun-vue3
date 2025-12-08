import { defineStore } from 'pinia'

// User state management
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token')
  }),

  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },

    setToken(token) {
      this.token = token
      this.isAuthenticated = !!token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    login(userInfo, token) {
      this.setUserInfo(userInfo)
      this.setToken(token)
    },

    logout() {
      this.userInfo = null
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})

// Micro app state management
export const useMicroAppStore = defineStore('microApp', {
  state: () => ({
    currentApp: null,
    loadingApp: false,
    microApps: []
  }),

  getters: {
    getCurrentApp: (state) => state.currentApp,
    isLoading: (state) => state.loadingApp,
    getApps: (state) => state.microApps
  },

  actions: {
    setCurrentApp(appName) {
      this.currentApp = appName
    },

    setLoading(loading) {
      this.loadingApp = loading
    },

    setMicroApps(apps) {
      this.microApps = apps
    },

    updateAppStatus(appName, status) {
      const app = this.microApps.find(a => a.name === appName)
      if (app) {
        app.status = status
      }
    }
  }
})

// Global state management (for main-sub app communication)
export const useGlobalStore = defineStore('global', {
  state: () => ({
    globalData: {},
    messages: []
  }),

  getters: {
    getGlobalData: (state) => state.globalData,
    getMessages: (state) => state.messages
  },

  actions: {
    setGlobalData(key, value) {
      this.globalData[key] = value
    },

    getGlobalDataByKey(key) {
      return this.globalData[key]
    },

    addMessage(message) {
      this.messages.push({
        ...message,
        timestamp: Date.now()
      })
    },

    clearMessages() {
      this.messages = []
    }
  }
})
