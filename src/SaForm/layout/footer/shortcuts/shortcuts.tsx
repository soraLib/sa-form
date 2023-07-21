import { computed, defineComponent } from 'vue'

import { useMagicKeys, whenever } from '@vueuse/core'
import { MoveDirection } from '../../../graph'
import ShortCutKey from './key'
import type { BasicGraph } from '../../../graph'
import type { PropType } from 'vue'

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
    const keys = useMagicKeys()
    const pressedKeys = computed(() => Array.from(keys.current))

    whenever(keys.delete, () => props.graph.remove(props.graph.selected))
    whenever(keys.ctrl_c, () => props.graph.clipboard.copy())
    whenever(keys.ctrl_x, () => props.graph.clipboard.cut())
    whenever(keys.ctrl_v, () => props.graph.clipboard.paste())
    whenever(keys.ctrl_z, () => props.graph.undo())
    whenever(keys.ctrl_y, () => props.graph.redo())
    whenever(keys.ctrl_arrowup, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.UP })
    )
    whenever(keys.ctrl_arrowleft, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.LEFT })
    )
    whenever(keys.ctrl_arrowdown, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.DOWN })
    )
    whenever(keys.ctrl_arrowright, () =>
      props.graph.move(props.graph.selected, { direction: MoveDirection.RIGHT })
    )

    return () => (
      <span class="shortcuts">
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
