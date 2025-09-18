import { ValidationException } from '@/models/validation.model'

/**
 * Class holding a football result, like 1-1, or 2-5.
 * There is no concept of home-away, it's just my team and opponent team.
 */
export class FootballResult {
  private readonly _myTeam: number
  private readonly _opponentTeam: number

  constructor (myTeam: number, opponentTeam: number) {
    if (!Number.isInteger(myTeam) || myTeam < 0 || myTeam > 99) {
      throw new ValidationException(`myTeam goals not allowed: ${myTeam}`)
    }
    if (!Number.isInteger(opponentTeam) || opponentTeam < 0 || opponentTeam > 99) {
      throw new ValidationException(`opponentTeam goals not allowed: ${opponentTeam}`)
    }
    this._myTeam = myTeam
    this._opponentTeam = opponentTeam
  }

  get myTeam (): number {
    return this._myTeam
  }

  get opponentTeam (): number {
    return this._opponentTeam
  }

  static of (myTeam: number, opponentTeam: number): FootballResult {
    return new FootballResult(myTeam, opponentTeam)
  }
}

/**
 * The two options for a team side.
 */
export enum TeamSide {
  MyTeam = 'myTeam',
  OpponentTeam = 'opponentTeam',
}

interface BoardActor {}

/**
 * A player to be represented in the Board.
 * @param name The name of the player, between [2, 15] characters.
 * @param number The number of the player, between [1, 99].
 * @param color Whether is from my team or the opponent.
 */
export class BoardPlayer implements BoardActor {
  static readonly MIN_NAME_LENGTH = 2
  static readonly MAX_NAME_LENGTH = 15
  static readonly MIN_NUMBER = 1
  static readonly MAX_NUMBER = 99

  private readonly _name: string
  private readonly _number: number
  private readonly _color: TeamSide

  constructor (name: string, number: number, color: TeamSide) {
    this.validateName(name)
    this.validateNumber(number)

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

  static myTeam (name: string, number: number): BoardPlayer {
    return new BoardPlayer(name, number, TeamSide.MyTeam)
  }

  static opponentTeam (name: string, number: number): BoardPlayer {
    return new BoardPlayer(name, number, TeamSide.OpponentTeam)
  }

  equals (other: unknown): boolean {
    // Check if it's the same reference
    if (this === other) {
      return true
    }

    // Check if other is null/undefined
    if (other == null) {
      return false
    }

    // Check if other is an instance of BoardPlayer
    if (!(other instanceof BoardPlayer)) {
      return false
    }

    // Compare all significant properties
    return this._name === other._name
      && this._number === other._number
      && this._color === other._color
  }

  private validateName (name: string): void {
    if (name.length < BoardPlayer.MIN_NAME_LENGTH) {
      throw new ValidationException(`Name too short. Minimum length: ${BoardPlayer.MIN_NAME_LENGTH}`)
    }
    if (name.length > BoardPlayer.MAX_NAME_LENGTH) {
      throw new ValidationException(`Name too long. Maximum length: ${BoardPlayer.MAX_NAME_LENGTH}`)
    }
  }

  private validateNumber (number: number): void {
    if (!Number.isInteger(number) || number < BoardPlayer.MIN_NUMBER || number > BoardPlayer.MAX_NUMBER) {
      throw new ValidationException(`Number must be an integer between ${BoardPlayer.MIN_NUMBER} and ${BoardPlayer.MAX_NUMBER}`)
    }
  }
}

/**
 * The normalized position of an actor (Player or Ball) in the board.
 * @param x the coordinate from [0, 1] in the board where 0 is the left side of the pitch.
 * @param y the coordinate from [0, 1] in the board where 0 is where the opponent team goal is.
 */
export class BoardPosition {
  private static readonly MIN_COORDINATE = 0
  private static readonly MAX_COORDINATE = 1

  private readonly _x: number
  private readonly _y: number

  constructor (x: number, y: number) {
    this.validateCoordinate(x, 'x')
    this.validateCoordinate(y, 'y')

    this._x = x
    this._y = y
  }

  get x (): number {
    return this._x
  }

