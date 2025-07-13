<template>
  <div class="field-wrapper grass-gradient">
    <div class="field">
      <div class="field-lines">
        <div class="opponent-box">
          <div class="opponent-goal" />
          <div class="opponent-small-box" />
          <div class="opponent-penalty-point" />
        </div>
        <div class="center-line" />
        <div class="center-circle" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
@use 'sass:list'
@use 'sass:math'

$grass_color_primary: #3E7B3E
$grass_color_secondary: #4A934A
$line_border: 4px
$field_length: 75%

$box_width: 40%
$small_box_width: 50%

.field-wrapper
  height: 100%
  width: 100%

.field
  height: 100%
  width: 98%
  margin-left: auto
  margin-right: auto
  padding-top: 1%

.grass-gradient
  z-index: 0
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

    .opponent-box
      position: absolute
      border-left: $line_border solid white
      border-right: $line_border solid white
      border-bottom: $line_border solid white
      margin-left: 50% - math.div($box_width, 2)
      width: $box_width
      height: $box_width * 0.7
      .opponent-goal
        position: absolute
        width: 30%
        height: $line_border
        background: white
        margin-left: 35%
        margin-top: -2 * $line_border
      .opponent-small-box
        position: absolute
        border-left: $line_border solid white
        border-right: $line_border solid white
        border-bottom: $line_border solid white
        margin-left: 50% - math.div($small_box_width, 2)
        width: $small_box_width
        height: $small_box_width * 0.8
      .opponent-penalty-point
        position: absolute
        border-radius: 50%
        margin-left: 50%
        margin-top: 30%
        width: 5px
        height: 5px
        background: white

</style>
