<template>
  <PlayBar
    :is-playing="isPlaying"
    :time="time"
    @time-changed="onTimeChanged"
    @toggle-play="onTogglePlay"
  />
  <Board :time="time" />
</template>

<script lang="ts" setup>
  const isPlaying = ref(false)
  const time = ref(0.1)

  const onTimeChanged = (newValue: number) => {
    time.value = newValue
  }

  const onTogglePlay = (newValue: boolean) => {
    isPlaying.value = newValue
  }
</script>
