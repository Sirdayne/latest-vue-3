<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import DropList from '@/widgets/drop/drop-list/DropList.vue';
import PageLayout from '@/layout/PageLayout.vue';
import DropDetails from '@/widgets/drop/drop-details/DropDetails.vue';

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
	<PageLayout :is-active-path="'/lobby/drop'">
		<DropList
			class="w-full rounded-bl-xl sm:w-2/6"
			:class="{ hidden: isListHidden }"
			:is-large-screen="isSmallAndAbove"
			type="drop"
		/>
		<div class="w-full sm:w-4/6 sm:border-l sm:border-white-10 sm:pr-0" :class="{ hidden: isDetailHidden }">
			<router-view />
		</div>
	</PageLayout>
</template>
