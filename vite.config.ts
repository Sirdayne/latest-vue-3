import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VueI18nPlugin({
			include: path.resolve(__dirname, './src/locales/**')
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		outDir: 'dist',
		cssCodeSplit: false,
		minify: process.env.NODE_ENV === 'production',
		sourcemap: process.env.NODE_ENV !== 'production',
		rollupOptions: {
			input: {
				'lobby-bundle': './src/hub.js',
				lobby: 'lobby.html'
			},
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: 'assets/[name].[ext]'
			}
		}
	},
	experimental: {
		renderBuiltUrl(filename) {
			return './' + filename;
		}
	}
});
