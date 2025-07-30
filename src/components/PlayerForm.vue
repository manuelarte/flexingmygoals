<template>
  <v-card>
    <template #title>
      <div>
        <v-text-field
          v-model="modified.actor.name"
          hide-details="auto"
          label="Player's name"
        />
      </div>
    </template>
    <template #prepend>
      <PlayerBadge :is-keeper="false" :player="modified.actor" />
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
