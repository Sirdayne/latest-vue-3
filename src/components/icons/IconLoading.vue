<script lang="ts" setup>
defineProps<{
	isSecondary?: boolean;
}>();
</script>

<template>
	<svg
		width="48"
		height="48"
		viewBox="0 0 48 48"
		xmlns="http://www.w3.org/2000/svg"
		:stroke="isSecondary ? '#000' : '#fff'"
	>
		<g fill="none" fill-rule="evenodd" stroke-width="4">
			<circle cx="24" cy="24" r="22" stroke-opacity="0.1" />
			<path d="M24 2 A 22 22 0 0 1 46 24" stroke-linecap="round">
				<animateTransform
					attributeName="transform"
					type="rotate"
					from="0 24 24"
					to="360 24 24"
					dur="1s"
					repeatCount="indefinite"
				/>
			</path>
		</g>
	</svg>
</template>
