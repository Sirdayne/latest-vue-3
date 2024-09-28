<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import ChallengeGeneralInformation from '@/widgets/challenge/challenge-details/ChallengeGeneralInformation.vue';
import ChallengeLeaderboard from '@/widgets/challenge/challenge-details/ChallengeLeaderboard.vue';
import ChallengePlayerCode from './ChallengePlayerCode.vue';
import ChallengeRules from './ChallengeRules.vue';
// import ChallengeParticipatingGames from './ChallengeParticipatingGames.vue';
import { IconChallenges, IconMobileBack, IconMobileCross, IconLoading } from '@/components/icons';
import { useChallengeDetails } from '@/widgets/challenge/useChallengeDetails';
import { useChallengeLeaderboard } from '@/widgets/challenge/useChallengeLeaderboard';
import { router } from '@/router';
import { useI18n } from 'vue-i18n';
import { DetailsStickyHeader, EmptyEventDetails } from '@/components/app';
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { closeLobby } from '@/widgets/challenge/ChallengeFacade';
// import { APP_STORE } from '@/core/AppStore';
import { DetailsCard } from '@/components/ui/details-card';
import { EmptyEventList } from '@/components/app';

const { t } = useI18n();

const { isLoading: isDetailsLoading, error: detailsError, data: challengeDetails } = useChallengeDetails();
const { isLoading: isLeaderboardLoading, error: leaderboardError, data: leaderboard } = useChallengeLeaderboard();

function handleBack() {
	router.push(`/lobby/challenge`);
}
const isStickyHeaderShow = ref(false);

const handleScroll = (e: Event) => {
	const target = e.currentTarget as HTMLElement;
	const scrollY = target.scrollTop;
	scrollY > 48 ? (isStickyHeaderShow.value = true) : (isStickyHeaderShow.value = false);
};

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');
</script>

<template>
	<!-- <div v-if="isDetailsLoading || isLeaderboardLoading">
		<div class="mb-4 flex h-fit flex-col">
			<div class="relative w-full">
				<div class="relative min-h-36">
					<img class="h-auto w-full" src="@/assets/img/challenge.png" alt="Challenge Img" />
					<div class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-lighter">
						<IconLoading />
					</div>
				</div>
				<IconMobileBack
					class="absolute left-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="handleBack"
				/>
				<IconMobileCross
					class="absolute right-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="closeLobby"
				/>
			</div>
			<DetailsCard class="h-12"></DetailsCard>
			<DetailsCard class="h-12"></DetailsCard>
			<DetailsCard class="h-32"></DetailsCard>
			<div class="flex gap-3">
				<DetailsCard class="mr-0 h-12 w-full"></DetailsCard>
				<DetailsCard class="ml-0 h-12 w-full"></DetailsCard>
			</div>
			<DetailsCard class="h-80"></DetailsCard>
		</div>
	</div> -->
	<!-- <div v-else-if="detailsError || leaderboardError">
		<div class="mb-4 flex h-fit flex-col">
			<div class="relative w-full">
				<div class="relative min-h-36">
					<img class="h-auto w-full" src="@/assets/img/challenge.png" alt="Challenge Img" />
					<div
						class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-lighter"
					></div>
				</div>
				<IconMobileBack
					class="absolute left-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="handleBack"
				/>
				<IconMobileCross
					class="absolute right-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="closeLobby"
				/>
			</div>
			<div class="mx-auto my-4 flex w-full justify-center">
				<EmptyEventList
					:isRounded="true"
					:title="t('common.error.details_title')"
					:subTitle="t('common.error.sub_title')"
				/>
			</div>
		</div>
	</div> -->
	<!-- <EmptyEventDetails v-else-if="!challengeDetails || !leaderboard" /> -->
	<EmptyEventDetails v-if="!challengeDetails || !leaderboard" />
	<div
		v-else
		id="challengeDetails"
		@scroll="handleScroll"
		:class="{ 'rounded-xl': !isSmallAndAbove }"
		class="h-full overflow-auto"
	>
		<div class="mb-4 flex h-fit flex-col">
			<DetailsStickyHeader
				v-show="isStickyHeaderShow"
				:handle-back="handleBack"
				:handle-close="closeLobby"
				:title="challengeDetails?.name"
			>
				<IconChallenges class="text-yellow" />
			</DetailsStickyHeader>
			<div class="relative w-full">
				<img class="h-auto w-full" src="@/assets/img/challenge.png" alt="Challenge Img" />
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
					<IconChallenges />
					<span class="text-13 font-medium uppercase">{{ t('challenge.title') }}</span>
				</Badge>
			</div>
			<h1 class="mt-6 text-center font-cairo text-24 font-bold text-white">
				{{ challengeDetails?.name }}
			</h1>
			<ChallengeGeneralInformation :challenge="challengeDetails" :leaderboard="leaderboard" />
			<ChallengeLeaderboard />
			<!-- <ChallengeParticipatingGames v-if="APP_STORE?.lobby_options?.show_game_list" /> -->
			<ChallengeRules :challenge="challengeDetails" />
			<ChallengePlayerCode
				v-if="leaderboard.current_player?.code"
				:player_code="leaderboard.current_player.code"
			/>
		</div>
	</div>
</template>
