<template>
  <div v-if="!isLoading && pageResponse != null">
    <v-card prepend-icon="mdi-account" title="My Actions">
      <v-card-text>
        <v-list v-if="pageResponse.content.length > 0" density="compact">
          <v-list-item
            v-for="(action, i) in pageResponse.content"
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
      <p v-if="pageResponse.content.length === 0">No actions found</p>
      <v-pagination
        v-model="currentPage"
        class="my-4"
        :length="pageResponse.page.totalPages"
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
  import type { ErrorResponse, PageResponse } from '@/models/http.models'
  import { PageRequest } from '@/models/http.models'
  import router from '@/router'
  import { useAppStore } from '@/stores/app'

  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: true,
    },
    pageResponse: {
      type: Object as PropType<PageResponse<BoardAction> | null>,
      default: null,
    },
    error: {
      type: Object as PropType<ErrorResponse | null>,
      default: null,
    },
  })

  const emits = defineEmits<{
    // Event to notify the parent component that the page request has changed
    'action-list:page-request-changed': [newPageRequest: PageRequest]
  }>()

  /** The pinia store, used to store the board action */
  const appStore = useAppStore()

  /** The current page number */
  const currentPage = ref(props.pageResponse?.page.number)

  function pageChanged (newPage: number): void {
    emits('action-list:page-request-changed', new PageRequest(newPage - 1, props.pageResponse!.page.size))
  }

  /**
   * Method to handle the click event on an action.
   * It navigates to the action details page and sets the board action in the store.
   */
  function onActionClicked (action: BoardAction): void {
    appStore.setBoardAction(action)
    router.push('/actions')
  }
</script>

<style scoped lang="sass">

</style>
