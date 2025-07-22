<template>
  <div v-if="!isLoading && pageResponse != null">
    <v-list density="compact">
      <v-list-subheader>My Actions</v-list-subheader>

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

        <v-list-item-title>{{ action.createdAt }}</v-list-item-title>
        <v-list-item-subtitle>{{ action.createdBy }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-pagination
      v-model="currentPage"
      class="my-4"
      :length="pageResponse.totalPages"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
      rounded="circle"
    />
  </div>

  <div v-if="isLoading">
    <v-skeleton-loader type="list-item-avatar" />
    <v-skeleton-loader type="list-item-avatar" />
    <v-skeleton-loader type="list-item-avatar" />
  </div>
</template>

<script setup lang="ts">
  import type { SavedBoardAction } from '@/models/board.action.model'
  import { ErrorResponse, PageResponse } from '@/models/http.models'
  import router from '@/router'
  import { useAppStore } from '@/stores/app'

  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: true,
    },
    pageResponse: {
      type: PageResponse<SavedBoardAction>,
      default: null,
    },
    error: {
      type: ErrorResponse,
      default: null,
    },
  })

  const appStore = useAppStore()

  const currentPage = ref(props.pageResponse?.page)

  const onActionClicked = (action: SavedBoardAction): void => {
    appStore.setAction(action)
    router.push('/actions')
  }
</script>

<style scoped lang="sass">

</style>
