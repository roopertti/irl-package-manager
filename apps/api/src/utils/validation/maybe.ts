export type Some<T> = { type: '__some__'; value: T }

export type None = { type: '__none__' }

export type Maybe<T> = Some<T> | None

export const someOf = <T>(value: T): Some<T> => ({ type: '__some__', value })

export const none = (): None => ({ type: '__none__' })

export const maybeOf = <T>(value?: T | null): Maybe<T> =>
  value !== null && value !== undefined ? someOf(value) : none()

export const isSome = <T>(value: Maybe<T>): value is Some<T> =>
  value.type === '__some__'

export const isNone = <T>(value: Maybe<T>): value is None =>
  value.type === '__none__'

export const unwrap = <T>(some: Some<T>): T => some.value
