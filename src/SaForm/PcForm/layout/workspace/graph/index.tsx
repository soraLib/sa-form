import { defineComponent } from 'vue'
import { findNode } from 'sugar-sajs'
import { setDataTransfer } from '../../../../utils/stencil'
import { isContainer } from '../../../element'

import ElementRenderer from './renderer/element-renderer'
import { gridFloor } from './renderer/hooks/utils'
import type { StencilAttributes } from '../../../../layout/stencil'
import type { PropType } from 'vue'
import type { PcGraph } from '../../../graph'

export default defineComponent({
  name: 'SaPcFormGraph',
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

      if (!parent || !isContainer(parent)) return

      const attrs: StencilAttributes = JSON.parse(elementMessage)

      const dropElementData = {
        parent,
        attrs: {
          ...attrs,
          id: props.graph.getNextId(),
          x: gridFloor(event.offsetX - attrs.width / 2, props.graph.grid.size),
          y: gridFloor(event.offsetY - attrs.height / 2, props.graph.grid.size),
        },
      }

      props.graph.addChild(dropElementData, parent)
    }

    return () => (
      <div
        class="w-full h-full relative"
        onDrop={onDrop}
        onDragover={onDragover}
      >
        <ElementRenderer graph={props.graph} element={props.graph.canvas} />
      </div>
    )
  },
})
