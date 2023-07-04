import { computed, defineComponent } from 'vue'
import { useClazs } from '../../../../../utils/class'
import { useElementStickReszie } from './hooks/useResize'
import { useElementStyle } from './hooks/useStyle'
import { useElementHandler } from './hooks/useDrag'
import ElementRenderer from './element-renderer'
import type { CSSProperties, PropType } from 'vue'
import type { PcGraph, Stick } from '../../../../graph'
import type { PcElement } from '../../../../element'

import './element.scss'

type First<T extends string> = T extends `${infer S1}${infer S2}` ? S1 : never
type Last<T extends string> = T extends `${infer S1}${infer S2}` ? S2 : never
export const sticks: Stick[] = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
const stickSize = sticks.length
const styleMapping = {
  y: {
    t: 'top',
    m: 'marginTop',
    b: 'bottom',
  },
  x: {
    l: 'left',
    m: 'marginLeft',
    r: 'right',
  },
} as const

export const firstOfStick = (stick: Stick) => stick[0] as First<Stick>
export const lastOfStick = (stick: Stick) => stick[1] as Last<Stick>

function vdrStick(stick: Stick) {
  const stickStyle: CSSProperties = {
    width: `${stickSize}px`,
    height: `${stickSize}px`,
  }
  stickStyle[styleMapping.y[firstOfStick(stick)]] = `${stickSize / -2}px`
  stickStyle[styleMapping.x[lastOfStick(stick)]] = `${stickSize / -2}px`

  return stickStyle
}

export default defineComponent({
  name: 'ElementRenderer',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
    element: {
      required: true,
      type: Object as PropType<PcElement>,
    },
  },

  setup(props) {
    const isOnlySelection = computed(
      () =>
        props.graph.selected.length === 1 &&
        props.graph.selected[0] === props.element
    )

    return () => (
      <div
        id={props.element.attrs.id}
        class={useClazs('native-element', {
          selected: props.graph.selected.some(
            (e) => e.attrs.id === props.element.attrs.id
          ),
          graph: props.graph.canvas.attrs.id === props.element.attrs.id,
        })}
        style={useElementStyle(props.element)}
        onMousedown={(e) => useElementHandler(e, props.element, props.graph)}
      >
        {
          /* resizer */
          props.element.parent && isOnlySelection.value && (
            <div class="vdr">
              {sticks.map((stick) => (
                <div
                  class={`vdr-stick vdr-stick-${stick}`}
                  key={stick}
                  style={vdrStick(stick)}
                  onMousedown={(event) =>
                    useElementStickReszie(
                      event,
                      stick,
                      props.element,
                      props.graph
                    )
                  }
                />
              ))}
            </div>
          )
        }

        {/* TODO: specific display styles */}
        {props.element.parent && props.element.attrs.name}

        {props.element.children?.length
          ? props.element.children.map((ele) => (
              <ElementRenderer graph={props.graph} element={ele} />
            ))
          : undefined}
      </div>
    )
  },
})
