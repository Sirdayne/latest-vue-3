<script lang="ts" setup>
import { IconCheckFill, IconQuestion } from '@/components/icons';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge/Badge.vue';
import Popover from '@/components/ui/popover/Popover.vue';
import PopoverTrigger from '@/components/ui/popover/PopoverTrigger.vue';
import PopoverContent from '@/components/ui/popover/PopoverContent.vue';
import { type Campaign, FeePaticipationPlan } from '../DropModel';
import { Timer } from '@/components/app';
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import { skinManager, type Skin } from '../utils/SkinManager';

const { t } = useI18n();

const props = defineProps<{
	campaign: Campaign;
	playerActive: boolean;
	isEmpty?: boolean;
	action?: (id: string, oldStatus: string) => void;
}>();

let skin = ref<Skin>({ isReady: false });

onMounted(() => {
	skin.value = skinManager.getSkinInfo(props.campaign.skin).value;
	// console.info('DropList | SKIN NAME :' + props.campaign.skin);
	// console.table(skin);
});
</script>

<template>
	<Card class="mx-3 mb-4 overflow-hidden rounded-3xl border border-white-10 bg-gray-lighter">
		<CardHeader class="flex items-center border-b-0 border-l-0 border-t-0">
			<div class="relative w-full">
				<!-- <img src="@/assets/img/drop.png" alt="Event" class="relative w-full" /> -->

				<template v-if="skin.isReady">
					<img class="relative w-full" :src="skin?.url + '/' + skin?.skinHeaderImage" alt="Drop Img" />
				</template>

				<template v-if="!skin.isReady">
					<img src="@/assets/img/drop.png" alt="Event" class="relative w-full" />
				</template>

				<Badge
					class="absolute left-2 top-2 flex items-center justify-center gap-2 rounded-full bg-gray-lighter px-4 py-2 text-yellow"
				>
					<span class="text-12 font-normal uppercase md:text-20">{{
						campaign.participationFeePlan === FeePaticipationPlan.Pro
							? t('drop.join.join_pro_badge')
							: t('drop.join.badge')
					}}</span>
				</Badge>
			</div>
		</CardHeader>
		<CardContent class="rounded-b-3xl border-0 border-white-10 p-0">
			<div class="flex items-center gap-3 px-3 py-3">
				<IconCheckFill class="h-5 w-5 text-blue" :class="{ hidden: !playerActive }" />
				<h2 class="font-cairo text-20 font-bold">{{ campaign.publicName }}</h2>
			</div>
			<div class="flex justify-between gap-2.5 px-3 pb-3">
				<div
					class="flex w-full flex-col items-center gap-1 rounded-lg border-b border-white-10 bg-black-30 p-4"
				>
					<div class="text-10 font-medium uppercase text-white-50">
						{{ t('drop.general.prize_pool') }}
					</div>
					<div class="flex gap-1 font-cairo text-16 font-bold">
						<span>{{ campaign.prizePool.costSumCents.formattedShort }}</span>
						<Popover>
							<PopoverTrigger><IconQuestion /></PopoverTrigger>
							<PopoverContent>
								<span>{{ campaign.prizePool.costSumCents.formattedInEUR }}</span>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div class="flex w-full rounded-lg border-b border-white-10 bg-black-30 p-4">
					<Timer
						:id="campaign.id"
						:status="campaign.status"
						:start_at="`${new Date(campaign.startAt.timestamp * 1000)}`"
						:finish_at="`${new Date(campaign.endAt.timestamp * 1000)}`"
						:action="action"
					/>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
