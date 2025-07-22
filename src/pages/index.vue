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
  import type { ErrorResponse } from '@/models/http.models'
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import ActionList from '@/components/ActionList.vue'
  import { SavedExample1 } from '@/models/board.example'
  import { PageResponse } from '@/models/http.models'
  import { Page, useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  const page = ref(0)
  const size = ref(10)

  const _data: Array<SavedBoardAction> = [SavedExample1]
  const isLoading = ref(false)
  const error = ref<ErrorResponse | undefined>()

  const pageResponse = computed(() => {
    return new PageResponse<SavedBoardAction>(page.value, size.value, 1, 0, _data)
  })

  onMounted(() => {
    appStore.setPage(Page.HOME)
  })

  onUnmounted(() => {
    appStore.resetPage()
  })
</script>

<style scoped lang="sass">
</style>
