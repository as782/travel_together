import './assets/main.css'
// vant 提示css
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import { createApp } from 'vue'


import App from './App.vue'
import router from './router'
import pinia from './stores'
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
