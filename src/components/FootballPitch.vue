<template>
  <div class="field-wrapper">
    <img alt="example football field" :src="`data:image/svg+xml;base64,${svgContent}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { FootballPitchTemplate } from '@/models/football.pitch.template.model'
  import { FootballPitchVariables } from '@/models/football.pitch.variables.model'

  const props = defineProps({
    length: {
      type: Number,
      default: 105,
      validator (value: number, _) {
        return value >= 90 && value <= 120
      },
    },
    width: {
      type: Number,
      default: 68,
      validator (value: number, _) {
        return value >= 45 && value <= 90
      },
    },
    percentageShown: {
      type: Number,
      default: 0.5,
      validator (value: number, _) {
        return value >= 0.5 && value <= 1
      },
    },
  })

  const svgContent = computed(() => {
    const vars = new FootballPitchVariables(props.length, props.width, 0.75, 3)
    const content = new FootballPitchTemplate().apply(vars)
    return btoa(content)
  })
</script>

<style scoped lang="sass">
</style>
