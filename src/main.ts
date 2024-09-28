import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import AppPlugin from '@/core/AppPlugin';
import { queryClient } from '@/core/AppStore';
import { i18n } from '@/i18n';
import VueSmoothScroll from 'vue3-smooth-scroll'
import App from './App.vue';
import '@/styles/index.css';

const app = createApp(App);

app.use(AppPlugin);
app.use(VueQueryPlugin, { queryClient });
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(VueSmoothScroll)

app.mount('#lobby-app');
