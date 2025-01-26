import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), visualizer({ open: true })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ...renderChunks(dependencies),
                },
            },
        },
    },
});

function renderChunks(deps: Record<string, string>) {
    const chunks: Record<string, string[]> = {};
    Object.keys(deps).forEach(key => {
        if (!['react', 'react-router-dom', 'react-dom'].includes(key)) {
            chunks[key as keyof typeof chunks] = [key];
        }
    });
    return chunks;
}
