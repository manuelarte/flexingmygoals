import type { SavedBoardAction } from '@/models/board.action.model'
// Utilities
import { defineStore } from 'pinia'
import { createApiClient } from '@/api/backend.client'

export enum Page {
  HOME, BOARD_ACTION,
}

export interface AppState {
  page: Page | null
  boardAction: SavedBoardAction | undefined | null
}

const backendAPI = createApiClient(import.meta.env.VITE_BACKEND_BASE_URL, import.meta.env.VITE_BACKEND_MOCK_API)

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    page: null,
    boardAction: null,
  }),
  actions: {
    setPage (page: Page | null) {
      this.page = page
    },
    resetPage () {
      this.page = null
    },

    setBoardAction (action: SavedBoardAction | null) {
      this.boardAction = action
    },
    resetBoardAction () {
      this.boardAction = null
    },

    async fetchActionsPage (page: number, size: number) {
      return backendAPI.get(page, size)
    },
  },
})
