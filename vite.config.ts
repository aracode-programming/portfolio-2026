// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ネットワーク経由でのアクセスを許可
    port: 5173, // ポートを5173に固定
    strictPort: false, // 5173が埋まっていたら自動でずらす
    watch: {
      usePolling: true, // ファイル変更を確実に検知させる
    }
  }
})