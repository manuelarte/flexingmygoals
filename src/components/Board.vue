<template>
  <img ref="actorsRectRef" alt="football pitch" class="pitch" :src="`data:image/svg+xml;base64,${svgContent}`">
</template>

<script setup lang="ts">
  import { BoardAction } from '@/models/board.action.model.ts'
  import { FootballPitchTemplate } from '@/models/football.pitch.template.model.ts'
  import { FootballPitchVariables } from '@/models/football.pitch.variables.model.ts'

  defineProps({
    boardAction: {
      type: BoardAction,
      required: true,
    },
  })

  const svgContent = computed(() => {
    const length = 105
    const width = 68
    const percentageShown = 0.6

    const vars = new FootballPitchVariables(length, width, percentageShown, 3)
    const content = new FootballPitchTemplate().apply(vars)
    return btoa(content)
  })
</script>

<style lang="sass">
</style>
