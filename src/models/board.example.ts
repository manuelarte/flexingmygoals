import {
  BoardAction,
  BoardActionTimestamp,
  BoardItemAction,
  BoardPlayer,
  BoardPosition,
  TeamSide,
} from './board.action.model'

export const PlayerJohn: BoardItemAction<BoardPlayer> = new BoardItemAction(
  new BoardPlayer('John', 12, TeamSide.MyTeam),
  new BoardAction(
    new BoardPosition(0.2, 0.4),
    [
      new BoardActionTimestamp(new BoardPosition(0.1, 0.2), 0.2),
    ],
  ),
)
