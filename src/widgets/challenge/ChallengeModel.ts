interface PrizePlace {
	place: number;
	place_prize_amount: number;
}

export enum FeatureCondition {
	Allowed = 'allowed',
	DeniedBuy = 'denied_buy',
	OnlyFeature = 'only_feature'
}

export enum PrizeDeliveryType {
	Auto = 'auto',
	Manual = 'manual'
}

export enum StatusChallengeDetails {
	Ongoing = 'ongoing',
	Planned = 'planned',
	Sync = 'result_calculating',
	Finished = 'finished'
}

export interface Challenge {
	id: number;
	name: string;
	start_at: string; //ISO 8601 date time format
	finish_at: string; //ISO 8601 date time format
	player_active: boolean;
	auto_join: boolean;
	join_code: string;
	game_identifiers: string[];
}

export interface ChallengeLists {
	active: Challenge[];
	planned: Challenge[];
	finished: Challenge[];
}

export interface ChallengeDetails {
	id: number;
	name: string;
	organizer: string;
	description: string;
	auto_join: boolean;
	game_identifiers: string[];
	feature_condition: FeatureCondition;
	spin_limit: number;
	player_active: boolean;
	min_bet: number; // in euro
	min_bet_in_player_currency: string; // in users currency (value + currency)
	join_code: string; // 5 character string
	status: string;
	start_at: string; // ISO 8601 datetime format
	finish_at: string; // ISO 8601 datetime format
	prize_delivery_type: PrizeDeliveryType;
	prize_places: PrizePlace[];
	rules: string[];
}

export interface Leaderboard {
	challenge_code: number;
	challenge_synchronized: boolean;
	code: string;
	max_multiplier: number;
	rank: number;
	total_participants_count: number;
	current_player: LeaderboardPlayer;
	top: LeaderboardPlayer[];
}

export interface LeaderboardPlayer {
	rank: number;
	code: string;
	max_multiplier: number;
	spin_count: number;
}

export interface ChallengeData {
	status: string;
}

export interface Challenges {
	[key: string]: ChallengeData;
}

export interface ChallengeState {
	challenges: Challenges;
}
