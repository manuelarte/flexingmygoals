<template>
  <v-card :title="modified.actor.name">
    <template #prepend>
      <Player color="myTeam" :player="modified.actor" />
    </template>

    <v-card-text>
      {{ modified }}
    </v-card-text>

    <template #actions>
      <v-btn text="Save" />
    </template>
  </v-card>
</template>

<script setup lang="ts">
  import type { BoardPlayer } from '@/models/board.action.model'
  import { BoardActorAction } from '@/models/board.action.model'

  const props = defineProps({
    playerMoves: {
      type: BoardActorAction<BoardPlayer>,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  })

  const modified = toRef(props, 'playerMoves')
</script>

<style scoped lang="sass">

</style>
