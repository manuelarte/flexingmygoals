<template>
  <PlayBar
    :is-playing="isPlaying"
    :time="time"
    @time-changed="time = $event"
    @toggle-play="onTogglePlay"
  />
  <Board />
</template>

<script lang="ts" setup>
  const isPlaying = ref(false)
  const time = ref(0.3)

  const onTogglePlay = (newValue: boolean) => {
    isPlaying.value = newValue
  }
</script>
