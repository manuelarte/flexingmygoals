<template>
  <v-list density="compact">
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
</template>

<script setup lang="ts">
  import type { SavedBoardAction } from '@/models/board.action.model.ts'
  import type { Page } from '@/models/http.models.ts'
  import { SavedExample1 } from '@/models/board.example.ts'
  import router from '@/router'

  const page: Page<SavedBoardAction> = {
    page: 0,
    size: 1,
    data: [
      SavedExample1,
    ],
  }
</script>

<style scoped lang="sass">

</style>
