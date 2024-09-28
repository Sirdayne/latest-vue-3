<script setup lang="ts">
import { DetailsCard } from '@/components/ui/details-card';
import { type Campaign } from '@/widgets/drop/DropModel';
import { useI18n } from 'vue-i18n';
import type { Skin } from '../utils/SkinManager';

const { t } = useI18n();

defineProps<{
	campaign: Campaign;
	skin: Skin;
	isShowLocal: boolean;
}>();
</script>

<template>
	<DetailsCard id="dropPrizePool">
		<div class="flex w-full items-center justify-center">
			<h2 class="text-center font-cairo text-18 font-bold text-white">
				{{ t('drop.prize_pool.title') }}
			</h2>
		</div>
		<div>
			<div class="flex items-center justify-between pb-2 text-10 font-medium uppercase text-gray-lightest">
				<p>{{ t('drop.prize_pool.column_prizes') }}</p>
				<p>{{ t('drop.prize_pool.column_left') }}</p>
			</div>
			<div
				v-for="prize in campaign?.prizePool.prizes"
				:key="prize.costCents.inCent"
				class="box-border flex items-center justify-between border-t border-white-10 pb-2 pt-2 text-13 text-white"
			>
				<div>
					<p>{{ prize.costCents.formattedInEUR }}</p>
					<p v-if="isShowLocal" class="text-gray-lightest">{{ prize.costCents.formattedInLocal }}</p>
				</div>
				<div class="text-end font-bold">
					<span>{{ prize.left }}</span>
					<span class="text-gray-lightest">/{{ prize.initial }}</span>
				</div>
			</div>
		</div>
		<!-- <img src="@/assets/img/imageClock.png" alt="PrizePool clock icon" class="absolute -left-4 -top-4 h-16 w-16" /> -->
		<img
			v-if="skin.isReady && skin?.bCoinsValueBlockIcon"
			:src="skin?.url + '/' + skin?.bCoinsValueBlockIcon"
			alt="PrizePool clock icon"
			class="absolute -right-4 -top-4 h-16 w-16"
		/>
	</DetailsCard>
</template>
