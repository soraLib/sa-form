import { Graph, JQuery } from '@antv/x6';
import { computed, defineComponent, onMounted, PropType, Ref, ref, ShallowRef, shallowRef } from 'vue';
import { PcDrawer } from '../../drawer';
import { createMockPcCanvas } from './mock';
import { createX6PcFormNode, PcNode } from './node';
import { getCellRecProp, getSelectionRectangle, PcCell } from './utils';

import { DeleteFilled } from '@element-plus/icons-vue';
import { copyNodes, cutNodes, pasteNodes, removeNode } from './graph';

export default defineComponent({
  name: 'SaPcFormRender',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    }
  },

  setup(props) {
    const workspace: Ref<HTMLDivElement | null> = ref(null);
    // TODO: contentmenu type
    const contextmenu: Ref<any | null> = ref(null);
    const selectedCells: Ref<PcCell[]> = ref([]);
    const contextmenuEvent: ShallowRef<JQuery.ContextMenuEvent | undefined> = shallowRef();

    onMounted(() => {
      if (workspace.value) {
        const canvas = createMockPcCanvas();

        console.log('create graph', canvas);

        const graph = new Graph({
          container: workspace.value,
          history: true,
          width: canvas.attrs.width,
          scroller: {
            pannable: true
          },
          height: canvas.attrs.height,
          snapline: true,
          grid: {
            visible: true,
            type: 'doubleMesh',
            args: [
              {
                color: '#eee',
                thickness: 1
              },
              {
                color: '#ddd',
                thickness: 1,
                factor: 4
              }
            ]
          },
          selecting: {
            enabled: true,
            multiple: true,
            rubberband: true,
            movable: true,
            showEdgeSelectionBox: true
          },
          resizing: true,
          translating: {
            restrict(view) {

              const cell = view.cell;
              if (cell.isNode()) {
                const parent = cell.getParent();
                if (parent) {
                  const parentBox = parent.getBBox();
                  const selection = view.graph.selection;

                  if (selection?.cells?.length) {
                    const rec = getSelectionRectangle(selection);
                    const prop = getCellRecProp(cell);

                    return {
                      x: parentBox.x + prop.position.x - rec.x,
                      y: parentBox.y + prop.position.y - rec.y,
                      width: parentBox.width - (rec.width - prop.size.width),
                      height: parentBox.height - (rec.height - prop.size.height)
                    };
                  }

                  return parentBox;
                }
              }

              return {
                x: 0,
                y: 0,
                width: canvas.attrs.width,
                height: canvas.attrs.height
              };
            }
          },
          clipboard: {
            enabled: true,
            useLocalStorage: true
          }
        });

        props.drawer.setGraph(graph);

        const nodes = canvas.children?.map(child => createX6PcFormNode(child));

        if (nodes) {
          graph.addNodes(nodes);
        }

        graph.on('blank:mousedown', () => {
          graph.cleanSelection();
          contextmenu.value.hide();
        });

        graph.on('blank:contextmenu', ({ e }) => {
          graph.cleanSelection();
          contextmenuEvent.value = e;
          contextmenu.value.show(e.originalEvent);
        });

        graph.on('cell:mousedown', ({ cell }) => {
          cell.toFront();
          contextmenu.value.hide();
        });

        graph.on('cell:contextmenu', ({ cell, e }) => {
          graph.cleanSelection();
          graph.select(cell);

          contextmenu.value.show(e.originalEvent);
        });

        graph.on('selection:changed', ({ selected }) => {
          selectedCells.value = selected;
        });
      }
    });

    const graphContextmenu = computed(() => {
      if (selectedCells.value.length) {
        return (
          <>
            <v-contextmenu-item onClick={() => copyNodes(props.drawer.graph)}>
              copy
            </v-contextmenu-item>
            <v-contextmenu-item onClick={() => cutNodes(props.drawer.graph)}>
              cut
            </v-contextmenu-item>
            <v-contextmenu-item onClick={() => pasteNodes(props.drawer.graph)}>
              paste
            </v-contextmenu-item>
            <v-contextmenu-item type="danger" icon={<DeleteFilled />} onClick={() => removeNode(props.drawer.graph)}>
              delete
            </v-contextmenu-item>
          </>
        );
      }

      return (
        <v-contextmenu-item onClick={() => pasteNodes(contextmenuEvent.value, props.drawer.graph)}>
          paste
        </v-contextmenu-item>
      );
    });

    return {
      workspace,
      contextmenu,
      selectedCells,
      graphContextmenu
    };
  },

  render() {
    return (
      <div>
        <div ref="workspace"></div>

        <v-contextmenu ref="contextmenu">
          {this.graphContextmenu}
        </v-contextmenu>
      </div>
    );
  }
});