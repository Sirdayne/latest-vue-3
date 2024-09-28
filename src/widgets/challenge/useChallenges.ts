import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { getChallenges } from '@/widgets/challenge/ChallengeService';
import { upsertChallenge } from './ChallengeFacade';
import { checkAutoJoins } from '@/widgets/challenge/ChallengeFacade';
import { APP_STORE } from '@/core/AppStore';

export const useChallenges = () => {
	return useQuery({
		queryKey: ['challenges'],
		queryFn: () => getChallenges(),
		select: (lists) => {
			lists.active = lists.active
				.filter((i) => i.game_identifiers.includes(APP_STORE?.identifier))
				.map((i) => {
					upsertChallenge(`${i.id}`, { status: 'ongoing' });
					return i;
				});
			lists.planned = lists.planned
				.filter((i) => i.game_identifiers.includes(APP_STORE?.identifier))
				.map((i) => {
					upsertChallenge(`${i.id}`, { status: 'planned' });
					return i;
				});
			lists.finished = lists.finished
				.filter((i) => i.game_identifiers.includes(APP_STORE?.identifier))
				.map((i) => {
					upsertChallenge(`${i.id}`, { status: 'finished' });
					return i;
				});
			checkAutoJoins(lists.active);

			return lists;
		},
		refetchInterval: 30 * 1000,
		placeholderData: keepPreviousData
	});
};
