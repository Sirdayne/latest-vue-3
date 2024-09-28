<script lang="ts" setup>
import { ref, watch } from 'vue';
import DropListCards from './DropListCards.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import { router } from '@/router';
import EventsProfile from '@/widgets/profile/EventsProfile.vue';
import { APP_STORE } from '@/core/AppStore';
import { SOCIAL_LOCALE } from '@/constants/global';
import { EmptyEventList } from '@/components/app';
import {
	activeCampaigns,
	archiveCampaigns,
	selectCampaign,
	selectedCampaign,
	getFirstCampaignId,
	closeLobby
} from '@/widgets/drop/DropFacade';
import { IconMobileCross } from '@/components/icons';

defineProps<{
	isLargeScreen: boolean;
	type: string;
}>();

const { t } = useI18n();

const actualEvents = activeCampaigns;
const archivedEvents = archiveCampaigns;
const route = useRoute();

const isStickyHeaderShow = ref(false);

const handleScroll = (e: Event) => {
	const target = e.currentTarget as HTMLElement;
	const scrollY = target.scrollTop;
	scrollY > 48 ? (isStickyHeaderShow.value = true) : (isStickyHeaderShow.value = false);
};

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');

// Do not use watchEffect instead of watch (it triggers before router change)
watch(
	() => [route.path, isSmallAndAbove.value],
	() => {
		const id = route?.params?.id && route?.params?.id !== 'undefined' ? route?.params?.id : '';
		if (id) {
			selectCampaign(id as string);
		} else {
			if (isSmallAndAbove.value) {
				let autoId = getFirstCampaignId.value;
				if (autoId) {
					router.push(`/lobby/drop/${autoId}`);
					selectCampaign(autoId as string);
				}
			} else {
				router.push(`/lobby/drop`);
				selectCampaign('');
			}
		}
	},
	{ immediate: true }
);
</script>

<template>
	<div class="h-full w-full overflow-auto p-0" @scroll="handleScroll">
		<div class="flex h-fit min-h-full w-full flex-col items-center pb-16 sm:pb-0">
			<div
				v-if="!isSmallAndAbove"
				class="sticky top-0 z-[56] flex h-12 w-full items-center justify-center rounded-t-xl border-b border-white-10 bg-gray-lighter"
			>
				<div class="flex items-center justify-between gap-2">
					<h1 class="text-center font-cairo text-24 font-bold text-white">
						{{ t('drop.title') }}
					</h1>
				</div>
				<IconMobileCross
					class="absolute right-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="closeLobby"
				/>
			</div>
			<div v-if="APP_STORE.locale !== SOCIAL_LOCALE && !isSmallAndAbove" class="flex w-full">
				<EventsProfile class="mx-2 mb-0 mt-4 w-full py-2" />
			</div>
			<div
				class="w-full p-3 text-12 font-medium uppercase text-gray-lightest md:p-4 md:text-13 lg:p-5 lg:text-17"
			>
				{{ t('common.event_list.active_title') }}
			</div>
			<DropListCards
				v-if="actualEvents.length"
				:campaigns="actualEvents"
				:mode="isLargeScreen ? 'compact' : 'full'"
				:finished="false"
				:selectedCampaign="selectedCampaign"
			/>
			<div v-else class="flex w-full flex-1 justify-center pt-4 sm:pt-0">
				<EmptyEventList
					:isRounded="!isLargeScreen"
					:title="t('common.event_list.empty.title')"
					:subTitle="t('common.event_list.empty.sub_title')"
				/>
			</div>
			<div
				v-if="archivedEvents.length"
				class="w-full p-3 text-12 font-medium uppercase text-gray-lightest md:p-4 md:text-13 lg:p-5 lg:text-17"
			>
				{{ t('common.event_list.ended_title') }}
			</div>
			<DropListCards
				:campaigns="archivedEvents"
				:mode="'compact'"
				:finished="true"
				:selectedCampaign="selectedCampaign"
			/>
		</div>
	</div>
</template>
