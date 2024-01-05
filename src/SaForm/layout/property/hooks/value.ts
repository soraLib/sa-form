import { cloneDeep } from 'lodash-es'
import type { BasicElement } from '@/SaForm/element'
import type { BasicGraph } from '@/SaForm/graph'
import type { SaPlugin } from '@/SaForm/plugin'

export type BeforeValueChangeReturn<A> = {
  value: A
  error: string
}

export type ValueChangeHookArgs = {
  value: unknown
  plugin: SaPlugin
  element: BasicElement
  graph: BasicGraph
}
export type ValueChangeHook = {
  predicate: (args: ValueChangeHookArgs) => boolean
  hook: (args: ValueChangeHookArgs) => void
}

export const beforeValueChange = <A, B>(
  value: A,
  plugin: SaPlugin,
  element: BasicElement,
  graph: BasicGraph
): BeforeValueChangeReturn<B> => {
  const $error = ''
  const $value: any = cloneDeep(value)

  const hookArgs: ValueChangeHookArgs = { value, plugin, graph, element }

  return {
    value: $value,
    error: $error,
  }
}

export const afterValueChange = <A>(
  value: A,
  plugin: SaPlugin,
  graph: BasicGraph
): void => {
  // after value change
}
