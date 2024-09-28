<script lang="ts" setup>
import ChallengeListCard from '@/widgets/challenge/challenge-list/ChallengeListCard.vue';
import ChallengeListCardCompact from '@/widgets/challenge/challenge-list/ChallengeListCardCompact.vue';
import { router } from '@/router';
import type { Challenge } from '@/widgets/challenge/ChallengeModel';
import { queryClient } from '@/core/AppStore';
import { upsertChallenge } from '../ChallengeFacade';

const props = defineProps<{
	challenges: Challenge[];
	mode: 'full' | 'compact';
	status: string;
}>();

const routeToEvent = (challenge: Challenge) => {
	router.push(`/lobby/challenge/${challenge.id}`);
};

const invalidateData = (id: string, oldStatus: string) => {
	if (props.mode === 'compact') {
		upsertChallenge(id, { status: oldStatus === 'planned' ? 'ongoing' : 'finished' });
		setTimeout(() => {
			queryClient.invalidateQueries({ queryKey: ['challenges'] });
		}, 3000);
	}
};
</script>

<template>
	<div class="flex w-full flex-col">
		<div v-for="challenge in props.challenges" :key="challenge.id" @click="routeToEvent(challenge)">
			<template v-if="mode === 'full'">
				<ChallengeListCard
					:playerActive="challenge.player_active"
					:challenge="challenge"
					:action="invalidateData"
					:status="status"
				/>
			</template>
			<template v-if="mode === 'compact'">
				<ChallengeListCardCompact
					:playerActive="challenge.player_active"
					:challenge="challenge"
					:status="status"
					:action="invalidateData"
				/>
			</template>
		</div>
	</div>
</template>
