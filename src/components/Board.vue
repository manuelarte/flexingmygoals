<template>
  <v-container class="fill-height" max-width="900">
    <div ref="fieldWrapperRef" class="field-wrapper">
      <Field class="field-container">
        <div
          ref="playerRef"
          class="player-wrapper"
          style="position: absolute"
          :style="style"
        >
          <Player
            id="player1"
            :color="player1.color"
            :is-draggable="true"
            :is-dragging="isDragging"
            :player="player1.player"
          />
        </div>
        <div ref="ballRef" class="ball-wrapper">
          <Ball />
        </div>
      </Field>
    </div>

  </v-container>
</template>

<script setup lang="ts">
  import { useDraggable } from '@vueuse/core'
  import Field from '@/components/Field.vue'
  import { PlayerBoard } from '@/models/board.action.model.ts'

  interface PlayerAction {
    player: PlayerBoard
    color: string
  }

  const fieldWrapperRef = useTemplateRef('fieldWrapperRef')
  const playerRef = useTemplateRef('playerRef')
  const ballRef = useTemplateRef('ballRef')

  // `style` will be a helper computed for `left: ?px; top: ?px;`
  const { x, y, isDragging, style } = useDraggable(playerRef, {
    initialValue: { x: 0, y: 0 },
    onMove: position => {
      const rect = fieldWrapperRef.value!.getBoundingClientRect()
      position.x = position.x - rect.left
      position.y = position.y - rect.top
      position.x = Math.max(0, Math.min(position.x, rect.width))
      position.y = Math.max(0, Math.min(position.y, rect.height))
    },
  })

  const player1: PlayerAction = {
    player: new PlayerBoard('John', 10),
    color: 'myTeam',
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
