<template>
  <v-container class="fill-height" max-width="900">
    <div ref="fieldWrapperRef" class="field-wrapper">
      <Field class="field-container">
        <div ref="playerRef" class="player-wrapper">
          <Player
            id="player1"
            v-bind="player"
            :is-draggable="true"
            :style="stylePlayer"
          />
        </div>
      </Field>
    </div>

  </v-container>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import Field from '@/components/Field.vue'

  interface PlayerModel {
    name: string
    number: number
    color: string
  }

  interface PlayerStyle {
    top: string // in pixels
    left: string // in pixels
  }

  const fieldWrapperRef = useTemplateRef('fieldWrapperRef')
  const playerRef = useTemplateRef('playerRef')

  const player: PlayerModel = {
    name: 'John',
    number: 10,
    color: 'myTeam',
  }
  const playerPosition = ref({
    x: 0,
    y: 0,
  })

  const stylePlayer: ComputedRef<PlayerStyle> = computed(() => {
    return {
      left: playerPosition.value.x + 'px',
      top: playerPosition.value.y + 'px',
    }
  })

</script>

<style lang="sass">
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
