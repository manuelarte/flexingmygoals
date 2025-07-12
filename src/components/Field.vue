<template>
  <div class="field grass-gradient">
    <slot />
    <div class="field-lines">
      <div class="center-line" />
      <div class="center-circle" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
@use 'sass:list'

$grass_color_primary: #3E7B3E
$grass_color_secondary: #4A934A
$line_border: 4px
$field_length: 75%

.field
  height: 100%
  width: 100%

.grass-gradient
  $stops: ()
  @for $i from 0 through 9
    $start: $i * 10%
    $end: ($i + 1) * 10%
    $color: if($i % 2 == 0, $grass_color_primary, $grass_color_secondary)
    $stops: list.append($stops, $color $start, comma)
    $stops: list.append($stops, $color $end, comma)
  background: linear-gradient(0deg, $stops)

  .field-lines
    border-left: $line_border solid white
    border-right: $line_border solid white
    border-top: $line_border solid white
    height: 100%
    width: 100%

    .center-line
      background-color: white
      height: $line_border
      left: 0
      position: absolute
      transform: translateY(-50%)
      top: $field_length
      width: 100%

    .center-circle
      position: absolute
      top: $field_length
      left: 50%
      width: 140px
      height: 140px
      border: $line_border solid white
      border-radius: 50%
      transform: translate(-50%, -50%)
      background: transparent

</style>
