<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { DetailsCard } from '@/components/ui/details-card';
import { computed, watch } from 'vue';
import { ref } from 'vue';
import { useJoinChallenge } from '@/widgets/challenge/useJoinChallenge';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const inputs = ref(['', '', '', '', '']);
const code = ref('');
const inputRefs = ref<HTMLInputElement[]>([]);
const codeLength = 5;
const { mutate, isPending, error, reset } = useJoinChallenge();
const route = useRoute();
const challengeId = computed(() => route.params.id);

watch(challengeId, (path) => {
	resetCode();
});

const errorTexts = new Map<number, string>([
	[404, t('challenge.join.error')],
	[422, t('challenge.join.error_challenge_exist')]
]);

const errorMessage = computed<string | null>(() =>
	error.value ? errorTexts.get(error.value.status) || t('challenge.join.error') : null
);

const resetCode = () => {
	code.value = '';
	inputs.value = ['', '', '', '', ''];
	inputRefs.value = [];
	reset();
};

const joinChallenge = () => {
	mutate({ id: challengeId.value as string, join_code: code.value });
};

const updateCode = () => {
	code.value = inputs.value.join('').toUpperCase();
};

const handleInput = (index: number) => {
	if (inputs.value[index].length === 1 && index < inputs.value.length - 1) {
		inputRefs.value[index + 1].focus();
	}
	updateCode();
};

const handleBackspace = (index: number, event: KeyboardEvent) => {
	if (event.key === 'Backspace' && index > 0 && inputs.value[index] === '') {
		inputRefs.value[index - 1].focus();
	}
};

const handlePaste = (event: ClipboardEvent) => {
	const pasteData = event.clipboardData?.getData('text').substring(0, codeLength);
	if (pasteData && pasteData.length === codeLength) {
		inputs.value = pasteData.split('');
		inputRefs.value[inputs.value.length - 1].focus();
		updateCode();
		event.preventDefault();
	}
};
</script>

<template>
	<DetailsCard>
		<div class="flex items-center justify-center">
			<div class="max-w-[268px]">
				<p class="color-white text-center font-cairo text-18 font-bold">
					{{ t('challenge.join.title') }}
				</p>
				<div>
					<form @submit.prevent="joinChallenge" class="flex items-center justify-center gap-2">
						<input
							class="color-white my-5 w-12 rounded-xl border border-[rgba(0,0,0,0.10)] bg-black-10 py-4 text-center font-cairo text-24 font-bold uppercase shadow-[inset_2px_4px_2px_2px_rgba(0,0,0,0.10),inset_0_-1px_0_0_rgba(200,200,200,0.30)] focus:outline-none"
							:class="{ 'border-red-500 shadow-none': errorMessage }"
							v-for="(input, index) in inputs"
							:key="index"
							v-model="inputs[index]"
							maxlength="1"
							@input="handleInput(index)"
							@keydown.backspace="handleBackspace(index, $event)"
							@paste="handlePaste"
							type="text"
							ref="inputRefs"
						/>
					</form>
				</div>
				<p v-if="errorMessage" class="mb-5 text-center text-13 font-normal text-red-500">
					{{ errorMessage }}
				</p>
				<Button
					:variant="code.length !== codeLength ? 'ghost' : isPending ? 'processing' : 'link'"
					@click="joinChallenge"
					:disabled="code.length !== codeLength"
					>{{ isPending ? t('challenge.join.loading') : t('challenge.join.button') }}
				</Button>
			</div>
		</div>
	</DetailsCard>
</template>
