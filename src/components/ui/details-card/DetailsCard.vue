<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils';

const generalStyle = 'relative mx-4 mt-4 box-border flex flex-col gap-5 rounded-xl border pb-5 pl-4 pr-4 pt-5';

const buttonVariants = cva(`${generalStyle}`, {
	variants: {
		colored: {
			true: 'border-transparent bg-yellow',
			false: 'border-white-10 bg-gray-lighter'
		}
	},
	defaultVariants: {
		colored: false
	}
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
	colored?: ButtonVariants['colored'];
	class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
	colored: false
});
</script>

<template>
	<div :class="cn(buttonVariants({ colored }), props.class)">
		<slot />
	</div>
</template>
