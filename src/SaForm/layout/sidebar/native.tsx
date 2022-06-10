import { defineComponent, PropType } from 'vue'
import { NativeItem } from '.'
import { setDataTransfer } from '../../utils/drag'

export default defineComponent({
  name: 'NativeSidebarItem',
  props: {
    item: {
      required: true,
      type: Object as PropType<NativeItem>
    }
  },
  setup(props) {
    const iconClass = `iconfont ${props.item.icon}`

    function onDragstart(event: DragEvent) {
      setDataTransfer(event, 'effectAllowed', 'copy', false)
      event.dataTransfer?.setData('element', JSON.stringify(props.item.attrs))
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
  }
})