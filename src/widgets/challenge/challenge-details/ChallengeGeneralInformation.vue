<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { IconCheck, IconMinBet, IconSpinLight, IconAlert } from '@/components/icons';
import { DetailsCard } from '@/components/ui/details-card';
import { StatusChallengeDetails, type ChallengeDetails, type Leaderboard } from '@/widgets/challenge/ChallengeModel';
import { Timer } from '@/components/app';
import { APP_STORE, queryClient } from '@/core/AppStore';
import { challengeState, upsertChallenge } from '../ChallengeFacade';
import { computed } from 'vue';
import ChallengeJoinCode from '@/widgets/challenge/challenge-details/ChallengeJoinCode.vue';
import { useI18n } from 'vue-i18n';
import { SOCIAL_LOCALE } from '@/constants/global';

const { t } = useI18n();

const props = defineProps<{
	challenge: ChallengeDetails;
	leaderboard: Leaderboard;
}>();

const status = computed(() => challengeState.challenges[props.challenge.id]?.status);

const invalidateData = (id: string, oldStatus: string) => {
	upsertChallenge(id, { status: oldStatus === 'planned' ? 'ongoing' : 'finished' });
	setTimeout(() => {
		queryClient.invalidateQueries({ queryKey: ['challenges'] });
		queryClient.invalidateQueries({ queryKey: ['challengeDetails'] });
		queryClient.invalidateQueries({ queryKey: ['challengeLeaderboard'] });
	}, 3000);
};

const spinsLeft = computed(() =>
	props.leaderboard.current_player ? props.challenge.spin_limit - props.leaderboard.current_player.spin_count : 0
);
</script>

<template>
	<DetailsCard v-if="challenge.player_active" class="py-3">
		<div class="flex w-full items-center gap-3">
			<IconCheck class="text-blue" />
			
			<span v-if="challenge.status === StatusChallengeDetails.Finished"  >{{ t('challenge.general.passive_player') }}</span>
			<span v-else  >{{ t('challenge.general.active_player') }}</span>


		</div>
	</DetailsCard>
	<DetailsCard v-if="challenge.spin_limit && challenge.player_active && !spinsLeft" class="py-3">
		<div class="flex w-full items-center gap-3 whitespace-pre-wrap text-orange">
			<IconAlert />
			<span>{{ t('challenge.general.limit_message') }}</span>
		</div>
	</DetailsCard>
	<div v-if="!challenge.player_active && status !== 'finished'">
		<ChallengeJoinCode />
	</div>
	<DetailsCard class="gap-0 p-0">
		<div class="relative flex justify-between">
			<div
				v-if="challenge.spin_limit && challenge.player_active"
				class="flex w-full flex-col items-center gap-1 p-4"
			>
				<div class="font-cairo text-20 font-bold text-white">
					{{ spinsLeft }}
				</div>
				<div class="text-10 uppercase text-gray-400">{{ t('challenge.general.left') }}</div>
			</div>
			<div
				v-if="challenge.spin_limit && challenge.player_active"
				class="absolute left-1/2 h-full w-px bg-white-10"
			/>
			<div class="flex w-full flex-col items-center p-4">
				<Timer
					v-if="status !== StatusChallengeDetails.Finished"
					:id="challenge.id"
					:status="status"
					:start_at="challenge.start_at"
					:finish_at="challenge.finish_at"
					:action="invalidateData"
				/>
				<div v-else>
					<div class="flex items-center justify-center text-20 font-bold uppercase">
						{{ t('common.event_finished') }}
					</div>
					<div
						v-if="challenge.status === StatusChallengeDetails.Sync"
						class="mt-2 flex items-center justify-center text-10 font-medium uppercase text-white-50"
					>
						{{ t('challenge.general.sync_message') }}
					</div>
				</div>
			</div>
		</div>
	</DetailsCard>
	<div v-if="status !== StatusChallengeDetails.Finished">
		<DetailsCard v-if="challenge.min_bet" class="py-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-start text-gray-lightest">
					<IconMinBet />
					<p class="ml-3 whitespace-pre-wrap text-10 uppercase leading-multiline">
						{{ t('common.min_bet') }}
					</p>
				</div>
				<div>
					<p
						v-if="APP_STORE?.locale === SOCIAL_LOCALE"
						class="text-right font-cairo text-20 font-bold text-white"
					>
						≥ {{ challenge.min_bet.toFixed(2) }} {{ APP_STORE?.currency }}
					</p>
					<p v-else class="text-right font-cairo text-20 font-bold text-white">
						≥ {{ challenge.min_bet.toFixed(2) }} EUR
					</p>
					<p
						v-if="APP_STORE?.locale !== SOCIAL_LOCALE && APP_STORE?.currency !== 'EUR'"
						class="text-right text-10 leading-multiline text-gray-lightest"
					>
						{{ challenge.min_bet_in_player_currency }}
					</p>
				</div>
			</div>
		</DetailsCard>
		<DetailsCard v-if="challenge.spin_limit" class="py-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-start text-gray-lightest">
					<IconSpinLight />
					<p class="ml-3 whitespace-pre-wrap text-10 uppercase leading-multiline">
						{{ t('challenge.general.spin_limit') }}
					</p>
				</div>
				<div>
					<p class="text-right font-cairo text-20 font-bold text-white">{{ challenge.spin_limit }}</p>
				</div>
			</div>
		</DetailsCard>
	</div>
	<div class="mx-4 mt-4 flex items-center gap-4">
		<Button
			as="a"
			href="#challengeRules"
			v-smooth-scroll="{ duration: 500, offset: -50, container: '#challengeDetails' }"
			variant="link"
			>{{ t('challenge.general.rules_button') }}</Button
		>
	</div>
</template>
