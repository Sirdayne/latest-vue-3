<script lang="ts" setup>
import { type Campaign, DropCampaignStatus, FeePaticipationPlan } from '../DropModel';
import { Card } from '@/components/ui/card';
import { IconCheckFill, IconCheck } from '@/components/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Timer } from '@/components/app';
import { dropState } from '@/widgets/drop/DropFacade';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
	campaign: Campaign;
	isSubsribed: boolean;
	finished: boolean;
	isSelected: boolean;
	action?: (id: string, oldStatus: string) => void;
}>();

const route = useRoute();

//const isSelected = computed(() => route.params.id === props.campaign.id);

const status = computed(() => dropState.drops[props.campaign.id].status);

const statusText = computed(() => {
	switch (status.value) {
		case DropCampaignStatus.Ongoing:
			return t('common.event_status.active');
		case DropCampaignStatus.Promoting:
			return t('common.event_status.planned');
		default:
			return '';
	}
});
</script>

<template>
	<Card
		class="mx-4 mb-4 cursor-pointer gap-0 overflow-hidden border-t border-white-10 p-3 sm:mx-0 sm:mb-0 sm:rounded-none md:p-4 lg:p-5"
		:class="{
			'bg-gray-lighter': !isSelected,
			'bg-yellow text-black': isSelected,
			'bg-opacity-50': props.finished
		}"
	>
		<div class="flex items-center gap-3">
			<div class="flex flex-col gap-1">
				<h2
					class="text-14 font-bold md:text-16 lg:text-18"
					:class="{
						'opacity-50': props.finished
					}"
				>
					{{ campaign.publicName }}
				</h2>
				<div
					v-if="!props.finished"
					:class="{
						'text-12 uppercase md:text-13 lg:text-14': true,
						'text-white-50': !isSelected,
						'text-gray': isSelected
					}"
				>
					{{
						campaign.participationFeePlan === FeePaticipationPlan.Pro
							? t('drop.join.join_pro_badge')
							: t('drop.join.badge')
					}}
				</div>
				<div
					v-if="!props.finished"
					:class="{
						'inline-flex text-12 uppercase md:text-13 lg:text-14': true,
						'text-green': status === DropCampaignStatus.Ongoing && !isSelected,
						'text-violet': status === DropCampaignStatus.Promoting && !isSelected,
						'text-gray': isSelected
					}"
				>
					{{ statusText }}
				</div>
				<div
					class="text-12 md:text-13 lg:text-16"
					:class="{
						'text-gray': isSelected,
						'opacity-25': props.finished
					}"
				>
					<Timer
						:id="campaign.id"
						:status="status"
						:isCompactMode="true"
						:start_at="`${new Date(campaign.startAt.timestamp * 1000)}`"
						:finish_at="`${new Date(campaign.endAt.timestamp * 1000)}`"
						:action="action"
					/>
				</div>
			</div>
			<div class="item-end ml-auto w-auto self-start pr-2 pt-1">
				<IconCheckFill
					v-if="!isSelected && isSubsribed"
					class="h-5 w-5 text-blue"
					:class="{
						'text-gray': isSelected
					}"
				/>
				<IconCheck
					v-if="isSelected && isSubsribed"
					class="h-5 w-5 text-gray"
					:class="{
						'text-opacity-50': props.finished
					}"
				/>
			</div>
		</div>
	</Card>
</template>
