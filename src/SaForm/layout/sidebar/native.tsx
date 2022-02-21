import { defineComponent, PropType } from 'vue';
import { NativeItem, NativeStencil } from '.';

export default defineComponent({
  name: 'NativeSidebarItem',
  props: {
    item: {
      required: true,
      type: Object as PropType<NativeItem>
    }
  },
  setup(props) {
    const iconClass = `iconfont ${props.item.icon}`;

    return () => (
      <div class="p-1" title={props.item.title ?? props.item.attrs.name}>
        <i class={`${iconClass}`} style={{ fontSize: '40px' }}></i>
      </div>
    );
  }
});