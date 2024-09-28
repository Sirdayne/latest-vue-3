<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { DetailsCard } from '@/components/ui/details-card';
import { type Campaign } from '@/widgets/drop/DropModel';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
	campaign: Campaign;
	isShowLocal: boolean;
}>();

const numWins = 5;
const isFull = ref(false);

const playerWinsInfo = computed(() => {
	return isFull.value ? props.campaign.playerWinsInfo : props.campaign.playerWinsInfo.slice(0, numWins);
});

const separateCamalCase = (s: string) => {
	return s.replace(/([a-z])([A-Z])/g, '$1 $2');
};

const toggleIsFull = () => (isFull.value = !isFull.value);
</script>

<template>
	<DetailsCard :colored="true" v-if="campaign.playerWinSumSents?.inCent && campaign.playerWinSumSents?.inCent > 0">
		<div class="text-center font-cairo font-bold text-black">
			<p class="text-18">{{ t('drop.user_wins.title') }}</p>
			<p class="text-24">{{ campaign.playerWinSumSents?.formattedInEUR }}</p>
			<p v-if="isShowLocal" class="text-10 font-medium opacity-50">
				{{ campaign.playerWinSumSents?.formattedInLocal }}
			</p>
		</div>
		<div>
			<div class="flex items-center justify-between pb-2 text-10 font-medium uppercase text-black opacity-50">
				<p>{{ t('drop.user_wins.column_date') }} • {{ t('drop.user_wins.column_time') }}</p>
				<p>{{ t('drop.user_wins.column_value') }} • {{ t('drop.user_wins.column_game') }}</p>
			</div>
			<div
				v-for="win in playerWinsInfo"
				:key="win.timestamp.timestamp"
				class="box-border flex items-center justify-between border-t border-black-10 pb-2 pt-2 text-13 text-black"
			>
				<div>
					<p>{{ win.timestamp.short }}</p>
					<p>{{ win.timestamp.time }}</p>
				</div>
				<div class="text-end">
					<p class="font-bold">{{ win.winCents.formattedInEUR }}</p>
					<p v-if="isShowLocal" class="font-medium">{{ win.winCents.formattedInLocal }}</p>
					<p>{{ separateCamalCase(win.game) }}</p>
				</div>
			</div>
		</div>
		<Button v-if="campaign.playerWinsInfo?.length > numWins" @click="toggleIsFull" variant="ghost">{{
			isFull ? t('common.button.roll_up') : t('common.button.show_more')
		}}</Button>
	</DetailsCard>
</template>
