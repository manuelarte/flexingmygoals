<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="4">
        <v-row class="ma-auto w-100">
          <ActionsList class="w-100" @action:selected="onActionSelected" />
        </v-row>
        <v-row v-if="action" class="ma-auto w-100 overflow-scroll">
          <ActionNewEdit :action="action" class="w-100" />
        </v-row>
      </v-col>
      <v-col>
        <ActionBoard :action="action" class="action h-auto ma-auto" />
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
  min-height: 86vh
</style>
