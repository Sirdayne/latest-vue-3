<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router';

defineProps({
	path: String,
	isActivePath: Boolean,
	isLG: Boolean,
	title: String
});
</script>

<template>
	<router-link
		:to="path as RouteLocationRaw"
		class="flex max-h-20 w-full flex-1 flex-col items-center justify-center gap-0.5 whitespace-nowrap px-3 py-1.5 text-11 text-white md:gap-1.5 md:text-13"
		:class="{ 'text-yellow md:rounded-lg md:bg-yellow md:text-gray': isActivePath }"
	>
		<slot> </slot>
		<span>{{ title }}</span>
	</router-link>
</template>
