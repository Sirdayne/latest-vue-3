import { expect, test } from 'vitest';
import { createCampaignFormatter } from './CampaignFormatter';

import { campaign_update, campaign00, campaign_subscribe, campaign_auto_subscribe } from './CampaignMock';
import { DropCampaignStatus } from '../DropModel';

// test('campaign list element', () => {
// 	let converer = createCampaignFormatter({ code: 'EUR', decimal: 1 });
// 	let camp0 = converer.formatFull(campaign_head);
// });

test('update status', () => {
	let converer = createCampaignFormatter({ code: 'EUR', decimal: 2 });
	let camp = converer.formatFull(campaign_update);

	// console.info(camp);
	expect(camp!.id).toEqual('d08f7e36-f13c-4b4d-bd2c-0ced79dadfe4');
	expect(camp!.status).toEqual(DropCampaignStatus.Ongoing);
	expect(camp!.updatedAt).toEqual(1722522334);

	//formattedInEUR
});

test('update subscription', () => {
	let converer = createCampaignFormatter({ code: 'EUR', decimal: 2 });
	let camp = converer.formatFull(campaign_subscribe);

	expect(camp!.id).toEqual('d08f7e36-f13c-4b4d-bd2c-0ced79dadfe4');
});

test('reset auto subscription', () => {
	let converer = createCampaignFormatter({ code: 'EUR', decimal: 2 });
	let camp = converer.formatFull(campaign_auto_subscribe);

	expect(camp?.subscription.subscribed).toEqual(true);
});

test('campaing formating', () => {
	let converer = createCampaignFormatter({ code: 'USD', decimal: 2 });
	let camp = converer.formatFull(campaign00);
	if (!camp) {
		return;
	}

	expect(camp.id).toEqual('c592531f-af96-49a0-a429-f7540169725e');

	expect(camp.minBetCents).toEqual({ inCent: 100, formattedInEUR: '1 EUR', formattedInLocal: '0.9 USD' });

	expect(camp.status).toEqual('ongoing');
	expect(camp.publicName).toEqual('Test00');
	expect(camp.skin).toEqual('default');
	expect(camp.subscriptionMode).toEqual('auto');
	expect(camp!.subscription!.subscribed).toEqual(true);
	expect(camp!.subscription!.subscribedAt).toEqual(1721301866);
	expect(camp!.prizePool!.costSumCents).toEqual({
		inCent: 66600,
		formattedInEUR: '666 EUR',
		formattedInLocal: '599.4 USD',
		formattedShort: '666 EUR'
	});
	expect(camp!.prizePool!.costMaxCents).toEqual({
		inCent: 66600,
		formattedInEUR: '666 EUR',
		formattedInLocal: '599.4 USD'
	});

	expect(camp!.prizePool.prizes ? camp.prizePool.prizes[0].costCents : 0).toEqual({
		inCent: 66600,
		formattedInEUR: '666 EUR',
		formattedInLocal: '599.4 USD'
	});
	//expect(camp00.startAt).toEqual(1721827660);
	//expect(camp00.startAtFormatted).toEqual('July 24, 2024');
	expect(camp.startAt).toEqual({
		timestamp: 1721827660,
		//		full: 'July 24, 2024',
		full: '24 Jul 2024',
		short: '7/24/2024',
		time: '3:27:40 PM GMT+2'
	});

	expect(camp.playerWinsInfo ? camp.playerWinsInfo[0].winCents : 0).toEqual({
		inCent: 10000,
		formattedInEUR: '100 EUR',
		formattedInLocal: '90 USD'
	});

	//expect(camp00.playerWinsInfo[0].dateFormatted).toEqual('July 24, 2024');

	expect(camp.externalWinsInfo ? camp.externalWinsInfo[0].winCents : 0).toEqual({
		inCent: 20000,
		formattedInEUR: '200 EUR',
		formattedInLocal: '180 USD'
	});

	expect(camp.externalWinsInfo ? camp.externalWinsInfo[0].timestamp : 0).toEqual({
		timestamp: 1721827660,
		full: '24 Jul 2024',

		short: '7/24/2024',
		time: '3:27:40 PM GMT+2'
	});

	expect(camp.playerWinSumSents).toEqual({
		inCent: 30000,
		formattedInEUR: '300 EUR',
		formattedInLocal: '270 USD'
	});
});
