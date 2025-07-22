/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />
interface ImportMetaEnv {
  readonly BACKEND_BASE_URL: string
  readonly BACKEND_MOCK_API?: boolean
}
