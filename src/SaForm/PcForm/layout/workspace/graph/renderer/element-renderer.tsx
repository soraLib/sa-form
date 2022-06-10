import { CSSProperties, defineComponent, PropType } from 'vue'
import { PcGraph } from '../../../../graph'
import { PcElement } from '../../../../element'
import { useElementStyle } from './hooks/useStyle'

import ElementRenderer from './element-renderer'

import './element.scss'
import { useElementDrag, useElementStickReszie } from './hooks/useDrag'
import { useClazs } from '../../../../../utils/class'

type First<T extends string> = T extends `${infer S1}${infer S2}` ? S1 : never
type Last<T extends string> = T extends `${infer S1}${infer S2}` ? S2 : never
const stickSize = 8
export const sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'] as const
const currentStick: [First<typeof sticks[number]>, Last<typeof sticks[number]>] | [] = []
const styleMapping = {
  y: {
    t: 'top',
    m: 'marginTop',
    b: 'bottom'
  },
  x: {
    l: 'left',
    m: 'marginLeft',
    r: 'right'
  }
} as const

function vdrStick(stick: typeof sticks[number]) {
  const stickStyle: CSSProperties = {
    width: `${stickSize}px`,
    height: `${stickSize}px`
  }
  stickStyle[styleMapping.y[stick[0] as First<typeof sticks[number]>]] = `${stickSize / -2}px`
  stickStyle[styleMapping.x[stick[1] as Last<typeof sticks[number]>]] = `${stickSize / -2}px`

  return stickStyle
}

export default defineComponent({
  name: 'ElementRenderer',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>
    },
    element: {
      required: true,
      type: Object as PropType<PcElement>
    }
  },

  setup(props) {
    function isFirstSelected() {
      return props.graph.selected[0] === props.element
    }

    return () => (
      <div
        id={props.element.attrs.id}
        class={useClazs(
          'native-element', {
            selected: props.graph.selected.some(e => e.attrs.id === props.element.attrs.id),
            graph: props.graph.canvas.attrs.id === props.element.attrs.id
          })}
        style={useElementStyle(props.element)}
        onMousedown={(e) => useElementDrag(e, props.element, props.graph)}
      >

        {
          /* resizer */
          props.element.parent && isFirstSelected() && (
            <div class="vdr">
              {
                sticks.map(stick =>
                  <div
                    class={`vdr-stick vdr-stick-${stick}`}
                    key={stick}
                    style={vdrStick(stick)}
                    onMousedown={event => useElementStickReszie(event, stick, props.element, props.graph)}
                  />)
              }
            </div>
          )
        }

        {props.element.parent && props.element.attrs.name}

        {
          props.element.children?.length
          && props.element.children.map(ele =>
            <ElementRenderer graph={props.graph} element={ele} />)
        }
      </div >
    )
  }
})
