import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

export default mergeConfig(
	defineConfig({
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	}),
	defineVitestConfig({
		test: {
			environment: 'jsdom',
			globals: true,
			setupFiles: './src/setupTests.ts',
			coverage: {
				provider: 'v8',
				reporter: ['text', 'json', 'html'],
			},
		},
	})
);

