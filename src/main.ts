import { createApp } from 'vue';
import App from './App.vue';

import './components/VContextmenu/themes/default/index.scss';
import 'element-plus/dist/index.css';
// import 'element-plus/theme-chalk/dark/css-vars.css'; TODO: dark mode
import './index.css';
import './assets/iconfont.css';

import contextmenu from './components/VContextmenu/index';
import dialogDrag from './directives/dialog-drag';

const app = createApp(App);
app.use(contextmenu);
app.use(dialogDrag, { containment: true });

app.mount('#app');
