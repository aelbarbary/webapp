import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), VitePWA({
    registerType: 'autoUpdate', injectRegister: 'auto',
    devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'AI',
      short_name: 'Ai',
      description: "",
      theme_color: '#e10098',
      icons: [
        {
          src: '/192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: '/512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  server: {
    port: 3000,
  },
});