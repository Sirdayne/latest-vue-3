import { type VariantProps, cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

const linkDefault =
	'bg-gradient-to-b from-button-link-from to-button-link-to shadow-[inset_0_-4px_0_0_#00499a,inset_0_1px_1px_0_rgba(255,255,255,0.35)]';
const linkHover =
	'hover:bg-gradient-to-b hover:from-button-link-hover-from hover:to-button-link-hover-to hover:shadow-[inset_0_-4px_0_0_#2673c8,inset_0_1px_1px_0_rgba(255,255,255,0.35)]';
const linkPressed =
	'active:bg-gradient-to-b active:from-button-link-from active:to-button-link-to active:shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.35)]';

const primaryDefault =
	'bg-gradient-to-b from-button-primary-from to-button-primary-to shadow-[inset_0_-4px_0_0_#d07e04,inset_0_1px_1px_0_rgba(255,255,255,0.35)] text-gray';
const primaryHover =
	'hover:bg-gradient-to-b hover:from-button-primary-hover-from hover:to-button-primary-hover-to hover:shadow-[inset_0_-4px_0_0_#ef9e25,inset_0_1px_1px_0_rgba(255,255,255,0.35)]';
const primaryPressed =
	'active:bg-gradient-to-b active:from-button-primary-from active:to-button-primary-to active:shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.35)]';

const secondaryDefault =
	'bg-gradient-to-b from-button-secondary-from to-button-secondary-to shadow-[inset_0_-4px_0_0_#212330,inset_0_1px_1px_0_rgba(255,255,255,0.35)]';
const secondaryHover =
	'hover:bg-gradient-to-b hover:from-button-secondary-hover-from hover:to-button-secondary-hover-to hover:shadow-[inset_0_-4px_0_0_#3b3e52,inset_0_1px_1px_0_rgba(255,255,255,0.35)]';
const secondaryPressed =
	'active:bg-gradient-to-b active:from-button-secondary-from active:to-button-secondary-to active:shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.35)]';

const ghostDefault = 'bg-white-50 shadow-[0_4px_0_0_rgba(0,0,0,0.10),inset_0_1px_1px_0_white] text-gray';
const ghostHover = 'hover:bg-white-70 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.10),inset_0_1px_1px_0_white]';
const ghostPressed = 'active:bg-white-50 active:shadow-[0_1px_4px_0_rgba(0,0,0,0.15)]';

const processingDefault =
	'bg-gray-lighter border border-white-10 active:translate-y-0 pointer-events-none cursor-default';

const generalStyle =
	'rounded-xl inline-flex items-center justify-center whitespace-nowrap text-white font-bold transition-colors disabled:pointer-events-none uppercase transform transition-transform duration-57 active:translate-y-0.5';
const responsiveStyles = 'h-12 text-15 lg:h-16 lg:text-19';
const focus =
	'focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-white/50';

export const buttonVariants = cva(`${generalStyle} ${responsiveStyles} ${focus}`, {
	variants: {
		variant: {
			primary: `${primaryDefault} ${primaryHover} ${primaryPressed}`,
			secondary: `${secondaryDefault} ${secondaryHover} ${secondaryPressed}`,
			link: `${linkDefault} ${linkHover} ${linkPressed}`,
			ghost: `${ghostDefault} ${ghostHover} ${ghostPressed}`,
			processing: `${processingDefault}`
		},
		full: {
			true: 'w-full',
			false: 'w-auto'
		}
	},
	defaultVariants: {
		variant: 'secondary',
		full: true
	}
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
