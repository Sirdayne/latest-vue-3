<script setup lang="ts">
import DropGeneralInformation from './DropGeneralInformation.vue';
import DropUserWins from './DropUserWins.vue';
import DropPrizePool from './DropPrizePool.vue';
import DropRules from './DropRules.vue';
import DropTopWins from './DropTopWins.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { IconDrops, IconMobileBack, IconMobileCross } from '@/components/icons';
import { router } from '@/router';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { skinManager, type Skin } from '../utils/SkinManager';
import { useMediaQuery } from '@vueuse/core';
import { DetailsStickyHeader, EmptyEventDetails } from '@/components/app';
import { isShowLocal, selectedCampaign, selectCampaign, isSocial, closeLobby } from '@/widgets/drop/DropFacade';

const { t } = useI18n();

function handleBack() {
	router.push(`/lobby/drop`);
	selectCampaign('');
}

let skin = ref<Skin>({ isReady: false });

const isStickyHeaderShow = ref(false);

const handleScroll = (e: Event) => {
	const target = e.currentTarget as HTMLElement;
	const scrollY = target.scrollTop;
	scrollY > 48 ? (isStickyHeaderShow.value = true) : (isStickyHeaderShow.value = false);
};

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');

watch(
	() => selectedCampaign.value,
	() => {
		if (selectedCampaign.value?.id) {
			skin = skinManager.getSkinInfo(selectedCampaign.value?.skin);
		}
	},
	{ immediate: true }
);
</script>

<template>
	<EmptyEventDetails v-if="!selectedCampaign" />
	<div
		v-else
		id="dropDetails"
		@scroll="handleScroll"
		class="h-full overflow-auto"
		:class="{ 'rounded-xl': !isSmallAndAbove }"
	>
		<div class="mb-4 flex h-fit flex-col">
			<DetailsStickyHeader
				v-show="isStickyHeaderShow"
				:handle-back="handleBack"
				:handle-close="closeLobby"
				:title="selectedCampaign.publicName"
			>
				<IconDrops class="text-yellow" />
			</DetailsStickyHeader>
			<div class="relative w-full">
				<template v-if="skin.isReady && skin?.skinHeaderImage">
					<!-- TODO add link on low quality image -->
					<!-- <img v-if="isLoading" class="h-auto w-full" src="@/assets/img/drop.png" alt="Drop Img" /> -->
					<img class="h-auto w-full" :src="skin?.url + '/' + skin?.skinHeaderImage" alt="Drop Img" />
				</template>
				<template v-if="!skin.isReady">
					<img class="h-auto w-full" src="@/assets/img/drop.png" alt="Drop Img" />
				</template>

				<IconMobileBack
					class="absolute left-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="handleBack"
				/>
				<IconMobileCross
					class="absolute right-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="closeLobby"
				/>
				<Badge
					variant="large"
					class="absolute left-1/2 top-full flex translate-x-[-50%] translate-y-[-50%] items-center justify-center gap-2 rounded-full px-4 py-1"
				>
					<IconDrops />
					<span class="text-13 font-medium uppercase">{{ t('drop.title') }}</span>
				</Badge>
			</div>
			<h1 class="mt-6 text-center font-cairo text-24 font-bold text-white">
				{{ selectedCampaign.publicName }}
			</h1>

			<DropGeneralInformation :campaign="selectedCampaign" :skin="skin" />
			<DropUserWins :campaign="selectedCampaign" :is-show-local="isShowLocal" />
			<DropPrizePool :campaign="selectedCampaign" :skin="skin" :is-show-local="isShowLocal" />
			<DropRules v-if="!isSocial" :campaign="selectedCampaign" :skin="skin" />
			<DropTopWins :campaign="selectedCampaign" :skin="skin" />
		</div>
	</div>
</template>
