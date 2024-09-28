export interface PlayerCurrencyInfo {
	code: string;
	decimal: number;
	isSocial?: boolean;
}

export interface DropParams {
	websocketUrl: string;
	playerId: string;
	playerCurrencyInfo: PlayerCurrencyInfo;
	locale: string;
}

export interface Currency {
	direct: string;
	inverse: string;
	name?: string;
	code?: string;
}

export interface Prize {
	costCents: Money;
	left: number;
	initial: number;
}

export interface Player {
	id?: string;
	nickname?: string;
	country?: {
		id?: string | null;
		name: string | 'Unknown';
	};
}

export interface PlayerWin {
	game: string;
	timestamp: FDate;

	winCents: Money;
	player?: Player;
}

export enum DropCampaignStatus {
	Ongoing = 'ongoing',
	Promoting = 'promoting',
	Archived = 'archived',
	Draft = 'draft',
	BeforePromotion = 'before_promotion',
	Finalizing = 'finalizing',
	ShowingResults = 'showing_results',
	Paused = 'paused'
}

export enum SubscriptionMode {
	Auto = 'auto',
	Manual = 'manual'
}

export enum FeePaticipationPlan {
	Pro = 'pro',
	Free = 'free'
}

export interface Subscription {
	subscribed: boolean;
	subscribedAt: number;
}

export interface Campaign {
	id: string;
	currencies?: Currency[];
	playerCurrency: Currency;
	startAt: FDate;
	//	startAtFormatted?: string;
	endAt: FDate;
	//	endAtFormatted?: string;
	//for internal using
	updatedAt: number;
	status: DropCampaignStatus;
	publicName: string;
	skin: string;
	subscriptionMode?: SubscriptionMode;
	//payment_mode
	participationFeePlan?: FeePaticipationPlan;
	participationFeeCents?: Money;
	minBetCents?: Money;
	prizePool: {
		costSumCents: Money;
		costMaxCents: Money;
		leftSum?: 99;
		initialSum?: 100;
		prizes?: Prize[];
	};
	subscription: Subscription;
	playerWinsInfo: PlayerWin[];
	playerWinSumSents?: Money;
	externalWinsInfo: PlayerWin[];
	gameIdentifiers: string[];
}

export interface Money {
	inCent: number;
	formattedInEUR: string;
	formattedShort?: string;
	formattedInLocal: string;
}
export interface FDate {
	timestamp: number;
	full?: string;
	short?: string;
	time?: string;
}

export interface DropData {
	status: string;
}

export interface Drops {
	[key: string]: DropData;
}

export interface DropState {
	drops: Drops;
}
