<template>
  <v-container>
    <v-slider
      append-icon="mdi-replay"
      max="1"
      min="0"
      :model-value="timeValue"
      :prepend-icon="getPlayBarIcon()"
      thumb-label="always"
      @click:append="resetTime"
      @click:prepend="changeIsPlaying(!isPlaying)"
      @update:model-value="timeChanged"
    />
  </v-container>
</template>

<script setup lang="ts">

  const props = defineProps({
    isPlaying: {
      type: Boolean,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      validator (value: number, _: any): boolean {
        return value >= 0 && value <= 100
      },
    },
  })

  const emits = defineEmits(
    {
      'toggle-play': (_: boolean) => true,
      'time-changed': (newTime: number) => {
        return newTime >= 0 && newTime <= 100
      },
    },
  )

  const timeValue = ref(props.time)

  const changeIsPlaying = (newValue: boolean): void => {
    emits('toggle-play', newValue)
  }

  const getPlayBarIcon = (): string => {
    return props.isPlaying ? 'mdi-pause' : 'mdi-play'
  }

  const timeChanged = (newValue: number): void => {
    timeValue.value = newValue // needed to update the slider
    emits('time-changed', newValue)
  }

  const resetTime = (): void => {
    changeIsPlaying(false)
    timeChanged(0)
  }
</script>

<style scoped lang="sass">
</style>
