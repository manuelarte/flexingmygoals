<template>
  <v-form v-model="valid">
    <v-card>
      <template #title>
        <v-text-field
          v-model="name"
          hide-details="auto"
          label="Player's name"
          :rules="nameRules"
        />
      </template>
      <template #prepend>
        <PlayerBadge :color="color" :is-keeper="false" :number="number" />
      </template>

      <v-card-text>
        Other actions
      </v-card-text>

      <template #actions>
        <v-btn :disabled="isSaveDisabled()" text="Save" />
      </template>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
  import { BoardActorAction, BoardPlayer } from '@/models/board.action.model'

  const props = defineProps({
    playerMoves: {
      type: BoardActorAction<BoardPlayer>,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  })

  const name = ref(props.playerMoves.actor.name)
  const number = ref(props.playerMoves.actor.number)
  const color = ref(props.playerMoves.actor.color)
  const valid = ref(false)
  const modified = computed(() => {
    if (valid.value) {
      return new BoardPlayer(name.value, number.value, color.value)
    }
    return null
  })

  const nameRules: Array<(value: string) => string | boolean> = [
    value => !!value || 'Required.',
    value => (value && value.length >= BoardPlayer.MIN_NAME_LENGTH) || `Min ${BoardPlayer.MIN_NAME_LENGTH} characters`,
    value => (value && value.length <= BoardPlayer.MAX_NAME_LENGTH) || `Max ${BoardPlayer.MAX_NAME_LENGTH} characters`,
  ]

  const isSaveDisabled = function (): boolean {
    return !valid.value || props.playerMoves.actor.equals(modified.value)
  }
</script>

<style scoped lang="sass">
</style>
