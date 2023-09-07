import { computed, defineComponent } from 'vue'
import { useClazs } from '../../utils/class'
import { Stencil } from './stencil'
import type { BasicGraph } from '../../graph'
import type { NativeItem } from '.'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'NativeStencilItem',
  props: {
    item: {
      required: true,
      type: Object as PropType<NativeItem>,
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },
  setup(props) {
    const icon = computed(() => {
      if (typeof props.item.icon === 'string')
        return <i class={`iconfont ${props.item.icon}`} />

      return props.item.icon
    })

    const disabled = computed(() => props.item.disabled?.(props.graph) ?? false)

    function onDragstart(event: DragEvent) {
      Stencil.start(props.item.attrs, event)
    }

    return () => (
      <div
        class={useClazs('stencil-item', {
          'is-disabled': disabled.value,
        })}
        title={props.item.title ?? props.item.attrs.name}
        draggable={!disabled.value}
        onDragstart={onDragstart}
      >
        {icon.value}
      </div>
    )
  },
})
