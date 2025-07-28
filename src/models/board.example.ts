import {
  BoardActorAction, BoardActorMoves,
  BoardMoveTimestamp,
  BoardPlayer,
  BoardPosition,
  SavedBoardAction,
} from './board.action.model'

const me = BoardPlayer.Mine('Manuel', 12)

const opponentKeeper = new BoardActorAction(
  BoardPlayer.Opponent('Keeper', 1),
  BoardActorMoves.from(
    BoardPosition.of(0.5, 0.07),
    new BoardMoveTimestamp(0.2, BoardPosition.of(0.46, 0.05)),
  ),
)

export const SavedExample1 = new SavedBoardAction(
  '1',
  new Date(),
  'manuelarte',
  BoardActorMoves.from(
    BoardPosition.of(0.6, 0.25),
    new BoardMoveTimestamp(0.2, BoardPosition.of(0.62, 0.18)), // foul
    new BoardMoveTimestamp(0.4, BoardPosition.of(0.66, 0.18)),
    new BoardMoveTimestamp(0.55, BoardPosition.of(0.66, 0.18)),
    new BoardMoveTimestamp(0.56, BoardPosition.of(0.62, 0.18)), // free-kick start
    new BoardMoveTimestamp(0.7, BoardPosition.of(0.62, 0.18)), // free-kick shooting
    new BoardMoveTimestamp(0.8, BoardPosition.of(0.45, 0)),
  ),
  new BoardActorAction(
    me,
    BoardActorMoves.from(
      BoardPosition.of(0.6, 0.26),
      new BoardMoveTimestamp(0.2, BoardPosition.of(0.62, 0.19)),
      new BoardMoveTimestamp(0.21, BoardPosition.of(0.63, 0.19)),
      new BoardMoveTimestamp(0.55, BoardPosition.of(0.63, 0.19)),
      new BoardMoveTimestamp(0.56, BoardPosition.of(0.64, 0.22)), // free-kick start
      new BoardMoveTimestamp(0.65, BoardPosition.of(0.64, 0.22)),
      new BoardMoveTimestamp(0.7, BoardPosition.of(0.62, 0.18)), // free-kick shooting
    ),
  ),
  new BoardActorAction(
    BoardPlayer.Opponent('Keeper', 1),
    BoardActorMoves.from(
      BoardPosition.of(0.5, 0.07),
      new BoardMoveTimestamp(0.2, BoardPosition.of(0.52, 0.05)),
      new BoardMoveTimestamp(0.55, BoardPosition.of(0.52, 0.05)),
      new BoardMoveTimestamp(0.56, BoardPosition.of(0.48, 0.01)), // free-kick start
      new BoardMoveTimestamp(0.65, BoardPosition.of(0.48, 0.01)),
      new BoardMoveTimestamp(0.71, BoardPosition.of(0.5, 0.01)), // free-kick shooting
    ),
  ),
  [
    new BoardActorAction(
      BoardPlayer.Opponent('Center Back', 4),
      BoardActorMoves.from(
        BoardPosition.of(0.5, 0.22),
        new BoardMoveTimestamp(0.21, BoardPosition.of(0.62, 0.2)),
        new BoardMoveTimestamp(0.55, BoardPosition.of(0.62, 0.2)),
        new BoardMoveTimestamp(0.56, BoardPosition.of(0.6, 0.1)),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.Mine('John', 9),
      BoardActorMoves.from(
        BoardPosition.of(0.3, 0.35),
        new BoardMoveTimestamp(0.25, BoardPosition.of(0.5, 0.25)),
      ),
    ),
  ],
)

export const SavedExample2 = new SavedBoardAction(
  '2',
  new Date(),
  'manuelarte',
  BoardActorMoves.from(
    BoardPosition.of(0.68, 0.45),
    new BoardMoveTimestamp(0.5, BoardPosition.of(0.86, 0.18)),
    new BoardMoveTimestamp(0.8, BoardPosition.of(0.38, 0.18)),
    new BoardMoveTimestamp(1, BoardPosition.of(0.56, 0)),
  ),
  new BoardActorAction(
    me,
    BoardActorMoves.from(
      BoardPosition.of(0.4, 0.35),
      new BoardMoveTimestamp(0.7, BoardPosition.of(0.37, 0.2)),
    ),
  ),
  opponentKeeper,
  [
    new BoardActorAction(
      BoardPlayer.Opponent('Center Back', 4),
      BoardActorMoves.from(
        BoardPosition.of(0.35, 0.17),
        new BoardMoveTimestamp(0.28, BoardPosition.of(0.46, 0.15)),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.Mine('John', 9),
      BoardActorMoves.from(
        BoardPosition.of(0.7, 0.45),
        new BoardMoveTimestamp(0.5, BoardPosition.of(0.88, 0.18)),
      ),
    ),
  ],
)

export const SavedExample3 = new SavedBoardAction(
  '3',
  new Date(Date.parse('2025-04-05 14:30:00')),
  'manuelarte',
  BoardActorMoves.from(
    BoardPosition.of(0, 0.45),
    new BoardMoveTimestamp(0.48, BoardPosition.of(0.38, 0.47)), // Wesley controls the ball
    new BoardMoveTimestamp(0.57, BoardPosition.of(0.38, 0.47)), // Wesley's pass to Manuel
    new BoardMoveTimestamp(0.8, BoardPosition.of(0.46, 0.16)), // Ball arriving in front of Manuel
    new BoardMoveTimestamp(0.85, BoardPosition.of(0.61, 0.12)),
    new BoardMoveTimestamp(0.93, BoardPosition.of(0.61, 0.12)),
    new BoardMoveTimestamp(1, BoardPosition.of(0.53, 0)),
  ),
  new BoardActorAction(
    me,
    BoardActorMoves.from(
      BoardPosition.of(0.4, 0.35),
      new BoardMoveTimestamp(0.48, BoardPosition.of(0.4, 0.35)),
      new BoardMoveTimestamp(0.62, BoardPosition.of(0.43, 0.27)),
      new BoardMoveTimestamp(0.8, BoardPosition.of(0.46, 0.17)),
      new BoardMoveTimestamp(0.93, BoardPosition.of(0.6, 0.12)),
    ),
  ),
  new BoardActorAction(
    BoardPlayer.Opponent('Keeper', 1),
    BoardActorMoves.from(
      BoardPosition.of(0.5, 0.07),
      new BoardMoveTimestamp(0.55, BoardPosition.of(0.48, 0.07)),
      new BoardMoveTimestamp(0.86, BoardPosition.of(0.52, 0.1)),
    ),
  ),
  [
    new BoardActorAction(
      BoardPlayer.Opponent('Center Back', 4),
      BoardActorMoves.from(
        BoardPosition.of(0.35, 0.35),
        new BoardMoveTimestamp(0.5, BoardPosition.of(0.35, 0.35)),
        new BoardMoveTimestamp(0.9, BoardPosition.of(0.46, 0.18)),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.Mine('Wesley', 9),
      BoardActorMoves.from(
        BoardPosition.of(0.45, 0.47),
        new BoardMoveTimestamp(0.4, BoardPosition.of(0.38, 0.47)),
      ),
    ),
  ],
)

export const TestingLimits = new SavedBoardAction(
  '2',
  new Date(),
  'manuelarte',
  BoardActorMoves.from(
    BoardPosition.of(0, 0),
  ),
  new BoardActorAction(
    me,
    BoardActorMoves.from(
      BoardPosition.of(1, 0),
    ),
  ),
  new BoardActorAction(
    BoardPlayer.Opponent('Keeper', 1),
    BoardActorMoves.from(
      BoardPosition.of(0.5, 0),
    ),
  ),
  [
    new BoardActorAction(
      BoardPlayer.Opponent('Left Down', 4),
      BoardActorMoves.from(
        BoardPosition.of(0, 0.75),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.Opponent('Middle Point', 6),
      BoardActorMoves.from(
        BoardPosition.of(0.5, 0.5),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.Mine('Right Down', 9),
      BoardActorMoves.from(
        BoardPosition.of(1, 0.75),
      ),
    ),
  ],
)
