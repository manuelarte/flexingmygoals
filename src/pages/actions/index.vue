<template>
  <div v-if="!isEdit">
    <v-container class="fill-height">
      <v-row no-gutters rows="12">
        <div class="board">
          <Board :board-action="getBoardAction()" :time="time" />
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
  import type { LocationQueryValue } from 'vue-router'
  import type { BoardAction, BoardActorAction, BoardPlayer } from '@/models/board.action.model'

  import { onBeforeMount, onUnmounted } from 'vue'
  import { SavedExample1 } from '@/models/board.example'
  import router from '@/router'
  import { Page, useAppStore } from '@/stores/app'

  interface SelectedPlayer {
    player: BoardActorAction<BoardPlayer>
    id: string
  }

  const appStore = useAppStore()

  const boardAction = ref<BoardAction>()
  const isPlaying = ref(false)
  const time = ref(0)
  const playerSelected = ref<SelectedPlayer | null>()

  const route = useRoute()
  const isEdit = ref(false)

  const onTimeChanged = (newValue: number) => {
    time.value = newValue
  }

  const onTogglePlay = (newValue: boolean) => {
    isPlaying.value = newValue
  }

  const onPlayerSelected = (event: SelectedPlayer) => {
    playerSelected.value = playerSelected?.value?.id === event.id ? null : event
  }

  const onPlayerSaved = (newPlayer: SelectedPlayer): void => {
    boardAction.value = boardAction.value?.replacePlayer(newPlayer.id, newPlayer.player)
  }

  onBeforeMount(() => {
    appStore.boardAction = SavedExample1
    if (appStore.boardAction == null) {
      router.push('/')
    } else {
      boardAction.value = appStore.boardAction!
    }
  })

  onMounted(() => {
    appStore.setPage(Page.BOARD_ACTION)
    isEdit.value = toBoolean(route.query.edit)
  })

  onUnmounted(() => {
    appStore.resetPage()
    appStore.setBoardAction(null)
  })

  // Check if it's a boolean string
  const toBoolean = (value: LocationQueryValue | LocationQueryValue[]) => {
    if (typeof value === 'string') {
      return value === 'true'
    }
    return false
  }

  const getBoardAction = (): BoardAction => {
    return boardAction.value!
  }
</script>

<style scoped lang="sass">
  .board
    height: 68dvh
    width: 100%
  .slider
    width: 100%
</style>
