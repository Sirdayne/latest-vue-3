import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { getChallengeLeaderboard } from '@/widgets/challenge/ChallengeService';
import { computed, type Ref } from 'vue';
import { useRoute } from 'vue-router';

export const useChallengeLeaderboardFull = (page: Ref) => {
	const route = useRoute();
	const challengeId = computed(() => route.params.id);

	return useQuery({
		queryKey: ['challengeLeaderboardFull', challengeId, page],
		queryFn: () => getChallengeLeaderboard(challengeId.value as string, page.value),
		refetchInterval: 30 * 1000,
		enabled: !!challengeId.value,
		placeholderData: keepPreviousData
	});
};
