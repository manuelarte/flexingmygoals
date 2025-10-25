<template>
  <v-card>
    <v-list>
      <v-list-subheader>Actions</v-list-subheader>

      <v-list-item
        v-for="(item, i) in pageAction"
        :key="i"
        :active="item.id == selected?.id"
        color="primary"
        density="compact"
        rounded
        :value="item"
        variant="tonal"
        @click="selectAction(item as IBoardAction)"
      >
        <template #prepend>
          <v-icon icon="mdi-soccer" size="small" />
        </template>

        <v-list-item-title>
          <b>{{ item.partialResult.myTeam }}</b> - {{ item.partialResult.opponentTeam }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ item.highlight }}</v-list-item-subtitle>
        <v-tooltip activator="parent" text="Select action" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
  import type { IBoardAction } from '@/types/board.action.types.ts'
  import { SavedExample1, SavedExample2, SavedExample3, TestingLimits } from '@/models/board.example'

  const emits = defineEmits(['action:selected'])

  const pageAction = ref<IBoardAction[]>([SavedExample1, SavedExample2, SavedExample3, TestingLimits])

  const selected = ref<IBoardAction | null>(null)

  function selectAction (action: IBoardAction) {
    selected.value = selected.value?.id == action.id ? null : action
  }

  watch(selected, () => {
    emits('action:selected', selected.value)
  })

</script>
