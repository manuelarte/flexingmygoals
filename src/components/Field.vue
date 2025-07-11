<template>
  <div class="field">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
$grass_color_primary: #7CFC00
$grass_color_secondary: #6FC500

.field
  background-color: $grass_color_primary
  width: 100%
  height: 100%
  max-height: 400px

</style>
