import {
  BoardActionInput,
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

export const Example1 = new BoardActionInput(
  BoardActorMoves.from(
    BoardPosition.of(0.18, 0.38),
    new BoardMoveTimestamp(0.2, BoardPosition.of(0.1, 0.17))),
  new BoardActorAction(
    me,
    BoardActorMoves.from(
      BoardPosition.of(0.2, 0.4),
      new BoardMoveTimestamp(0.2, BoardPosition.of(0.1, 0.2)),
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
        BoardPosition.of(0.3, 0.35),
        new BoardMoveTimestamp(0.3, BoardPosition.of(0.55, 0.18)),
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
  BoardActorMoves.from(
    BoardPosition.of(0.68, 0.45),
    new BoardMoveTimestamp(0.5, BoardPosition.of(0.85, 0.18)),
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
  Example1.opponentTeamKeeperPlayer,
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
  '2',
  new Date(Date.parse('2025-04-05 14:30:00')),
  'manuelarte',
  BoardActorMoves.from(
    BoardPosition.of(0, 0.55),
    new BoardMoveTimestamp(0.4, BoardPosition.of(0.38, 0.47)),
    new BoardMoveTimestamp(0.6, BoardPosition.of(0.45, 0.27)),
    new BoardMoveTimestamp(0.85, BoardPosition.of(0.6, 0.17)),
    new BoardMoveTimestamp(1, BoardPosition.of(0.53, 0)),
  ),
  new BoardActorAction(
    me,
    BoardActorMoves.from(
      BoardPosition.of(0.4, 0.35),
      new BoardMoveTimestamp(0.7, BoardPosition.of(0.46, 0.27)),
      new BoardMoveTimestamp(0.85, BoardPosition.of(0.58, 0.17)),
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
        BoardPosition.of(0.35, 0.27),
        new BoardMoveTimestamp(0.8, BoardPosition.of(0.46, 0.15)),
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
