import { type VariantProps, cva } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-12 font-semibold transition-colors',
	{
		variants: {
			variant: {
				default: 'border-transparent',
				large: 'border-transparent bg-yellow text-gray'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
