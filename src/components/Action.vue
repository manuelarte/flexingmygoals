<template>
  <v-container class="fill-height" max-width="900">
    <div ref="fieldWrapperRef" class="field-wrapper">
      <Field class="field-container">
        <div
          ref="playerRef"
          class="player-wrapper"
          :style="stylePlayer1"
        >
          <Player
            id="player1"
            v-bind="player1"
            :is-draggable="true"
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

  const fieldWrapperRef = useTemplateRef('fieldWrapperRef')
  const playerRef = useTemplateRef('playerRef')

  const player1: PlayerModel = {
    name: 'John',
    number: 10,
    color: 'myTeam',
  }
  const playerPosition1 = ref({
    x: 60,
    y: 80,
  })

  const stylePlayer1: ComputedRef = computed(() => {
    return {
      left: playerPosition1.value.x + 'px',
      top: playerPosition1.value.y + 'px',
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
