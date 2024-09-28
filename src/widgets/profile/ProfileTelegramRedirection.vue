<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useI18n } from 'vue-i18n';
import { IconTelegram } from '@/components/icons';
import { useMediaQuery } from '@vueuse/core';
import { profile, isPendingTelegramAuth } from '@/widgets/profile/ProfileFacade';
import { redirectTelegram } from '@/widgets/profile/ProfileFacade';

const { t } = useI18n();

const isSmallAndAbove = useMediaQuery('(min-width: 568px)');
</script>
<template>
	<div>
		<div
			v-if="profile.tg_auth && !profile.profile_connected"
			class="mx-4 flex justify-center rounded-xl border border-white-10 bg-gray-lighter p-4"
		>
			<div
				class="flex w-full"
				:class="{
					'flex-col gap-4': !isSmallAndAbove,
					'items-center justify-between gap-4': isSmallAndAbove
				}"
			>
				<div class="text-13 text-white-50">
					<p>{{ t('profile.telegram_message') }}</p>
				</div>
				<div>
					<Button
						@click="redirectTelegram"
						:variant="isPendingTelegramAuth ? 'processing' : 'primary'"
						type="submit"
						class="px-6"
					>
						<span class="flex items-center gap-1">
							<IconTelegram />
							<span>{{ t('profile.telegram_button_title') }}</span>
						</span>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
