<template>
  <v-container class="fill-height" max-width="900">
    <div ref="fieldWrapperRef" class="field-wrapper">
      <Field class="field-container">
        <Player
          id="player1"
          v-bind="player"
          :is-draggable="true"
          :style="stylePlayer"
        />
        <Player v-bind="player2" :style="stylePlayer2" />
      </Field>
    </div>

  </v-container>
</template>

<script setup lang="ts">
  import Field from '@/components/Field.vue'

  interface PlayerModel {
    name: string
    number: number
    color: string
  }

  interface PlayerStyle {
    position: string // it is always absolute, but I can't make it as a class
    top: string // in pixels
    left: string // in pixels
  }

  const fieldWrapperRef = useTemplateRef('fieldWrapperRef')

  const player: PlayerModel = {
    name: 'John',
    number: 10,
    color: 'myTeam',
  }
  const stylePlayer: Ref<PlayerStyle> = ref({
    position: 'absolute',
    top: '0px',
    left: '0px',
  })

  const player2: PlayerModel = {
    name: 'Doe',
    number: 5,
    color: 'opponent',
  }
  const stylePlayer2 = ref({
    position: 'absolute',
    top: '0px',
    left: '50px',
  })

  onMounted(() => {
    console.log(`the component is now mounted.`)
    console.log(fieldWrapperRef.value)
    debugger
  })
</script>

<style lang="sass">
.field-wrapper
  width: 100%
  max-width: 800px
  height: 100%
  max-height: 500px
.field-container
  position: relative
</style>
