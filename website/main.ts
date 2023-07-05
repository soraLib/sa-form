import { createApp } from 'vue'
import Provider from './AppProvider.vue'

// TODO: integrate styles into src/SaForm
import './styles/index.scss'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(Provider)

app.mount('#app')
