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
    </v-toolbar>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script lang="ts" setup>
  import router from '@/router'
  import { Page, useAppStore } from '@/stores/app.ts'

  const appStore = useAppStore()

  const getTitle = (): string => {
    switch (appStore.page) {
      case Page.ACTION: {
        return 'Action'
      }
      case Page.HOME: {
        return 'Home'
      }
      default: {
        return 'Flexing My Goals'
      }
    }
  }

  const isBackEnabled = (): boolean => {
    return appStore.page != null && appStore.page != Page.HOME
  }

  const onBackClicked = (): void => {
    switch (appStore.page) {
      case Page.ACTION: {
        router.push('/')
      }
    }
  }
</script>
