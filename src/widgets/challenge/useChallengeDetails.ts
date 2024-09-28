import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { getChallengeById } from '@/widgets/challenge/ChallengeService';
import { StatusChallengeDetails } from './ChallengeModel';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const useChallengeDetails = () => {
	const route = useRoute();
	const challengeId = computed(() => route.params.id);

	return useQuery({
		queryKey: ['challengeDetails', challengeId],
		queryFn: () => getChallengeById((challengeId.value || '') as string),
		enabled: !!(challengeId.value || ''),
		select: (challenge) => {
			const now = new Date();
			return {
				...challenge,
				status:
					new Date(challenge.start_at) > now
						? StatusChallengeDetails.Planned
						: now < new Date(challenge.finish_at)
							? StatusChallengeDetails.Ongoing
							: challenge.status
			};
		},
		refetchInterval: 30 * 1000,
		placeholderData: keepPreviousData
	});
};
