<template>
  <v-container>
    <v-slider
      v-model="timeValue"
      append-icon="mdi-replay"
      class="slider"
      max="1"
      min="0"
      :prepend-icon="getPlayBarIcon()"
      thumb-label="always"
      @change="$emit('time-changed', $event)"
      @click:prepend="$emit('toggle-play', !isPlaying)"
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

  const getPlayBarIcon = (): string => {
    return props.isPlaying ? 'mdi-pause' : 'mdi-play'
  }

  const timeChanged = (): void => {
    console.log('time changed')
    emits('time-changed', timeValue.value)
  }
</script>

<style scoped lang="sass">
.slider
  vertical-align: middle
</style>
