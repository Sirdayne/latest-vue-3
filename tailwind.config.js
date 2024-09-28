const animate = require('tailwindcss-animate');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	safelist: ['dark'],
	prefix: '',
	content: ['./src/**/*.{ts,tsx,vue}'],
	theme: {
		screens: {
			xs: '360px',
			sm: '568px',
			md: '964px',
			lg: '1400px'
		},
		extend: {
			fontFamily: {
				cairo: '"Cairo", sans-serif;'
			},
			fontSize: {
				10: '0.625rem',
				11: '0.6875rem',
				12: '0.75rem',
				13: '0.8125rem',
				14: '0.875rem',
				15: '0.9375rem',
				16: '1rem',
				17: '1.0625rem',
				18: '1.125rem',
				19: '1.1875rem',
				20: '1.25rem',
				22: '1.375rem',
				24: '1.5rem',
				28: '1.75rem',
				32: '2rem'
			},
			lineHeight: {
				multiline: 1.35
			},
			colors: {
				white: {
					DEFAULT: '#ffffff',
					10: 'rgba(255, 255, 255, 0.10)',
					30: 'rgba(255, 255, 255, 0.30)',
					40: 'rgba(255, 255, 255, 0.40)',
					50: 'rgba(255, 255, 255, 0.50)',
					70: 'rgba(255, 255, 255, 0.70)'
				},
				black: {
					DEFAULT: '#000000',
					10: 'rgba(0, 0, 0, 0.10)',
					30: 'rgba(0, 0, 0, 0.30)'
				},
				yellow: {
					DEFAULT: '#FFCC29'
				},
				blue: {
					DEFAULT: '#007AFF'
				},
				orange: {
					DEFAULT: '#FF814B'
				},
				gray: {
					DEFAULT: '#212330',
					light: '#41424E',
					lighter: '#2C2E3B',
					lightest: '#8E8E93',
					tooltip: '#C4C7D7'
				},
				green: {
					DEFAULT: '#00FF38',
					80: 'rgba(0, 255, 56, 0.80)'
				},
				violet: {
					DEFAULT: '#9952FF'
				},
				button: {
					'link-from': '#0062CC',
					'link-to': '#007AFF',
					'link-hover-from': '#3481D7',
					'link-hover-to': '#3495FF',
					'primary-from': '#FFC700',
					'primary-to': '#FFE142',
					'primary-hover-from': '#FFD234',
					'primary-hover-to': '#FFE767',
					'secondary-from': '#2E3142',
					'secondary-to': '#3E4258',
					'secondary-hover-from': '#434555',
					'secondary-hover-to': '#515568'
				}
			}
		},
		borderRadius: {
			...defaultTheme.borderRadius,
			'3xl': '1.25rem',
			inherit: 'inherit'
		},
		keyframes: {
			'accordion-down': {
				from: { height: 0 },
				to: { height: 'var(--radix-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: 0 }
			},
			'collapsible-down': {
				from: { height: 0 },
				to: { height: 'var(--radix-collapsible-content-height)' }
			},
			'collapsible-up': {
				from: { height: 'var(--radix-collapsible-content-height)' },
				to: { height: 0 }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'collapsible-down': 'collapsible-down 0.2s ease-in-out',
			'collapsible-up': 'collapsible-up 0.2s ease-in-out'
		}
	},
	plugins: [animate]
};
