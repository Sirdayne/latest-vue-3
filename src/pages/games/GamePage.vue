<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';

import PageLayout from '@/layout/PageLayout.vue';

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');

const route = useRoute();

const isRootPage = computed(() => !route.params.id);

const isListHidden = computed(() => {
	if (isSmallAndAbove.value) {
		return false;
	} else {
		return !isRootPage.value;
	}
});

const isDetailHidden = computed(() => {
	if (isSmallAndAbove.value) {
		return false;
	} else {
		return isRootPage.value;
	}
});
</script>

<template>
	<PageLayout :is-active-path="'/lobby/games'">
		<div>Game List</div>
	</PageLayout>
</template>
