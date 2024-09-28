<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
	<div class="flex h-full items-center justify-center text-20">{{ t('common.event_details.empty_title') }}</div>
</template>
