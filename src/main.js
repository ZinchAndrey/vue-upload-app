import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import BaseButton from '@/components/UI/BaseButton.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('base-button', BaseButton)

app.use(createPinia())
app.use(router)

app.mount('#app')
