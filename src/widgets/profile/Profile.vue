<script setup lang="ts">
import ProfileProgressBar from './ProfileProgressBar.vue';
import { profile, isLoading } from './ProfileFacade';
import { IconProfile } from '@/components/icons';
import { useI18n } from 'vue-i18n';
import ProfileTelegramRedirection from './ProfileTelegramRedirection.vue';
import ProfilePrivilege from './privileges/ProfilePrivilegeList.vue';
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { closeLobby } from '@/widgets/challenge/ChallengeFacade';
import { IconMobileCross } from '@/components/icons';

const { t } = useI18n();

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');

const isStickyHeaderShow = ref(false);

const handleScroll = (e: Event) => {
	const target = e.currentTarget as HTMLElement;
	const scrollY = target.scrollTop;
	scrollY > 48 ? (isStickyHeaderShow.value = true) : (isStickyHeaderShow.value = false);
};
</script>

<template>
	<div v-if="isLoading"></div>
	<!-- <div v-else-if="error">ERROR</div> -->
	<div v-else class="h-full w-full overflow-auto p-0" @scroll="handleScroll">
		<div class="flex h-fit w-full flex-col pb-16 sm:pb-0">
			<div
				v-if="!isSmallAndAbove"
				class="top-0 sticky z-[56] flex h-12 w-full items-center justify-center rounded-t-xl border-b border-white-10 bg-gray-lighter"
			>
				<div class="flex items-center justify-between gap-2">
					<h1 class="text-center font-cairo text-24 font-bold text-white">
						{{ t('profile.title') }}
					</h1>
				</div>
				<IconMobileCross
					class="absolute right-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="closeLobby"
				/>
			</div>
			<div class="m-4 rounded-xl border border-white-10 bg-gray-lighter p-4">
				<div class="box-border block sm:flex">
					<IconProfile
						class="m-auto mb-1 h-8 w-8 rounded-full text-yellow shadow-[0_0_0_#D07E04,0_0_12px_#FF7A00] sm:m-0 sm:mr-5 sm:h-10 sm:w-10"
					/>
					<div>
						<div class="text-center text-10 font-normal uppercase text-white-50 sm:text-start sm:text-14">
							{{ t('profile.id_title') }}
						</div>
						<div class="mb-1 text-center text-15 font-bold text-white sm:mb-2 sm:text-start sm:text-24">
							{{ profile.id }}
						</div>
						<div
							v-if="profile.profile_connected"
							class="text-center text-13 text-yellow sm:text-start sm:text-14"
						>
							{{ t('profile.telegram_linked') }}
						</div>
					</div>
				</div>
				<ProfileProgressBar
					:level="profile.current_level"
					:value="profile.current_points - profile.initial_level_points"
					:max="profile.points_for_next_level"
					:progress="profile.progress"
				/>
			</div>
			<ProfileTelegramRedirection />
			<ProfilePrivilege />
		</div>
	</div>
</template>
