// Utilities
import { defineStore } from 'pinia'
import { createApiClient } from '@/api/backend.client.ts'

export enum Page {
  HOME, ACTION,
}

export interface AppState {
  page: Page | null
}

const backendAPI = createApiClient(import.meta.env.BACKEND_MOCK_API || true)

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    page: null,
  }),
  actions: {
    setPage (page: Page | null) {
      this.page = page
    },
    resetPage () {
      this.page = null
    },

    async fetchActionsPage (page: number, size: number) {
      return backendAPI.get(page, size)
    },
  },
})
