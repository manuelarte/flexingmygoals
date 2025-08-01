<template>
  <div v-if="!isEdit">
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
              :board-action="boardAction"
              :time="time"
              @edit:player-selected="onPlayerSelected"
            />
          </div>
          <div class="slider">
            <PlayBar
              :is-playing="isPlaying"
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
          <PlayerForm v-if="playerSelected" :can-delete="false" :is-keeper="playerSelected.id === 'opponentTeamKeeperPlayer'" :player-moves="playerSelected.player" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import type { LocationQueryValue } from 'vue-router'
  import type { BoardActorAction, BoardPlayer } from '@/models/board.action.model'
  import { onBeforeMount, onUnmounted } from 'vue'
  import { TestingLimits } from '@/models/board.example'
  import router from '@/router'
  import { Page, useAppStore } from '@/stores/app'

  interface SelectedPlayer {
    player: BoardActorAction<BoardPlayer>
    id: string
  }

  const appStore = useAppStore()

  const boardAction = ref()
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

  onBeforeMount(() => {
    appStore.boardAction = TestingLimits
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

  const onPlayerSelected = (event: SelectedPlayer) => {
    playerSelected.value = playerSelected?.value?.id === event.id ? null : event
  }

  // Check if it's a boolean string
  const toBoolean = (value: LocationQueryValue | LocationQueryValue[]) => {
    if (typeof value === 'string') {
      return value === 'true'
    }
    return false
  }
</script>

<style scoped lang="sass">
  .board
    height: 70vh
    width: 100%
  .slider
    width: 100%
</style>
