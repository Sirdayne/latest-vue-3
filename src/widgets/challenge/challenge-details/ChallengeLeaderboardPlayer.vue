<script setup lang="ts">
import { IconEye, IconEyeSlash } from '@/components/icons';
import type { LeaderboardPlayer } from '@/widgets/challenge/ChallengeModel';
import { computed, ref } from 'vue';

const props = defineProps<{
	isCurrent: boolean;
	player: LeaderboardPlayer;
}>();

const isCode = ref(false);

const playerCode = computed(() => (isCode.value ? props?.player?.code : props?.player?.code.slice(0, -4) + '****'));
</script>

<template>
	<div class="w-5 text-center text-13 font-bold">
		{{ player && player.rank ? player.rank : '-' }}
	</div>
	<div class="flex flex-1 text-13">
		<div v-if="isCurrent" class="flex cursor-pointer items-center gap-2" @click="isCode = !isCode">
			<span>{{ playerCode }}</span>
			<IconEye v-if="isCode" />
			<IconEyeSlash v-else />
		</div>
		<div v-else>{{ player.code }}</div>
	</div>
	<div class="text-right text-13 font-bold">
		{{ player.max_multiplier }}
	</div>
</template>
