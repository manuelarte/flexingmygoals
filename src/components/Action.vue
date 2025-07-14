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
            v-bind="player1"
            :is-draggable="true"
            :is-dragging="isDragging"
          />
        </div>
        <div class="ball-wrapper">
          <Ball :is-dragging="isDragging" />
        </div>
      </Field>
    </div>

  </v-container>
</template>

<script setup lang="ts">
  import { useDraggable } from '@vueuse/core'
  import Field from '@/components/Field.vue'

  interface PlayerModel {
    name: string
    number: number
    color: string
  }

  const fieldWrapperRef = useTemplateRef('fieldWrapperRef')
  const playerRef = useTemplateRef('playerRef')

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

  const player1: PlayerModel = {
    name: 'John',
    number: 10,
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
