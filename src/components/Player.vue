<template>
  <div class="player-wrapper">
    <div
      class="player"
      :class="{ myTeam: color === 'myTeam',
                opponent: color === 'opponent',
                draggable: isDraggable,
                dragging: isDragging,
      }"
    >
      <div class="number">{{ player.number }}</div>
    </div>
    <div class="label">{{ player.name }}</div>
  </div>
</template>

<script setup lang="ts">
  import { BoardPlayer } from '@/models/board.action.model.ts'

  defineProps({
    player: {
      type: BoardPlayer,
      required: true,
      validator (player: BoardPlayer, _) {
        const name = player.name
        const number = player.number
        return name.length >= 3
          && Number.isInteger(number) && number > 0 && number < 100
      },
    },
    color: {
      type: String,
      validator (value: string, _) {
        return ['myTeam', 'opponent'].includes(value)
      },
      default: 'home',
    },
    isDraggable: {
      type: Boolean,
      default: false,
    },
    isDragging: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped lang="sass">
@use 'sass:math'
@use 'sass:color'

$player_size: 30px
$player_number_size: $player_size * 0.5
$player_name_size: math.max($player_size * 0.3, 22px)

$myTeam_color: #1E90FF
$myTeam_color_dark: color.scale($myTeam_color, $lightness: -80%)
$opponent_color: #FF0000
$opponent_color_dark: color.scale($opponent_color, $lightness: -80%)

.draggable
  cursor: move

.label
  margin-top: 4px
  font-size: $player_name_size
  font-weight: 500
  color: white
  text-shadow: 0 1px 2px black
  white-space: nowrap
  transform: translate(-50%, -50%)

.myTeam
  background: $myTeam_color radial-gradient(circle at 30% 30%, $myTeam_color, $myTeam_color_dark)

.opponent
  background: $opponent_color radial-gradient(circle at 30% 30%, $opponent_color, #450d03)

.player-wrapper
  position: relative
  display: flex
  flex-direction: column
  float: left
  align-items: center
  transition: transform 0.2s
  user-select: none

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
  transition: background-color 0.3s
  transform: translate(0%, -50%)
  margin-right: 100%
  border-radius: 50%

.player:hover
  animation: scaleAnimation 0.2s forwards

@keyframes scaleAnimation
  0%
    margin-right: 100%
    transform: scale(1) translate(0, -50%)
  100%
    transform: scale(1.2) translate(0, -50%)
</style>
