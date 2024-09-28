<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import ChallengeRuleIcon from './ChallengeRuleIcon.vue';
import { DetailsCard } from '@/components/ui/details-card';
import { FeatureCondition, type ChallengeDetails } from '@/widgets/challenge/ChallengeModel';
import { APP_STORE } from '@/core/AppStore';
import { useI18n } from 'vue-i18n';
import { SOCIAL_LOCALE } from '@/constants/global';

const { t } = useI18n();

const props = defineProps<{
	challenge: ChallengeDetails;
}>();

interface Rule {
	iconType: string;
	text: string;
}

const numRules = 6;
const isFull = ref(false);

const rulesList = computed<Rule[]>(() => {
	const list: Rule[] = [];

	//TODO: fix this rule later
	// list.push({ iconType: 'IconGames', text: t('challenge.rules.games', { value: '' }) });
	list.push({ iconType: 'IconGoal', text: t('challenge.rules.goal') });
	list.push({
		iconType: 'IconWinner',
		text: t('challenge.rules.winner')
	});
	list.push({
		iconType: 'IconId',
		text: t('challenge.rules.id')
	});
	if (props.challenge.min_bet) {
		list.push({
			iconType: 'IconBet',
			text:
				APP_STORE?.locale === SOCIAL_LOCALE
					? `${t('challenge.rules.bet_eur', { value: props.challenge.min_bet.toFixed(2) })} ${APP_STORE?.currency}`
					: APP_STORE?.currency === 'EUR'
						? t('challenge.rules.bet_eur', { value: props.challenge.min_bet.toFixed(2) })
						: t('challenge.rules.bet_ext', {
								value: props.challenge.min_bet.toFixed(2),
								ext: props.challenge.min_bet_in_player_currency
							})
		});
	} else {
		list.push({ iconType: 'IconBet', text: t('challenge.rules.bet') });
	}
	if (props.challenge.feature_condition === FeatureCondition.DeniedBuy) {
		list.push({
			iconType: 'IconSpin',
			text: t('challenge.rules.spin_denied')
		});
	} else if (props.challenge.feature_condition === FeatureCondition.OnlyFeature) {
		list.push({
			iconType: 'IconSpin',
			text: t('challenge.rules.spin_feature')
		});
	} else {
		list.push({ iconType: 'IconSpin', text: t('challenge.rules.spin') });
	}
	if (props.challenge.spin_limit) {
		list.push({
			iconType: 'IconSpinCount',
			text: t('challenge.rules.limit_on', { value: props.challenge.spin_limit })
		});
	} else {
		list.push({ iconType: 'IconSpinCount', text: t('challenge.rules.limit') });
	}

	return list;
});

const filteredRules = computed(() => {
	return isFull.value ? rulesList.value : rulesList.value.slice(0, numRules);
});

const toggleIsFull = () => (isFull.value = !isFull.value);
</script>

<template>
	<DetailsCard id="challengeRules">
		<div class="flex w-full items-center justify-center">
			<h2 class="text-center font-cairo text-18 font-bold capitalize text-white">
				{{ t('challenge.rules.title') }}
			</h2>
		</div>
		<div class="flex flex-col gap-4">
			<div v-for="{ iconType, text } in filteredRules" class="flex items-start justify-start gap-4 text-13">
				<ChallengeRuleIcon :iconType="iconType" />
				<p class="flex-1 leading-multiline">{{ text }}</p>
			</div>
		</div>
		<Button v-if="rulesList.length > numRules" @click="toggleIsFull">{{
			isFull ? t('common.button.roll_up') : t('common.button.show_more')
		}}</Button>
	</DetailsCard>
</template>
