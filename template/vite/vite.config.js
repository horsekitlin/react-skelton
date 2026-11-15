import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src');

// 對應 jsconfig.json 的 baseUrl: src，讓 src 底下的目錄與檔案可用絕對路徑 import
const srcAliases = fs.readdirSync(srcDir).map((name) => {
  const moduleName = path.parse(name).name;
  return {
    find: new RegExp(`^${moduleName}(?=/|$)`),
    replacement: path.join(srcDir, moduleName),
  };
});

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: srcAliases,
  },
  build: {
    // ApexCharts 核心本身約 800 kB 且已延遲載入，故將警告門檻設為 900 kB
    chunkSizeWarningLimit: 900,
    rolldownOptions: {
      output: {
        // 將不常變動的第三方套件拆成獨立 chunk：入口檔變小，且改動程式碼時可沿用瀏覽器快取
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/ },
            { name: 'vendor-mui', test: /node_modules[\\/](@mui|@emotion)[\\/]/ },
            { name: 'vendor-motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: 'vendor-charts', test: /node_modules[\\/](apexcharts|react-apexcharts)[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
