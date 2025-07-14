import { ValidationException } from '@/models/validation.model'

export class PlayerModel {
  public name: string
  public number: number
  constructor (name: string, number: number) {
    if (name.length < 2) {
      throw new ValidationException('name too short')
    }
    if (!Number.isInteger(number) || number < 0 || number > 99) {
      throw new ValidationException('number not allowed')
    }
    this.name = name
    this.number = number
  }
}

export class Position {
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
 * ActionTimestamp declares a position for a particular moment in time.
 */
export class ActionTimestamp {
  public position: Position
  public time: number
  constructor (position: Position, time: number) {
    if (time < 0 || time > 1) {
      throw new ValidationException('time needs to be between [0.0, 1.0]')
    }
    this.position = position
    this.time = time
  }
}

export class ActionPositions {
  /* initialPosition of the object in time, t=0 */
  public initialPosition: Position
  /* others positions of the object for different times */
  public others: Array<ActionTimestamp>
  constructor (initialPosition: Position, others: Array<ActionTimestamp>) {
    this.initialPosition = initialPosition
    // TODO(manuelarte): validate that the time is not repeated
    this.others = others.slice().sort((a, b): number => {
      return a.time - b.time
    })
  }
}
