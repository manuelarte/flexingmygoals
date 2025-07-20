import { ValidationException } from '@/models/validation.model'

export enum TeamSide {
  MyTeam = 'myTeam',
  OpponentTeam = 'opponentTeam',
}

interface BoardItem {}

export class BoardBall implements BoardItem {}

export class BoardPlayer implements BoardItem {
  public name: string
  public number: number
  public color: TeamSide
  constructor (name: string, number: number, color: TeamSide) {
    if (name.length < 2) {
      throw new ValidationException('name too short')
    }
    if (!Number.isInteger(number) || number < 0 || number > 99) {
      throw new ValidationException('number not allowed')
    }
    this.name = name
    this.number = number
    this.color = color
  }
}

/**
 * The position of an item in the board.
 * @param x the coordinate from [0, 1] in the board where 0 is the left side of the pitch.
 * @param y the coordinate from [0, 1] in the board where 0 is where the opponent team goal is.
 */
export class BoardPosition {
  public x: number
  public y: number
  constructor (x: number, y: number) {
    if (x < 0 || x > 1) {
      throw new ValidationException('x needs to be between [0.0, 1.0]')
    }
    if (y < 0 || y > 1) {
      throw new ValidationException('y needs to be between [0.0, 1.0]')
    }
    this.x = x
    this.y = y
  }
}

/**
 * BoardActionTimestamp declares a position for a particular moment in time.
 */
export class BoardActionTimestamp {
  /* The position at one particular moment on time */
  public position: BoardPosition
  /* The moment in time */
  public time: number
  constructor (position: BoardPosition, time: number) {
    if (time < 0 || time > 1) {
      throw new ValidationException('time needs to be between [0.0, 1.0]')
    }
    this.position = position
    this.time = time
  }
}

/**
 * BoardAction declares the initial position and the rest of positions for a player/ball
 */
export class BoardAction {
  /* initialPosition of the object in time, t=0 */
  public initialPosition: BoardPosition
  /* other positions of the object for different times */
  public other: Array<BoardActionTimestamp>
  constructor (initialPosition: BoardPosition, other: Array<BoardActionTimestamp>) {
    this.initialPosition = initialPosition
    // TODO(manuelarte): validate that the time is not repeated
    this.other = other.slice().sort((a, b): number => {
      return a.time - b.time
    })
  }

  getPositionForTime (time: number): BoardPosition {
    if (time < 0 || time > 1) {
      throw new ValidationException('time needs to be between [0.0, 1.0]')
    }

    let previous: BoardActionTimestamp = new BoardActionTimestamp(this.initialPosition, 0)
    let next: BoardActionTimestamp | null = null

    if (this.other.length > 0) {
      for (let i = 0; i < this.other.length; i++) {
        const current = this.other[i]
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

      const newX = Number.parseFloat((mx * time + previous.position.x).toFixed(3))
      const newY = Number.parseFloat((my * time + previous.position.y).toFixed(3))
      return new BoardPosition(newX, newY)
    }
  }
}

export class BoardItemAction<Type extends BoardItem> {
  public item: Type
  public actions: BoardAction

  constructor (item: Type, actions: BoardAction) {
    this.item = item
    this.actions = actions
  }
}
