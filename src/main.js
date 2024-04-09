import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';

createApp(App).mount('#app')
