import { APP_STORE } from '@/core/AppStore';
import type { ChallengeDetails, ChallengeLists, Leaderboard } from './ChallengeModel';

const getChallengeHost = () => {
	const data = APP_STORE?.challenge_options?.data;
	const salt = APP_STORE?.challenge_options?.salt;
	const host = APP_STORE?.challenge_options?.data_hub_url;
	const slug = 'api/v1/lobby/';
	return { data, salt, host, slug };
};

const getChallengeEndpoint = (endpoint: string) => {
	const { data, salt, host, slug } = getChallengeHost();
	return `${host}${slug}${endpoint}?data=${data}&salt=${salt}`;
};

const getChallengePagination = (endpoint: string, page: number = 1, per_page: number = 100) => {
	const { data, salt, host, slug } = getChallengeHost();
	return `${host}${slug}${endpoint}?data=${data}&salt=${salt}&page=${page}&per_page=${per_page}`;
};

export const getChallenges = async (): Promise<ChallengeLists> => {
	const endpoint = 'challenges';
	const url = getChallengeEndpoint(endpoint);
	return await fetch(url).then((response) => response.json().then((data) => data.data));
};

export const getChallengeLeaderboard = async (id: string, page: number = 1): Promise<Leaderboard> => {
	const endpoint = `challenges/${id}/leaderboard`;
	const url = getChallengePagination(endpoint, page);
	return await fetch(url).then((response) => response.json().then((data) => data.data));
};

export const getChallengeById = async (id: string): Promise<ChallengeDetails> => {
	const endpoint = `challenges/${id}`;
	const url = getChallengeEndpoint(endpoint);
	return await fetch(url).then((response) => response.json());
};

export const joinChallengeById = async (id: string, join_code: string) => {
	const endpoint = `challenges/${id}/join`;
	const url = getChallengeEndpoint(endpoint);
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ join_code })
	})
		.then(async (response) => {
			const data = await response.json();

			if (response.ok) {
				return data;
			} else {
				throw { status: response.status, message: data.error || 'Unknown error occurred' };
			}
		})
		.catch((err) => {
			throw { status: err.status, message: err.message || 'Network error occurred' };
		});
};
