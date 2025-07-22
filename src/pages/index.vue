<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <ActionList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted } from 'vue'
  import ActionList from '@/components/ActionList.vue'
  import { Page, useAppStore } from '@/stores/app.ts'

  const appStore = useAppStore()

  onMounted(() => {
    appStore.setPage(Page.HOME)
  })

  onUnmounted(() => {
    appStore.resetPage()
  })
</script>

<style scoped lang="sass">
</style>
