import { ValidationException } from '@/models/validation.model'

export enum TeamSide {
  MyTeam = 'myTeam',
  OpponentTeam = 'opponentTeam',
}

interface BoardActor {}

export class BoardBall implements BoardActor {}

export class BoardPlayer implements BoardActor {
  private readonly _name: string
  private readonly _number: number
  private readonly _color: TeamSide
  constructor (name: string, number: number, color: TeamSide) {
    if (name.length < 2) {
      throw new ValidationException('name too short')
    }
    if (name.length > 15) {
      throw new ValidationException('name too long')
    }
    if (!Number.isInteger(number) || number < 0 || number > 99) {
      throw new ValidationException('number not allowed')
    }
    this._name = name
    this._number = number
    this._color = color
  }

  get name (): string {
    return this._name
  }

  get number (): number {
    return this._number
  }

  get color (): TeamSide {
    return this._color
  }
}

/**
 * The normalized position of an actor (Player or Ball) in the board.
 * @param x the coordinate from [0, 1] in the board where 0 is the left side of the pitch.
 * @param y the coordinate from [0, 1] in the board where 0 is where the opponent team goal is.
 */
export class BoardPosition {
  private readonly _x: number
  private readonly _y: number
  constructor (x: number, y: number) {
    if (x < 0 || x > 1) {
      throw new ValidationException('x needs to be between [0.0, 1.0]')
    }
    if (y < 0 || y > 1) {
      throw new ValidationException('y needs to be between [0.0, 1.0]')
    }
    this._x = x
    this._y = y
  }

  get x (): number {
    return this._x
  }

  get y (): number {
    return this._y
  }
}

/**
 * BoardMoveTimestamp declares a board position for a particular moment in time.
 */
export class BoardMoveTimestamp {
  /* The position at one particular moment on time */
  private readonly _position: BoardPosition
  /* The moment in time [0, 1] */
  private readonly _time: number
  constructor (position: BoardPosition, time: number) {
    if (time < 0 || time > 1) {
      throw new ValidationException('time needs to be between [0.0, 1.0]')
    }
    this._position = position
    this._time = time
  }

  get position (): BoardPosition {
    return this._position
  }

  get time (): number {
    return this._time
  }
}

/**
 * BoardActorMoves declares the initial board position and the rest of the board positions for an actor (player/ball).
 */
export class BoardActorMoves {
  /* initialPosition of the actor in time, t=0 */
  private readonly _initialPosition: BoardPosition
  /* other positions of the actor for different times */
  private readonly _other: Array<BoardMoveTimestamp>

  constructor (
    initialPosition: BoardPosition,
    other: Array<BoardMoveTimestamp>,
  ) {
    this._initialPosition = initialPosition
    // TODO(manuelarte): validate that the time is not repeated
    this._other = other.slice().sort((a, b): number => {
      return a.time - b.time
    })
  }

  get other (): Array<BoardMoveTimestamp> {
    return this._other
  }

  /**
   * Returns the BoardPosition based on linear interpolation for a specific moment in time.
   * @param time the moment in time [0, 1].
   */
  getPositionForTime (time: number): BoardPosition {
    if (time < 0 || time > 1) {
      throw new ValidationException('time needs to be between [0.0, 1.0]')
    }

    let previous: BoardMoveTimestamp = new BoardMoveTimestamp(
      this._initialPosition,
      0,
    )
    let next: BoardMoveTimestamp | null = null

    if (this._other.length > 0) {
      for (let i = 0; i < this._other.length; i++) {
        const current = this._other[i]
        if (current.time >= time) {
          next = current
          break
        } else {
          previous = current
        }
      }
    }
    if (next == null) {
      return previous.position
    } else {
      const t2 = next.time
      const t1 = previous.time

      const mx = (next.position.x - previous.position.x) / (t2 - t1)
      const my = (next.position.y - previous.position.y) / (t2 - t1)

      const newX = Number.parseFloat(
        (mx * time + previous.position.x).toFixed(3),
      )
      const newY = Number.parseFloat(
        (my * time + previous.position.y).toFixed(3),
      )
      return new BoardPosition(newX, newY)
    }
  }
}

/**
 * Holder for the board position in any particular moment in time [0, 1].
 */
export class BoardActorAction<Type extends BoardActor> {
  private readonly _actor: Type
  private readonly _moves: BoardActorMoves

  constructor (actor: Type, moves: BoardActorMoves) {
    this._actor = actor
    this._moves = moves
  }

  get actor (): Type {
    return this._actor
  }

  get moves (): BoardActorMoves {
    return this._moves
  }

  /**
   * Returns the BoardPosition based on linear interpolation for a specific moment in time.
   * @param time the moment in time [0, 1].
   */
  getPositionForTime (time: number): BoardPosition {
    return this.moves.getPositionForTime(time)
  }
}

/**
 * All the board action with all the actors.
 */
export class BoardActionInput {
  /* The ball board positions during the action. */
  private readonly _ball: BoardActorAction<BoardBall>
  /* The main player board positions during the action. */
  private readonly _playerMain: BoardActorAction<BoardPlayer>
  /* The keeper board positions during the action. */
  private readonly _opponentTeamKeeperPlayer: BoardActorAction<BoardPlayer>

  private readonly _otherPlayers: Array<BoardActorAction<BoardPlayer>>

  constructor (
    ball: BoardActorAction<BoardBall>,
    mainPlayer: BoardActorAction<BoardPlayer>,
    opponentTeamKeeperPlayer: BoardActorAction<BoardPlayer>,
    otherPlayers: Array<BoardActorAction<BoardPlayer>>,
  ) {
    this._ball = ball
    this._playerMain = mainPlayer
    this._opponentTeamKeeperPlayer = opponentTeamKeeperPlayer
    this._otherPlayers = otherPlayers.slice()
  }

  get ball (): BoardActorAction<BoardBall> {
    return this._ball
  }

  get playerMain (): BoardActorAction<BoardPlayer> {
    return this._playerMain
  }

  get opponentTeamKeeperPlayer (): BoardActorAction<BoardPlayer> {
    return this._opponentTeamKeeperPlayer
  }

  get otherPlayers (): Array<BoardActorAction<BoardPlayer>> {
    return this._otherPlayers
  }
}

export class SavedBoardAction extends BoardActionInput {
  private readonly _id: string
  private readonly _createdAt: Date
  private readonly _createdBy: string

  constructor (
    id: string,
    createdAt: Date,
    createdBy: string,
    ball: BoardActorAction<BoardBall>,
    mainPlayer: BoardActorAction<BoardPlayer>,
    opponentTeamKeeperPlayer: BoardActorAction<BoardPlayer>,
    otherPlayers: Array<BoardActorAction<BoardPlayer>>,
  ) {
    super (ball, mainPlayer, opponentTeamKeeperPlayer, otherPlayers)
    this._id = id
    this._createdAt = createdAt
    this._createdBy = createdBy
  }

  get id (): string {
    return this._id
  }

  get createdAt (): Date {
    return this._createdAt
  }

  get createdBy (): string {
    return this._createdBy
  }
}
