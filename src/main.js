import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { currency, date } from './methods/filters'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$filters = { currency, date }
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
