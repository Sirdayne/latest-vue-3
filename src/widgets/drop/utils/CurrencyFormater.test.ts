import { expect, test } from 'vitest';

import type { Campaign } from '../DropModel';
import { createCurrencyFormatter } from './CurrencyFormatter';

import { campaign00 } from './CampaignMock';

test('formating to EUR', () => {
	let converer = createCurrencyFormatter({ code: 'EUR', decimal: 2 });
	let eurValue = converer.formatToEUR(100);
	expect(eurValue).toEqual('100 EUR');
});

test('formating to USD', () => {
	let converer = createCurrencyFormatter({ code: 'USD', decimal: 2 });
	let localValue = converer.formatToLocal(100);
	expect(localValue).toEqual('100 USD');
});

test('formating to SC', () => {
	let converer = createCurrencyFormatter({ code: 'SC', decimal: 2 });
	let localValue = converer.formatToShort(1160000);
	expect(localValue).toEqual('1.16M SC');
});
