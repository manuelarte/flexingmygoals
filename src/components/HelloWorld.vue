<template>
  <v-container class="fill-height" max-width="900">
    <Field class="field-container">
      <Player
        id="player1"
        v-bind="player"
        :is-draggable="true"
        :style="stylePlayer"
      />
      <Player v-bind="player2" :style="stylePlayer2" />
    </Field>
  </v-container>
</template>

<script setup lang="ts">
  interface PlayerModel {
    name: string
    number: number
    color: string
  }

  const player: PlayerModel = {
    name: 'John',
    number: 10,
    color: 'myTeam',
  }
  const stylePlayer = {
    position: 'absolute',
    top: 0,
    left: 0,
  }

  const player2: PlayerModel = {
    name: 'Doe',
    number: 5,
    color: 'opponent',
  }
  const stylePlayer2 = {
    position: 'absolute',
    top: 0,
    left: '50px',
  }
</script>

<style lang="sass">
.field-container
  position: relative
</style>
