<template>
  <div class="pitch-wrapper">
    <img ref="actorsRectRef" alt="football pitch" class="pitch" :src="`data:image/svg+xml;base64,${svgContent}`">
    <div class="actors" :style="actorsStyle">
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

  const actorsRectRef = useTemplateRef('actorsRectRef')
  const actorsArea = ref<{ width: number, height: number }>({ width: 0, height: 0 })
  const actorsStyle = computed(() => {
    return { width: `${actorsArea.value.width}px`, height: `${actorsArea.value.height}px` }
  })

  const emits = defineEmits(
    ['actors-area'],
  )

  const svgContent = computed(() => {
    const vars = new FootballPitchVariables(props.length, props.width, props.percentageShown, 3)
    const content = new FootballPitchTemplate().apply(vars)
    return btoa(content)
  })

  onMounted(() => {
    const rect = actorsRectRef.value?.getBoundingClientRect()
    actorsArea.value = { width: 0.93 * rect!.width, height: 0.98 * rect!.height }
    emits('actors-area', actorsArea.value)
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
    .pitch
      position: absolute
      height: 100%
      left: 50%
      translate: -50%
      aspect-ratio: auto
    .actors
      position: absolute
      left: 50%
      top: 3%
      translate: -50%
</style>
