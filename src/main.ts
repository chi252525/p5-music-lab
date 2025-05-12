import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { AVPlugin } from 'vue-audio-visual';
import router from './router';
const app = createApp(App);
app.use(AVPlugin);
app.use(router);
app.mount('#app');
