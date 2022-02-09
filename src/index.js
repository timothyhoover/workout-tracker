import './assets/tailwind.css'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router/index'

console.log(router)

createApp(App).use(router).mount('#app')
