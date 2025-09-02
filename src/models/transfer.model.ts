import type { BoardActorAction, BoardPlayer } from '@/models/board.action.model'

export type PlayerId = 'me' | 'opponentTeamKeeperPlayer' | number

export interface SelectedPlayer {
  id: PlayerId
  player: BoardActorAction<BoardPlayer>
}

export interface Rect {
  width: number
  height: number
}
