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

/* the amount of space of grass after the field lines */
$field_outside_lines_percentage: 2%
/* depending of the width of the field, the box, goals can look bigger */
$field_width_max: 0.8
/* Calculating the percentage that the box width has regarding the total width. For minimum field witdh is 90%, for maximum width is 45% */
$field_width_box_percentage: (-0.45 * $field_width_max + 0.9)*100%

/* We only display 75% of the football field */
$field_length: 75%

/* width size of the box regarding percentage of width */
$box_width: $field_width_box_percentage
$box_height: ($box_width * 0.4) * 1.25
/* width size of the small box regarding percentage of bigger box*/
$small_box_width: 45%
/* width size of the goal regarding percentage of bigger box*/
$goal_width: 20%

.field-wrapper
  height: 100%
  width: 100%

.field
  height: 100%
  width: 100% - $field_outside_lines_percentage
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
      left: 1%
      position: absolute
      transform: translateY(-50%)
      top: $field_length
      width: 100% - $field_outside_lines_percentage

    .center-circle
      position: absolute
      top: $field_length
      left: 50%
      width: 0.5*$box_width
      height: 0.5*$box_width
      border: $line_border solid white
      border-radius: 50%
      transform: translate(-50%, -50%)
      background: transparent

    .opponent-box
      position: absolute
      border-left: $line_border solid white
      border-right: $line_border solid white
      border-bottom: $line_border solid white
      margin-left: 50% - $field_outside_lines_percentage - math.div($box_width, 2)
      width: $box_width
      height: $box_height
      .opponent-goal
        position: absolute
        width: $goal_width
        height: $line_border
        background: white
        margin-left: 51% - math.div($goal_width, 2)
        margin-top: -2 * $line_border
      .opponent-small-box
        position: absolute
        border-left: $line_border solid white
        border-right: $line_border solid white
        border-bottom: $line_border solid white
        margin-left: 51% - math.div($small_box_width, 2)
        width: $small_box_width
        height: $small_box_width * 0.8
      .opponent-penalty-point
        position: absolute
        border-radius: 50%
        margin-left: 50.2%
        margin-top: 0.75 * $box_height
        width: 5px
        height: 5px
        background: white

</style>
