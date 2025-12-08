import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun'
import microApps from './apps'
import { useMicroAppStore } from '../store'

/**
 * Initialize qiankun micro frontend
 */
export function initQiankun() {
  const microAppStore = useMicroAppStore()

  // Register micro apps
  registerMicroApps(microApps, {
    beforeLoad: (app) => {
      console.log('Before load app:', app.name)
      microAppStore.setLoading(true)
      return Promise.resolve()
    },
    beforeMount: (app) => {
      console.log('Before mount app:', app.name)
      return Promise.resolve()
    },
    afterMount: (app) => {
      console.log('After mount app:', app.name)
      microAppStore.setLoading(false)
      microAppStore.setCurrentApp(app.name)
      microAppStore.updateAppStatus(app.name, 'mounted')
      return Promise.resolve()
    },
    beforeUnmount: (app) => {
      console.log('Before unmount app:', app.name)
      return Promise.resolve()
    },
    afterUnmount: (app) => {
      console.log('After unmount app:', app.name)
      microAppStore.setCurrentApp(null)
      microAppStore.updateAppStatus(app.name, 'unmounted')
      return Promise.resolve()
    }
  })

  // Add global error handler
  addGlobalUncaughtErrorHandler((event) => {
    console.error('Micro app error:', event)
    microAppStore.setLoading(false)
  })

  // Start qiankun
  start({
    prefetch: true, // Enable prefetch
    sandbox: {
      strictStyleIsolation: false, // Style isolation
      experimentalStyleIsolation: true
    },
    singular: false // Allow multiple apps to run simultaneously (set to true if only one app at a time)
  })

  console.log('Qiankun initialized successfully')
}

export default initQiankun
