<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { DetailsCard } from '@/components/ui/details-card';
import { type Campaign, type PlayerWin } from '@/widgets/drop/DropModel';
import { useI18n } from 'vue-i18n';
import type { Skin } from '../utils/SkinManager';
import { computed, ref } from 'vue';

const { t } = useI18n();

const props = defineProps<{
	campaign: Campaign;
	skin: Skin;
}>();
const numWins = 5;
const isFull = ref(false);

const externalWinsInfo = computed(() => {
	return isFull.value ? props.campaign.externalWinsInfo : props.campaign.externalWinsInfo.slice(0, numWins);
});

function getFlagUrl(win: PlayerWin): string {
	let countryId = win.player?.country?.id || 'xx';
	let path = `https://dj5dzxqdiiulw.cloudfront.net/Jackpots/flags/${countryId?.toLocaleLowerCase()}.svg`;
	return path;
}

const toggleIsFull = () => (isFull.value = !isFull.value);
</script>
<template>
	<DetailsCard class="mb-5" v-if="campaign.externalWinsInfo && campaign.externalWinsInfo?.length > 0">
		<div class="flex w-full items-center justify-center">
			<h2 class="text-center font-cairo text-18 font-bold text-white">
				{{ t('drop.top_wins.title') }}
			</h2>
		</div>
		<div>
			<div class="flex items-center justify-between pb-2 text-10 font-medium text-gray-lightest">
				<p>
					{{ t('drop.top_wins.column_id') }} • {{ t('drop.top_wins.column_date') }} •
					{{ t('drop.top_wins.column_time') }}
				</p>
				<p>{{ t('drop.top_wins.column_prize') }}</p>
			</div>
			<div
				v-for="win in externalWinsInfo"
				:key="win.timestamp.timestamp"
				class="box-border flex items-center justify-between border-t border-white-10 pb-2 pt-2 text-13 text-white"
			>
				<div class="flex items-center gap-3 align-middle">
					<div class="w-3 items-center gap-1">
						<img class="h-3 w-3" :src="getFlagUrl(win)" :alt="win.player?.country?.name" />
					</div>
					<div>
						<span class="font-bold lowercase"
							>{{ t('drop.top_wins.column_id') }} {{ win.player?.nickname }}</span
						>
						<br />
						<span class="text-gray-lightest">{{ win.timestamp.short }} {{ win.timestamp.time }}</span>
					</div>
				</div>
				<div class="text-end font-bold">
					<span>{{ win.winCents.formattedInEUR }}</span>
				</div>
			</div>
		</div>
		<!-- <Button>{{ t('common.button.roll_up') }}</Button> -->

		<Button v-if="campaign.playerWinsInfo?.length > numWins" @click="toggleIsFull">{{
			isFull ? t('common.button.roll_up') : t('common.button.show_more')
		}}</Button>

		<img
			v-if="skin.isReady && skin?.bCoinsWonBlockIcon"
			:src="skin?.url + '/' + skin?.bCoinsWonBlockIcon"
			alt="PrizePool clock icon"
			class="absolute -left-4 -top-5 h-16 w-16"
		/>
	</DetailsCard>
</template>
