import { ref, reactive, readonly } from 'vue';
import type { LoyaltyProfile } from './ProfileModel';
import { createProfileService } from './ProfileService';

export const _profile = reactive<LoyaltyProfile>({
	id: '',
	current_level: 0,
	current_points: 0,
	initial_level_points: 0,
	points_for_next_level: 0,
	progress: 0,
	uid: '',
	profile_connected: false,
	tg_auth: false,
	current_privileges: [],
	next_privileges: []
});

export const isPendingTelegramAuth = ref(false);

export const profile: LoyaltyProfile = readonly(_profile);

export const isLoading = ref(false);

let service: any;

function onResponse(data: LoyaltyProfile) {
	Object.assign(_profile, data);
	isLoading.value = false;
}

export const setup = () => {
	service = createProfileService(onResponse);

	runProfileFetching();
};

export const runProfileFetching = () => {
	//long pooling
	isLoading.value = true;
	service.fetchProfile();
	service.longPoolFetch();
};

function handleLinkTelegram(link: string) {
	isPendingTelegramAuth.value = true;

	window.open(link, '_blank');

	setTimeout(() => {
		isPendingTelegramAuth.value = false;
	}, 60 * 1000);
}

export const redirectTelegram = () => {
	service.fetchTelegramLink(handleLinkTelegram, profile.uid);
};
