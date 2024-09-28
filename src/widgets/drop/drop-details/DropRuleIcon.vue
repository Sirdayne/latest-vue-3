<script setup lang="ts">
import { ref, computed, type Component } from 'vue';
import { IconPrize, IconGear, IconStar, IconList } from '@/components/icons';

const props = defineProps<{
	iconType: string;
}>();

interface IIconComponents {
	[key: string]: Component;
}

const iconComponents: IIconComponents = {
	IconPrize,
	IconGear,
	IconStar,
	IconList
};
const currentType = ref(props.iconType);
const currentComponent = computed(() => {
	return iconComponents[currentType.value];
});
</script>

<template>
	<component :is="currentComponent" class="text-blue"></component>
</template>
