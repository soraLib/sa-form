import { findNode } from 'sugar-sajs'
import { defineComponent, PropType, computed, CSSProperties, h } from 'vue'
import { setDataTransfer } from '../../../../utils/drag'
import { PcGraph } from '../../../graph'
import { PcElement, containerElements } from '../../../element'

import ElementRenderer from './renderer/element-renderer'
import { useClazs } from '../../../../utils/class'

export default defineComponent({
  name: 'NativeWorkspace',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>
    }
  },
  setup(props) {
    const onDragover = (event: DragEvent) => setDataTransfer(event, 'dropEffect', 'copy')
    const onDrop = (event: DragEvent) => {
      setDataTransfer(event, 'dropEffect', 'copy')

      const elementMessage = event.dataTransfer?.getData('element')

      if (!elementMessage) {
        console.error('[Sa warn]：Event dataTransfer\'s \'element\' data is not existed but it\'s necessary.')

        return
      }

      let dropTarget: HTMLElement | null = event.target as HTMLElement

      while (dropTarget && !dropTarget.id && dropTarget.parentElement) {
        dropTarget = dropTarget.parentElement
      }

      const targetId = dropTarget.id
      const parent = findNode(props.graph.canvas, (el) => el.attrs.id === targetId)

      if (!parent || !containerElements.includes(parent?.attrs.type)) return

      const attrs = JSON.parse(elementMessage)

      const dropElement = new PcElement({
        parent,
        attrs: {
          ...attrs,
          id: props.graph.getNextId(),
          x: event.offsetX,
          y: event.offsetY
        }
      })

      props.graph.addChild(dropElement, parent)
    }

    const selectionBoxStyle = computed<CSSProperties>(() => {
      const { left, top, width, height } = props.graph.selectionBox

      return {
        position: 'absolute',
        display: props.graph.isSelect ? 'block' : 'none',
        'z-index': 1000,
        border: '1px solid var(--c-brand)',
        background: '#B5CBEC',
        opacity: 0.3,
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    })

    return () => (
      <div
        class={useClazs(
          'w-full',
          'h-full',
          'relative',
          {
            'cursor-move':  props.graph.isDrag
          }
        )}
        onDrop={onDrop}
        onDragover={onDragover}
      >
        <ElementRenderer graph={props.graph} element={props.graph.canvas} />

        {/* selection box */}
        <div style={selectionBoxStyle.value}></div>
      </div>
    )
  }
})