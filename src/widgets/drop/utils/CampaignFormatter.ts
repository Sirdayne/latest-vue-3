import type { Campaign, Currency, PlayerCurrencyInfo } from '../DropModel';

import { optional, z } from 'zod';
import { fromError } from 'zod-validation-error';
import { formatToFDate } from './DateFormatter';
import { createCurrencyFormatter } from './CurrencyFormatter';
import { DropCampaignStatus, SubscriptionMode } from '../DropModel';

const DropCampaignStatusNative = z.nativeEnum(DropCampaignStatus).optional();
const SubscriptionModeNative = z.nativeEnum(SubscriptionMode).optional();

export const createCampaignFormatter = (playerCurrencyInfo: PlayerCurrencyInfo) => {
	let formatter = createCurrencyFormatter(playerCurrencyInfo);

	const DEFAULT_PLAYER_CURRENCY = { code: 'NONE', direct: '0.0', inverse: '0.0' };
	let playerCurrencyRate: Currency = DEFAULT_PLAYER_CURRENCY;

	const MoneySchema = z
		.number()
		.nonnegative()
		.optional()
		.or(z.null())
		.transform((value) => {
			if (!value) return null;

			let rate: number = parseFloat(playerCurrencyRate.direct);

			let local = formatter.formatToLocal(value / (rate * 100.0));
			let casino = playerCurrencyInfo.isSocial ? local : formatter.formatToEUR(value / 100.0);

			return {
				inCent: value,
				formattedInEUR: casino,
				formattedInLocal: local
			};
		})
		.default(0);

	const MoneyExtSchema = z
		.number()
		.nonnegative()
		.optional()
		.transform((value) => {
			if (!value) return null;

			let rate: number = parseFloat(playerCurrencyRate.direct);

			let local = formatter.formatToLocal(value / (rate * 100.0));
			let casino = playerCurrencyInfo.isSocial ? local : formatter.formatToEUR(value / 100.0);
			let short = playerCurrencyInfo.isSocial
				? formatter.formatToShort(value / (rate * 100.0), playerCurrencyInfo.code)
				: formatter.formatToShort(value / 100.0, 'EUR');

			return {
				inCent: value,
				formattedInEUR: casino,
				formattedShort: short,
				formattedInLocal: local
			};
		})
		.default(0);

	const DateSchema = z
		.number()
		.nonnegative()
		.optional()
		.transform((value) => (value ? formatToFDate(value) : null));

	const PrizeSchema = z.object({
		winCents: MoneySchema,
		timestamp: DateSchema,
		game: z.string().optional(),
		player: z
			.object({
				country: z
					.object({
						id: z.string().optional().or(z.null()),
						name: z.string().optional()
					})
					.optional(),
				nickname: z.string().optional()
			})
			.optional()
	});

	const PrizesSchema = z.array(PrizeSchema).optional();

	const CampaignSchema = z
		.object({
			id: z.string().uuid(),
			currences: z.any().optional(),
			startAt: DateSchema,
			endAt: DateSchema,
			updatedAt: z.number().int().positive().optional(),
			publicName: z.string().min(1).optional(),
			skin: z.string().min(1).optional(),
			status: DropCampaignStatusNative,
			minBetCents: MoneySchema,
			subscriptionMode: SubscriptionModeNative,
			participationFeePlan: z.string().optional().or(z.null()),
			participationFeeCents: MoneySchema,
			subscription: z
				.object({
					subscribed: z.boolean(),
					subscribedAt: z.number().int().positive().optional()
				})
				.optional(),
			prizePool: z
				.object({
					costSumCents: MoneyExtSchema,
					initialSum: z.number().int().nonnegative().default(0),
					leftSum: z.number().int().nonnegative().optional().default(0),
					prizes: z
						.array(
							z.object({
								costCents: MoneySchema,
								initial: z.number().int().nonnegative().optional(),
								left: z.number().int().nonnegative().optional()
							})
						)
						.optional()
				})
				.optional()
				.transform((ctx) => {
					if (!ctx) return null;
					let maxPrize = 0;
					if (ctx && ctx?.prizes) {
						maxPrize = ctx.prizes.reduce(
							(max: number, prize: any) => (max < prize.costCents.inCent ? prize.costCents.inCent : max),
							0
						);
					}

					return {
						...ctx,

						costMaxCents: MoneySchema.parse(maxPrize)
					};
				}),
			externalWinsInfo: PrizesSchema,
			playerWinsInfo: PrizesSchema,
			gameIdentifiers: z.array(z.string()).optional()
		})
		.transform((ctx) => {
			let ctxTrans;
			let playerWinSumSents = 0;
			if (ctx.playerWinsInfo && ctx.playerWinsInfo.length > 0) {
				playerWinSumSents = ctx.playerWinsInfo.reduce(
					(s, prize) => (s += prize.winCents ? prize.winCents.inCent : 0),
					0
				);
				ctxTrans = { ...ctx, playerWinSumSents: MoneySchema.parse(playerWinSumSents) };
			} else {
				ctxTrans = { ...ctx };
			}

			if (ctx.subscriptionMode && ctx.subscription) {
				if (ctx.subscriptionMode === SubscriptionMode.Auto) {
					ctx.subscription.subscribed = true;
				}
			}

			let ctxWithoutNull = Object.fromEntries(Object.entries(ctxTrans).filter(([_, v]) => v !== null));

			return {
				...ctxWithoutNull
			};
		});

	// const calcMaxPrize = (prizes: any) => {
	// 	let value = 0;
	// 	if (prizes) {
	// 		value = prizes.reduce(
	// 			(max: number, prize: any) => (max < prize.costCents.inCent ? prize.costCents.inCent : max),
	// 			0
	// 		);
	// 	}
	// 	return MoneySchema.safeParse(value).data;
	// };

	function calcPlayerCurrencyRate(campaign: Campaign): Currency {
		try {
			if (!campaign) return DEFAULT_PLAYER_CURRENCY;
			if (!campaign.currencies) return DEFAULT_PLAYER_CURRENCY;
			let playerCurrencyItem = campaign.currencies?.find(
				(item: Currency) => item.code === playerCurrencyInfo.code
			);

			if (!playerCurrencyItem) return DEFAULT_PLAYER_CURRENCY;

			return playerCurrencyItem as Currency;
		} catch {
			console.error('Can not find Player Currnecy');
			//console.info('Can not find Player Currnecy');
			return DEFAULT_PLAYER_CURRENCY;
		}
	}

	const formatFull = (campaign: any) => {
		playerCurrencyRate = calcPlayerCurrencyRate(campaign);
		let result = CampaignSchema.safeParse(campaign);

		if (result.success) {
			return result.data;
		} else {
			const validationError = fromError(result.error);
			console.error('CampingFormatter | formatFull:');
			console.error(validationError.toString());
			//console.error(campaign);

			return null;
		}
	};

	return { formatFull };
};
