import { defineComponent, PropType } from 'vue'
import { ComposedNativeStencil } from '.'
import NativeItem from './native'

import { CaretDown } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { useToggle } from '@vueuse/core'
import { useClazs } from '../../utils/class'

export default defineComponent({
  name: 'StencilGroup',
  props: {
    group: {
      required: true,
      type: Object as PropType<[string, ComposedNativeStencil[]]>
    }
  },
  setup(props) {
    const [collapsed, toggleGroupCollapse] = useToggle(false)

    return () => (
      <div class={useClazs('stencil-group', { collapsed: collapsed.value })}>
        <div class="stencil-group__header select-none" onClick={() => toggleGroupCollapse()}>
          <NIcon class="caret" size={12} component={CaretDown} />
          <span class="name">{props.group[0]}</span>
        </div>

        <div class="stencil-group__content">
          {
            props.group[1].map(item => <NativeItem item={item} />)
          }
        </div>
      </div>
    )
  }
})