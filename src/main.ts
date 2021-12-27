import { createApp } from 'vue';
import App from './App.vue';

import './index.css';
import './components/VContextmenu/themes/default/index.scss';

import contextmenu from './components/VContextmenu/index';

const app = createApp(App);
app.use(contextmenu);

app.mount('#app');
