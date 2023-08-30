import { computed, defineComponent } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { MoveDirection } from '../../../graph'
import ShortCutKey from './key'
import type { BasicGraph } from '../../../graph'
import type { PropType } from 'vue'
import { useClazs } from '@/SaForm/utils/class'

import './shotcuts.scss'

const capitalizeFirstLetter = (input: string): string => {
  if (input.length === 0) return input
  if (input === ' ') return 'Space'

  return `${input[0].toUpperCase()}${input.slice(1)}`
}

export default defineComponent({
  name: 'SaFormShortcuts',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const {
      current,
      Delete,
      ctrl_c,
      ctrl_x,
      ctrl_v,
      ctrl_z,
      ctrl_y,
      ctrl_arrowup,
      ctrl_arrowleft,
      ctrl_arrowdown,
      ctrl_arrowright,
    } = useMagicKeys({
      passive: false,
      onEventFired: (e) => {
        if (isFired.value) e.preventDefault()
      },
    })
    const pressedKeys = computed(() => Array.from(current))

    const isFired = computed(
      () =>
        Delete.value ||
        ctrl_c.value ||
        ctrl_x.value ||
        ctrl_v.value ||
        ctrl_z.value ||
        ctrl_y.value ||
        ctrl_arrowup.value ||
        ctrl_arrowleft.value ||
        ctrl_arrowdown.value ||
        ctrl_arrowright.value
    )

    whenever(Delete, () => props.graph.remove(props.graph.selected))
    whenever(ctrl_c, () => props.graph.clipboard.copy())
    whenever(ctrl_x, () => props.graph.clipboard.cut())
    whenever(ctrl_v, () => props.graph.clipboard.paste())
    whenever(ctrl_z, () => props.graph.undo())
    whenever(ctrl_y, () => props.graph.redo())
    whenever(ctrl_arrowup, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.UP })
    )
    whenever(ctrl_arrowleft, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.LEFT })
    )
    whenever(ctrl_arrowdown, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.DOWN })
    )
    whenever(ctrl_arrowright, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.RIGHT })
    )

    return () => (
      <span class={useClazs('shortcuts', { 'is-fired': isFired.value })}>
        {pressedKeys.value.map((key, index) => (
          <>
            <ShortCutKey>{capitalizeFirstLetter(key)}</ShortCutKey>
            {index < pressedKeys.value.length - 1 && (
              <span class="join">+</span>
            )}
          </>
        ))}
      </span>
    )
  },
})
