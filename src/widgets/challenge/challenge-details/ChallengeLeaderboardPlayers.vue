<script setup lang="ts">
import type { LeaderboardPlayer } from '@/widgets/challenge/ChallengeModel';
import ChallengeLeaderboardPlayer from '@/widgets/challenge/challenge-details/ChallengeLeaderboardPlayer.vue';

defineProps<{
	players: LeaderboardPlayer[];
	current: LeaderboardPlayer | undefined;
}>();
</script>

<template>
	<div
		v-for="player in players"
		class="-mx-2 flex gap-2.5 border-b border-black-10 px-2 py-1.5 text-black"
		:class="{ 'rounded bg-white': !!(current?.rank && player.rank === current.rank) }"
	>
		<ChallengeLeaderboardPlayer
			:player="current?.rank && player.rank === current.rank ? current : player"
			:is-current="!!(current?.rank && player.rank === current.rank)"
		/>
	</div>
</template>
