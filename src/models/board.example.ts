import {
  BoardAction,
  BoardActionTimestamp,
  BoardItemAction,
  BoardPlayer,
  BoardPosition,
  TeamSide,
} from './board.action.model'

export const PlayerManuel = new BoardItemAction(
  new BoardPlayer('Manuel', 12, TeamSide.MyTeam),
  new BoardAction(
    new BoardPosition(0.2, 0.4),
    [
      new BoardActionTimestamp(new BoardPosition(0.1, 0.2), 0.2),
    ],
  ),
)

export const OpponentKeeper = new BoardItemAction(
  new BoardPlayer('Keeper', 1, TeamSide.OpponentTeam),
  new BoardAction(
    new BoardPosition(0.5, 0.05),
    [],
  ),
)
