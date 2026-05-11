import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) return 'animation'
            if (id.includes('embla-carousel')) return 'carousel'
            if (id.includes('react-hook-form') || id.includes('@emailjs')) return 'forms'
          }
        },
      },
    },
  },
})
