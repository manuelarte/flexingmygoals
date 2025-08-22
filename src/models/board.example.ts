import {
  BoardAction, BoardActorAction,
  BoardActorTimePositions,
  BoardPlayer,
  BoardPosition,
  BoardPositionTimestamp, FootballResult,
} from './board.action.model'

const me = BoardPlayer.myTeam('Manuel', 12)

const opponentKeeper = new BoardActorAction(
  BoardPlayer.opponentTeam('Keeper', 1),
  BoardActorTimePositions.from(
    BoardPosition.of(0.5, 0.07),
    new BoardPositionTimestamp(0.2, BoardPosition.of(0.46, 0.05)),
  ),
)

export const SavedExample1 = new BoardAction(
  '1',
  new Date(),
  'manuelarte',
  'Winning goal Alphense Boys 1-0 Bernardus',
  'We recover the ball and dribble to the box, but I got tackle. Then I scored the free-kick in the keeper\'s side.',
  FootballResult.of(1, 0),
  BoardActorTimePositions.from(
    BoardPosition.of(0.6, 0.25),
    new BoardPositionTimestamp(0.2, BoardPosition.of(0.62, 0.18)), // foul
    new BoardPositionTimestamp(0.4, BoardPosition.of(0.66, 0.18)),
    new BoardPositionTimestamp(0.55, BoardPosition.of(0.66, 0.18)),
    new BoardPositionTimestamp(0.56, BoardPosition.of(0.62, 0.18)), // free-kick start
    new BoardPositionTimestamp(0.7, BoardPosition.of(0.62, 0.18)), // free-kick shooting
    new BoardPositionTimestamp(0.8, BoardPosition.of(0.45, 0)),
  ),
  new BoardActorAction(
    me,
    BoardActorTimePositions.from(
      BoardPosition.of(0.6, 0.26),
      new BoardPositionTimestamp(0.2, BoardPosition.of(0.62, 0.19)),
      new BoardPositionTimestamp(0.21, BoardPosition.of(0.63, 0.19)),
      new BoardPositionTimestamp(0.55, BoardPosition.of(0.63, 0.19)),
      new BoardPositionTimestamp(0.56, BoardPosition.of(0.64, 0.22)), // free-kick start
      new BoardPositionTimestamp(0.65, BoardPosition.of(0.64, 0.22)),
      new BoardPositionTimestamp(0.7, BoardPosition.of(0.62, 0.18)), // free-kick shooting
    ),
  ),
  new BoardActorAction(
    BoardPlayer.opponentTeam('Keeper', 1),
    BoardActorTimePositions.from(
      BoardPosition.of(0.5, 0.07),
      new BoardPositionTimestamp(0.2, BoardPosition.of(0.52, 0.05)),
      new BoardPositionTimestamp(0.55, BoardPosition.of(0.52, 0.05)),
      new BoardPositionTimestamp(0.56, BoardPosition.of(0.48, 0.01)), // free-kick start
      new BoardPositionTimestamp(0.65, BoardPosition.of(0.48, 0.01)),
      new BoardPositionTimestamp(0.71, BoardPosition.of(0.5, 0.01)), // free-kick shooting
    ),
  ),
  [
    new BoardActorAction(
      BoardPlayer.opponentTeam('Center Back', 4),
      BoardActorTimePositions.from(
        BoardPosition.of(0.5, 0.22),
        new BoardPositionTimestamp(0.21, BoardPosition.of(0.62, 0.2)),
        new BoardPositionTimestamp(0.55, BoardPosition.of(0.62, 0.2)),
        new BoardPositionTimestamp(0.56, BoardPosition.of(0.6, 0.1)),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.myTeam('John', 9),
      BoardActorTimePositions.from(
        BoardPosition.of(0.3, 0.35),
        new BoardPositionTimestamp(0.25, BoardPosition.of(0.5, 0.25)),
      ),
    ),
  ],
)

export const SavedExample2 = new BoardAction(
  '2',
  new Date(),
  'manuelarte',
  'Make up Goal to test the functionality',
  'Makeup goal, crossing and shot.',
  FootballResult.of(1, 2),
  BoardActorTimePositions.from(
    BoardPosition.of(0.68, 0.45),
    new BoardPositionTimestamp(0.5, BoardPosition.of(0.86, 0.18)),
    new BoardPositionTimestamp(0.8, BoardPosition.of(0.38, 0.19)), // Manuel receives the ball
    new BoardPositionTimestamp(0.85, BoardPosition.of(0.38, 0.19)), // Manuel controls
    new BoardPositionTimestamp(1, BoardPosition.of(0.55, 0)),
  ),
  new BoardActorAction(
    me,
    BoardActorTimePositions.from(
      BoardPosition.of(0.4, 0.35),
      new BoardPositionTimestamp(0.7, BoardPosition.of(0.37, 0.2)),
    ),
  ),
  opponentKeeper,
  [
    new BoardActorAction(
      BoardPlayer.opponentTeam('Center Back', 4),
      BoardActorTimePositions.from(
        BoardPosition.of(0.35, 0.17),
        new BoardPositionTimestamp(0.28, BoardPosition.of(0.46, 0.15)),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.myTeam('John', 9),
      BoardActorTimePositions.from(
        BoardPosition.of(0.7, 0.45),
        new BoardPositionTimestamp(0.5, BoardPosition.of(0.88, 0.18)),
      ),
    ),
  ],
)

export const SavedExample3 = new BoardAction(
  '3',
  new Date(Date.parse('2025-04-05 14:30:00')),
  'manuelarte',
  'Winning goal against VUC +35',
  'Wesley receives the ball from a throw in, then he does a long ball to the area and I get it and dribble the keeper and score with my right foot',
  FootballResult.of(1, 0),
  BoardActorTimePositions.from(
    BoardPosition.of(0, 0.45),
    new BoardPositionTimestamp(0.48, BoardPosition.of(0.38, 0.47)), // Wesley controls the ball
    new BoardPositionTimestamp(0.57, BoardPosition.of(0.38, 0.47)), // Wesley's pass to Manuel
    new BoardPositionTimestamp(0.8, BoardPosition.of(0.46, 0.16)), // Ball arriving in front of Manuel
    new BoardPositionTimestamp(0.85, BoardPosition.of(0.61, 0.12)),
    new BoardPositionTimestamp(0.93, BoardPosition.of(0.61, 0.12)),
    new BoardPositionTimestamp(1, BoardPosition.of(0.53, 0)),
  ),
  new BoardActorAction(
    me,
    BoardActorTimePositions.from(
      BoardPosition.of(0.4, 0.35),
      new BoardPositionTimestamp(0.48, BoardPosition.of(0.4, 0.35)),
      new BoardPositionTimestamp(0.62, BoardPosition.of(0.43, 0.27)),
      new BoardPositionTimestamp(0.8, BoardPosition.of(0.46, 0.17)),
      new BoardPositionTimestamp(0.93, BoardPosition.of(0.6, 0.12)),
    ),
  ),
  new BoardActorAction(
    BoardPlayer.opponentTeam('Keeper', 1),
    BoardActorTimePositions.from(
      BoardPosition.of(0.5, 0.07),
      new BoardPositionTimestamp(0.55, BoardPosition.of(0.48, 0.07)),
      new BoardPositionTimestamp(0.86, BoardPosition.of(0.52, 0.1)),
    ),
  ),
  [
    new BoardActorAction(
      BoardPlayer.opponentTeam('Center Back', 4),
      BoardActorTimePositions.from(
        BoardPosition.of(0.35, 0.35),
        new BoardPositionTimestamp(0.5, BoardPosition.of(0.35, 0.35)),
        new BoardPositionTimestamp(0.9, BoardPosition.of(0.46, 0.18)),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.myTeam('Wesley', 9),
      BoardActorTimePositions.from(
        BoardPosition.of(0.45, 0.47),
        new BoardPositionTimestamp(0.4, BoardPosition.of(0.38, 0.47)),
      ),
    ),
  ],
)

export const TestingLimits = new BoardAction(
  '2',
  new Date(),
  'manuelarte',
  'Testing limits',
  'Several players in the corners',
  FootballResult.of(5, 5),
  BoardActorTimePositions.from(
    BoardPosition.of(0, 0),
  ),
  new BoardActorAction(
    me,
    BoardActorTimePositions.from(
      BoardPosition.of(1, 0.5),
    ),
  ),
  new BoardActorAction(
    BoardPlayer.opponentTeam('Keeper', 1),
    BoardActorTimePositions.from(
      BoardPosition.of(0.5, 0),
    ),
  ),
  [
    new BoardActorAction(
      BoardPlayer.opponentTeam('Left Down', 4),
      BoardActorTimePositions.from(
        BoardPosition.of(0, 0.5),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.opponentTeam('Middle Point', 6),
      BoardActorTimePositions.from(
        BoardPosition.of(0.5, 0.5),
      ),
    ),
    new BoardActorAction(
      BoardPlayer.myTeam('Right Down', 9),
      BoardActorTimePositions.from(
        BoardPosition.of(1, 0),
      ),
    ),
  ],
)
