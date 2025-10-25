import type {
  BoardAction,
  BoardActor,
  BoardActorAction,
  BoardActorTimePositions,
  BoardPlayer, BoardPosition, BoardPositionTimestamp,
  FootballResult,
} from '@/models/board.action.model'

export type IFootballResult = InstanceType<typeof FootballResult>
export type IBoardPlayer = InstanceType<typeof BoardPlayer>
export type IBoardPosition = InstanceType<typeof BoardPosition>
export type IBoardPositionTimestamp = InstanceType<typeof BoardPositionTimestamp>
export type IBoardActorTimePositions = InstanceType<typeof BoardActorTimePositions>
export type IBoardActorAction<T extends BoardActor> = InstanceType<typeof BoardActorAction<T>>
export type IBoardAction = InstanceType<typeof BoardAction>
