<template>
  <ActionList class="table" @action:selected="onActionSelected" />
  <ActionBoard :action="action" class="action" />
</template>

<script lang="ts" setup>
  import type { IBoardAction } from '@/types/board.action.types.ts'

  const action = ref<IBoardAction | undefined>()

  function onActionSelected (event: IBoardAction) {
    action.value = event
  }
</script>

<style scoped lang="sass">
.table
  margin: 12px
  height: 30vh
  overflow: scroll
.action
  margin: 12px
  height: 55vh
</style>
