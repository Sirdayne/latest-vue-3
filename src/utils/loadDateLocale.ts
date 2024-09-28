import { setupDateLocale } from '@/core/AppStore';
import * as locales from 'date-fns/locale';

async function loadLocale(localeCode: string): Promise<any> {
	try {
		switch (localeCode) {
			case 'bg':
				return locales.bg;
			case 'da':
				return locales.da;
			case 'de':
				return locales.de;
			case 'el':
				return locales.el;
			case 'es':
				return locales.es;
			case 'fi':
				return locales.fi;
			case 'fr':
				return locales.fr;
			case 'fr-CA':
				return locales.frCA;
			case 'id':
				return locales.id;
			case 'it':
				return locales.it;
			case 'ja':
				return locales.ja;
			case 'ko':
				return locales.ko;
			case 'nl':
				return locales.nl;
			case 'nn':
				return locales.nn;
			case 'pl':
				return locales.pl;
			case 'pt-BR':
				return locales.ptBR;
			case 'pt':
				return locales.pt;
			case 'ro':
				return locales.ro;
			case 'ru':
				return locales.ru;
			case 'sv':
				return locales.sv;
			case 'th':
				return locales.th;
			case 'tr':
				return locales.tr;
			case 'uk':
				return locales.uk;
			case 'vi':
				return locales.vi;
			case 'zh':
				return locales.zhCN;
			case 'en':
			case 'en-SOCIAL':
			default:
				return locales.enUS;
		}
	} catch (error) {
		console.error('Locale not found', error);
		return null;
	}
}

export async function loadDateLocale(locale: string) {
	const dateLocale = await loadLocale(locale);
	setupDateLocale(dateLocale);
}
