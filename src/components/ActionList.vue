<template>
  <div v-if="!isLoading && pageResponse != null">
    <v-card prepend-icon="mdi-account" title="My Actions">
      <v-card-text>
        <v-list v-if="pageResponse.data.length > 0" density="compact">
          <v-list-item
            v-for="(action, i) in pageResponse.data"
            :key="i"
            color="primary"
            rounded="xl"
            :value="action"
            @click="onActionClicked(action)"
          >
            <template #prepend>
              <v-icon icon="mdi-soccer" />
            </template>
            <v-list-item-title>
              {{ action.highlight }}: {{ action.partialResult.myTeam }} - {{ action.partialResult.opponentTeam }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ action.createdAt }}</v-list-item-subtitle>
            <v-tooltip activator="parent" text="Go to action" />
          </v-list-item>
        </v-list>
      </v-card-text>
      <p v-if="pageResponse.data.length === 0">No actions found</p>
      <v-pagination
        v-model="currentPage"
        class="my-4"
        :length="pageResponse.totalPages"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        rounded="circle"
        @update:model-value="pageChanged"
      />
    </v-card>
  </div>

  <div v-if="isLoading">
    <v-skeleton-loader type="list-item-avatar" />
    <v-skeleton-loader type="list-item-avatar" />
    <v-skeleton-loader type="list-item-avatar" />
  </div>
</template>

<script setup lang="ts">
  import type { BoardAction } from '@/models/board.action.model'
  import { ErrorResponse, PageRequest, PageResponse } from '@/models/http.models'
  import router from '@/router'
  import { useAppStore } from '@/stores/app'

  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: true,
    },
    pageResponse: {
      type: PageResponse<BoardAction>,
      default: null,
    },
    error: {
      type: ErrorResponse,
      default: null,
    },
  })

  const emits = defineEmits<{
    'page-request-changed': [newPageRequest: PageRequest]
  }>()

  const appStore = useAppStore()

  const currentPage = ref(props.pageResponse?.page)

  const onActionClicked = (action: BoardAction): void => {
    appStore.setBoardAction(action)
    router.push('/actions')
  }

  const pageChanged = (newPage: number): void => {
    emits('page-request-changed', new PageRequest(newPage - 1, props.pageResponse!.size))
  }
</script>

<style scoped lang="sass">

</style>
