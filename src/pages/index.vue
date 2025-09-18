<template>
  <ActionList @action:selected="onActionSelected" />
  <ActionBoard :action="action" />
</template>

<script lang="ts" setup>
  import type { IBoardAction } from '@/types/board.action.types.ts'

  const action = ref<IBoardAction | undefined>()

  function onActionSelected (event: IBoardAction) {
    action.value = event
  }
</script>
