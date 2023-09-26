import { computed, defineComponent, ref, watch } from 'vue'
import {
  ClipboardOutline,
  CopyOutline,
  CutOutline,
  TrashOutline,
} from '@vicons/ionicons5'
import { containerElements } from '../../../element'

import { SaFormContextmenuItem } from './shared'
import type { PcElement } from '../../../element'
import type { PropType } from 'vue'
import type { PcGraph } from '../../../graph'

import type { ContextmenuItem, Position } from '@/components/Contextmenu'
import { Contextmenu } from '@/components/Contextmenu'

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
        selected.value?.attrs.type !== undefined &&
        containerElements.includes(selected.value.attrs.type)
    )
    watch(
      () => selected.value?.attrs.id,
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
        icon: CutOutline,
        label: 'Cut',
        disabled: isSelectingCanvas.value,
        type: 'warning',
        value: SaFormContextmenuItem.Cut,
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
          props.graph.clipboard.copy()

          break
        }

        case SaFormContextmenuItem.Cut: {
          props.graph.clipboard.cut()

          break
        }

        case SaFormContextmenuItem.Paste: {
          props.graph.clipboard.paste(selected.value, {
            position: position.value,
          })

          break
        }

        case SaFormContextmenuItem.Delete: {
          props.graph.remove(selected.value)
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
