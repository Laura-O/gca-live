/** @type {import('tailwindcss').Config} */
export default {
	content: ['src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			// Modern color palette
			colors: {
				// Primary brand colors with modern gradient-friendly shades
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49'
				},
				// Accent colors for highlights
				accent: {
					50: '#fdf4ff',
					100: '#fae8ff',
					200: '#f5d0fe',
					300: '#f0abfc',
					400: '#e879f9',
					500: '#d946ef',
					600: '#c026d3',
					700: '#a21caf',
					800: '#86198f',
					900: '#701a75'
				},
				// Modern neutral palette
				neutral: {
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#e5e5e5',
					300: '#d4d4d4',
					400: '#a3a3a3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717',
					950: '#0a0a0a'
				}
			},
			// Modern gradient presets
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
				'gradient-accent': 'linear-gradient(135deg, #d946ef 0%, #a21caf 100%)',
				'gradient-mesh':
					'radial-gradient(at 40% 20%, #0ea5e9 0px, transparent 50%), radial-gradient(at 80% 0%, #d946ef 0px, transparent 50%), radial-gradient(at 0% 50%, #0369a1 0px, transparent 50%)'
			},
			// Modern shadow system
			boxShadow: {
				soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				glow: '0 0 15px rgba(14, 165, 233, 0.5)',
				'glow-accent': '0 0 15px rgba(217, 70, 239, 0.5)',
				'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				card: '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.04)',
				'card-hover':
					'0 10px 40px -10px rgba(14, 165, 233, 0.3), 0 20px 50px -10px rgba(0, 0, 0, 0.2)'
			},
			// Design tokens for consistent spacing
			spacing: {
				'footer-offset': '6rem'
			},
			// Custom max widths
			maxWidth: {
				card: '28rem'
			},
			// Custom transition durations
			transitionDuration: {
				page: '150ms'
			},
			// Custom z-index values
			zIndex: {
				'skip-link': '50',
				toast: '50',
				modal: '40'
			},
			// Modern typography
			fontFamily: {
				sans: [
					'Inter var',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif'
				],
				display: ['Cal Sans', 'Inter var', 'system-ui', 'sans-serif']
			},
			// Animation
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.4s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				shimmer: 'shimmer 2s linear infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				}
			},
			// Backdrop blur for glassmorphism
			backdropBlur: {
				xs: '2px'
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#0ea5e9',
					'primary-content': '#ffffff',
					secondary: '#d946ef',
					'secondary-content': '#ffffff',
					accent: '#0369a1',
					'accent-content': '#ffffff',
					neutral: '#262626',
					'neutral-content': '#fafafa',
					'base-100': '#ffffff',
					'base-200': '#f5f5f5',
					'base-300': '#e5e5e5',
					'base-content': '#171717',
					info: '#0ea5e9',
					success: '#10b981',
					warning: '#f59e0b',
					error: '#ef4444'
				},
				dark: {
					primary: '#38bdf8',
					'primary-content': '#0c4a6e',
					secondary: '#e879f9',
					'secondary-content': '#701a75',
					accent: '#0ea5e9',
					'accent-content': '#082f49',
					neutral: '#171717',
					'neutral-content': '#fafafa',
					'base-100': '#0a0a0a',
					'base-200': '#171717',
					'base-300': '#262626',
					'base-content': '#fafafa',
					info: '#38bdf8',
					success: '#34d399',
					warning: '#fbbf24',
					error: '#f87171'
				}
			}
		]
	}
};
