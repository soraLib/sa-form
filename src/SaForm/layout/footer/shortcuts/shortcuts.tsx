import { computed, defineComponent } from 'vue'
import { useMagicKeys, useTextSelection, whenever } from '@vueuse/core'
import { use } from 'sa-lambda'
import { MoveDirection } from '../../../graph'
import ShortCutKey from './key'
import type { BasicGraph } from '../../../graph'
import type { PropType } from 'vue'
import { useClazs } from '@/SaForm/utils/class'
import { isContainer } from '@/SaForm/PcForm/element'

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
      ctrl_l,
      ctrl_e,
      ctrl_p,
      ctrl_arrowup,
      ctrl_arrowleft,
      ctrl_arrowdown,
      ctrl_arrowright,
      ctrl_backquote,
      escape,
      space,
    } = useMagicKeys({
      passive: false,
      onEventFired: (e) => {
        if (isFired.value && isInsideGraph()) e.preventDefault()
      },
    })
    const pressedKeys = computed(() => Array.from(current))
    const state = useTextSelection()
    const isInsideGraph = () =>
      !state.text.value &&
      (document.activeElement === document.body ||
        props.graph.canvas.el?.contains(document.activeElement))

    const isFired = computed(
      () =>
        Delete.value ||
        ctrl_c.value ||
        ctrl_x.value ||
        ctrl_v.value ||
        ctrl_z.value ||
        ctrl_y.value ||
        ctrl_l.value ||
        ctrl_e.value ||
        ctrl_p.value ||
        escape.value ||
        space.value ||
        ctrl_arrowup.value ||
        ctrl_arrowleft.value ||
        ctrl_arrowdown.value ||
        ctrl_arrowright.value ||
        ctrl_backquote.value
    )

    whenever(
      Delete,
      () => isInsideGraph() && props.graph.remove(props.graph.selected)
    )
    whenever(ctrl_c, () => isInsideGraph() && props.graph.clipboard.copy())
    whenever(ctrl_x, () => isInsideGraph() && props.graph.clipboard.cut())
    whenever(
      ctrl_v,
      () =>
        isInsideGraph() &&
        props.graph.clipboard.paste(
          use(props.graph.selected[0], (a) =>
            isContainer(a) ? a : a.parent ? a.parent : a
          )
        )
    )
    whenever(ctrl_z, () => isInsideGraph() && props.graph.undo())
    whenever(ctrl_y, () => isInsideGraph() && props.graph.redo())
    whenever(escape, () => isInsideGraph() && props.graph.setSelected())
    whenever(
      ctrl_arrowup,
      () =>
        isInsideGraph() &&
        props.graph.move(props.graph.selected, { direction: MoveDirection.UP })
    )
    whenever(
      ctrl_arrowleft,
      () =>
        isInsideGraph() &&
        props.graph.move(props.graph.selected, {
          direction: MoveDirection.LEFT,
        })
    )
    whenever(
      ctrl_arrowdown,
      () =>
        isInsideGraph() &&
        props.graph.move(props.graph.selected, {
          direction: MoveDirection.DOWN,
        })
    )
    whenever(
      ctrl_arrowright,
      () =>
        isInsideGraph() &&
        props.graph.move(props.graph.selected, {
          direction: MoveDirection.RIGHT,
        })
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
