<template>
  <FootballPitch @actors-area="actorsArea = $event">
    <div v-if="actorsArea">
      <!-- Players -->
      <!-- Other players -->
      <div
        v-for="(playerAction, index) in boardAction.otherPlayers"
        :key="index"
        class="player-wrapper"
        style="position: absolute"
        :style="{ left: `${otherPlayersTimePos[index].x}px`, top: `${otherPlayersTimePos[index].y}px` }"
      >
        <Player
          :id="`player-${index}`"
          :is-draggable="false"
          :is-dragging="false"
          :player="playerAction.actor"
          @click="emits('edit:player-selected', {player: playerAction, id:`player-${index}` })"
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
          :is-draggable="false"
          :is-dragging="false"
          :player="boardAction.playerMain.actor"
          @click="emits('edit:player-selected', {player: boardAction.playerMain, id:`me` })"
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
          :is-draggable="false"
          :is-dragging="false"
          :is-keeper="true"
          :player="boardAction.opponentTeamKeeperPlayer.actor"
          @click="emits('edit:player-selected', {player: boardAction.opponentTeamKeeperPlayer, id:`opponentTeamKeeperPlayer` })"
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
    </div>
  </FootballPitch>
</template>

<script setup lang="ts">
  import { BoardAction, type BoardPosition } from '@/models/board.action.model'

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
    boardAction: {
      type: BoardAction,
      required: true,
    },
  })

  const emits = defineEmits(['edit:player-selected'])

  const ballTimePos = computed (() => {
    if (!actorsArea.value) return { x: 0, y: 0 }
    const normalizePos = props.boardAction.ball.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })
  const playerMyTeamMainTimePos = computed (() => {
    if (!actorsArea.value) return { x: 0, y: 0 }
    const normalizePos = props.boardAction.playerMain.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })
  const playerOpponentTeamKeeperTimePos = computed (() => {
    if (!actorsArea.value) return { x: 0, y: 0 }
    const normalizePos = props.boardAction.opponentTeamKeeperPlayer.getPositionForTime(props.time)
    return denormalizePos(normalizePos)
  })

  const otherPlayersTimePos = computed(() => {
    return props.boardAction?.otherPlayers.map(player => {
      if (!actorsArea.value) return { x: 0, y: 0 }
      const normalizePos = player.getPositionForTime(props.time)
      return denormalizePos(normalizePos)
    })
  })

  const actorsArea: Ref<DOMRect | null> = ref(null)

  const denormalizePos = (normalizePos: BoardPosition): RelativePos => {
    if (actorsArea.value == null) return { x: 0, y: 0 }
    const rect = actorsArea.value!
    const width = rect.width
    // 50% of the field is shown
    const height = rect.height * 2
    return {
      x: Math.min(normalizePos.x * width, rect.width),
      y: Math.min(normalizePos.y * height, rect.height),
    }
  }

</script>

<style lang="sass">
.ball-wrapper
  position: absolute
  top: 0
  left: 0
.board-wrapper
  height: 100%
  width: 100%
  position: relative
.player-wrapper
  position: absolute
</style>
