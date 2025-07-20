import {
  BoardAction,
  BoardActorAction, BoardActorMoves,
  BoardBall,
  BoardMoveTimestamp,
  BoardPlayer,
  BoardPosition,
  TeamSide,
} from './board.action.model'

const ball = new BoardActorAction(
  new BoardBall(),
  new BoardActorMoves(
    new BoardPosition(0.18, 0.38),
    [
      new BoardMoveTimestamp(new BoardPosition(0.1, 0.17), 0.2),
    ],
  ),
)

const me = new BoardActorAction(
  new BoardPlayer('Manuel', 12, TeamSide.MyTeam),
  new BoardActorMoves(
    new BoardPosition(0.2, 0.4),
    [
      new BoardMoveTimestamp(new BoardPosition(0.1, 0.2), 0.2),
    ],
  ),
)

const opponentKeeper = new BoardActorAction(
  new BoardPlayer('Keeper', 1, TeamSide.OpponentTeam),
  new BoardActorMoves(
    new BoardPosition(0.5, 0.07),
    [
      new BoardMoveTimestamp(new BoardPosition(0.46, 0.05), 0.2),
    ],
  ),
)

export const Example1 = new BoardAction
(
  ball,
  me,
  opponentKeeper,
  [
    /* new BoardActorAction(
      new BoardPlayer('Center Back', 4, TeamSide.OpponentTeam),
      new BoardActorMoves(
        new BoardPosition(0.15, 0.17),
        [
          new BoardMoveTimestamp(new BoardPosition(0.46, 0.15), 0.28),
        ],
      ),
    ), */
    new BoardActorAction(
      new BoardPlayer('John', 9, TeamSide.MyTeam),
      new BoardActorMoves(
        new BoardPosition(0.3, 0.37),
        [
          new BoardMoveTimestamp(new BoardPosition(0.6, 0.1), 0.3),
        ],
      ),
    ),
  ],
)
