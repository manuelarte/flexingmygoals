<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <ActionList
          :error="error"
          :is-loading="isLoading"
          :page-response="pageResponse"
          @action-list:page-request-changed="onPageRequestChanged($event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import type { BoardAction } from '@/models/board.action.model'
  import type { ErrorResponse, PageResponse } from '@/models/http.models'
  import { onMounted, onUnmounted, ref } from 'vue'
  import ActionList from '@/components/ActionList.vue'
  import { PageRequest } from '@/models/http.models'
  import { Page, useAppStore } from '@/stores/app'

  /** The pinia store, used to store the board action */
  const appStore = useAppStore()

  const pageRequest = ref(new PageRequest(0, 10))

  const isLoading = ref(true)
  const error = ref<ErrorResponse | null>(null)

  const pageResponse = ref<PageResponse<BoardAction>>()

  // Lifecycle Hooks

  /**
   * Sets the page to home and fetches the actions.
   */
  onMounted(() => {
    appStore.setPage(Page.HOME)
    fetchActions(pageRequest.value)
  })

  onUnmounted(() => {
    appStore.resetPage()
  })

  function fetchActions (pageRequest: Readonly<PageRequest>): void {
    isLoading.value = true
    appStore.fetchActionsPage(pageRequest.page, pageRequest.size).then(
      result => {
        pageResponse.value = result
      },
    ).catch(
      error_ => {
        error.value = error_
      },
    ).finally(() => isLoading.value = false)
  }

  function onPageRequestChanged (newPageRequest: PageRequest): void {
    fetchActions(newPageRequest)
  }
</script>

<style scoped lang="sass">
</style>
