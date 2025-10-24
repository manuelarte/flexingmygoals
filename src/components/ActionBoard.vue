<template>
  <v-card>
    <template #title>
      <span class="font-weight-black">Action Board</span>
    </template>

    <v-card-text v-if="!action" class="pt-4 font-italic">
      Select one action...
    </v-card-text>
    <v-card-text v-if="action" class="pt-4 font-weight-bold">
      <Board :action-time="actionTime" :board-action="action" />
      <BoardProgressBar
        :action-time="actionTime"
        :is-playing="isPlaying"
        @time-changed="onTimeChanged"
        @toggle-play="onTogglePlay"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import type { IBoardAction } from '@/types/board.action.types'
  import Board from '@/components/Board.vue'

  const props = defineProps({
    action: {
      type: Object as PropType<IBoardAction> | null,
    },
  })

  watch(() => props.action, (_first, _second) => {
    isPlaying.value = false
    actionTime.value = 0
  })

  const isPlaying = ref(false)
  const actionTime = ref(0)

  /**
   * Event handler for the action time-changed event.
   * Updates the time value.
   * @param newValue the new value between [0, 1].
   */
  function onTimeChanged (newValue: number) {
    actionTime.value = newValue
  }

  /**
   * Event handler for the action play toggled event.
   * Updates the isPlaying value.
   * @param newValue whether the action is playing or not.
   */
  function onTogglePlay (newValue: boolean) {
    isPlaying.value = newValue
  }
</script>

<style scoped lang="sass">

</style>
