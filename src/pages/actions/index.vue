<template>
  <v-container class="fill-height">
    <v-row no-gutters rows="12">
      <div class="board">
        <Board :action="Example1" :time="time" />
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
  import { onMounted, onUnmounted } from 'vue'
  import { Example1 } from '@/models/board.example.ts'
  import { Page, useAppStore } from '@/stores/app.ts'

  const appStore = useAppStore()

  const isPlaying = ref(false)
  const time = ref(0)

  const onTimeChanged = (newValue: number) => {
    time.value = newValue
  }

  const onTogglePlay = (newValue: boolean) => {
    isPlaying.value = newValue
  }

  onMounted(() => {
    appStore.setPage(Page.ACTION)
  })

  onUnmounted(() => {
    appStore.resetPage()
  })
</script>

<style scoped lang="sass">
  .board
    height: 70vh
    width: 100%
  .slider
    width: 100%
</style>
