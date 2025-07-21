<template>
  <v-container class="fill-height">
    <div ref="fieldWrapperRef" class="field-wrapper">
      <Field class="field-container">
        <!-- Players -->
        <!-- Other players -->
        <div
          v-for="(playerAction, index) in action.otherPlayers"
          :key="index"
          class="player-wrapper"
          style="position: absolute"
          :style="{ left: `${otherPlayersTimePos[index].x}px`, top: `${otherPlayersTimePos[index].y}px` }"
        >
          <Player
            :id="`player${index}`"
            :color="playerAction.actor.color"
            :is-draggable="false"
            :is-dragging="false"
            :player="playerAction.actor"
          />
        </div>
        <!-- Main Player -->
        <div
          ref="playerMainRef"
          class="player-wrapper"
          style="position: absolute"
          :style="{ left: `${playerMyTeamMainTimePos.x}px`, top: `${playerMyTeamMainTimePos.y}px` }"
        >
          <Player
            id="playerMain"
            :color="action.playerMain.actor.color"
            :is-draggable="false"
            :is-dragging="false"
            :player="action.playerMain.actor"
          />
        </div>
        <!-- Opponent Team keeper player -->
        <div
          ref="playerOpponentTeamKeeperRef"
          class="player-wrapper"
          style="position: absolute"
          :style="{ left: `${playerOpponentTeamKeeperTimePos.x}px`, top: `${playerOpponentTeamKeeperTimePos.y}px` }"
        >
          <Player
            id="playerOpponentTeamKeeper"
            :color="action.opponentTeamKeeperPlayer.actor.color"
            :is-draggable="false"
            :is-dragging="false"
            :is-keeper="true"
            :player="action.opponentTeamKeeperPlayer.actor"
          />
        </div>
        <!-- End Players -->
        <div
          ref="ballRef"
          class="ball-wrapper"
          :style="{ left: `${ballTimePos.x}px`, top: `${ballTimePos.y}px` }"
        >
          <Ball />
        </div>
      </Field>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import Field from '@/components/Field.vue'
  import { BoardActionInput, type BoardPosition } from '@/models/board.action.model.ts'

  interface RelativePos {
    x: number
    y: number
  }

  const props = defineProps({
    time: {
      type: Number,
      required: true,
      validator (value: number, _): boolean {
        return value >= 0 && value <= 100
      },
    },
    action: {
      type: BoardActionInput,
      required: true,
    },
  })

  const ballTimePos = computed (() => {
    if (!fieldWrapperRef.value) return { x: 0, y: 0 }
    const normalizePos = props.action.ball.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })
  const playerMyTeamMainTimePos = computed (() => {
    if (!fieldWrapperRef.value) return { x: 0, y: 0 }
    const normalizePos = props.action.playerMain.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })
  const playerOpponentTeamKeeperTimePos = computed (() => {
    if (!fieldWrapperRef.value) return { x: 0, y: 0 }
    const normalizePos = props.action.opponentTeamKeeperPlayer.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })

  const otherPlayersTimePos = computed(() => {
    return props.action?.otherPlayers.map(player => {
      if (!fieldWrapperRef.value) return { x: 0, y: 0 }
      const normalizePos = player.getPositionForTime(props.time)
      return denormalizePos(normalizePos)
    })
  })

  const fieldWrapperRef = useTemplateRef('fieldWrapperRef')

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
.field-container
  position: relative
.player-wrapper
  position: absolute
</style>
