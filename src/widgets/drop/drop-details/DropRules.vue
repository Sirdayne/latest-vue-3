<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
import DropRuleIcon from './DropRuleIcon.vue';
import { DetailsCard } from '@/components/ui/details-card';
import { type Campaign } from '@/widgets/drop/DropModel';
import { useI18n } from 'vue-i18n';
import type { Skin } from '../utils/SkinManager';

const { t } = useI18n();

defineProps<{
	campaign: Campaign;
	skin: Skin;
}>();

interface Rule {
	iconType: string;
	text: string;
}

const rulesList = computed(() => {
	const list: Rule[] = [];

	list.push({ iconType: 'IconPrize', text: t('drop.rules.spin') });
	list.push({ iconType: 'IconGear', text: t('drop.rules.rtp') });
	list.push({ iconType: 'IconStar', text: t('drop.rules.bet') });
	list.push({ iconType: 'IconList', text: t('drop.rules.goal') });

	return list;
});

const isFull = ref(false);
const toggleIsFull = () => (isFull.value = !isFull.value);
</script>

<template>
	<DetailsCard id="dropRules">
		<div class="flex w-full items-center justify-center">
			<h2 class="text-center font-cairo text-18 font-bold text-white">
				{{ t('drop.rules.title') }}
			</h2>
		</div>
		<div class="flex flex-col gap-4">
			<div v-for="{ iconType, text } in rulesList" class="flex items-start justify-start gap-4 text-13">
				<DropRuleIcon :iconType="iconType" />
				<p class="flex-1 leading-multiline">{{ text }}</p>
			</div>
		</div>
		<div class="flex flex-col gap-6 text-13 leading-multiline text-white" :class="{ hidden: !isFull }">
			<div class="flex flex-col gap-4">
				<p class="font-bold">{{ t('drop.rules.details.title') }}</p>
				<p>
					{{
						t('drop.rules.details.description', {
							name: campaign?.publicName,
							from: campaign?.startAt.full,
							to: campaign?.endAt.full
						})
					}}
				</p>
				<p>{{ t('drop.rules.details.agreement') }}</p>
			</div>
			<div class="flex flex-col gap-4">
				<p class="font-bold">{{ t('drop.rules.details.summary.title') }}:</p>
				<ul class="list-disc pl-6">
					<li>
						{{
							t('drop.rules.details.summary.total', {
								value: campaign.prizePool ? campaign.prizePool?.costSumCents.formattedInEUR : ''
							})
						}}
					</li>
					<li>
						{{
							t('drop.rules.details.summary.max', {
								value: campaign.prizePool.costMaxCents
									? campaign.prizePool?.costMaxCents.formattedInEUR
									: ''
							})
						}}
					</li>
					<li>
						{{
							t('drop.rules.details.summary.amount', {
								value: campaign?.prizePool.initialSum
							})
						}}
					</li>
					<li>{{ t('drop.rules.details.summary.delay') }}</li>
				</ul>
			</div>
			<div class="flex flex-col gap-4">
				<p class="font-bold">{{ t('drop.rules.details.conditions.title') }}:</p>
				<ul class="list-decimal pl-6">
					<li>{{ t('drop.rules.details.conditions.join') }}</li>
					<li>{{ t('drop.rules.details.conditions.spin') }}</li>
					<li>{{ t('drop.rules.details.conditions.bet') }}</li>
					<li>{{ t('drop.rules.details.conditions.player') }}</li>
					<li>{{ t('drop.rules.details.conditions.limit') }}</li>
					<li>{{ t('drop.rules.details.conditions.free') }}</li>
				</ul>
			</div>
			<div class="flex flex-col gap-4">
				<p class="font-bold">{{ t('drop.rules.details.prizes.title') }}</p>
				<div>
					<p>{{ t('drop.rules.details.prizes.amount') }}:</p>
					<ul class="list-disc pl-6">
						<li v-for="prize in campaign?.prizePool.prizes">
							{{ prize.initial }} - {{ prize.costCents.formattedInEUR }} ({{
								prize.costCents.formattedInLocal
							}})
						</li>
					</ul>
				</div>
			</div>
		</div>
		<Button @click="toggleIsFull">{{ isFull ? t('common.button.roll_up') : t('common.button.show_more') }}</Button>
		<!-- <img
			src="@/assets/img/imageShamrock.png"
			alt="Rules shamrock icon"
			class="absolute -right-4 -top-4 h-16 w-16"
		/> -->

		<img
			v-if="skin.isReady && skin?.rulesBlockIcon"
			:src="skin?.url + '/' + skin?.rulesBlockIcon"
			alt="PrizePool clock icon"
			class="absolute -left-4 -top-4 h-16 w-16"
		/>
	</DetailsCard>
</template>
