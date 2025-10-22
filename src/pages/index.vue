<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="4">
        <ActionList @action:selected="onActionSelected" />
      </v-col>
      <v-col>
        <ActionBoard :action="action" class="action" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import type { IBoardAction } from '@/types/board.action.types.ts'

  const action = ref<IBoardAction | undefined>()

  function onActionSelected (event: IBoardAction) {
    action.value = event
  }
</script>

<style scoped lang="sass">
.action
  height: auto
  min-height: 85vh
</style>
