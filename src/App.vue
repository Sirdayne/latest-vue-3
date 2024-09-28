<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue';
import { isOpened } from './core/AppStore';
</script>

<template>
	<main v-if="isOpened">
		<RouterView />
		<Toaster />
	</main>
</template>
