<template>
  <div ref="footballPitchContainer" class="football-pitch-container" :style="{ backgroundImage: svgImg }">
    <PlayerCircle class="actor" :number="12" :team-side="TeamSide.MyTeam" />
  </div>
</template>

<script setup lang="ts">
  import PlayerCircle from '@/components/PlayerCircle.vue'
  import { BoardAction, TeamSide } from '@/models/board.action.model.ts'
  import { FootballPitchTemplate } from '@/models/football.pitch.template.model.ts'
  import { FootballPitchVariables } from '@/models/football.pitch.variables.model.ts'

  defineProps({
    boardAction: {
      type: BoardAction,
      required: true,
    },
  })

  // data:image/svg+xml;base64,${svgContent}`
  const svgImg = computed(() => {
    const length = ref(105)
    const width = ref(68)
    const percentageShown = 0.55

    const vars = new FootballPitchVariables(length.value, width.value, percentageShown, 2)
    const content = new FootballPitchTemplate().apply(vars)
    return `url(data:image/svg+xml;base64,${btoa(content)})`
  })
</script>

<style lang="sass">
.actor
  position: relative
.football-pitch-container
  outline: 1px solid red
  aspect-ratio: 1.19 // width(with extra space) / length(with extra space) => (68 + 2*2) / ((105+2)*0.55)
  width: 100%
  background-size: 100% 100%
  background-position: center
  background-repeat: no-repeat
  display: flex
  justify-content: center
  overflow: visible
</style>
