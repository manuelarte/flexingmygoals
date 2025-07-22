import {
  BoardActionInput,
  BoardActorAction, BoardActorMoves,
  BoardBall,
  BoardMoveTimestamp,
  BoardPlayer,
  BoardPosition,
  SavedBoardAction,
  TeamSide,
} from './board.action.model'

const me = new BoardPlayer('Manuel', 12, TeamSide.MyTeam)

const opponentKeeper = new BoardActorAction(
  new BoardPlayer('Keeper', 1, TeamSide.OpponentTeam),
  new BoardActorMoves(
    new BoardPosition(0.5, 0.07),
    [
      new BoardMoveTimestamp(new BoardPosition(0.46, 0.05), 0.2),
    ],
  ),
)

export const Example1 = new BoardActionInput(
  new BoardActorAction(
    new BoardBall(),
    new BoardActorMoves(
      new BoardPosition(0.18, 0.38),
      [
        new BoardMoveTimestamp(new BoardPosition(0.1, 0.17), 0.2),
      ],
    ),
  ),
  new BoardActorAction(
    me,
    new BoardActorMoves(
      new BoardPosition(0.2, 0.4),
      [
        new BoardMoveTimestamp(new BoardPosition(0.1, 0.2), 0.2),
      ],
    ),
  ),
  opponentKeeper,
  [
    new BoardActorAction(
      new BoardPlayer('Center Back', 4, TeamSide.OpponentTeam),
      new BoardActorMoves(
        new BoardPosition(0.35, 0.17),
        [
          new BoardMoveTimestamp(new BoardPosition(0.46, 0.15), 0.28),
        ],
      ),
    ),
    new BoardActorAction(
      new BoardPlayer('John', 9, TeamSide.MyTeam),
      new BoardActorMoves(
        new BoardPosition(0.3, 0.35),
        [
          new BoardMoveTimestamp(new BoardPosition(0.55, 0.18), 0.3),
        ],
      ),
    ),
  ],
)

export const SavedExample1 = new SavedBoardAction(
  '1',
  new Date(),
  'manuelarte',
  Example1.ball,
  Example1.playerMain,
  Example1.opponentTeamKeeperPlayer,
  Example1.otherPlayers,
)

export const SavedExample2 = new SavedBoardAction(
  '2',
  new Date(),
  'manuelarte',
  new BoardActorAction(
    new BoardBall(),
    new BoardActorMoves(
      new BoardPosition(0.68, 0.45),
      [
        new BoardMoveTimestamp(new BoardPosition(0.85, 0.18), 0.5),
        new BoardMoveTimestamp(new BoardPosition(0.38, 0.18), 0.8),
        new BoardMoveTimestamp(new BoardPosition(0.56, 0), 1),
      ],
    ),
  ),
  new BoardActorAction(
    me,
    new BoardActorMoves(
      new BoardPosition(0.4, 0.35),
      [
        new BoardMoveTimestamp(new BoardPosition(0.37, 0.2), 0.7),
      ],
    ),
  ),
  Example1.opponentTeamKeeperPlayer,
  [
    new BoardActorAction(
      new BoardPlayer('Center Back', 4, TeamSide.OpponentTeam),
      new BoardActorMoves(
        new BoardPosition(0.35, 0.17),
        [
          new BoardMoveTimestamp(new BoardPosition(0.46, 0.15), 0.28),
        ],
      ),
    ),
    new BoardActorAction(
      new BoardPlayer('John', 9, TeamSide.MyTeam),
      new BoardActorMoves(
        new BoardPosition(0.7, 0.45),
        [
          new BoardMoveTimestamp(new BoardPosition(0.88, 0.18), 0.5),
        ],
      ),
    ),
  ],
)
