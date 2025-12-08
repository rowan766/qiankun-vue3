/**
 * Micro apps configuration
 * Each app should define: name, entry, container, activeRule
 */

const microApps = [
  {
    name: 'subapp-vue',
    entry: '//localhost:8081',
    container: '#subapp-container',
    activeRule: '/subapp/vue',
    props: {
      routerBase: '/subapp/vue'
    }
  },
  {
    name: 'subapp-react',
    entry: '//localhost:8082',
    container: '#subapp-container',
    activeRule: '/subapp/react',
    props: {
      routerBase: '/subapp/react'
    }
  }
]

export default microApps
