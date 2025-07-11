<template>
  <div class="field grass-gradient">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
@use 'sass:list'

$grass_color_primary: #3E7B3E
$grass_color_secondary: #4A934A

.field
  width: 100%
  height: 100%
  max-height: 400px

.grass-gradient
  $stops: ()
  @for $i from 0 through 9
    $start: $i * 10%
    $end: ($i + 1) * 10%
    $color: if($i % 2 == 0, $grass_color_primary, $grass_color_secondary)
    $stops: list.append($stops, $color $start, comma)
    $stops: list.append($stops, $color $end, comma)
  background: linear-gradient(0deg, $stops)

</style>
