<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <ActionList :error="error" :is-loading="isLoading" :page="pageResponse" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import type { SavedBoardAction } from '@/models/board.action.model'
  import type { ErrorResponse, PageResponse } from '@/models/http.models'
  import { onMounted, onUnmounted, ref } from 'vue'
  import ActionList from '@/components/ActionList.vue'
  import { Page, useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  const page = ref(0)
  const size = ref(10)

  const isLoading = ref(true)
  const error = ref<ErrorResponse | undefined>()

  const pageResponse = ref<PageResponse<SavedBoardAction>>()

  onMounted(() => {
    appStore.setPage(Page.HOME)
    isLoading.value = true
    appStore.fetchActionsPage(page.value, size.value).then(
      result => {
        pageResponse.value = result
      },
    ).catch(
      error_ => {
        error.value = error_
      },
    ).finally(() => {
      isLoading.value = false
    })
  })

  onUnmounted(() => {
    appStore.resetPage()
  })
</script>

<style scoped lang="sass">
</style>
