<script setup lang="ts">
import { IconLoading, IconClose } from '@/components/icons';
import { DetailsCard } from '@/components/ui/details-card';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import type { LeaderboardPlayer } from '@/widgets/challenge/ChallengeModel';
import Pagination from '@/components/ui/pagination/Pagination.vue';
import { router } from '@/router';
import { useChallengeLeaderboardFull } from '@/widgets/challenge/useChallengeLeaderboardFull';
import { useI18n } from 'vue-i18n';
import ChallengeLeaderboardPlayers from '@/widgets/challenge/challenge-details/ChallengeLeaderboardPlayers.vue';
import ChallengeLeaderboardPlayer from '@/widgets/challenge/challenge-details/ChallengeLeaderboardPlayer.vue';
import ChallengeLeaderboardEmpty from '@/widgets/challenge/challenge-details/ChallengeLeaderboardEmpty.vue';

const { t } = useI18n();

const route = useRoute();
const challengeId = computed(() => route.params.id);

const page = ref(1);

const { isLoading, error, data } = useChallengeLeaderboardFull(page);

const routeToChallenge = () => {
	router.push(`/lobby/challenge/${challengeId.value}`);
};

const isCurrentPlayer = computed(() => {
	const players = data?.value?.top as LeaderboardPlayer[];
	const current = data?.value?.current_player as LeaderboardPlayer;
	const found = players.find((player) => player.rank === current?.rank);
	return current && !found;
});
</script>

<template>
	<div class="flex h-full flex-col overflow-auto">
		<DetailsCard :colored="true" class="mb-1 grow">
			<div class="relative flex h-full w-full flex-col">
				<IconClose class="absolute -right-1 -top-1 cursor-pointer text-gray" @click="routeToChallenge" />
				<h2 class="text-center font-cairo text-18 font-bold text-black">
					{{ t('challenge.leaderboard.title_full') }}
				</h2>
				<!-- <div v-if="isLoading" class="flex min-h-20 w-full flex-1 items-center justify-center">
					<IconLoading :isSecondary="true" />
				</div> -->
				<!-- <div v-else-if="error || !data" class="flex w-full flex-1 justify-center pt-4 sm:pt-0">
					<ChallengeLeaderboardEmpty />
				</div> -->
				<!-- <div v-else class="mt-5"> -->
				<div v-if="!isLoading && data" class="mt-5">
					<div class="-mx-2 flex gap-2.5 border-b border-black-10 px-2 py-1.5 opacity-50">
						<div class="w-5 text-center text-10 uppercase text-black">
							{{ t('challenge.leaderboard.column_rank') }}
						</div>
						<div class="flex-1 text-10 uppercase text-black">
							{{ t('challenge.leaderboard.column_id') }}
						</div>
						<div class="text-right text-10 uppercase text-black">
							{{ t('challenge.leaderboard.column_result') }}
						</div>
					</div>
					<ChallengeLeaderboardPlayers
						:players="data.top"
						:current="data.current_player"
					></ChallengeLeaderboardPlayers>
					<div v-if="isCurrentPlayer" class="-mt-1 flex items-center justify-center pb-1 text-black">...</div>
					<div v-if="isCurrentPlayer" class="-mx-2 flex rounded bg-white px-2 py-1 text-black">
						<ChallengeLeaderboardPlayer
							:is-current="true"
							:player="data.current_player"
						></ChallengeLeaderboardPlayer>
					</div>
					<Pagination
						class="my-5"
						:total="data.total_participants_count"
						v-model:page="page"
						:per-page="100"
					></Pagination>
				</div>
			</div>
		</DetailsCard>
	</div>
</template>
