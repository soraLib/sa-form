import { createApp } from 'vue'
import Provider from './AppProvider.vue'

import './index.css'
import './assets/iconfont.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(Provider)

app.mount('#app')
