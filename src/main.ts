import { createApp } from 'vue'
import Provider from './AppProvider.vue'

import './components/VContextmenu/themes/default/index.scss'
import './index.css'
import './assets/iconfont.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

import contextmenu from './components/VContextmenu/index'

const app = createApp(Provider)
app.use(contextmenu)

app.mount('#app')
