<template>
  <v-container class="fill-height" max-width="900">
    <Field>
      <Player v-bind="player" />
      <Player v-bind="player2" />
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

  const player2: PlayerModel = {
    name: 'Doe',
    number: 5,
    color: 'opponent',
  }
</script>