  get y (): number {
    return this._y
  }

  static of (x: number, y: number): BoardPosition {
    return new BoardPosition(x, y)
  }

  private validateCoordinate (value: number, coordinate: string): void {
    if (!Number.isFinite(value) || value < BoardPosition.MIN_COORDINATE || value > BoardPosition.MAX_COORDINATE) {
      throw new ValidationException(
        `${coordinate} needs to be a finite number between [${BoardPosition.MIN_COORDINATE}, ${BoardPosition.MAX_COORDINATE}]`,
      )
    }
  }
}

/**
 * BoardPositionTimestamp declares a board position for a particular moment in time.
 * @param time The moment in time between [0, 1]
 * @param position The position in the field.
 */
export class BoardPositionTimestamp {
  private static readonly MIN_TIME = 0
  private static readonly MAX_TIME = 1

  /** The moment in time [0, 1] */
  private readonly _time: number
  /** The position at one particular moment on time */
  private readonly _position: BoardPosition

  constructor (time: number, position: BoardPosition) {
    this.validateTime(time)
    this._time = time
    this._position = position
  }

  get position (): BoardPosition {
    return this._position
  }

  get time (): number {
    return this._time
  }

  private validateTime (time: number): void {
    if (!Number.isFinite(time) || time < BoardPositionTimestamp.MIN_TIME || time > BoardPositionTimestamp.MAX_TIME) {
      throw new ValidationException(
        `Time needs to be a finite number between [${BoardPositionTimestamp.MIN_TIME}, ${BoardPositionTimestamp.MAX_TIME}]`,
      )
    }
  }
}

/**
 * BoardActorTimePositions declares the initial board position and the rest of the board positions for an actor.
 */
export class BoardActorTimePositions {
  /** initialPosition of the actor in time, t=0 */
  private readonly _initialPosition: BoardPosition
  /** other positions of the actor for different times */
  private readonly _other: Array<BoardPositionTimestamp>

  constructor (
    initialPosition: BoardPosition,
    other: Array<BoardPositionTimestamp>,
  ) {
    this._initialPosition = initialPosition
    this._other = this.sortAndValidateTimestamps(other)
  }

  get other (): Array<BoardPositionTimestamp> {
    return this._other
  }

  static from (initialPosition: BoardPosition, ...other: Array<BoardPositionTimestamp>): BoardActorTimePositions {
    return new BoardActorTimePositions(initialPosition, other)
  }

  /**
   * Returns the BoardPosition based on linear interpolation for a specific moment in time.
   * @param time the moment in time [0, 1].
   */
  getPositionForTime (time: number): BoardPosition {
    if (time < 0 || time > 1) {
      throw new ValidationException('Time needs to be between [0.0, 1.0]')
    }

    if (this._other.length === 0) {
      return this._initialPosition
    }

    const { previous, next } = this.findSurroundingTimestamps(time)

    if (!next) {
      return previous.position
    }

    return this.interpolatePosition(previous, next, time)
  }

  /**
   * Returns all the board positions by time.
   */
  getTimePositions (): Array<BoardPositionTimestamp> {
    const toReturn = [new BoardPositionTimestamp(0, this._initialPosition)]
    for (const other of this._other) {
      toReturn.push(other)
    }

    return toReturn
  }

  private findSurroundingTimestamps (time: number): {
    previous: BoardPositionTimestamp
    next: BoardPositionTimestamp | null
  } {
    let previous = new BoardPositionTimestamp(0, this._initialPosition)
    let next: BoardPositionTimestamp | null = null

    for (const current of this._other) {
      if (current.time >= time) {
        next = current
        break
      }
      previous = current
    }

    return { previous, next }
  }

  private interpolatePosition (
    previous: BoardPositionTimestamp,
    next: BoardPositionTimestamp,
    time: number,
  ): BoardPosition {
    const timeDiff = next.time - previous.time
    const timeRatio = (time - previous.time) / timeDiff

    const newX = previous.position.x + (next.position.x - previous.position.x) * timeRatio
    const newY = previous.position.y + (next.position.y - previous.position.y) * timeRatio

    return new BoardPosition(newX, newY)
  }

