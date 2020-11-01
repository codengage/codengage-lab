import { noop } from './noop'
import { identity } from './identity'

type Left<L, R> = {
  __type: 'Left'
  fold: <T = any>(isLeft: (left: L) => T, isRight: (right: R) => T) => T
}

type Right<L, R> = {
  __type: 'Right'
  fold: <T = any>(isLeft: (left: L) => T, isRight: (right: R) => T) => T
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(value: L): Left<L, R> => ({
  __type: 'Left',
  fold: (l, _) => l(value),
})

export const right = <L, R>(value: R): Right<L, R> => ({
  __type: 'Right',
  fold: (_, r) => r(value),
})

export const isLeft = <L, R>(either: Either<L, R>) => either.__type === 'Left'

export const isRight = <L, R>(either: Either<L, R>) => either.__type === 'Right'

export const getLeft = <L, R>(either: Either<L, R>): L => either.fold<L>(identity, noop)

export const getRight = <L, R>(either: Either<L, R>): R => either.fold<R>(noop, identity)
