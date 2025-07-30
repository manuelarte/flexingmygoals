<template>
  <v-card>
    <v-card-title>
      {{ modified.actor.name }}
    </v-card-title>

    <template #actions>
      <v-btn text="Save" />
    </template>
  </v-card>
</template>

<script setup lang="ts">
  import type { BoardPlayer } from '@/models/board.action.model'
  import { BoardActorAction } from '@/models/board.action.model'

  const props = defineProps({
    player: {
      type: BoardActorAction<BoardPlayer>,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  })

  const modified = ref(props.player)
</script>

<style scoped lang="sass">

</style>
