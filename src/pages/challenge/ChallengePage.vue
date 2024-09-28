<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import ChallengeList from '@/widgets/challenge/challenge-list/ChallengeList.vue';
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
	<PageLayout :is-active-path="'/lobby/challenge'">
		<ChallengeList
			class="w-full rounded-bl-xl sm:w-2/6"
			:class="{ hidden: isListHidden }"
			:is-large-screen="isSmallAndAbove"
		/>
		<div class="w-full sm:w-4/6 sm:border-l sm:border-white-10 sm:pr-0" :class="{ hidden: isDetailHidden }">
			<router-view />
		</div>
	</PageLayout>
</template>
