import { isTab } from '../element'
import { ElementType } from '../../element'
import type { PcElement } from '../element'

export type ElementTreeDataOption = {
  label: string
  value: string
  children?: ElementTreeDataOption[]
  type: ElementType
  disabled?: boolean
}
export const createElementTreeData = (
  elems?: PcElement[]
): ElementTreeDataOption[] | undefined => {
  return (
    elems?.map((elem) => ({
      label: elem.attrs.name,
      value: elem.attrs.id,
      children: isTab(elem)
        ? elem.tabs?.map((pane) => ({
            label: pane.label,
            value: pane.label,
            type: ElementType.TabPane,
            children: createElementTreeData(pane.children),
            disabled: true,
          }))
        : createElementTreeData(elem.children),
      type: elem.attrs.type,
    })) ?? []
  )
}
