import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { getChallengeLeaderboard } from '@/widgets/challenge/ChallengeService';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export const useChallengeLeaderboard = () => {
	const route = useRoute();
	const challengeId = computed(() => route.params.id);

	return useQuery({
		queryKey: ['challengeLeaderboard', challengeId],
		queryFn: () => getChallengeLeaderboard((challengeId.value || '') as string),
		refetchInterval: 30 * 1000,
		enabled: !!(challengeId.value || ''),
		placeholderData: keepPreviousData
	});
};
