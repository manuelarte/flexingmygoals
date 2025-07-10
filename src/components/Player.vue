<template>
  <div class="player-wrapper">
    <div class="player">
      <div class="number">{{ number }}</div>
    </div>
    <div class="label">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    name: { type: String, default: 'Player' },
    number: { type: Number, default: 10 },
  })
</script>

<style scoped>
.player-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  transition: transform 0.2s;
  user-select: none;
}

.player-wrapper:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.player {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s;
  border-radius: 50%;
  background: #1e90ff radial-gradient(circle at 30% 30%, #1e90ff, #0066cc);
}

/* Name label */
.label {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 2px black;
  white-space: nowrap;
}
</style>
