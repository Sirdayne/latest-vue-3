<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from 'radix-vue';

const props = defineProps<PopoverTriggerProps>();

const handleClick = (event: MouseEvent) => {
	event.stopPropagation();
};
</script>

<template>
	<PopoverTrigger v-bind="props" @click="handleClick">
		<slot />
	</PopoverTrigger>
</template>
