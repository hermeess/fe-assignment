import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (/\/(react|react-dom|scheduler)\//.test(id)) return 'framework'
          if (
            /\/(?:@reduxjs\/toolkit|react-redux|redux|redux-persist|@tanstack\/query-core|@tanstack\/react-query)\//.test(
              id,
            )
          ) {
            return 'data-vendor'
          }
          if (/\/(?:antd|@ant-design|@rc-component|rc-[^/]+|dayjs)\//.test(id)) {
            return 'ui-vendor'
          }
        },
      },
    },
  },
  // Optional: use the Node mock server instead of MSW.
  // server: { proxy: { '/api': 'http://localhost:4010' } },
})
