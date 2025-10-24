<template>
  <div
    class="ball"
  />
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
$ball_size: 1dvw

@keyframes scaleAnimation
  0%
    transform: scale(1)
  100%
    transform: scale(1.2)

.ball
  background: url(@/assets/ball.svg)
  background-size: $ball_size $ball_size
  height: $ball_size
  width: $ball_size
  transform: translate(-50%, -50%)

</style>
