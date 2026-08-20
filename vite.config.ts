import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(async (): Promise<UserConfig> => {
  const plugins: UserConfig['plugins'] = [react(), tailwindcss()]
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js')
    plugins?.push(m.sourceTags())
  } catch {
    /* optional arena source tags */
  }
  return {
    plugins,
    server: {
      host: true,
      port: 5173,
      allowedHosts: true,
    },
    preview: {
      host: true,
      allowedHosts: true,
    },
  }
})
