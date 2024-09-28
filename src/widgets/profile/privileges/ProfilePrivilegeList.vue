<script setup lang="ts">
import { profile } from '@/widgets/profile/ProfileFacade';
import ProfilePrivilegeCard from '@/widgets/profile/privileges/ProfilePrivilegeCard.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
	<div class="mx-4 mb-4 flex flex-col gap-x-1 gap-y-2">
		<div class="mb-2 mt-6 flex justify-center text-16 font-bold uppercase text-yellow">
			{{ t('profile.privileges.next_title') }}
		</div>

		<div
			v-if="!!profile.next_privileges.length"
			v-for="{ points, level, privilege_type, reward_type } in profile.next_privileges"
		>
			<ProfilePrivilegeCard :privilege_type="privilege_type || reward_type" :points="points" :level="level" />
		</div>
		<div v-else>
			<ProfilePrivilegeCard />
		</div>
		<div
			v-if="!!profile.current_privileges.length"
			class="mb-2 mt-6 flex justify-center text-16 font-bold uppercase text-yellow"
		>
			{{ t('profile.privileges.current_title') }}
		</div>
		<div
			v-if="!!profile.current_privileges.length"
			v-for="{ points, level, privilege_type, reward_type } in profile.current_privileges"
		>
			<ProfilePrivilegeCard :privilege_type="privilege_type || reward_type" :points="points" :level="level" />
		</div>
	</div>
</template>
