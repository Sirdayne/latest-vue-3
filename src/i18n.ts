import { createI18n } from 'vue-i18n';
import { loadLocalizationFile } from '@/utils';

export const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: {}
});

export async function switchLanguage(locale: string) {
	const messages = await loadLocalizationFile(locale);
	i18n.global.setLocaleMessage(locale, messages);
	// @ts-ignore
	i18n.global.locale.value = locale;
}
