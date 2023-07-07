import { computed, defineComponent, ref, watch } from 'vue'
import { ClipboardOutline, CopyOutline, TrashOutline } from '@vicons/ionicons5'
import { containerElements } from '../../../element'

import { SaFormContextmenuItem } from './shared'
import type { PcElement } from '../../../element'
import type { PropType } from 'vue'
import type { PcGraph } from '../../../graph'

import type { ContextmenuItem } from '@/components/Contextmenu/src/shared'
import type { Position } from '@/SaForm/clipboard'
import Contextmenu from '@/components/Contextmenu/src/Contextmenu.vue'

export default defineComponent({
  name: 'SaPcFormContextmenu',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },
  expose: ['open'],
  setup(props) {
    const contextmenuRef = ref<InstanceType<typeof Contextmenu> | null>(null)
    const position = ref<Position>()

    const selected = computed<PcElement | undefined>(
      () => props.graph.selected[0]
    )
    const isSelectingCanvas = computed(
      () => selected.value === props.graph.canvas
    )
    const isPasteable = computed(
      () =>
        selected.value?.attrs.type &&
        containerElements.includes(selected.value.attrs.type)
    )
    watch(
      () => selected.value?.key,
      () => contextmenuRef.value?.close()
    )

    const menu = computed<ContextmenuItem<SaFormContextmenuItem>[]>(() => [
      {
        icon: CopyOutline,
        label: 'Copy',
        disabled: isSelectingCanvas.value,
        type: 'primary',
        value: SaFormContextmenuItem.Copy,
      },
      {
        icon: ClipboardOutline,
        label: 'Paste',
        disabled: !isPasteable.value,
        type: 'primary',
        value: SaFormContextmenuItem.Paste,
      },
      {
        icon: TrashOutline,
        label: 'Delete',
        disabled: isSelectingCanvas.value,
        type: 'danger',
        value: SaFormContextmenuItem.Delete,
      },
    ])

    const onSelect = (select: ContextmenuItem<SaFormContextmenuItem>) => {
      if (!selected.value) return

      switch (select.value) {
        case SaFormContextmenuItem.Copy: {
          props.graph.clipboard.copy(props.graph)

          break
        }

        case SaFormContextmenuItem.Cut: {
          // TODO:
          break
        }

        case SaFormContextmenuItem.Paste: {
          props.graph.clipboard.paste(
            props.graph,
            selected.value,
            position.value!
          )

          break
        }

        case SaFormContextmenuItem.Delete: {
          props.graph.removeChild(selected.value)
          break
        }

        default:
          throw `unexpected contextmenu value ${select}.`
      }
    }

    return {
      contextmenuRef,
      open: (event: MouseEvent) => {
        position.value = {
          left: event.offsetX,
          top: event.offsetY,
        }
        contextmenuRef.value?.open({
          left: event.clientX,
          top: event.clientY,
        })
      },
      menu,
      onSelect,
    }
  },

  render() {
    return (
      <Contextmenu
        menu={this.menu}
        ref={(ref: any) => (this.contextmenuRef = ref)}
        onSelect={this.onSelect}
      />
    )
  },
})
