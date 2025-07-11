<template>
  <div class="player-wrapper">
    <div class="player" :class="{ myTeam: color === 'myTeam', opponent: color === 'opponent' }">
      <div class="number">{{ number }}</div>
    </div>
    <div class="label">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">

  defineProps({
    name: {
      type: String,
      required: true,
      validator (value: string, _) {
        return value.length >= 3
      },
    },
    number: {
      type: Number,
      required: true,
      validator (value: number, _) {
        return Number.isInteger(value) && value >= 1 && value <= 99
      },
    },
    color: {
      type: String,
      validator (value: string, _) {
        return ['myTeam', 'opponent'].includes(value)
      },
      default: 'home',
    },
  })
</script>

<style scoped lang="sass">
@use 'sass:math'

$player_size: 60px
$player_number_size: $player_size * 0.5
$player_name_size: $player_size * 0.3

.player-wrapper
  position: relative
  display: flex
  flex-direction: column
  float: left
  align-items: center
  /* move 0 to center, more or less... TODO: fix this */
  transform: translate(math.div(-$player_size, 2), math.div(-$player_size, 2))
  transition: transform 0.2s
  user-select: none

.player-wrapper:hover
  transform: translate(-50%, -50%) scale(1.1)

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
  border-radius: 50%
  /*background: #1e90ff radial-gradient(circle at 30% 30%, #1e90ff, #0066cc)*/

.myTeam
  background: #1e90ff radial-gradient(circle at 30% 30%, #1e90ff, #0066cc)

.opponent
  background: #ff0000 radial-gradient(circle at 30% 30%, #ff0000, #ff1133)

.label
  margin-top: 4px
  font-size: $player_name_size
  font-weight: 500
  color: white
  text-shadow: 0 1px 2px black
  white-space: nowrap
</style>
