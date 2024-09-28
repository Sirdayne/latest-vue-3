import { reactive, ref } from 'vue';
import type { ChallengeData, ChallengeState, Challenges, Challenge } from './ChallengeModel';
import { joinChallengeById } from '@/widgets/challenge/ChallengeService';

const autoJoinChallenge = (challenges: Challenge[]) => {
	const autoJoinChallenge = challenges.find((challenge) => challenge.auto_join);
	if (autoJoinChallenge) {
		joinChallengeById(String(autoJoinChallenge.id), autoJoinChallenge.join_code);
	}
};

let sendCommand: (name: string) => void;

export const isInited = ref(false);

export function setup(handler: (name: string) => void) {
	sendCommand = handler;

	if (!isInited.value) {
		isInited.value = true;
		sendCommand('inited');
	}
}

export const challengeState = reactive<ChallengeState>({
	challenges: {} as Challenges
});

export const upsertChallenge = (id: string, challenge: ChallengeData) => {
	challengeState.challenges[id] = challenge;
};

export const checkAutoJoins = (challenges: Challenge[]) => {
	const joinedToSomeChallenges = challenges.some((challenge) => challenge.player_active);
	if (!joinedToSomeChallenges && challenges && challenges.length > 0) {
		autoJoinChallenge(challenges);
	}
};

export const joinChallenge = () => {
	sendCommand('join_challenge_int');
};

export const closeLobby = () => {
	sendCommand('close_lobby');
};
