import { expect, test } from 'vitest'
import { BoardAction, BoardActionTimestamp, BoardPosition } from './board.action.model.ts'

test('ActionPositions check sort in constructor', () => {
  const initialPosition = new BoardPosition(0, 0)
  const other = [
    new BoardActionTimestamp(new BoardPosition(0.5, 0.5), 0.5),
    new BoardActionTimestamp(new BoardPosition(0.2, 0.2), 0.2),
  ]
  const actionPositions = new BoardAction(initialPosition, other)
  expect(actionPositions.other[0]).toStrictEqual(other[1])
  expect(actionPositions.other[1]).toStrictEqual(other[0])
})

test('ActionPositions get position for time 0.5 from 0 to 1', () => {
  const initialPosition = new BoardPosition(0, 0)
  const other = [
    new BoardActionTimestamp(new BoardPosition(1, 1), 1),
  ]
  const actionPositions = new BoardAction(initialPosition, other)
  expect(actionPositions.getPositionForTime(0.5)).toStrictEqual(new BoardPosition(0.5, 0.5))
})

test('ActionPositions get position for time 0.5 from 0.5 to 1', () => {
  const initialPosition = new BoardPosition(0.5, 0.5)
  const other = [
    new BoardActionTimestamp(new BoardPosition(1, 1), 1),
  ]
  const actionPositions = new BoardAction(initialPosition, other)
  expect(actionPositions.getPositionForTime(0.5)).toStrictEqual(new BoardPosition(0.75, 0.75))
})

test('ActionPositions get position for time only initial value', () => {
  const initialPosition = new BoardPosition(0.2, 0.2)
  const other: Array<BoardActionTimestamp> = [
  ]
  const actionPositions = new BoardAction(initialPosition, other)
  expect(actionPositions.getPositionForTime(0.5)).toStrictEqual(initialPosition)
})

test('ActionPositions get position for time 0.0', () => {
  const initialPosition = new BoardPosition(0, 0)
  const other = [
    new BoardActionTimestamp(new BoardPosition(1, 1), 1),
  ]
  const actionPositions = new BoardAction(initialPosition, other)
  expect(actionPositions.getPositionForTime(0)).toStrictEqual(initialPosition)
})

test('ActionPositions get position for an exact other time 0.5', () => {
  const initialPosition = new BoardPosition(0, 0)
  const other = [
    new BoardActionTimestamp(new BoardPosition(0.5, 0.6), 0.5),
    new BoardActionTimestamp(new BoardPosition(1, 1), 1),
  ]
  const actionPositions = new BoardAction(initialPosition, other)
  expect(actionPositions.getPositionForTime(0.5)).toStrictEqual(other[0].position)
})
