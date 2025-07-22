import type { SavedBoardAction } from '@/models/board.action.model'
// Utilities
import { defineStore } from 'pinia'
import { createApiClient } from '@/api/backend.client'

export enum Page {
  HOME, ACTION,
}

export interface AppState {
  page: Page | null
  action: SavedBoardAction | undefined | null
}

const backendAPI = createApiClient(import.meta.env.VITE_BACKEND_BASE_URL, import.meta.env.VITE_BACKEND_MOCK_API)

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    page: null,
    action: null,
  }),
  actions: {
    setPage (page: Page | null) {
      this.page = page
    },
    resetPage () {
      this.page = null
    },

    setAction (action: SavedBoardAction | null) {
      this.action = action
    },
    resetAction () {
      this.action = null
    },

    async fetchActionsPage (page: number, size: number) {
      return backendAPI.get(page, size)
    },
  },
})
