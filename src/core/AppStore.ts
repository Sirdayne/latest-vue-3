import { ref } from 'vue';
import { QueryClient } from '@tanstack/vue-query';

export let APP_STORE = {} as any;
export let DATE_LOCALE = {} as any;
export const isOpened = ref(false);
export const queryClient = new QueryClient();

export const setupAppStore = (store: any) => {
	APP_STORE = store;
};

export const setupDateLocale = (locale: any) => {
	DATE_LOCALE = locale;
};
