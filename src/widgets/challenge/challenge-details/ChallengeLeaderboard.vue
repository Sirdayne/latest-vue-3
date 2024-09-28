<script setup lang="ts">
import ChallengeLeaderboardPlayers from '@/widgets/challenge/challenge-details/ChallengeLeaderboardPlayers.vue';
import ChallengeLeaderboardPlayer from '@/widgets/challenge/challenge-details/ChallengeLeaderboardPlayer.vue';
import Button from '@/components/ui/button/Button.vue';
import { DetailsCard } from '@/components/ui/details-card';
import { useChallengeLeaderboard } from '@/widgets/challenge/useChallengeLeaderboard';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const route = useRoute();
const challengeId = computed(() => route.params.id);
const perPage = 100;

const { isLoading, data } = useChallengeLeaderboard();

const routeToLeaderboard = () => {
	router.push(`/lobby/challenge/${challengeId.value}/leaderboard`);
};
</script>

<template>
	<DetailsCard :colored="true" class="gap-3">
		<h2 class="text-center font-cairo text-18 font-bold text-black">{{ t('challenge.leaderboard.title') }}</h2>
		<div v-if="!isLoading && data && data.total_participants_count > 0">
			<div class="-mx-2 flex gap-2.5 border-b border-black-10 px-2 py-1.5 opacity-50">
				<div class="w-5 text-center text-10 uppercase text-black">
					{{ t('challenge.leaderboard.column_rank') }}
				</div>
				<div class="flex-1 text-10 uppercase text-black">{{ t('challenge.leaderboard.column_id') }}</div>
				<div class="text-right text-10 uppercase text-black">
					{{ t('challenge.leaderboard.column_result') }}
				</div>
			</div>
			<ChallengeLeaderboardPlayers
				:players="data.top"
				:current="data.current_player"
			></ChallengeLeaderboardPlayers>
		</div>
		<div v-else class="mb-2 text-center text-13 text-black">
			{{ t('challenge.leaderboard.no_data') }}
		</div>
		<div
			v-if="
				(data && data?.current_player?.rank && data.current_player.rank > perPage) ||
				(data && data?.current_player?.rank === null)
			"
		>
			<div class="-mt-1 flex items-center justify-center pb-1 text-black">...</div>
			<div class="-mx-2 rounded bg-white px-2 py-1">
				<div class="pb-1 text-10 uppercase text-black opacity-50">
					{{ t('challenge.leaderboard.title_player') }}
				</div>
				<div class="flex gap-2.5 border-t border-black-10 py-1 text-black">
					<ChallengeLeaderboardPlayer
						:is-current="true"
						:player="data.current_player"
					></ChallengeLeaderboardPlayer>
				</div>
			</div>
		</div>
		<Button v-if="data && data.total_participants_count > perPage" variant="ghost" @click="routeToLeaderboard">{{
			t('challenge.leaderboard.button')
		}}</Button>
	</DetailsCard>
</template>
