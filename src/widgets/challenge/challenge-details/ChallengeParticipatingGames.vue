<script setup lang="ts">
import { DetailsCard } from '@/components/ui/details-card';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

const list = [
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	},
	{
		link: 'href',
		icon: 'https://cdn.softswiss.net/i/s2/softswiss/OneWinShuttle.png'
	}
];

const moreGamesMessage = computed(() => t('challenge.games.more', { value: 156 }).split(' '));
</script>

<template>
	<DetailsCard>
		<div class="flex w-full items-center justify-center">
			<h2 class="text-center font-cairo text-18 font-bold capitalize text-white">
				{{ t('challenge.games.title') }}
			</h2>
		</div>
		<div class="flex snap-x space-x-2 overflow-x-auto">
			<div v-for="(item, index) in list" :key="index" class="flex-none snap-start">
				<!-- <a :href="item.link" target="_blank"> -->
				<img :src="item.icon" class="h-full w-16 rounded-lg object-cover lg:w-24" />
				<!-- </a> -->
			</div>
			<div class="flex snap-start items-center justify-center rounded-lg bg-yellow">
				<div class="w-16 object-cover p-1 text-center text-13 font-bold uppercase text-gray sm:w-20">
					<p v-for="message in moreGamesMessage">{{ message }}</p>
				</div>
			</div>
		</div>
	</DetailsCard>
</template>
