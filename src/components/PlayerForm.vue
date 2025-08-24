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
        <v-list>
          <v-list-subheader>Positions</v-list-subheader>
        </v-list>
        <v-list-item
          v-for="(timePosition, i) in moves.getTimePositions()"
          :key="i"
          color="primary"
          rounded="xl"
          :value="timePosition"
        >
          <template #prepend>
            <div class="card-prepend">
              <v-icon icon="mdi-clock" />{{ Math.trunc(timePosition.time*100) }}%
            </div>

          </template>
          <template #append>
            <v-btn :disabled="i==0" icon="mdi-delete" variant="plain" />
          </template>
          <template #default>
            <v-text-field
              v-model="timePosition.position.x"
              disabled
              hide-details="auto"
              label="x"
            />
            <v-text-field
              v-model="timePosition.position.y"
              disabled
              hide-details="auto"
              label="y"
            />
          </template>
        </v-list-item>

      </v-card-text>

      <template #actions>
        <v-btn :disabled="isSaveDisabled()" text="Save" @click="playerSaved()" />
      </template>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
  import type { SelectedPlayer } from '@/models/transfer.model'
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
    playerAction: {
      type: Object as PropType<SelectedPlayer>,
      required: true,
    },
  })

  const emits = defineEmits<{
    // Event to notify the parent component that the player has been updated.
    'edit:player-saved': [playerSaved: SelectedPlayer]
  }>()

  const name = toRef(props.playerAction.player.actor.name)
  const number = toRef(props.playerAction.player.actor.number)
  const color = toRef(props.playerAction.player.actor.color)
  const moves = toRef(props.playerAction.player.moves)
  const valid = ref(false)
  const modified = computed<BoardActorAction<BoardPlayer> | null>(() => {
    if (valid.value) {
      try {
        return new BoardActorAction<BoardPlayer>(new BoardPlayer(name.value, number.value, color.value), props.playerAction.player.moves)
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

  watchEffect(() => {
    name.value = props.playerAction.player.actor.name
    number.value = props.playerAction.player.actor.number
    color.value = props.playerAction.player.actor.color
    moves.value = props.playerAction.player.moves
  })

  const changeColor = (): void => {
    color.value = color.value === TeamSide.MyTeam ? TeamSide.OpponentTeam : TeamSide.MyTeam
  }

  const isSaveDisabled = (): boolean => {
    return !valid.value || props.playerAction.player.actor.equals(modified.value)
  }

  const playerSaved = (): void => {
    emits('edit:player-saved', { id: props.playerAction.id, player: modified.value! })
  }
</script>

<style scoped lang="sass">
  .card-prepend
    width: 5dvw
    min-width: 60px
    max-width: 100px

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
