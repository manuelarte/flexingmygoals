<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <v-list>
          <v-list-subheader>My Goals</v-list-subheader>

          <v-list-item
            v-for="(action, i) in page.data"
            :key="i"
            color="primary"
            rounded="xl"
            :value="action"
          >
            <template #prepend>
              <v-icon icon="mdi-soccer" />
            </template>
            <v-list-item-title>{{ action.createdAt }} {{ action.id }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
  Hello from home/index.vue
</template>

<script lang="ts" setup>
  import type { SavedBoardAction } from '@/models/board.action.model.ts'
  import type { Page } from '@/models/http.models.ts'
  import { SavedExample1 } from '@/models/board.example.ts'

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
