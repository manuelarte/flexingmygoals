<template>
  <div
    class="player"
    :class="[{ 'has-name': name }]"
  >
    <div class="number">{{ number }}</div>
    <div v-if="name" class="name">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    name: { type: String, default: 'Player' },
    number: { type: Number, default: 10 },
  })
</script>

<style scoped>
.player {
  position: relative;
  width: 50px;
  height:50px;
  background-color: #007bff;
  color: white;
  text-align: center;
  cursor: default;
  user-select: none;
  border-radius: 50%;
}

.number {
  font-size: 20px;
  padding-top: 20%;
  font-weight: bold;
}

.name {
  font-weight: bold;
  font-size: 10px;
}
</style>
