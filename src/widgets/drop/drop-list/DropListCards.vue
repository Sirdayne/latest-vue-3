<script lang="ts" setup>
import { type Campaign } from '../DropModel';
import { selectCampaign } from '../DropFacade';
import DropListCardCompact from './DropListCardCompact.vue';
import DropListCard from './DropListCard.vue';
import { upsertDrop } from '@/widgets/drop/DropFacade';
import { router } from '@/router';

const props = defineProps<{
	campaigns: Campaign[];
	selectedCampaign: Campaign | undefined;
	mode: 'full' | 'compact';
	finished: boolean;
}>();

const routeToEvent = (campaign: Campaign) => {
	// console.log('DropListCard | routeToEvent ' + campaign.id);
	router.push(`/lobby/drop/${campaign?.id}`);
	selectCampaign(campaign.id);
};

const invalidateData = (id: string, oldStatus: string) => {
	if (props.mode === 'compact') {
		upsertDrop(id, { status: oldStatus === 'promoting' ? 'ongoing' : 'archived' });
	}
	//TODO: нужно ли тут вызвать лист компаний принудительно?
};
</script>

<template>
	<div class="flex w-full flex-col">
		<div v-for="campaign in props.campaigns" :key="campaign.id" @click="routeToEvent(campaign)">
			<template v-if="mode === 'full'">
				<DropListCard
					:playerActive="campaign.subscription.subscribed"
					:campaign="campaign"
					:action="invalidateData"
				/>
			</template>
			<template v-if="mode === 'compact'">
				<DropListCardCompact
					:isSubsribed="campaign.subscription.subscribed"
					:campaign="campaign"
					:finished="finished"
					:action="invalidateData"
					:isSelected="campaign.id === selectedCampaign?.id"
				/>
			</template>
		</div>
	</div>
</template>
