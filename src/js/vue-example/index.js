import { createApp } from 'vue';
import App from '@/js/vue-example/App.vue';

export const initVueApp = () => {
  createApp(App).mount('#vue-app');
};
