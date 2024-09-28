<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
	level: number;
	value: number;
	max: number;
	progress: number;
}>();
</script>

<template>
	<div class="mt-2">
		<div class="mb-3 flex items-center justify-between">
			<div class="text-15 font-bold text-yellow sm:text-16">{{ t('profile.level') }} {{ level }}</div>
			<div class="text-10 font-normal text-white-50 sm:text-14">{{ value }}/{{ max }}{{ t('profile.xp') }}</div>
		</div>
		<div class="h-1.5 w-full rounded-xl bg-black-30">
			<div class="h-1.5 rounded-xl bg-yellow duration-300 ease-linear" :style="{ width: progress + '%' }"></div>
		</div>
	</div>
</template>
