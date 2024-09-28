<script setup lang="ts">
import { ref, computed, type Component } from 'vue';
import { IconGames, IconGoal, IconWinner, IconId, IconBet, IconSpin, IconSpinCount } from '@/components/icons';

const props = defineProps<{
	iconType: string;
}>();

interface IIconComponents {
	[key: string]: Component;
}

const iconComponents: IIconComponents = {
	IconGames,
	IconGoal,
	IconWinner,
	IconId,
	IconBet,
	IconSpin,
	IconSpinCount
};
const currentType = ref(props.iconType);
const currentComponent = computed(() => {
	return iconComponents[currentType.value];
});
</script>

<template>
	<component :is="currentComponent" class="text-blue"></component>
</template>
