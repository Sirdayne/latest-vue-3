<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { format } from 'date-fns';
import { useI18n } from 'vue-i18n';
import { DATE_LOCALE } from '@/core/AppStore';

const { t } = useI18n();

const props = defineProps<{
	id: number | string;
	status: string;
	isCompactMode?: boolean;
	start_at: string;
	finish_at: string;
	action?: (id: string, status: string) => void;
}>();

const statusText = computed(() => {
	switch (props.status) {
		case 'ongoing':
			return t('common.event_timer.end_title');
		case 'planned':
			return t('common.event_timer.start_title');
		case 'promoting':
			return t('common.event_timer.start_title');
		default:
			return '';
	}
});

const remainingTime = ref({
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0
});

const calculateTimeDifference = () => {
	const targetDate = new Date(props.status === 'ongoing' ? props.finish_at : props.start_at);
	const now = new Date();
	const difference = targetDate.getTime() - now.getTime();

	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((difference % (1000 * 60)) / 1000);

	return { days, hours, minutes, seconds };
};

const updateTimer = () => {
	const time = calculateTimeDifference();

	if (time.seconds < 0) {
		return;
	}

	remainingTime.value = time;

	if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
		if (props.action) {
			props.action(`${props.id}`, props.status);
		}
	}
};

const formatDate = (date: string) => format(date, 'dd MMM yyyy', { locale: DATE_LOCALE });

let timerInterval: NodeJS.Timeout | null = null;

onMounted(() => {
	updateTimer();
	timerInterval = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
	if (timerInterval) {
		clearInterval(timerInterval);
	}
});

watch(
	() => [props.start_at, props.finish_at],
	() => {
		updateTimer();
		if (timerInterval) {
			clearInterval(timerInterval);
		}
		timerInterval = setInterval(updateTimer, 1000);
	}
);
</script>

<template>
	<div v-if="isCompactMode">{{ formatDate(start_at) }} - {{ formatDate(finish_at) }}</div>
	<div
		v-else
		class="flex flex-grow flex-col items-center justify-center gap-1 text-10 font-medium text-gray-lightest lg:text-14"
	>
		<p v-if="remainingTime.days > 0" class="flex items-baseline gap-1">
			<span class="font-cairo text-20 font-bold text-white lg:text-28">{{ remainingTime.days }}</span>
			<span>d</span>
			<span class="pb-1 text-11">:</span>
			<span class="font-cairo text-20 font-bold text-white lg:text-28">{{
				remainingTime.hours.toString().padStart(2, '0')
			}}</span>
			<span>h</span>
			<span class="pb-1 text-11">:</span>
			<span class="font-cairo text-20 font-bold text-white lg:text-28">{{
				remainingTime.minutes.toString().padStart(2, '0')
			}}</span>
			<span>m</span>
		</p>
		<p v-else class="flex items-baseline gap-1">
			<span class="font-cairo text-20 font-bold text-white lg:text-28">{{
				remainingTime.hours.toString().padStart(2, '0')
			}}</span>
			<span>h</span>
			<span class="pb-1 text-11">:</span>
			<span class="font-cairo text-20 font-bold text-white lg:text-28">{{
				remainingTime.minutes.toString().padStart(2, '0')
			}}</span>
			<span>m</span>
			<span class="pb-1 text-11">:</span>
			<span class="font-cairo text-20 font-bold text-white lg:text-28">{{
				remainingTime.seconds.toString().padStart(2, '0')
			}}</span>
			<span>s</span>
		</p>
		<div class="flex items-center gap-2 uppercase">
			<span
				:class="{
					'text-green': status === 'ongoing',
					'text-violet': status === 'planned' || status === 'promoting'
				}"
			>
				{{
					status === 'ongoing'
						? t('common.event_status.active')
						: status === 'planned' || status === 'promoting'
							? t('common.event_status.planned')
							: ''
				}}
			</span>
			<span>•</span>
			<span>{{ statusText }}</span>
		</div>
	</div>
</template>
