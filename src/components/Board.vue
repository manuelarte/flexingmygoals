<template>
  <div ref="footballPitchContainer" class="football-pitch-container ma-auto w-100 position-relative overflow-visible" :style="{ backgroundImage: svgImg }">
    <div
      v-for="(playerAction, index) in boardAction.otherPlayers"
      :key="index"
    >
      <PlayerCircle
        class="actor"
        :number="playerAction.actor.number"
        :style="{'left': `${otherPlayersTimePos[index]?.left}px`, 'top': `${otherPlayersTimePos[index]?.top}px`}"
        :team-side="playerAction.actor.teamSide"
      />
    </div>

    <PlayerCircle
      v-if="!opponentTeamKeeperPlayerPosition.outOfBounds"
      class="actor"
      is-keeper
      :number="1"
      :style="{'left': `${opponentTeamKeeperPlayerPosition.left}px`, 'top': `${opponentTeamKeeperPlayerPosition.top}px`}"
      :team-side="TeamSide.OpponentTeam"
    />
    <PlayerCircle
      v-if="!myPlayerPosition.outOfBounds"
      class="actor"
      :number="12"
      :style="{'left': `${myPlayerPosition.left}px`, 'top': `${myPlayerPosition.top}px`}"
      :team-side="TeamSide.MyTeam"
    />

    <Ball
      v-if="!ballPosition.outOfBounds"
      class="actor"
      :style="{'left': `${ballPosition.left}px`, 'top': `${ballPosition.top}px`}"
    />
  </div>
</template>

<script setup lang="ts">
  import Ball from '@/components/Ball.vue'
  import PlayerCircle from '@/components/PlayerCircle.vue'
  import { BoardAction, TeamSide } from '@/models/board.action.model'
  import { FootballPitchTemplate } from '@/models/football.pitch.template.model'
  import { FootballPitchVariables } from '@/models/football.pitch.variables.model'
  import { ValidationException } from '@/models/validation.model'

  interface Position {
    outOfBounds: boolean
    left: number
    top: number
  }

  const props = defineProps({
    boardAction: {
      type: BoardAction,
      required: true,
    },
    actionTime: {
      type: Number,
      required: true,
      validator (value: number, _) {
        return value >= 0 && value <= 1
      },
    },
  })

  const percentageShown = ref(0.55)

  const footballPitchContainer = useTemplateRef('footballPitchContainer')

  // data:image/svg+xml;base64,${svgContent}`
  const svgImg = computed(() => {
    const length = ref(105)
    const width = ref(68)
    const ps = percentageShown.value

    const vars = new FootballPitchVariables(length.value, width.value, ps, 2)
    const content = new FootballPitchTemplate().apply(vars)
    return `url(data:image/svg+xml;base64,${btoa(content)})`
  })

  const ballPosition = computed(() => {
    const { x, y } = props.boardAction!.ball.getPositionForTime(props.actionTime!)
    return _denormalize(x, y)
  })

  const myPlayerPosition = computed(() => {
    const { x, y } = props.boardAction!.playerMain.getPositionForTime(props.actionTime!)
    return _denormalize(x, y)
  })

  const opponentTeamKeeperPlayerPosition = computed(() => {
    const { x, y } = props.boardAction!.opponentTeamKeeperPlayer.getPositionForTime(props.actionTime!)
    return _denormalize(x, y)
  })

  const otherPlayersTimePos = computed((): Array<Position> => {
    return props.boardAction?.otherPlayers.map(player => {
      const { x, y } = player.getPositionForTime(props.actionTime!)
      return _denormalize(x, y)
    }) ?? []
  })

  function _denormalize (x: number, y: number): Position {
    if (!footballPitchContainer.value) {
      // not ready
      return { outOfBounds: false, left: 0, top: 0 }
    }

    if (x < 0 || x > 1) {
      throw new ValidationException('x is out of bounds')
    }
    if (y < 0 || y > 1) {
      throw new ValidationException('y is out of bounds')
    }

    if (y > percentageShown.value) {
      return { outOfBounds: true, left: 0, top: 0 }
    }

    const width = footballPitchContainer.value.clientWidth * 0.95
    const height = footballPitchContainer.value.clientHeight * 0.975
    return { outOfBounds: false, left: width * x, top: (height / 0.55) * y }
  }
</script>

<style lang="sass">
.actor
  position: absolute
.football-pitch-container
  aspect-ratio: 1.19 // width(with extra space) / length(with extra space) => (68 + 2*2) / ((105+2)*0.55)
  max-width: 90vh
  background-size: 100% 100%
  background-position: center
  background-repeat: no-repeat
  justify-content: center
</style>
