<template>
  <ActionList @action:selected="onActionSelected" />
  <ActionBoard />
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue'
  import type { BoardAction } from '@/models/board.action.model.ts'

  function onActionSelected (action: PropType<BoardAction>) {
    console.log('Action Selected', action)
  }
</script>
