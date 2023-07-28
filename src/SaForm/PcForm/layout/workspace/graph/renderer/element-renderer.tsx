import { computed, defineComponent, ref, watch } from 'vue'
import { useElementStickReszie } from './hooks/useResize'
import { useElementInnerStyle, useElementStyle } from './hooks/useStyle'
import ElementRenderer from './element-renderer'
import ElementSpecific from './specifics'
import { aheadSelected, useElementDrag } from './hooks/useDrag'
import { useElementSelect } from './hooks/useSelect'
import { usePan } from './hooks/usePan'
import { useElementBounding } from './hooks/useBounding'
import type { CSSProperties, PropType } from 'vue'
import type { PcElement } from '@/SaForm/PcForm/element'
import type { PcGraph, Stick } from '@/SaForm/PcForm/graph'
import { ElementType } from '@/SaForm/element'
import { ModifierKey } from '@/SaForm/graph'
import { useClazs } from '@/SaForm/utils/class'

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

/**
 * OnMousedown element handler.
 */
export const useElementHandler =
  (element: PcElement, graph: PcGraph) => (event: MouseEvent) => {
    event.stopPropagation()

    if (event.button === 2) {
      // contextmenu event
      graph.setSelected(element)
      return
    }

    if (!element.parent) {
      // canvas
      const selectionModifer = graph.selection.modifier
      const isSelectingKey =
        graph.selection.enabled &&
        ((event.ctrlKey && selectionModifer === ModifierKey.Ctrl) ||
          (event.altKey && selectionModifer === ModifierKey.Alt) ||
          (event.shiftKey && selectionModifer === ModifierKey.Shift))
      if (isSelectingKey) {
        // multiple select
        useElementSelect(event, element, graph)
      } else {
        // panning
        usePan(event, graph)
      }

      return
    }

    if (event.ctrlKey) {
      const index = graph.selected.indexOf(element)
      if (index !== -1) {
        if (index === 0) {
          graph.selected = graph.selected.slice(1)
        } else {
          aheadSelected(element, graph)
        }
      } else {
        if (graph.selected[0] === graph.canvas) {
          graph.selected = [element]
        } else {
          graph.selected.unshift(element)
        }
      }

      return
    }

    useElementDrag(event, element, graph)
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
    const isReference = computed(
      () =>
        props.graph.selected.length > 1 &&
        props.graph.selected[0] === props.element
    )
    const isSelected = computed(() =>
      props.graph.selected.some((e) => e.attrs.id === props.element.attrs.id)
    )
    const isCanvas = computed(() => props.graph.canvas === props.element)

    const elementStyle = useElementStyle(props.element)
    const elementInnerStyle = useElementInnerStyle(props.element)

    const canvasRef = ref<HTMLCanvasElement | null>(null)

    const {
      toggleVisible,
      style: canvasStyle,
      padding,
      color,
    } = useElementBounding(
      canvasRef,
      computed(() => ({
        width: props.element.attrs.width,
        height: props.element.attrs.height,
      }))
    )

    watch(
      [isReference, isSelected, isOnlySelection],
      ([isReference, isSelected, isOnlySelection]) => {
        color.value = isOnlySelection || isReference ? '#fd1d7c' : '#42b883'
        toggleVisible(isSelected)
      },
      {
        immediate: true,
      }
    )

    return () => (
      <div
        id={props.element.attrs.id}
        ref={(el) => props.element.setEl(el as HTMLElement)}
        class={useClazs('pc-element', {
          'is-selected': isSelected.value,
          'is-reference': isReference.value,
          'is-graph': isCanvas.value,
        })}
        style={elementStyle.value}
        onMousedown={useElementHandler(props.element, props.graph)}
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

        {!isCanvas.value && (
          <canvas
            ref={canvasRef}
            width={props.element.attrs.width + padding.value * 2}
            height={props.element.attrs.height + padding.value * 2}
            class="bounding"
            style={canvasStyle.value}
          />
        )}

        <div class="pc-element-inner" style={elementInnerStyle.value}>
          <ElementSpecific graph={props.graph} element={props.element} />

          {(props.element.attrs.type === ElementType.Canvas ||
            props.element.attrs.type === ElementType.Container) &&
          props.element.children?.length
            ? props.element.children.map((ele) => (
                <ElementRenderer
                  key={ele.attrs.id}
                  graph={props.graph}
                  element={ele}
                />
              ))
            : undefined}
        </div>
      </div>
    )
  },
})
