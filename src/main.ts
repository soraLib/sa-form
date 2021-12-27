import { createApp } from 'vue';
import App from './App.vue';

import './components/VContextmenu/themes/default/index.scss';
import 'element-plus/dist/index.css';
import './index.css';

import ElementPlus from 'element-plus';
import contextmenu from './components/VContextmenu/index';

const app = createApp(App);
app.use(contextmenu);
app.use(ElementPlus);

app.mount('#app');
