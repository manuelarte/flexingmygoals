<template>
  <PlayBar
    :is-playing="isPlaying"
    :time="time"
    @time-changed="onTimeChanged"
    @toggle-play="onTogglePlay"
  />
  <Board :action="Example1" :time="time" />
</template>

<script lang="ts" setup>
  import { Example1 } from '@/models/board.example.ts'

  const isPlaying = ref(false)
  const time = ref(0)

  const onTimeChanged = (newValue: number) => {
    time.value = newValue
  }

  const onTogglePlay = (newValue: boolean) => {
    isPlaying.value = newValue
  }
</script>