  private sortAndValidateTimestamps (timestamps: Array<BoardPositionTimestamp>): Array<BoardPositionTimestamp> {
    const sorted = timestamps.slice().sort((a, b) => a.time - b.time)

    // Check for duplicate times
    const times = new Set()
    for (const timestamp of sorted) {
      if (times.has(timestamp.time)) {
        throw new ValidationException(`Duplicate time found: ${timestamp.time}`)
      }
      times.add(timestamp.time)
    }

    return sorted
  }
}

/**
 * Holder for the board position in any particular moment in time [0, 1].
 * @param actor the actor that performs the action.
 * @param moves the different time positions.
 */
export class BoardActorAction<Type extends BoardActor> {
  private readonly _actor: Type
  private readonly _moves: BoardActorTimePositions

  constructor (actor: Type, moves: BoardActorTimePositions) {
    this._actor = actor
    this._moves = moves
  }

  get actor (): Type {
    return this._actor
  }

  get moves (): BoardActorTimePositions {
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
  /** Highlight small one line of the action */
  private readonly _highlight: string | null
  /** Summary describing of the action. */
  private readonly _summary: string | null
  /** Partial result when the action happened */
  private readonly _partialResult: FootballResult
  /** The ball board positions during the action. */
  private readonly _ball: BoardActorTimePositions
  /** The main player board positions during the action. */
  private readonly _playerMain: BoardActorAction<BoardPlayer>
  /** The keeper board positions during the action. */
  private readonly _opponentTeamKeeperPlayer: BoardActorAction<BoardPlayer>
  /** Other players board positions during the action. */
  private readonly _otherPlayers: Array<BoardActorAction<BoardPlayer>>

  constructor (
    highlight: string | null,
    summary: string | null,
    partialResult: FootballResult,
    ball: BoardActorTimePositions,
    mainPlayer: BoardActorAction<BoardPlayer>,
    opponentTeamKeeperPlayer: BoardActorAction<BoardPlayer>,
    otherPlayers: Array<BoardActorAction<BoardPlayer>>,
  ) {
    if (highlight && highlight.length > 0 && highlight.length > 40) {
      throw new ValidationException(`Invalid highlight length: 40 < ${highlight.length}`)
    }
    if (summary && summary.length > 0 && summary.length > 200) {
      throw new ValidationException(`Invalid summary length: 200 < ${summary.length}`)
    }
    this._highlight = highlight
    this._summary = summary
    this._partialResult = partialResult
    this._ball = ball
    this._playerMain = mainPlayer
    this._opponentTeamKeeperPlayer = opponentTeamKeeperPlayer
    this._otherPlayers = [...otherPlayers]
  }

  get highlight (): string | null {
    return this._highlight
  }

  get summary (): string | null {
    return this._summary
  }

  get partialResult (): FootballResult {
    return this._partialResult
  }

  get ball (): BoardActorTimePositions {
    return this._ball
  }

  get playerMain (): BoardActorAction<BoardPlayer> {
    return this._playerMain
  }

  get otherPlayers (): Array<BoardActorAction<BoardPlayer>> {
    return this._otherPlayers
  }

  get opponentTeamKeeperPlayer (): BoardActorAction<BoardPlayer> {
    return this._opponentTeamKeeperPlayer
  }
}

/**
 * The board action containing all the movements from the ball and players.
 */
export class BoardAction extends BoardActionInput {
  private readonly _id: string
  private readonly _createdAt: Date
  private readonly _createdBy: string

  constructor (
    id: string,
    createdAt: Date,
    createdBy: string,
    highlight: string | null,
    summary: string | null,
    partialResult: FootballResult,
    ball: BoardActorTimePositions,
    playerMain: BoardActorAction<BoardPlayer>,
    opponentTeamKeeperPlayer: BoardActorAction<BoardPlayer>,
    otherPlayers: Array<BoardActorAction<BoardPlayer>>,
  ) {
    super (highlight, summary, partialResult, ball, playerMain, opponentTeamKeeperPlayer, otherPlayers)
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
