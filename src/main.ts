import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { AVPlugin } from 'vue-audio-visual';

const app = createApp(App);
app.use(AVPlugin);
app.mount('#app');
