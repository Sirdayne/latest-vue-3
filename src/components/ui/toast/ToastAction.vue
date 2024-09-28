<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { ToastAction, type ToastActionProps } from 'radix-vue';
import { cn } from '@/utils';

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<ToastAction
		v-bind="delegatedProps"
		:class="
			cn(
				'ring-offset-background hover:bg-secondary focus:ring-ring inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				props.class
			)
		"
	>
		<slot />
	</ToastAction>
</template>
