<script lang="ts" setup>
import { IconChallenges, IconCheckFill } from '@/components/icons';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge/Badge.vue';
import { type Challenge } from '@/widgets/challenge/ChallengeModel';
import { Timer } from '@/components/app';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
	challenge: Challenge;
	playerActive: boolean;
	isEmpty?: boolean;
	status: string;
	action?: (id: string, oldStatus: string) => void;
}>();
</script>

<template>
	<Card class="mx-3 mb-4 overflow-hidden rounded-3xl border border-white-10 bg-gray-lighter">
		<CardHeader class="flex items-center border-b-0 border-l-0 border-t-0">
			<div class="relative w-full">
				<img src="@/assets/img/challenge.png" alt="Event" class="relative w-full" />
				<Badge
					class="absolute left-2 top-2 flex items-center justify-center gap-2 rounded-full bg-gray-lighter px-4 py-2 text-yellow"
				>
					<IconChallenges />
					<span class="text-12 font-normal md:text-20">{{ t('challenge.title') }}</span>
				</Badge>
			</div>
		</CardHeader>
		<CardContent class="rounded-b-3xl border-0 border-white-10 p-0">
			<div class="flex items-center gap-3 px-3 py-3">
				<IconCheckFill class="h-5 w-5 text-blue" :class="{ hidden: !playerActive }" />
				<h2 class="font-cairo text-20 font-bold">{{ challenge.name }}</h2>
			</div>
			<div class="flex px-3 pb-3">
				<div class="flex flex-grow rounded-lg border-b border-white-10 bg-black-30 p-4">
					<Timer
						:id="challenge.id"
						:status="status"
						:start_at="challenge.start_at"
						:finish_at="challenge.finish_at"
						:action="action"
					/>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
