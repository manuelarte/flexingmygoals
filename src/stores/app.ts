// Utilities
import { defineStore } from 'pinia'

export enum Page {
  HOME, ACTION,
}

export interface AppState {
  page: Page | null
}

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
  },
})
