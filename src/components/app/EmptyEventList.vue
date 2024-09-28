<script lang="ts" setup>
import { IconStars } from '@/components/icons';

defineProps<{
	title: string;
	subTitle: string;
	isRounded: boolean;
}>();
</script>

<template>
	<div
		class="flex h-full items-center justify-center overflow-hidden border-t border-white-10 bg-gray-lighter"
		:class="{ 'w-[94%] rounded-3xl': isRounded, 'w-full': !isRounded }"
	>
		<div class="m-6 flex w-full flex-col items-center justify-center gap-3 text-center">
			<div><IconStars class="h-24 w-24 text-gray-light" /></div>
			<div class="font-cairo text-18 font-bold">
				<h1>{{ title }}</h1>
			</div>
			<div class="font-cairo text-13 font-normal text-white-50">
				<p>{{ subTitle }}</p>
			</div>
		</div>
	</div>
</template>
