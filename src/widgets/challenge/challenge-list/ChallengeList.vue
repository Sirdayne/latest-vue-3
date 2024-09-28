<script lang="ts" setup>
import ChallengeListCards from '@/widgets/challenge/challenge-list/ChallengeListCards.vue';
import { EmptyEventList } from '@/components/app';
import { useChallenges } from '@/widgets/challenge/useChallenges';
import { useI18n } from 'vue-i18n';
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import { router } from '@/router';
import EventsProfile from '@/widgets/profile/EventsProfile.vue';
import { APP_STORE } from '@/core/AppStore';
import { SOCIAL_LOCALE } from '@/constants/global';
import { closeLobby } from '@/widgets/challenge/ChallengeFacade';
import { IconMobileCross, IconLoading } from '@/components/icons';

defineProps<{
	isLargeScreen: boolean;
}>();

const { t } = useI18n();
const route = useRoute();
const isSmallAndAbove = useMediaQuery('(min-width: 568px)');
const isActiveChallenge = computed(() => route.path.includes('/lobby/challenge'));
const { isLoading, error, data: challenges } = useChallenges();

watchEffect(() => {
	if (!route.params.id && isSmallAndAbove.value) {
		if (
			isActiveChallenge.value &&
			challenges &&
			(challenges.value?.active.length || challenges.value?.planned.length || challenges.value?.finished.length)
		) {
			const firstChallengeId =
				challenges.value.active?.[0]?.id ||
				challenges.value.planned?.[0]?.id ||
				challenges.value.finished?.[0]?.id ||
				null;
			if (firstChallengeId) {
				router.push(`/lobby/challenge/${firstChallengeId}`);
			}
		}
	}
});

const isStickyHeaderShow = ref(false);

const handleScroll = (e: Event) => {
	const target = e.currentTarget as HTMLElement;
	const scrollY = target.scrollTop;
	scrollY > 48 ? (isStickyHeaderShow.value = true) : (isStickyHeaderShow.value = false);
};
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
						{{ t('challenge.title') }}
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
			<!-- <div v-if="isLoading" class="flex w-full flex-1 items-center justify-center"><IconLoading /></div> -->
			<!-- <div v-else-if="error" class="flex w-full flex-1 justify-center pt-4 sm:pt-0">
				<EmptyEventList
					:isRounded="!isLargeScreen"
					:title="t('common.error.list_title')"
					:subTitle="t('common.error.sub_title')"
				/>
			</div> -->
			<!-- <div v-else class="flex w-full flex-col"> -->
			<div v-if="!isLoading && challenges" class="flex w-full flex-col">
				<div
					class="w-full p-3 text-12 font-medium uppercase text-gray-lightest md:p-4 md:text-13 lg:p-5 lg:text-17"
				>
					{{ t('common.event_list.active_title') }}
				</div>
				<ChallengeListCards
					:challenges="challenges!.active"
					:mode="isLargeScreen ? 'compact' : 'full'"
					status="ongoing"
				/>
				<ChallengeListCards
					:challenges="challenges!.planned"
					:mode="isLargeScreen ? 'compact' : 'full'"
					status="planned"
				/>
				<div
					v-if="!challenges?.active?.length && !challenges?.planned?.length"
					class="flex w-full flex-1 justify-center pt-4 sm:pt-0"
				>
					<EmptyEventList
						:isRounded="!isLargeScreen"
						:title="t('common.event_list.empty.title')"
						:subTitle="t('common.event_list.empty.sub_title')"
					/>
				</div>
				<div
					v-if="challenges!.finished.length"
					class="w-full p-3 text-12 font-medium uppercase text-gray-lightest md:p-4 md:text-13 lg:p-5 lg:text-17"
				>
					{{ t('common.event_list.ended_title') }}
				</div>
				<ChallengeListCards :challenges="challenges!.finished" :mode="'compact'" status="finished" />
			</div>
			<div v-else class="flex w-full flex-1 justify-center pt-4 sm:pt-0">
				<EmptyEventList
					:isRounded="!isLargeScreen"
					:title="t('common.event_list.empty.title')"
					:subTitle="t('common.event_list.empty.sub_title')"
				/>
			</div>
		</div>
	</div>
</template>
