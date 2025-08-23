<template>
  <div
    class="player"
    :class="{ myTeam: color === 'myTeam',
              opponentTeam: color === 'opponentTeam',
              keeper: isKeeper,
    }"
  >
    <div class="number">{{ number }}</div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    number: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isKeeper: {
      type: Boolean,
      default: false,
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
