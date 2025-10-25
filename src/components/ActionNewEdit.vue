<template>
  <v-card
    class="w-100 h-100"
    :subtitle="`${action.partialResult.myTeam} - ${action.partialResult.opponentTeam}`"
    :title="action.highlight ?? ''"
    variant="tonal"
  >
    <v-card-text>
      <p class="text-indigo-accent-1">My Team</p>
      <v-expansion-panels>
        <v-expansion-panel
          text="Edit things"
        >
          <template #title>
            <b class="mr-1">{{ action.playerMain.actor.number }}</b> {{ action.playerMain.actor.name }}
          </template>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card-text>

    <v-divider />

    <v-card-text>
      <p class="text-red-accent-1">Opponent Team</p>
      <v-expansion-panels>
        <v-expansion-panel
          text="Edit things"
        >
          <template #title>
            <b class="mr-1">{{ action.opponentTeamKeeperPlayer.actor.number }}</b> {{ action.opponentTeamKeeperPlayer.actor.name }}
          </template>
        </v-expansion-panel>
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
