<script lang="ts" setup>
import { Card } from '@/components/ui/card';
import { IconCheckFill, IconCheck } from '@/components/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { StatusChallengeDetails, type Challenge } from '@/widgets/challenge/ChallengeModel';
import { Timer } from '@/components/app';
import { challengeState } from '../ChallengeFacade';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
	challenge: Challenge;
	playerActive: boolean;
	status: string;
	action?: (id: string, oldStatus: string) => void;
}>();

const route = useRoute();

const isSelected = computed(() => Number(route.params.id) === props.challenge.id);

const statusText = computed(() => {
	switch (props.status) {
		case 'ongoing':
			return t('common.event_status.active');
		case 'planned':
			return t('common.event_status.planned');
		default:
			return '';
	}
});
</script>

<template>
	<Card
		class="mx-4 mb-4 cursor-pointer gap-0 overflow-hidden border-t border-white-10 p-3 sm:mx-0 sm:mb-0 sm:rounded-none"
		:class="{
			'bg-gray-lighter': !isSelected,
			'bg-yellow text-black': isSelected,
			'bg-opacity-50': status === 'finished'
		}"
	>
		<div class="flex items-center gap-3">
			<div class="flex flex-col gap-1">
				<h2
					class="text-14 font-bold md:text-16 lg:text-18"
					:class="{
						'opacity-50': status === 'finished'
					}"
				>
					{{ challenge.name }}
				</h2>
				<div
					v-if="status !== 'finished'"
					:class="{
						'text-12 uppercase md:text-13 lg:text-14': true,
						'text-green': status === StatusChallengeDetails.Ongoing && !isSelected,
						'text-violet': status === StatusChallengeDetails.Planned && !isSelected,
						'text-gray': isSelected
					}"
				>
					{{ statusText }}
				</div>
				<div
					class="text-12 md:text-13 lg:text-16"
					:class="{
						'text-gray': isSelected,
						'opacity-25': status === 'finished'
					}"
				>
					<Timer
						:id="challenge.id"
						:status="status"
						:isCompactMode="true"
						:start_at="challenge.start_at"
						:finish_at="challenge.finish_at"
						:action="action"
					/>
				</div>
			</div>
			<div class="item-end ml-auto w-auto self-start pr-2 pt-1">
				<IconCheckFill
					v-if="!isSelected && playerActive"
					class="h-5 w-5 text-blue"
					:class="{
						'text-gray': isSelected
					}"
				/>
				<IconCheck
					v-if="isSelected && playerActive"
					class="h-5 w-5 text-gray"
					:class="{
						'text-opacity-50': status === 'finished'
					}"
				/>
			</div>
		</div>
	</Card>
</template>
