import { computed, defineComponent, h } from 'vue'
import { findNode } from 'sugar-sajs'
import { setDataTransfer } from '../../../../utils/drag'
import { PcElement, containerElements } from '../../../element'

import { useClazs } from '../../../../utils/class'
import ElementRenderer from './renderer/element-renderer'
import { gridFloor } from './renderer/hooks/utils'
import type { StencilAttrs } from '../../../../layout/sidebar'
import type { CSSProperties, PropType } from 'vue'
import type { PcGraph } from '../../../graph'

export default defineComponent({
  name: 'NativeWorkspace',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },
  setup(props) {
    const onDragover = (event: DragEvent) =>
      setDataTransfer(event, 'dropEffect', 'copy')
    const onDrop = (event: DragEvent) => {
      setDataTransfer(event, 'dropEffect', 'copy')

      const elementMessage = event.dataTransfer?.getData('element')

      if (!elementMessage) {
        console.error(
          "[Sa warn]：Event dataTransfer's 'element' data is not existed but it's necessary."
        )

        return
      }

      let dropTarget: HTMLElement | null = event.target as HTMLElement

      while (dropTarget && !dropTarget.id && dropTarget.parentElement) {
        dropTarget = dropTarget.parentElement
      }

      const targetId = dropTarget.id
      const parent = findNode(
        props.graph.canvas,
        (el) => el.attrs.id === targetId
      )

      if (!parent || !containerElements.includes(parent?.attrs.type)) return

      const attrs: StencilAttrs = JSON.parse(elementMessage)
      const dropElement = new PcElement({
        parent,
        attrs: {
          ...attrs,
          id: props.graph.getNextId(),
          x: gridFloor(event.offsetX - attrs.width / 2, props.graph.grid.size), // TODO:
          y: gridFloor(event.offsetY - attrs.height / 2, props.graph.grid.size),
        },
      })

      props.graph.addChild(dropElement, parent)
    }

    const selectionBoxStyle = computed<CSSProperties>(() => {
      const { x, y, width, height } = props.graph.selectionBox

      return {
        position: 'absolute',
        display: props.graph.isSelect ? 'block' : 'none',
        'z-index': 1000,
        border: '1px solid var(--c-brand)',
        background: '#B5CBEC',
        opacity: 0.3,
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
    })

    return () => (
      <div
        class={useClazs('w-full', 'h-full', 'relative', {
          'cursor-move': props.graph.isDragging,
        })}
        onDrop={onDrop}
        onDragover={onDragover}
      >
        <ElementRenderer graph={props.graph} element={props.graph.canvas} />

        {/* selection box */}
        <div style={selectionBoxStyle.value}></div>
      </div>
    )
  },
})
