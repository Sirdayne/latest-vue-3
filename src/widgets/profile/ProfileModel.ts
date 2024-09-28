interface LoyaltyProfileSettings {
	tg_auth: boolean;
}

export interface LoyaltyProfileId {
	loyalty_uid: string;
	settings: LoyaltyProfileSettings;
}
export enum PrivilegeType {
	BigWins = 'big_wins',
	P2PChallenges = 'p2p_challenges',
	MysteryBox = 'mystery_box'
}

export enum RewardType {
	LevelUpPoints = 'level_up_points'
}

export interface LoyaltyPrivileges {
	created_at: string;
	description: string;
	id: number;
	level: number;
	points?: number;
	privilege_type?: PrivilegeType;
	reward_type?: RewardType;
	title: string;
	update_at: string;
}

export interface LoyaltyProfile {
	id: string;
	current_level: number;
	current_points: number;
	initial_level_points: number;
	points_for_next_level: number;
	progress: number;
	uid: string;
	profile_connected: boolean;
	tg_auth: boolean;
	current_privileges: readonly LoyaltyPrivileges[] | readonly [];
	next_privileges: readonly LoyaltyPrivileges[] | readonly [];
}
