<script setup lang="ts">
import PaginationCell from '@/components/ui/pagination/PaginationCell.vue';
import { computed } from 'vue';

const props = defineProps<{
	total: number;
	perPage: number;
}>();

const currentPage = defineModel('page', { default: 1, required: true, type: Number });

const pages = computed(() => {
	const totalPages =
		props.total % props.perPage > 0
			? Math.floor(props.total / props.perPage) + 1
			: Math.floor(props.total / props.perPage);
	const maxPagesToShow = 7;
	const halfMaxPages = Math.floor(maxPagesToShow / 2);

	if (totalPages <= maxPagesToShow) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	if (currentPage.value <= halfMaxPages + 1) {
		return [...Array.from({ length: 5 }, (_, i) => i + 1), null, totalPages];
	}

	if (currentPage.value > totalPages - halfMaxPages) {
		return [1, null, ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)];
	}

	return [1, null, currentPage.value - 1, currentPage.value, currentPage.value + 1, null, totalPages];
});

const setCurrentPage = (page: number | null) => {
	if (page) {
		currentPage.value = page;
	}
};
</script>

<template>
	<div v-if="pages && pages.length > 1" class="flex items-center justify-center">
		<PaginationCell
			v-for="(page, index) in pages"
			:key="index"
			:page="page"
			:active="page === currentPage"
			@click="setCurrentPage(page)"
		>
		</PaginationCell>
	</div>
</template>
