<template>
  <v-container>
    <v-slider
      append-icon="mdi-replay"
      max="1"
      min="0"
      :model-value="timeValue"
      thumb-label="always"
      @click:append="resetTime"
      @update:model-value="changeTime"
    >
      <template #prepend>
        <v-btn
          :disabled="timeValue >= 1"
          :icon="getPlayBarIcon()"
          size="x-small"
          variant="text"
          @click="changeIsPlaying(!isPlaying)"
        />
      </template>
    </v-slider>
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
        return value >= 0 && value <= 1
      },
    },
  })

  const emits = defineEmits(
    {
      'time-changed': (newTime: number) => {
        return newTime >= 0 && newTime <= 1
      },
      'toggle-play': (_: boolean) => true,
    },
  )

  onBeforeUnmount(() => {
    if (intervalId != null) {
      clearInterval(intervalId)
    }
  })

  onMounted(() => {
    intervalId = setInterval(() => {
      if (props.isPlaying && timeValue.value < 1) {
        changeTime(timeValue.value + (delta / timeDuration))
      }
      if (timeValue.value >= 1) {
        changeIsPlaying(false)
        changeTime(1)
      }
    }, delta)
  })

  const timeDuration = 5000 // 5 seconds
  const delta = 100 // 100 milliseconds

  const timeValue = ref(props.time)
  let intervalId: ReturnType<typeof setInterval> | null = null

  const changeIsPlaying = (newValue: boolean): void => {
    emits('toggle-play', newValue)
  }

  const getPlayBarIcon = (): string => {
    return props.isPlaying ? 'mdi-pause' : 'mdi-play'
  }

  const changeTime = (newValue: number): void => {
    timeValue.value = Number.parseFloat(newValue.toFixed(2))
    emits('time-changed', newValue)
  }

  const resetTime = (): void => {
    changeIsPlaying(false)
    changeTime(0)
  }
</script>

<style scoped lang="sass">
</style>
