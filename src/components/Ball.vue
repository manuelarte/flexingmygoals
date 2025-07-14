<template>
  <div
    class="ball"
    :class="{ dragging: isDragging }"
  />
</template>

<script setup lang="ts">
  defineProps({
    isDragging: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped lang="sass">
$ball_size: 20px

@keyframes scaleAnimation
  0%
    transform: scale(1)
  100%
    transform: scale(1.2)

.dragging
  animation: scaleAnimation 0.2s forwards

.ball
  background: url(@/assets/ball.svg)
  background-size: $ball_size $ball_size
  height: $ball_size
  width: $ball_size
  transform: translate(-50%, -50%)

</style>
