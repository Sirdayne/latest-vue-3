<script setup lang="ts">
import EventsProfile from '@/widgets/profile/EventsProfile.vue';
import { IconDrops, IconChallenges, IconClose, IconLoyalty, IconParticipation } from '@/components/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { APP_STORE } from '@/core/AppStore';
import { SOCIAL_LOCALE } from '@/constants/global';
import { useMediaQuery } from '@vueuse/core';
import { closeLobby } from '@/widgets/challenge/ChallengeFacade';
import Navigation from '@/components/navigation/Navigation.vue';

const { t } = useI18n();
const route = useRoute();
const isActiveDrop = computed(() => route.path.includes('/lobby/drop'));
const isActiveChallenge = computed(() => route.path.includes('/lobby/challenge'));
const isActiveProfile = computed(() => route.path.includes('/lobby/profile'));
const isActiveGames = computed(() => route.path.includes('/lobby/games'));
const isDetails = computed(() => !!route.params.id);
const isRootPage = computed(() => !route.params.id);

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');

const isXS = useMediaQuery('(max-width: 568px)');
const isMD = useMediaQuery('(min-width: 568px) and (max-width: 964px)');
const isLG = useMediaQuery('(min-width: 964px)');

const isDetailHidden = computed(() => {
	if (isSmallAndAbove.value) {
		return false;
	} else {
		return isRootPage.value;
	}
});

const props = defineProps<{
	isActivePath: string;
}>();
</script>

<template>
	<template v-if="isXS">
		<div class="flex h-full flex-col bg-gray">
			<div class="flex h-full w-full min-w-80 gap-0 text-white">
				<slot></slot>
			</div>
		</div>
		<Navigation v-if="isXS && isRootPage" :is-active-path="isActivePath" :variant="'bottom'"></Navigation>
	</template>

	<template v-if="isLG">
		<div class="flex h-full rounded-xl border border-white-10">
			<Navigation :is-active-path="isActivePath" :variant="'left'"></Navigation>
			<div class="flex w-full flex-col">
				<div
					v-if="isSmallAndAbove || (!isSmallAndAbove && !isDetails)"
					class="relative z-[55] flex w-full flex-col-reverse border-b border-white-10 bg-gray sm:flex-row sm:justify-between"
				>
					<div v-if="isActiveDrop" class="flex items-center gap-2 pl-5 text-yellow">
						<IconDrops class="h-6 w-6" />
						<h1 class="text-center font-cairo text-20 font-bold lg:text-22">
							{{ t('drop.title') }}
						</h1>
					</div>
					<div v-else-if="isActiveChallenge" class="flex items-center gap-2 pl-5 text-yellow">
						<IconChallenges class="h-6 w-6" />
						<h1 class="text-center font-cairo text-20 font-bold lg:text-22">
							{{ t('challenge.title') }}
						</h1>
					</div>
					<div v-else-if="isActiveProfile" class="flex items-center gap-2 pl-5 text-yellow">
						<IconLoyalty class="h-6 w-6" />
						<h1 class="text-center font-cairo text-20 font-bold lg:text-22">
							{{ t('profile.title') }}
						</h1>
					</div>
					<div v-else-if="isActiveGames" class="flex items-center gap-2 pl-5 text-yellow">
						<IconParticipation class="h-6 w-6" />
						<h1 class="text-center font-cairo text-20 font-bold lg:text-22">
							{{ t('games.title') }}
						</h1>
					</div>
					<div class="flex items-center">
						<EventsProfile v-if="APP_STORE.locale !== SOCIAL_LOCALE && isSmallAndAbove" />
						<div class="flex size-14 items-center justify-center border-l border-white-10">
							<IconClose @click="closeLobby" class="size-4 cursor-pointer text-white" />
						</div>
					</div>
				</div>

				<div class="flex h-full w-full min-w-80 gap-0 overflow-hidden bg-gray text-white">
					<slot></slot>
				</div>
			</div>
		</div>
	</template>

	<template v-if="isMD">
		<div class="flex h-full bg-gray">
			<div class="flex w-full flex-col">
				<div
					v-if="isSmallAndAbove || (!isSmallAndAbove && !isDetails)"
					class="relative z-[55] flex w-full flex-col-reverse border-b border-white-10 bg-gray sm:flex-row sm:justify-between"
				>
					<div v-if="isActiveDrop" class="flex items-center gap-2 pl-5 text-yellow">
						<IconDrops class="h-6 w-6" />
						<h1 class="text-center font-cairo text-18 font-bold">
							{{ t('drop.title') }}
						</h1>
					</div>
					<div v-else-if="isActiveChallenge" class="flex items-center gap-2 pl-5 text-yellow">
						<IconChallenges class="h-6 w-6" />
						<h1 class="text-center font-cairo text-18 font-bold">
							{{ t('challenge.title') }}
						</h1>
					</div>
					<div v-else-if="isActiveProfile" class="flex items-center gap-2 pl-5 text-yellow">
						<IconLoyalty class="h-6 w-6" />
						<h1 class="text-center font-cairo text-18 font-bold">
							{{ t('profile.title') }}
						</h1>
					</div>
					<div v-else-if="isActiveGames" class="flex items-center gap-2 pl-5 text-yellow">
						<IconParticipation class="h-6 w-6" />
						<h1 class="text-center font-cairo text-18 font-bold">
							{{ t('games.title') }}
						</h1>
					</div>
					<EventsProfile v-if="APP_STORE.locale !== SOCIAL_LOCALE && isSmallAndAbove" />
				</div>

				<!-- <div class="flex h-full w-full min-w-80 gap-0  text-white"> -->
				<div class="flex h-full w-full min-w-80 gap-0 overflow-hidden bg-gray text-white">
					<slot></slot>
				</div>
			</div>
			<Navigation :is-active-path="isActivePath" :variant="'right'">
				<div class="flex max-h-20 w-full flex-1 items-center justify-center border-b border-white-10">
					<IconClose @click="closeLobby" class="size-5 cursor-pointer text-white" />
				</div>
			</Navigation>
		</div>
	</template>
</template>
