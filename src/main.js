import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import plugin from './config/plugin'

createApp(App).use(store).use(plugin).mount('#app')
