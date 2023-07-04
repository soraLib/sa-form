import type {
  OmitByValue,
  OptionalKeys,
  PickByValue,
  RequiredKeys,
} from 'utility-types'
export type EventArgs = { [key: string]: any }
export type EventNames<M extends EventArgs> = Extract<keyof M, string>

export type Handler<Args> = Args extends null | undefined
  ? () => any
  : Args extends any[]
  ? (...args: Args) => any
  : (args: Args) => any

export type AsyncBoolean = boolean | Promise<boolean>
/**
 * Get union type of keys from `M` that value matching `any[]`.
 */
export type NamesWithArrayArgs<M extends EventArgs> = RequiredKeys<
  PickByValue<M, any[]>
>
export type NotArrayValueMap<M extends EventArgs> = OmitByValue<M, any[]>
export type OptionalNormalNames<M extends EventArgs> = OptionalKeys<
  NotArrayValueMap<M>
>
export type RequiredNormalNames<M extends EventArgs> = RequiredKeys<
  NotArrayValueMap<M>
>
export type OtherNames<M extends EventArgs> = EventNames<
  PickByValue<M, undefined>
>
export type UnknownNames<M extends EventArgs> = Exclude<string, EventNames<M>>

export class Events<Args extends EventArgs = any> {
  private listeners: { [name: string]: any[] } = {}

  on<Name extends EventNames<Args>>(
    name: Name,
    handler: Handler<Args[Name]>,
    context?: any
  ): this
  on<Name extends UnknownNames<Args>>(
    name: Name,
    handler: Handler<any>,
    context?: any
  ): this
  on<Name extends EventNames<Args>>(
    name: Name,
    handler: Handler<Args[Name]>,
    context?: any
  ) {
    if (handler == null) {
      return this
    }

    if (!this.listeners[name]) {
      this.listeners[name] = []
    }
    const cache = this.listeners[name]
    cache.push(handler, context)

    return this
  }

  trigger<Name extends OptionalNormalNames<Args>>(name: Name): AsyncBoolean
  trigger<Name extends RequiredNormalNames<Args>>(
    name: Name,
    args: Args[Name]
  ): AsyncBoolean
  trigger<Name extends NamesWithArrayArgs<Args>>(
    name: Name,
    ...args: Args[Name]
  ): AsyncBoolean
  trigger<Name extends OtherNames<Args>>(
    name: Name,
    args?: Args[Name]
  ): AsyncBoolean
  trigger<Name extends OtherNames<Args>>(
    name: Name,
    ...args: Args[Name]
  ): AsyncBoolean
  trigger<Name extends UnknownNames<Args>>(
    name: Name,
    ...args: any[]
  ): AsyncBoolean
  trigger<Name extends EventNames<Args>>(name: Name, ...args: any[]) {
    let returned: AsyncBoolean = true
    if (name !== '*') {
      const list = this.listeners[name]
      if (list != null) {
        returned = call([...list], args)
      }
    }

    const list = this.listeners['*']
    if (list != null) {
      call([...list], [name, ...args])
    }

    return returned
  }
}

type Fn = (...args: any[]) => any
export function apply<T extends Fn>(
  fn: T,
  ctx: ThisParameterType<T>,
  args?: Parameters<T>
): ReturnType<T> {
  if (args) {
    switch (args.length) {
      case 0:
        return fn.call(ctx)
      case 1:
        return fn.call(ctx, args[0])
      case 2:
        return fn.call(ctx, args[0], args[1])
      case 3:
        return fn.call(ctx, args[0], args[1], args[2])
      case 4:
        return fn.call(ctx, args[0], args[1], args[2], args[3])
      case 5:
        return fn.call(ctx, args[0], args[1], args[2], args[3], args[4])
      case 6:
        return fn.call(
          ctx,
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5]
        )
      default:
        return fn.apply(ctx, args)
    }
  }

  return fn.call(ctx)
}

export function isAsyncLike<T>(obj: any): obj is Promise<T> {
  return typeof obj === 'object' && obj.then && typeof obj.then === 'function'
}
export function isAsync<T>(obj: any): obj is Promise<T> {
  return obj != null && (obj instanceof Promise || isAsyncLike(obj))
}
export function toAsyncBoolean(...inputs: (any | any[])[]): AsyncBoolean {
  const results: any[] = []

  inputs.forEach((arg) => {
    if (Array.isArray(arg)) {
      results.push(...arg)
    } else {
      results.push(arg)
    }
  })

  const hasAsync = results.some((res) => isAsync(res))
  if (hasAsync) {
    const deferres = results.map((res) =>
      isAsync(res) ? res : Promise.resolve(res !== false)
    )

    return Promise.all(deferres).then((arr) =>
      arr.reduce<boolean>((memo, item) => item !== false && memo, true)
    )
  }

  return results.every((res) => res !== false)
}
export function call(list: any[], args?: any[]) {
  const results: any[] = []
  for (let i = 0; i < list.length; i += 2) {
    const handler = list[i]
    const context = list[i + 1]
    const params = Array.isArray(args) ? args : [args]
    const ret = apply(handler, context, params)
    results.push(ret)
  }

  return toAsyncBoolean(results)
}
