<script setup lang="ts">
import { profile, isLoading } from './ProfileFacade';
import { IconProfile } from '@/components/icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
	<div
		v-if="isLoading"
		class="mx-4 my-2 flex h-full rounded-xl border border-white-10 bg-gray-lighter py-1 pl-1.5 pr-3 sm:m-0 sm:w-48 sm:rounded-none sm:border-0 sm:border-l sm:bg-transparent sm:py-3 sm:pl-3 md:w-56 lg:w-72"
	>
		<div class="min-h-5"></div>
	</div>
	<div
		v-else
		class="mx-4 my-2 flex h-full rounded-xl border border-white-10 bg-gray-lighter py-1 pl-1.5 pr-3 sm:m-0 sm:w-48 sm:rounded-none sm:border-0 sm:border-l sm:bg-transparent sm:py-3 sm:pl-3 md:w-56 lg:w-72"
	>
		<IconProfile class="shrink-0 text-yellow sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-9 lg:w-9" />
		<div class="ml-2 w-full sm:ml-3">
			<div class="flex items-center justify-between">
				<div class="text-10 font-bold uppercase text-yellow md:text-13 lg:text-16">
					{{ t('profile.level') }} {{ profile.current_level }}
				</div>
				<div class="text-10 text-white-40 lg:text-14">
					{{ profile.current_points - profile.initial_level_points }}/{{ profile.points_for_next_level
					}}{{ t('profile.xp') }}
				</div>
			</div>
			<div class="mt-1 sm:mt-2">
				<div class="h-1 w-full rounded-xl bg-black-30">
					<div
						class="h-1 rounded-xl bg-yellow duration-300 ease-linear"
						:style="{ width: profile.progress + '%' }"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>
