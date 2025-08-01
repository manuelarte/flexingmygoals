<template>
  <v-form v-model="valid">
    <v-card>
      <template #prepend>
        <div class="player-badge">
          <PlayerBadge
            :color="color"
            :is-keeper="isKeeper"
            :number="number"
            @click="changeColor()"
          />
        </div>
        <v-number-input
          v-model="number"
          class="align-content-center"
          control-variant="split"
          hide-details
          :hide-input="true"
          :inset="true"
          :max="99"
          :min="1"
          :step="1"
        />
      </template>

      <template #title>
        <v-text-field
          v-model="name"
          hide-details="auto"
          label="Player's name"
          :rules="nameRules"
        />
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
  import { BoardActorAction, BoardPlayer, TeamSide } from '@/models/board.action.model'

  const props = defineProps({
    canDelete: {
      type: Boolean,
      default: false,
    },
    isKeeper: {
      type: Boolean,
      default: false,
    },
    playerMoves: {
      type: BoardActorAction<BoardPlayer>,
      required: true,
    },
  })

  const name = toRef(props.playerMoves.actor.name)
  const number = toRef(props.playerMoves.actor.number)
  const color = toRef(props.playerMoves.actor.color)
  const valid = ref(false)
  const modified = computed(() => {
    if (valid.value) {
      try {
        return new BoardPlayer(name.value, number.value, color.value)
      } catch {
        return null
      }
    }
    return null
  })

  const nameRules: Array<(value: string) => string | boolean> = [
    value => !!value || 'Required.',
    value => (value && value.length >= BoardPlayer.MIN_NAME_LENGTH) || `Min ${BoardPlayer.MIN_NAME_LENGTH} characters`,
    value => (value && value.length <= BoardPlayer.MAX_NAME_LENGTH) || `Max ${BoardPlayer.MAX_NAME_LENGTH} characters`,
  ]

  const changeColor = function (): void {
    color.value = color.value === TeamSide.MyTeam ? TeamSide.OpponentTeam : TeamSide.MyTeam
  }

  const isSaveDisabled = function (): boolean {
    return !valid.value || props.playerMoves.actor.equals(modified.value)
  }
</script>

<style scoped lang="sass">
.player-badge :deep(.player)
  margin-right: 4px
  &:hover
    animation: scaleAnimation 0.2s forwards

@-webkit-keyframes scaleAnimation
  0%
    transform: scale(1)
  100%
    transform: scale(1.2)
</style>
