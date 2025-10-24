<template>
  <div
    class="player"
    :class="{ myTeam: teamSide === 'myTeam',
              opponentTeam: teamSide === 'opponentTeam',
              keeper: isKeeper,
    }"
  >
    <div class="number">{{ number }}</div>
  </div>
</template>

<script setup lang="ts">
  import type { TeamSide } from '@/models/board.action.model.ts'

  defineProps({
    // is this player the keeper
    isKeeper: {
      type: Boolean,
      default: false,
    },
    // number of this player
    number: {
      type: Number,
      required: true,
    },
    teamSide: {
      type: String as PropType<TeamSide>,
      required: true,
    },
  })
</script>

<style scoped lang="sass">
@use 'sass:color'

$player_size: 2dvw
$player_number_size: $player_size * 0.5

$myTeam_color: #1E90FF
$myTeam_color_dark: color.scale($myTeam_color, $lightness: -80%)
$opponent_color: #FF0000
$opponent_color_dark: color.scale($opponent_color, $lightness: -80%)

.player
  width: $player_size
  height: $player_size
  display: flex
  align-items: center
  justify-content: center
  color: white
  font-weight: bold
  font-size: $player_number_size
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25)
  border-radius: 50%
  user-select: none

.myTeam
  background: $myTeam_color radial-gradient(circle at 30% 30%, $myTeam_color, $myTeam_color_dark)

.opponentTeam
  background: $opponent_color radial-gradient(circle at 30% 30%, $opponent_color, $opponent_color_dark)

  &.keeper
    background: $opponent_color radial-gradient(circle at 30% 30%, $opponent_color_dark, #660000)
</style>
