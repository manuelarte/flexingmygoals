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
  /* The position at one particular moment on time */
  public position: Position
  /* The moment in time */
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
  /* other positions of the object for different times */
  public other: Array<ActionTimestamp>
  constructor (initialPosition: Position, other: Array<ActionTimestamp>) {
    this.initialPosition = initialPosition
    // TODO(manuelarte): validate that the time is not repeated
    this.other = other.slice().sort((a, b): number => {
      return a.time - b.time
    })
  }

  getPositionForTime (time: number): Position {
    if (time < 0 || time > 1) {
      throw new ValidationException('time needs to be between [0.0, 1.0]')
    }

    let previous: ActionTimestamp = new ActionTimestamp(this.initialPosition, 0)
    let next: ActionTimestamp | null = null

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

      return new Position(mx * time, my * time)
    }
  }
}
