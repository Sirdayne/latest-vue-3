import type { LoyaltyProfile, LoyaltyProfileId } from '@/widgets/profile/ProfileModel';
import { APP_STORE } from '@/core/AppStore';
import ky from 'ky';

export function createProfileService(onResponse: Function) {
	const token = `Bearer ${APP_STORE?.loyalty_system_options?.token}`;
	const httpClient = ky.create({
		prefixUrl: APP_STORE?.lobby_options?.url,
		headers: { Authorization: token }
	});

	const fetchProfile = async () => {
		try {
			let profileId: LoyaltyProfileId;

			profileId = await httpClient.get('profile').json();

			const profile: LoyaltyProfile = await httpClient
				.get(`loyalty_profiles/${profileId.loyalty_uid}`)
				.json();

			if (profile) {
				profile.id = profileId.loyalty_uid;
				profile.tg_auth = profileId.settings.tg_auth;
				onResponse(profile);
			}
		} catch (err: any) {
			console.error('Profile Service error get data for Loalyty profile');
			//TODO send error to sentry
		}
	};

	let TIME_OUT = 60 * 1000;
	let interval: string | number | NodeJS.Timeout | undefined;
	let isPooling = false;

	const longPoolFetch = () => {
		if (isPooling) return;

		interval = setTimeout(async () => {
			await fetchProfile();
			longPoolFetch();
		}, TIME_OUT);
	};

	const stopPoolFetch = () => {
		clearTimeout(interval);
	};

	const fetchTelegramLink = async (handleLink: Function, profileToken: string) => {
		try {
			const { link } = await httpClient.get(`generate_tg_link/${profileToken}`).json<{ link: string }>();
			link ? handleLink(link) : console.error('telegram link not found');
		} catch (err) {
			console.error(err);
		}
	};

	return { fetchProfile, longPoolFetch, stopPoolFetch, fetchTelegramLink };
}
