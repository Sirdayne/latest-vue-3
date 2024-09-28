<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { ToastClose, type ToastCloseProps } from 'radix-vue';
import { IconClose } from '@/components/icons';
import { cn } from '@/utils';

const props = defineProps<
	ToastCloseProps & {
		class?: HTMLAttributes['class'];
	}
>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<ToastClose
		v-bind="delegatedProps"
		:class="
			cn(
				'absolute right-2 top-2.5 rounded-md p-1 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
				props.class
			)
		"
	>
		<IconClose class="h-3 w-3 text-white" />
	</ToastClose>
</template>
