<template>
  <v-card>
    <template #title>
      <span class="font-weight-black">Action Board</span>
    </template>

    <v-card-text v-if="!action" class="pt-4 font-italic">
      Select one action...
    </v-card-text>
    <v-card-text v-if="action" class="pt-4 font-weight-bold">
      Action selected
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import type { IBoardAction } from '@/types/board.action.types'

  defineProps({
    action: {
      type: Object as PropType<IBoardAction> | null,
    },
  })
</script>

<style scoped lang="sass">

</style>
