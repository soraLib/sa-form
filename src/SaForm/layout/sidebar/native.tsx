import { defineComponent } from 'vue'
import { Stencil } from './stencil'
import type { NativeItem } from '.'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'NativeSidebarItem',
  props: {
    item: {
      required: true,
      type: Object as PropType<NativeItem>,
    },
  },
  setup(props) {
    const iconClass = `iconfont ${props.item.icon}`

    function onDragstart(event: DragEvent) {
      Stencil.start(props.item.attrs, event)
    }

    return () => (
      <div
        class="native-item"
        title={props.item.title ?? props.item.attrs.name}
        draggable
        onDragstart={onDragstart}
      >
        <i class={`${iconClass}`}></i>
      </div>
    )
  },
})
