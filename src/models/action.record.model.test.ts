import { expect, test } from 'vitest'
import { ActionPositions, ActionTimestamp, Position } from './action.record.model.ts'

test('ActionPositions check sort in constructor', () => {
  const initialPosition: Position = new Position(0, 0)
  const others: Array<ActionTimestamp> = [
    new ActionTimestamp(new Position(0.5, 0.5), 0.5),
    new ActionTimestamp(new Position(0.2, 0.2), 0.2),
  ]
  const actionPositions: ActionPositions = new ActionPositions(initialPosition, others)
  expect(actionPositions.others[0]).toStrictEqual(others[1])
  expect(actionPositions.others[1]).toStrictEqual(others[0])
})
