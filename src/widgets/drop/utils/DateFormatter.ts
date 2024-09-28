import { DATE_LOCALE } from '@/core/AppStore';
import type { FDate } from '../DropModel';

import { format } from 'date-fns';

export function formatToDate(startDate: number | undefined, locale = 'en') {
	//return formatDateTime( Date.now()/1000);
	if (typeof startDate === 'undefined') return ' NONE ';

	let date;
	if (startDate) {
		date = new Date(startDate * 1000);
	} else {
		//sentryHub.captureMessage(SentryErrorType.LS_SERVER_DATA_UNDEFINED + ": startDate");
		date = new Date();
	}

	//DateTimeFormatOptions
	const options: any = {
		//		minute: 'numeric',
		//		hour: 'numeric',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
	};

	return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatToFDate(timestamp: number, locale = 'en'): FDate {
	if (typeof timestamp === 'undefined') return { timestamp: 0 };

	let date = new Date(timestamp * 1000);
	//sentryHub.captureMessage(SentryErrorType.LS_SERVER_DATA_UNDEFINED + ": startDate");

	//DateTimeFormatOptions
	// const options: any = {
	// 	//		minute: 'numeric',
	// 	//		hour: 'numeric',
	// 	day: 'numeric',
	// 	month: 'long',
	// 	year: 'numeric',

	// 	timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
	// };

	//let full = new Intl.DateTimeFormat(locale, options).format(date);

	const full = format(new Date(date), 'dd MMM yyyy', { locale: DATE_LOCALE });
	let short = new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
	}).format(date);

	let time = new Intl.DateTimeFormat(locale, {
		timeStyle: 'short',
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
	}).format(date);

	return { timestamp, full, short, time };
}
