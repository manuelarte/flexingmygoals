<template>
  <v-main>
    <v-toolbar :elevation="8" :title="getTitle()">
      <template #prepend>
        <v-btn
          v-if="isBackEnabled()"
          icon="mdi-arrow-left"
          @click="onBackClicked()"
        />
      </template>

      <v-btn v-if="isEditEnabled()" icon="mdi-pencil" @click="emits('button:edit-clicked')" />
      <v-btn v-if="isSaveEnabled()" icon="mdi-save" @click="emits('button:save-clicked')" />
    </v-toolbar>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script lang="ts" setup>
  import router from '@/router'
  import { Page, useAppStore } from '@/stores/app'

  const emits = defineEmits<{
    // Event to notify the parent component that the edit button has been clicked
    'button:edit-clicked': [void]
    // Event to notify the parent component that the save button has been clicked
    'button:save-clicked': [void]
  }>()

  const appStore = useAppStore()

  const getTitle = (): string => {
    switch (appStore.page) {
      case Page.BOARD_ACTION: {
        return 'Action'
      }
      case Page.HOME: {
        return 'Home'
      }
      default: {
        return import.meta.env.VITE_APP_TITLE
      }
    }
  }

  const isBackEnabled = (): boolean => {
    return isPage(Page.HOME)
  }

  const isEditEnabled = (): boolean => {
    return isPage(Page.BOARD_ACTION)
  }

  const isSaveEnabled = (): boolean => {
    return isPage(Page.BOARD_ACTION_EDIT)
  }

  const isPage = (page: Page): boolean => {
    return appStore?.page == page
  }

  /**
   * Method to handle the back button click event.
   */
  const onBackClicked = (): void => {
    switch (appStore.page) {
      case Page.BOARD_ACTION: {
        router.push('/')
      }
    }
  }
</script>
