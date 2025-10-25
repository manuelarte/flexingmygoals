<template>
  <v-card
    class="w-100 h-100"
    :subtitle="`${actionModified.partialResult.myTeam} - ${actionModified.partialResult.opponentTeam}`"
    :title="actionModified.highlight ?? ''"
    variant="tonal"
  >
    <v-card-text>
      <p class="text-indigo-accent-1">My Team</p>
      <v-expansion-panels>
        <ActionPlayerNewEdit :player-action="actionModified.playerMain" />
      </v-expansion-panels>

    </v-card-text>

    <v-divider />

    <v-card-text>
      <p class="text-red-accent-1">Opponent Team</p>
      <v-expansion-panels>
        <ActionPlayerNewEdit :player-action="actionModified.opponentTeamKeeperPlayer" />
      </v-expansion-panels>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn
        :disabled="action == actionModified"
        prepend-icon="mdi-content-save"
        text="Save"
        variant="tonal"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import type { IBoardAction } from '@/types/board.action.types'

  const props = defineProps({
    action: {
      type: Object as PropType<IBoardAction>,
      required: true,
    },
  })

  const actionModified = ref(props.action)
</script>

<style scoped lang="sass">

</style>
