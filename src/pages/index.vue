<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <ActionList
          :error="error"
          :is-loading="isLoading"
          :page-response="pageResponse"
          @page-request-changed="onPageRequestChanged($event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import type { SavedBoardAction } from '@/models/board.action.model'
  import type { ErrorResponse, PageResponse } from '@/models/http.models'
  import { onMounted, onUnmounted, ref } from 'vue'
  import ActionList from '@/components/ActionList.vue'
  import { PageRequest } from '@/models/http.models'
  import { Page, useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  const pageRequest = ref(new PageRequest(0, 10))

  const isLoading = ref(true)
  const error = ref<ErrorResponse | undefined>()

  const pageResponse = ref<PageResponse<SavedBoardAction>>()

  onMounted(() => {
    appStore.setPage(Page.HOME)
    fetchActions(pageRequest.value)
  })

  const onPageRequestChanged = (newPageRequest: PageRequest): void => {
    fetchActions(newPageRequest)
  }

  const fetchActions = (pageRequest: PageRequest): void => {
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

  onUnmounted(() => {
    appStore.resetPage()
  })
</script>

<style scoped lang="sass">
</style>
