<script setup lang="ts">
import Profile from '@/widgets/profile/Profile.vue';

import { useRoute } from 'vue-router';

import PageLayout from '@/layout/PageLayout.vue';

const route = useRoute();
</script>

<template>
	<PageLayout :is-active-path="'/lobby/profile'">
		<Profile />
	</PageLayout>
</template>
