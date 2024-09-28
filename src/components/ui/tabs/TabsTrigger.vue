<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue';
import { cn } from '@/utils';

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<TabsTrigger
		v-bind="forwardedProps"
		:class="
			cn(
				'focus-visible:ring-ring box-border inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 py-1.5 text-18 font-bold text-gray-lightest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-yellow data-[state=active]:text-yellow data-[state=active]:shadow-sm',
				props.class
			)
		"
	>
		<slot />
	</TabsTrigger>
</template>
