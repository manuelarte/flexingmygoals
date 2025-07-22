<template>
  <v-list v-if="!isLoading && page != null" density="compact">
    <v-list-subheader>My Actions</v-list-subheader>

    <v-list-item
      v-for="(action, i) in page.data"
      :key="i"
      color="primary"
      rounded="xl"
      :value="action"
      @click="router.push('/actions')"
    >
      <template #prepend>
        <v-icon icon="mdi-soccer" />
      </template>

      <v-list-item-title>{{ action.createdAt }}</v-list-item-title>
      <v-list-item-subtitle>{{ action.createdBy }}</v-list-item-subtitle>
    </v-list-item>
  </v-list>

  <div v-if="isLoading">
    <v-skeleton-loader type="list-item-avatar" />
    <v-skeleton-loader type="list-item-avatar" />
    <v-skeleton-loader type="list-item-avatar" />
  </div>
</template>

<script setup lang="ts">
  import type { SavedBoardAction } from '@/models/board.action.model.ts'
  import { ErrorResponse, PageResponse } from '@/models/http.models.ts'
  import router from '@/router'

  defineProps({
    isLoading: {
      type: Boolean,
      default: true,
    },
    page: {
      type: PageResponse<SavedBoardAction>,
      default: null,
    },
    error: {
      type: ErrorResponse,
      default: null,
    },
  })
</script>

<style scoped lang="sass">

</style>
