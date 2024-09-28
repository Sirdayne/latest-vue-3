<script setup lang="ts">
defineProps<{
	page: number | null;
	active: boolean;
}>();
</script>

<template>
	<div
		class="flex h-9 w-9 items-center justify-center rounded text-13 text-gray-lighter"
		:class="{
			'cursor-default bg-white-50 font-bold': active,
			'cursor-default': !page,
			'cursor-pointer': !active && page
		}"
	>
		{{ page || '...' }}
	</div>
</template>
