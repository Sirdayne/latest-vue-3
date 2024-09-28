<script setup lang="ts">
import { IconMobileBack, IconMobileCross } from '@/components/icons';
import { useMediaQuery } from '@vueuse/core';

const props = defineProps<{
	title: string;
	handleBack?: () => void;
	handleClose?: () => void;
}>();

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');
</script>

<template>
	<transition
		enter-active-class="transition-opacity duration-200 ease-out"
		leave-active-class="transition-opacity duration-200 ease-in"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div v-if="!isSmallAndAbove" class="absolute left-0 top-0 z-[56] w-full">
			<div
				class="flex h-12 w-full items-center justify-center rounded-t-xl border-b border-white-10 bg-gray-lighter"
			>
				<IconMobileBack
					v-if="handleBack"
					class="absolute left-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="handleBack"
				/>
				<div class="flex items-center justify-between gap-2">
					<slot></slot>
					<h1 class="text-center font-cairo text-24 font-bold text-white">
						{{ title }}
					</h1>
				</div>
				<IconMobileCross
					v-if="handleClose"
					class="absolute right-1 top-1 cursor-pointer hover:scale-95 sm:hidden"
					@click="handleClose"
				/>
			</div>
		</div>
	</transition>
</template>
