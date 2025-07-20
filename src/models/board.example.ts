import {
  BoardAction,
  BoardActionTimestamp,
  BoardPinAction,
  BoardPlayer,
  BoardPosition,
  TeamSide,
} from './board.action.model'

export const PlayerManuel = new BoardPinAction(
  new BoardPlayer('Manuel', 12, TeamSide.MyTeam),
  new BoardAction(
    new BoardPosition(0.2, 0.4),
    [
      new BoardActionTimestamp(new BoardPosition(0.1, 0.2), 0.2),
    ],
  ),
)

export const OpponentKeeper = new BoardPinAction(
  new BoardPlayer('Keeper', 1, TeamSide.OpponentTeam),
  new BoardAction(
    new BoardPosition(0.5, 0.07),
    [
      new BoardActionTimestamp(new BoardPosition(0.46, 0.05), 0.2),
    ],
  ),
)
