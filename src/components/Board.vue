<template>
  <div class="football-pitch-container">
    <img ref="actorsRectRef" alt="football pitch" class="football-pitch" :src="`data:image/svg+xml;base64,${svgContent}`">
  </div>
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
    const percentageShown = 0.55

    const vars = new FootballPitchVariables(length, width, percentageShown, 3)
    const content = new FootballPitchTemplate().apply(vars)
    return btoa(content)
  })
</script>

<style lang="sass">
.football-pitch-container
  width: auto
  height: auto
  max-height: 75vh
  display: flex
  justify-content: center
  overflow: visible
.football-pitch
  width: auto
  height: auto
  display: block
  object-fit: contain
</style>
