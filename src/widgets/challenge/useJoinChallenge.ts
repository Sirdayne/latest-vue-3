import { useMutation } from '@tanstack/vue-query';
import { joinChallengeById } from '@/widgets/challenge/ChallengeService';
import { queryClient } from '@/core/AppStore';
import { joinChallenge } from '@/widgets/challenge/ChallengeFacade';

interface JoinChallengeParams {
	id: string;
	join_code: string;
}

export const useJoinChallenge = () => {
	return useMutation({
		mutationKey: ['joinChallenge'],
		mutationFn: ({ id, join_code }: JoinChallengeParams) => joinChallengeById(id, join_code),
		onSuccess: () => {
			joinChallenge();
			queryClient.invalidateQueries({ queryKey: ['challenges'] });
			queryClient.invalidateQueries({ queryKey: ['challengeDetails'] });
			queryClient.invalidateQueries({ queryKey: ['challengeLeaderboard'] });
			queryClient.invalidateQueries({ queryKey: ['challengeLeaderboardFull'] });
		},
		onError: (error: any) => {
			status: error.status;
			message: error.message || 'An unknown error occurred';
		}
	});
};
