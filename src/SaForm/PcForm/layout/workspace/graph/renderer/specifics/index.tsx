import { computed, defineComponent, h } from 'vue'
import RadioSpecific from './radio/radio'
import CheckboxSpecific from './checkbox/checkbox'
import SelectSpecific from './select/select'
import TableSpecific from './table/table'
import TimePickerSpecific from './time-picker/time-picker'
import ContextmenuSpecific from './contextmenu/contextmenu'
import TabSpecific from './tab/tab'
import type { Component, PropType } from 'vue'
import type { PcElement } from '@/SaForm/PcForm/element'
import type { PcGraph } from '@/SaForm/PcForm/graph'
import { ElementType } from '@/SaForm/element'

const SpecificComponentMap: Partial<Record<ElementType, Component>> = {
  [ElementType.Radio]: RadioSpecific,
  [ElementType.Checkbox]: CheckboxSpecific,
  [ElementType.Select]: SelectSpecific,
  [ElementType.Table]: TableSpecific,
  [ElementType.TimePicker]: TimePickerSpecific,
  [ElementType.Contextmenu]: ContextmenuSpecific,
  [ElementType.Tab]: TabSpecific,
}
export default defineComponent({
  name: 'ElementRendererSpecifics',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
    element: {
      required: true,
      type: Object as PropType<PcElement>,
    },
  },

  setup(props) {
    const type = computed(() => props.element.attrs.type)

    return () => {
      const SpecificComponent = SpecificComponentMap[type.value]
      if (SpecificComponent) return h(SpecificComponent, props)

      return <span> {props.element.parent && props.element.attrs.name}</span>
    }
  },
})
