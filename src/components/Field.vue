<template>
  <div class="field grass-gradient">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
$grass_color_primary: #3E7B3E
$grass_color_secondary: #4A934A

.field
  width: 100%
  height: 100%
  max-height: 400px

.grass-gradient
  background: linear-gradient(
    0deg,
$grass_color_primary 0%,
$grass_color_primary 10%,
$grass_color_secondary 10%,
$grass_color_secondary 20%,
$grass_color_primary 20%,
$grass_color_primary 30%,
$grass_color_secondary 30%,
$grass_color_secondary 40%,
$grass_color_primary 40%,
$grass_color_primary 50%,
$grass_color_secondary 50%,
$grass_color_secondary 60%,
$grass_color_primary 60%,
$grass_color_primary 70%,
$grass_color_secondary 70%,
$grass_color_secondary 80%,
$grass_color_primary 80%,
$grass_color_primary 90%,
$grass_color_secondary 90%,
$grass_color_secondary 100%,
)

</style>
