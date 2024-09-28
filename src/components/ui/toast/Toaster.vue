<script setup lang="ts">
import { isVNode } from 'vue';
import { useToast } from './use-toast';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.';

const { toasts } = useToast();
</script>

<template>
	<ToastProvider>
		<Toast
			v-for="toast in toasts"
			:key="toast.id"
			v-bind="toast"
			class="rounded-2xl border-none bg-gradient-to-b from-button-secondary-from to-button-secondary-to p-3 shadow-[0_0_15px_0_rgba(0,0,0,0.90),inset_0_1px_0_0_rgba(255,255,255,0.25)]"
		>
			<div class="grid gap-1">
				<ToastTitle v-if="toast.title">
					{{ toast.title }}
				</ToastTitle>
				<template v-if="toast.description">
					<ToastDescription v-if="isVNode(toast.description)">
						<component :is="toast.description" />
					</ToastDescription>
					<ToastDescription v-else>
						{{ toast.description }}
					</ToastDescription>
				</template>
				<ToastClose />
			</div>
			<component :is="toast.action" />
		</Toast>
		<ToastViewport />
	</ToastProvider>
</template>
