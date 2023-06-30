import { createApp } from 'vue'
import Provider from './AppProvider.vue'

import './styles/base.css'
import './styles/var.scss'
import './styles/iconfont.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(Provider)

app.mount('#app')
