<template>
  <div
    class="player-wrapper"
    :class="{ draggable: isDraggable,
              dragging: isDragging,
    }"
  >
    <PlayerBadge :color="player.color" :is-keeper="isKeeper" :number="player.number" />
    <div class="label">{{ player.name }}</div>
  </div>
</template>

<script setup lang="ts">
  import type { BoardPlayer } from '@/models/board.action.model'

  defineProps({
    player: {
      type: Object as PropType<BoardPlayer>,
      required: true,
      validator (player: BoardPlayer, _) {
        const name = player.name
        const number = player.number
        return name.length >= 3
          && Number.isInteger(number) && number > 0 && number < 100
      },
    },
    isDraggable: {
      type: Boolean,
      default: false,
    },
    isDragging: {
      type: Boolean,
      default: false,
    },
    isKeeper: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped lang="sass">
@use 'sass:math'
@use 'sass:color'

$player_name_size: 3dvh

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

.player-wrapper
  position: relative
  display: flex
  flex-direction: column
  float: left
  align-items: center
  transition: transform 0.2s
  user-select: none

.player
  transform: translate(0%, -50%)
  margin-right: 100%

.player:hover
  animation: scaleAnimation 0.2s forwards

@keyframes scaleAnimation
  0%
    margin-right: 100%
    transform: scale(1) translate(0, -50%)
  100%
    transform: scale(1.2) translate(0, -50%)
</style>
