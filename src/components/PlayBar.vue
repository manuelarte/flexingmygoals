<template>
  <v-container>
    <v-slider
      append-icon="mdi-replay"
      max="1"
      min="0"
      :model-value="timeValue"
      show-ticks="always"
      thumb-label="always"
      :ticks="getTimePositions(playerSelected)"
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
  import type { BoardActorAction, BoardPlayer } from '@/models/board.action.model'
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  // Constants - moved to top for better organization
  const TIME_DURATION = 5000 // 5 seconds
  const DELTA = 10 // 10 milliseconds

  const props = defineProps({
    isPlaying: {
      type: Boolean,
      required: true,
    },
    playerSelected: {
      type: Object as PropType<BoardActorAction<BoardPlayer>>,
      required: false,
    },
    time: {
      type: Number,
      required: true,
      validator (value: number): boolean {
        return value >= 0 && value <= 1
      },
    },
  })

  const emits = defineEmits<{
    'time-changed': [newTime: number]
    'toggle-play': [isPlaying: boolean]
  }>()

  // Reactive state
  const timeValue = ref(props.time)
  let intervalId: ReturnType<typeof setInterval> | null = null

  // Methods
  const changeIsPlaying = (newValue: boolean): void => {
    emits('toggle-play', newValue)
  }

  const changeTime = (newValue: number): void => {
    timeValue.value = Number.parseFloat(newValue.toFixed(2))
    emits('time-changed', newValue)
  }

  const getPlayBarIcon = (): string => {
    return props.isPlaying ? 'mdi-pause' : 'mdi-play'
  }

  const getTimePositions = (p: BoardActorAction<BoardPlayer> | undefined): Array<number> | undefined => {
    return p?.moves.getTimePositions().map(p => p.time)
  }

  const resetTime = (): void => {
    changeIsPlaying(false)
    changeTime(0)
  }

  // Lifecycle hooks
  onMounted(() => {
    intervalId = setInterval(() => {
      if (props.isPlaying && timeValue.value < 1) {
        changeTime(timeValue.value + (DELTA / TIME_DURATION))
      }
      if (timeValue.value >= 1) {
        changeIsPlaying(false)
        changeTime(1)
      }
    }, DELTA)
  })

  onBeforeUnmount(() => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  })

  // Watch for prop changes
  watch(() => props.time, newTime => {
    timeValue.value = newTime
  })
</script>
