<template>
  <div class="player-wrapper">
    <div class="player" :style="stylePlayer">
      <div class="number">{{ number }}</div>
    </div>
    <div class="label">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">

  const props = defineProps({
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

  const stylePlayer = computed(() => {
    if (props.color === 'myTeam') {
      return {
        backgroundColor: ['#1e90ff', 'radial-gradient(circle at 30% 30%, #1e90ff, #0066cc)'],
      }
    }
    if (props.color === 'opponent') {
      return {
        backgroundColor: ['#ff0000', 'radial-gradient(circle at 30% 30%, #ff0000, #cc0000)'],
      }
    }
    return {
      backgroundColor: ['#1e90ff', 'radial-gradient(circle at 30% 30%, #1e90ff, #0066cc)'],
    }
  })
</script>

<style scoped lang="sass">
.player-wrapper
  position: relative
  display: flex
  flex-direction: column
  float: left
  align-items: center
  /* move 0 to center */
  transform: translate(-50%, -50%)
  transition: transform 0.2s
  user-select: none

.player-wrapper:hover
  transform: translate(-50%, -50%) scale(1.1)

.player
  width: 60px
  height: 60px
  display: flex
  align-items: center
  justify-content: center
  color: white
  font-weight: bold
  font-size: 28px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25)
  transition: background-color 0.3s
  border-radius: 50%
  /*background: #1e90ff radial-gradient(circle at 30% 30%, #1e90ff, #0066cc);*/

.label
  margin-top: 4px
  font-size: 20px
  font-weight: 500
  color: white
  text-shadow: 0 1px 2px black
  white-space: nowrap
</style>
