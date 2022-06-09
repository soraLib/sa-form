import { findNode } from 'sugar-sajs'
import { defineComponent, PropType } from 'vue'
import { setDataTransfer } from '../../../../utils/drag'
import { PcGraph } from '../../../graph'
import { PcElement } from '../../../element'

import ElementRenderer from './renderer/element-renderer'

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

      const attrs = JSON.parse(elementMessage)

      const dropElement = new PcElement({
        parent,
        attrs: {
          ...attrs,
          id: props.graph.getNextId(),
          x: event.x,
          y: event.y
        }
      })

      props.graph.addChild(dropElement, parent)
    }

    return {
      onDrop,
      onDragover
    }
  },
  render() {
    return (
      <div
        class="bg-slate-100 w-fit relative"
        onDrop={this.onDrop}
        onDragover={this.onDragover}
      >
        <ElementRenderer graph={this.graph} element={this.graph.canvas} />
      </div>
    )
  }
})