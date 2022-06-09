import { computed, defineComponent, onMounted, PropType, Ref, ref, ShallowRef, shallowRef } from 'vue'
import { PcGraph } from '../../graph'
import { createMockPcCanvas } from './mock'

import { DeleteFilled } from '@element-plus/icons-vue'

import Workspace from './graph'
import Snapline from './snapline'

import { ElementType } from '../../../element'

export default defineComponent({
  name: 'SaPcFormRender',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>
    }
  },

  setup(props) {
    const workspace: Ref<HTMLDivElement | null> = ref(null)
    // TODO: contentmenu type
    const contextmenu: Ref<any | null> = ref(null)
    // const contextmenuEvent: ShallowRef<JQuery.ContextMenuEvent | undefined> = shallowRef()

    onMounted(() => {
      if (workspace.value) {
        const canvas = createMockPcCanvas()

        console.log('create canvas', canvas)
        props.graph.setCanvas(canvas)
      }
    })

    const graphContextmenu = computed(() => {
      if (props.graph.selected[0]?.attrs.type !== ElementType.Canvas) {
        return (
          <>
            <v-contextmenu-item onClick={() => props.graph.clipboard.copy(props.graph)}>
              copy
            </v-contextmenu-item>
            <v-contextmenu-item onClick={() => props.graph.clipboard.cut(props.graph)}>
              cut
            </v-contextmenu-item>
            <v-contextmenu-item disabled={props.graph.clipboard.isEmpty()} onClick={() => props.graph.clipboard.paste(props.graph)}>
              paste
            </v-contextmenu-item>
            {/* <v-contextmenu-item type="danger" icon={<DeleteFilled />} onClick={props.graph}>
              delete
            </v-contextmenu-item> */}
          </>
        )
      }

      return (
        <v-contextmenu-item disabled={props.graph.clipboard.isEmpty()} onClick={() => props.graph.clipboard.paste(props.graph)}>
          paste
        </v-contextmenu-item>
      )
    })

    return {
      workspace,
      contextmenu,
      graphContextmenu
    }
  },

  render() {
    return (
      // TODO: graph scroll and resize container
      /** graph wrapper */
      <div class="relative" style={{
        width: `${this.graph.canvas.attrs.width}px`,
        height: `${this.graph.canvas.attrs.height}px`
      }}>
        <Workspace ref="workspace" graph={this.graph} v-contextmenu:contextmenu />

        <Snapline graph={this.graph} />

        <v-contextmenu ref="contextmenu">
          {this.graphContextmenu}
        </v-contextmenu>
      </div>
    )
  }
})