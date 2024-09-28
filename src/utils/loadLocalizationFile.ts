// import { APP_STORE } from '@/core/AppStore';
import common from '../locales/common.json';

export async function loadLocalizationFile(language: string) {
	try {
		const base = '.';
		// const base = APP_STORE?.isLocalBuild
		// 	? ''
		// 	: process.env.NODE_ENV === 'production'
		// 		? 'https://lobby.bgaming-network.com'
		// 		: 'https://lobby-staging.bgaming-network.com';

		const response = await fetch(`${base}/l10n/${language}/common.json`);
		return await response.json();
	} catch (error) {
		return common;
	}
}
