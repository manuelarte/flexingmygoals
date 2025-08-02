<template>
  <div class="pitch-wrapper">
    <img alt="football pitch" class="img" :src="`data:image/svg+xml;base64,${svgContent}`">
    <div ref="actorsRectRef" class="actors">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FootballPitchTemplate } from '@/models/football.pitch.template.model'
  import { FootballPitchVariables } from '@/models/football.pitch.variables.model'

  const props = defineProps({
    length: {
      type: Number,
      default: 105,
      validator (value: number, _) {
        return value >= 90 && value <= 120
      },
    },
    width: {
      type: Number,
      default: 68,
      validator (value: number, _) {
        return value >= 45 && value <= 90
      },
    },
    percentageShown: {
      type: Number,
      default: 0.5,
      validator (value: number, _) {
        return value >= 0.5 && value <= 1
      },
    },
  })

  const emits = defineEmits(
    ['actors-area'],
  )

  const actorsRectRef = useTemplateRef('actorsRectRef')

  const svgContent = computed(() => {
    const vars = new FootballPitchVariables(props.length, props.width, props.percentageShown, 3)
    const content = new FootballPitchTemplate().apply(vars)
    return btoa(content)
  })

  onMounted(() => {
    emits('actors-area', actorsRectRef.value?.getBoundingClientRect())
  })
</script>

<style scoped lang="sass">
  .pitch-wrapper
    position: relative
    width: 100%
    max-width: 100%
    height: 100%
    max-height: 100%
    overflow: hidden
    .img
      position: absolute
      width: auto
      max-width: 100%
      aspect-ratio: auto
    .actors
      position: absolute
      width: 94%
      aspect-ratio: 1.3 // width/length * 1/percentageShown
      margin-left: 3%
      margin-top: 3%
</style>
