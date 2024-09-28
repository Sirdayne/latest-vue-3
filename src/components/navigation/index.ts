import { type VariantProps, cva } from 'class-variance-authority';

export { default as Navigation } from './Navigation.vue';

export const navVariants = cva('flex items-center z-[56] bg-gray-lighter', {
	variants: {
		variant: {
			bottom: 'absolute bottom-0 left-0 h-16 w-full justify-center border-t border-white-10 before:flex-1 before:grow-[0.5] before:content-[""] after:flex-1 after:grow-[0.5] after:content-[""]',
			left: 'flex-col w-24 h-full bg-gray border-r border-white-10 p-1',
			right: 'flex-col w-20 h-full border-l border-white-10'
		}
	},
	defaultVariants: {
		variant: 'bottom'
	}
});

export type NavVariants = VariantProps<typeof navVariants>;
