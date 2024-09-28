<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { DetailsCard } from '@/components/ui/details-card';
import { useToast } from '@/components/ui/toast/use-toast';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
	player_code: string;
}>();

const { toast } = useToast();

const obscuredPlayerCode = props.player_code.slice(0, -4) + '****';

const copyPlayerCode = () => {
	navigator.clipboard.writeText(props.player_code);
	toast({
		description: t('challenge.playerCode.toast')
	});
};
</script>

<template>
	<DetailsCard>
		<div class="flex w-full items-center justify-center">
			<h2 class="text-center font-cairo text-18 font-bold capitalize text-white">
				{{ t('challenge.playerCode.title') }}
			</h2>
		</div>
		<div>
			<p class="text-justify font-cairo text-13 font-normal text-white">
				{{ t('challenge.playerCode.message') }}
			</p>
			<div class="mt-4 flex w-full items-center justify-center">
				<h2 class="text-center font-cairo font-bold text-yellow">{{ obscuredPlayerCode }}</h2>
			</div>
		</div>
		<Button @click="copyPlayerCode">{{ t('challenge.playerCode.button') }}</Button>
	</DetailsCard>
</template>
