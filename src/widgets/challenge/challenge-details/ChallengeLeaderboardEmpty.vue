<script lang="ts" setup>
import { IconStars } from '@/components/icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
	<div class="flex h-full items-center justify-center">
		<div class="m-6 flex w-full flex-col items-center justify-center gap-3 text-center">
			<div><IconStars class="h-24 w-24 text-black-30" /></div>
			<div class="font-cairo text-18 font-bold text-gray">
				<h1>{{ t('common.error.leaderboard_title') }}</h1>
			</div>
			<div class="font-cairo text-13 font-normal text-gray">
				<p>{{ t('common.error.sub_title') }}</p>
			</div>
		</div>
	</div>
</template>
