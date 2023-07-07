import type { Component } from 'vue'

export type ContextmenuType = 'primary' | 'warning' | 'danger'

export type ContextmenuItem<T = any> = {
  /**
   * unique id, default as label
   */
  id?: any
  icon?: Component
  label: string
  disabled?: boolean
  /**
   * default as `true`
   */
  hiddenOnDisabled?: boolean
  value: T
  /**
   * hover type, default as primary
   */
  type?: ContextmenuType
  /**
   * show divider at bottom
   */
  divider?: boolean
  onClick?: (item: ContextmenuItem<T>) => void
}

export type Position = {
  left: number
  top: number
}

export const openContextmenu = ($event: MouseEvent, ref: any) => {
  $event.preventDefault()
  ref.open({ left: $event.clientX, top: $event.clientY })
}
