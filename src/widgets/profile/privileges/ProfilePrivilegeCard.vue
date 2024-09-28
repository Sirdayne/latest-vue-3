<script setup lang="ts">
import type { Component } from 'vue';
import { RewardType, PrivilegeType } from '@/widgets/profile/ProfileModel';
import { IconBigWins, IconHourglass, IconLevelUpPoints, IconMysteryBox, IconP2pChallenges } from '@/components/icons';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
	points?: number;
	level?: number;
	privilege_type?: RewardType | PrivilegeType;
}>();

interface IIcon {
	[key: string]: Component;
}

interface ITitle {
	[key: string]: string;
}

const icons: IIcon = {
	[RewardType.LevelUpPoints]: IconLevelUpPoints,
	[PrivilegeType.BigWins]: IconBigWins,
	[PrivilegeType.P2PChallenges]: IconP2pChallenges,
	[PrivilegeType.MysteryBox]: IconMysteryBox,
	undefined: IconHourglass
};

const titles: ITitle = {
	[RewardType.LevelUpPoints]: t('profile.privileges.type_title.extra_points', { value: props.points || 0 }),
	[PrivilegeType.BigWins]: t('profile.privileges.type_title.big_wins'),
	[PrivilegeType.P2PChallenges]: t('profile.privileges.type_title.p2p_challenges'),
	[PrivilegeType.MysteryBox]: t('profile.privileges.type_title.mystery_box'),
	undefined: t('profile.privileges.next_empty')
};

const PrivilegeIcon = icons[props.privilege_type ?? 'undefined'];
const privilegeTitle = titles[props.privilege_type ?? 'undefined'];
</script>

<template>
	<div>
		<div class="flex rounded-xl border border-white-10 bg-gray-lighter p-4">
			<div class="flex items-start gap-2">
				<div class="relative z-0 mx-1 min-w-6 text-yellow">
					<div class="absolute -inset-x-3 -inset-y-3 flex h-11 w-11 items-center justify-center">
						<PrivilegeIcon />
					</div>
				</div>
				<div class="flex flex-col gap-y-1">
					<div class="mt-0 pt-0 text-16 font-bold text-white">{{ privilegeTitle }}</div>
					<div v-if="level" class="text-13">{{ t('profile.level') }} {{ level }}</div>
					<!-- <div v-if="description" class="text-13 text-white-30">{{ description }}</div> -->
				</div>
			</div>
		</div>
	</div>
</template>
