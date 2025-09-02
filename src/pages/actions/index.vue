<template>
  <div v-if="!isEdit && boardAction">
    <v-container class="fill-height">
      <v-row no-gutters rows="12">
        <div class="board">
          <Board :board-action="boardAction" :time="time" />
        </div>
        <div class="slider">
          <PlayBar
            :is-playing="isPlaying"
            :time="time"
            @time-changed="onTimeChanged"
            @toggle-play="onTogglePlay"
          />
        </div>
      </v-row>
    </v-container>
  </div>
  <div v-if="isEdit">
    <v-container class="fill-height">
      <v-row no-gutters rows="12">
        <v-col cols="8" style="width: 80dvh">
          <div class="board">
            <Board
              :board-action="boardAction!"
              :time="time"
              @edit:player-selected="onPlayerSelected"
            />
          </div>
          <div class="slider">
            <PlayBar
              :is-playing="isPlaying"
              :player-selected="playerSelected?.player"
              :time="time"
              @time-changed="onTimeChanged"
              @toggle-play="onTogglePlay"
            />
          </div>
        </v-col>
        <v-col cols="4" style="width: 40dvh">
          <v-card v-if="!playerSelected">
            <v-card-title>Select an actor...</v-card-title>
          </v-card>
          <PlayerForm
            v-if="playerSelected"
            :can-delete="false"
            :is-keeper="playerSelected.id === 'opponentTeamKeeperPlayer'"
            :player-action="playerSelected"
            @edit:player-saved="onPlayerSaved"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import type { BoardAction } from '@/models/board.action.model'

  import type { SelectedPlayer } from '@/models/transfer.model'
  import { onBeforeMount, onUnmounted } from 'vue'
  import { SavedExample1 } from '@/models/board.example'
  import router from '@/router'
  import { Page, useAppStore } from '@/stores/app'
  import { toBoolean } from '@/utils/http.utils'

  const appStore = useAppStore()
  const route = useRoute()

  const boardAction = ref<BoardAction | undefined>()
  const isPlaying = ref(false)
  const isEdit = ref(false)
  const time = ref(0)
  const playerSelected = ref<SelectedPlayer | null>()

  // Lifecycle Hooks

  /**
   * Retrieves the board action from the store and sets it to the component.
   * If the board action is not found, it redirects to the home page.
   */
  onBeforeMount(() => {
    appStore.boardAction = SavedExample1
    if (appStore.boardAction == null) {
      router.push('/')
    } else {
      boardAction.value = appStore.boardAction! as BoardAction
    }
  })

  onMounted(() => {
    appStore.setPage(Page.BOARD_ACTION)
    isEdit.value = toBoolean(route.query.edit)
  })

  /**
   * Resets the page and board action in the store.
   */
  onUnmounted(() => {
    appStore.resetPage()
    appStore.setBoardAction(null)
  })

  /**
   * Event handler for the action time changed event.
   * Updates the time value.
   * @param newValue the new value between [0, 1].
   */
  function onTimeChanged (newValue: number) {
    time.value = newValue
  }

  /**
   * Event handler for the action play toggled event.
   * Updates the isPlaying value.
   * @param newValue whether the action is playing or not.
   */
  function onTogglePlay (newValue: boolean) {
    isPlaying.value = newValue
  }

  /**
   * Event handler for the player selected event.
   * Updates the playerSelected value.
   * @param event the selected player.
   */
  function onPlayerSelected (event: SelectedPlayer) {
    playerSelected.value = playerSelected?.value?.id === event.id ? null : event
  }

  /**
   * Event handler for the player saved event.
   * @param newPlayer the updated player.
   */
  function onPlayerSaved (newPlayer: SelectedPlayer): void {
    boardAction.value = boardAction.value?.replacePlayer(newPlayer.id, newPlayer.player)
  }
</script>

<style scoped lang="sass">
  .board
    height: 68dvh
    width: 100%
  .slider
    width: 100%
</style>
