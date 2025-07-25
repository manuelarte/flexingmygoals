<template>
  <v-container class="fill-height">
    <v-row no-gutters rows="12">
      <div class="board">
        <Board :board-action="boardAction" :time="time" />
      </div>
      <div class="slider">
        <PlayBar
          :is-playing="isPlaying"
          :time="time"
          @time-changed="onTimeChanged"
          @toggle-play="onTogglePlay"
        />
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { onBeforeMount, onUnmounted } from 'vue'
  import router from '@/router'
  import { Page, useAppStore } from '@/stores/app.ts'

  const appStore = useAppStore()

  const boardAction = ref()
  const isPlaying = ref(false)
  const time = ref(0)

  const onTimeChanged = (newValue: number) => {
    time.value = newValue
  }

  const onTogglePlay = (newValue: boolean) => {
    isPlaying.value = newValue
  }

  onBeforeMount(() => {
    if (appStore.boardAction == null) {
      router.push('/')
    } else {
      boardAction.value = appStore.boardAction!
    }
  })

  onMounted(() => {
    appStore.setPage(Page.BOARD_ACTION)
  })

  onUnmounted(() => {
    appStore.resetPage()
    appStore.setBoardAction(null)
  })
</script>

<style scoped lang="sass">
  .board
    height: 70vh
    width: 100%
  .slider
    width: 100%
</style>
