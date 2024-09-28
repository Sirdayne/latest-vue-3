<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import {
	PopoverContent,
	PopoverArrow,
	type PopoverContentEmits,
	type PopoverContentProps,
	useForwardPropsEmits
} from 'radix-vue';
import { cn } from '@/utils';

defineOptions({
	inheritAttrs: false
});

const props = withDefaults(defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>(), {
	align: 'center',
	side: 'bottom',
	sideOffset: 4,
	hideWhenDetached: true
});
const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<PopoverContent
		v-bind="{ ...forwarded, ...$attrs }"
		:class="
			cn(
				'z-50 w-auto max-w-72 rounded-md border bg-gray-tooltip px-3 py-1.5 text-24 font-bold text-black shadow-[0_0_10px_0_rgba(0,0,0)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				props.class
			)
		"
	>
		<slot />
		<PopoverArrow class="fill-gray-tooltip" :width="8" />
	</PopoverContent>
</template>
