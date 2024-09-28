<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import {
	IconDrops,
	IconChallenges,
	IconClose,
	IconParticipation,
	IconLoyalty,
	IconDropsOutline,
	IconChallengesOutline,
	IconLoyaltyOutline,
	IconParticipationOutline
} from '@/components/icons';
const { t } = useI18n();
const route = useRoute();

import type { HTMLAttributes } from 'vue';
import { type NavVariants, navVariants } from '.';
import { cn } from '@/utils';
import NavLink from './NavLink.vue';
import { APP_STORE } from '@/core/AppStore';
import { SOCIAL_LOCALE } from '@/constants/global';

const props = defineProps<{
	isActivePath: string;
	variant?: NavVariants['variant'];
	class?: HTMLAttributes['class'];
}>();

const isDetails = computed(() => !!route.params.id);
const isSmallAndAbove = useMediaQuery('(min-width: 568px)');

const links = computed(() => {
	let linksArr = [
		{ path: '/lobby/drop', icon: IconDrops, iconOutline: IconDropsOutline, title: t('drop.title') },
		{
			path: '/lobby/challenge',
			icon: IconChallenges,
			iconOutline: IconChallengesOutline,
			title: t('challenge.title')
		}
	];

	if (APP_STORE?.lobby_options?.show_game_list) {
		linksArr = [
			{
				path: '/lobby/games',
				icon: IconParticipation,
				iconOutline: IconParticipationOutline,
				title: t('games.title')
			},
			...linksArr
		];
	}

	if (APP_STORE?.locale !== SOCIAL_LOCALE && APP_STORE?.currency !== 'FUN') {
		linksArr = [
			...linksArr,
			{ path: '/lobby/profile', icon: IconLoyalty, iconOutline: IconLoyaltyOutline, title: t('profile.title') }
		];
	}

	return linksArr;
});
</script>

<template>
	<div :class="cn(navVariants({ variant }), props.class)">
		<slot></slot>
		<NavLink v-for="link in links" :path="link.path" :isActivePath="link.path === isActivePath" :title="link.title">
			<component :is="variant === 'left' ? link.iconOutline : link.icon" class="size-8" />
		</NavLink>
	</div>
</template>
