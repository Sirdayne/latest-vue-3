<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Popover from '@/components/ui/popover/Popover.vue';
import PopoverTrigger from '@/components/ui/popover/PopoverTrigger.vue';
import PopoverContent from '@/components/ui/popover/PopoverContent.vue';
import { IconCheck, IconMinBet, IconQuestion } from '@/components/icons';
import { DetailsCard } from '@/components/ui/details-card';
import { Timer } from '@/components/app';
import { type Campaign, DropCampaignStatus, FeePaticipationPlan, SubscriptionMode } from '@/widgets/drop/DropModel';

import { dropState, upsertDrop, isShowLocal, isSocial, sendJoinToCampaign } from '@/widgets/drop/DropFacade';
import type { ButtonVariants } from '@/components/ui/button';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import type { Skin } from '../utils/SkinManager';

const { t } = useI18n();

const props = defineProps<{
	campaign: Campaign;
	skin: Skin;
}>();

const status = computed(() => dropState.drops[props.campaign.id].status);

const invalidateData = (id: string, oldStatus: string) => {
	upsertDrop(id, { status: oldStatus === 'promoting' ? 'ongoing' : 'archived' });
};

const isNotSubscribed = computed(() => {
	if (!props.campaign) {
		return false;
	}

	if (props.campaign.status != DropCampaignStatus.Ongoing) return false;

	return !props.campaign?.subscription.subscribed;
});

const isFreePlane = computed(() => {
	return props.campaign?.participationFeePlan === FeePaticipationPlan.Free;
});

const joinBtnVariant = ref<ButtonVariants['variant']>('link');
const isPending = ref(false);

const joinToCampaign = () => {
	sendJoinToCampaign(props.campaign?.id);
	joinBtnVariant.value = 'processing';
	isPending.value = true;
	setTimeout(() => {
		joinBtnVariant.value = 'link';
		isPending.value = false;
	}, 1000);
};
</script>

<template>
	<template v-if="isNotSubscribed">
		<template v-if="isFreePlane">
			<div class="mx-4 mt-4">
				<Button :variant="joinBtnVariant" @click="joinToCampaign">{{
					isPending ? t('drop.join.loading') : t('drop.join.button')
				}}</Button>
			</div>
		</template>
		<DetailsCard v-else class="gap-0 py-3">
			<div class="text-center font-cairo text-16 font-bold text-white">
				{{ t('drop.join.join_pro_title') }} {{ campaign?.participationFeeCents?.formattedInLocal }}
			</div>
			<div class="mx-4 mt-4">
				<Button :variant="joinBtnVariant" @click="joinToCampaign">
					{{ isPending ? t('drop.join.loading') : t('drop.join.join_pro_button') }}
				</Button>
			</div>
		</DetailsCard>
	</template>

	<DetailsCard v-if="campaign.subscription.subscribed" class="py-3">
		<div class="flex w-full items-center gap-3">
			<IconCheck class="text-blue" />
			<span v-if="status === DropCampaignStatus.Archived">{{ t('drop.general.passive_player') }}</span>
			<span v-else >{{ t('drop.general.active_player') }}</span>
		</div>
	</DetailsCard>

	<DetailsCard class="gap-0 p-0 sm:border-2 sm:border-yellow">
		<div class="flex flex-grow border-b border-white-10 p-4">
			<Timer
				v-if="status !== DropCampaignStatus.Archived"
				:id="campaign.id"
				:status="status"
				:start_at="`${new Date(campaign.startAt.timestamp * 1000)}`"
				:finish_at="`${new Date(campaign.endAt.timestamp * 1000)}`"
				:action="invalidateData"
			/>
			<div v-else class="flex w-full items-center justify-center text-20 font-bold uppercase">
				{{ t('common.event_finished') }}
			</div>
		</div>

		<div class="relative flex justify-between">
			<div v-if="status !== DropCampaignStatus.Archived" class="flex w-full flex-col items-center p-4">
				<div class="font-cairo text-18 font-bold text-white">{{ campaign.prizePool.leftSum }}</div>
				<div class="text-14 uppercase text-gray-400">{{ t('drop.general.left') }}</div>
			</div>
			<div v-if="status !== DropCampaignStatus.Archived" class="absolute left-1/2 h-full w-px bg-white-10" />
			<div class="flex w-full flex-col items-center p-4">
				<div class="flex gap-1 font-cairo text-18 font-bold text-white">
					<span>{{ campaign.prizePool.costSumCents.formattedShort }}</span>
					<Popover>
						<PopoverTrigger><IconQuestion /></PopoverTrigger>
						<PopoverContent>
							<span>{{ campaign.prizePool.costSumCents.formattedInEUR }}</span>
						</PopoverContent>
					</Popover>
				</div>
				<div class="text-14 uppercase text-gray-400">{{ t('drop.general.prize_pool') }}</div>
			</div>
		</div>
		<img
			v-if="skin.isReady && skin?.generalInformationBlockLeftIcon"
			:src="skin?.url + '/' + skin?.generalInformationBlockLeftIcon"
			alt="PrizePool clock icon"
			class="absolute -left-4 -top-4 h-16 w-16"
		/>
	</DetailsCard>

	<DetailsCard v-if="campaign.minBetCents?.inCent" class="py-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-start text-gray-lightest">
				<IconMinBet />
				<p class="ml-3 whitespace-pre-wrap text-10 uppercase leading-multiline">
					{{ t('common.min_bet') }}
				</p>
			</div>
			<div>
				<p class="text-right font-cairo text-20 font-bold text-white">
					≥ {{ campaign.minBetCents?.formattedInEUR }}
				</p>
				<!-- <p v-if="APP_STORE?.currency !== 'EUR'" class="text-right text-10 leading-multiline text-gray-lightest">
					{{ campaign.minBetCents?.formattedInLocal }}
				</p> -->
				<p v-if="isShowLocal" class="text-right text-10 leading-multiline text-gray-lightest">
					{{ campaign.minBetCents?.formattedInLocal }}
				</p>
			</div>
		</div>
	</DetailsCard>

	<div class="mx-4 mt-4 flex items-center gap-4">
		<Button
			as="a"
			href="#dropRules"
			v-if="!isSocial"
			v-smooth-scroll="{ duration: 500, offset: -50, container: '#dropDetails' }"
			variant="link"
			>{{ t('drop.general.rules_button') }}</Button
		>
		<Button
			as="a"
			href="#dropPrizePool"
			v-smooth-scroll="{ duration: 500, offset: -50, container: '#dropDetails' }"
			variant="link"
			>{{ t('drop.general.prizes_button') }}</Button
		>
	</div>
</template>
