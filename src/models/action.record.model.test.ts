import { expect, test } from 'vitest'
import { ActionPositions, ActionTimestamp, Position } from './action.record.model.ts'

test('ActionPositions check sort in constructor', () => {
  const initialPosition: Position = new Position(0, 0)
  const other: Array<ActionTimestamp> = [
    new ActionTimestamp(new Position(0.5, 0.5), 0.5),
    new ActionTimestamp(new Position(0.2, 0.2), 0.2),
  ]
  const actionPositions: ActionPositions = new ActionPositions(initialPosition, other)
  expect(actionPositions.other[0]).toStrictEqual(other[1])
  expect(actionPositions.other[1]).toStrictEqual(other[0])
})

test('ActionPositions get position for time 0.5 from 0 to 1', () => {
  const initialPosition: Position = new Position(0, 0)
  const other: Array<ActionTimestamp> = [
    new ActionTimestamp(new Position(1, 1), 1),
  ]
  const actionPositions: ActionPositions = new ActionPositions(initialPosition, other)
  expect(actionPositions.getPositionForTime(0.5)).toStrictEqual(new Position(0.5, 0.5))
})

test('ActionPositions get position for time only initial value', () => {
  const initialPosition: Position = new Position(0.2, 0.2)
  const other: Array<ActionTimestamp> = [
  ]
  const actionPositions: ActionPositions = new ActionPositions(initialPosition, other)
  expect(actionPositions.getPositionForTime(0.5)).toStrictEqual(initialPosition)
})
