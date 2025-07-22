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
  import type { SavedBoardAction } from '@/models/board.action.model.ts'
  import type { ErrorResponse } from '@/models/http.models.ts'
  import { onMounted, onUnmounted } from 'vue'
  import ActionList from '@/components/ActionList.vue'
  import { SavedExample1 } from '@/models/board.example.ts'
  import { PageResponse } from '@/models/http.models.ts'
  import { Page, useAppStore } from '@/stores/app.ts'

  const appStore = useAppStore()

  const page = ref(0)
  const size = ref(0)

  const _data: Array<SavedBoardAction> = [SavedExample1]
  const isLoading = ref(false)
  const error = ref<ErrorResponse | undefined>()

  const pageResponse = computed(() => {
    return new PageResponse<SavedBoardAction>(page.value, size.value, _data)
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
