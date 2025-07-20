<template>
  <v-container class="fill-height" max-width="900">
    <div ref="fieldWrapperRef" class="field-wrapper">
      <Field class="field-container">
        <!-- Players -->
        <div
          ref="playerMainRef"
          class="player-wrapper"
          style="position: absolute"
          :style="{ left: `${playerMyTeamMainTimePos.x}px`, top: `${playerMyTeamMainTimePos.y}px` }"
        >
          <Player
            id="playerMain"
            :color="playerMyTeamMain.item.color"
            :is-draggable="false"
            :is-dragging="false"
            :player="playerMyTeamMain.item"
          />
        </div>
        <div
          ref="playerOpponentTeamKeeperRef"
          class="player-wrapper"
          style="position: absolute"
          :style="{ left: `${playerOpponentTeamKeeperTimePos.x}px`, top: `${playerOpponentTeamKeeperTimePos.y}px` }"
        >
          <Player
            id="playerOpponentTeamKeeper"
            :color="playerOpponentTeamKeeper.item.color"
            :is-draggable="false"
            :is-dragging="false"
            :player="playerOpponentTeamKeeper.item"
          />
        </div>
        <!-- End Players -->
        <div ref="ballRef" class="ball-wrapper">
          <Ball />
        </div>
      </Field>
    </div>

  </v-container>
</template>

<script setup lang="ts">
  import type { BoardPosition } from '@/models/board.action.model.ts'
  import Field from '@/components/Field.vue'
  import { OpponentKeeper, PlayerManuel } from '@/models/board.example.ts'

  interface RelativePos {
    x: number
    y: number
  }

  const props = defineProps({
    time: {
      type: Number,
      required: true,
      validator (value: number, _) {
        return value >= 0 && value <= 100
      },
    },
  })

  const playerMyTeamMainTimePos = computed (() => {
    if (fieldWrapperRef.value == null) return { x: 0, y: 0 }
    const normalizePos = playerMyTeamMain.actions.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })
  const playerOpponentTeamKeeperTimePos = computed (() => {
    if (fieldWrapperRef.value == null) return { x: 0, y: 0 }
    const normalizePos = playerOpponentTeamKeeper.actions.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })

  const fieldWrapperRef = useTemplateRef('fieldWrapperRef')

  const playerMyTeamMain = PlayerManuel
  const playerOpponentTeamKeeper = OpponentKeeper

  const denormalizePos = (normalizePos: BoardPosition): RelativePos => {
    if (fieldWrapperRef.value == null) return { x: 0, y: 0 }
    const rect = fieldWrapperRef.value!.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    return {
      x: normalizePos.x * width,
      y: normalizePos.y * height,
    }
  }

</script>

<style lang="sass">
.ball-wrapper
  position: absolute
  top: 0
  left: 0
.field-wrapper
  height: 100%
  width: 100%
  max-height: 500px
  max-width: 800px
.field-container
  position: relative
.player-wrapper
  position: absolute
</style>
