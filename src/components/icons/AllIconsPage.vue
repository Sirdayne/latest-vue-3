<script lang="ts" setup>
import { ref, onMounted, type Component } from 'vue';

const icons = ref<Record<string, Component>>({});

const loadIcons = async () => {
	const modules = import.meta.glob('./*.vue') as Record<string, () => Promise<{ default: Component }>>;

	for (const path in modules) {
		const componentName = path.match(/\/([\w-]+)\.vue$/)?.[1];
		if (componentName) {
			const module = await modules[path]();
			icons.value[componentName] = module.default;
		}
	}
};

onMounted(() => {
	loadIcons();
});
</script>

<template>
	<div class="flex h-full flex-wrap gap-2 overflow-auto p-3">
		<div
			v-for="(IconComponent, name) in icons"
			:key="name"
			class="flex flex-col items-center justify-center gap-2 border p-2"
		>
			<component :is="IconComponent" class="h-5 w-5" />
			<span>{{ name }}</span>
		</div>
	</div>
</template>
