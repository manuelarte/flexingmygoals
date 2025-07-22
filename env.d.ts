/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BACKEND_BASE_URL: string
  readonly VITE_BACKEND_MOCK_API?: boolean
}
