import './styles/main.scss';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

fetch('/icons.svg')
  .then(response => response.text())
  .then(sprite => document.body.insertAdjacentHTML('afterbegin', sprite));

createApp(App).use(router).mount('#app');
