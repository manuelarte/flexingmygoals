<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="auto">
        <v-btn
          class="ma-0"
          :icon="getPlayBarIcon()"
        />
      </v-col>
      <v-col cols="11">
        <v-slider class="slider" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

  const props = defineProps({
    isPlaying: {
      type: Boolean,
      required: true,
    },
  })
  const iconMap = { true: 'mdi-pause', false: 'mdi-play' }

  const getPlayBarIcon = (): string => {
    return props.isPlaying ? 'mdi-pause' : 'mdi-play'
  }
</script>

<style scoped lang="sass">
.slider
  vertical-align: middle
</style>
