import { Graph } from '@antv/x6';
import { defineComponent, onBeforeUnmount, onMounted, PropType, Ref, ref } from 'vue';
import { ElementType } from '../../../element';
import { PcDrawer } from '../../drawer';
import { createMockPcCanvas } from './mock';
import { createX6PcFormNode, PcNode } from './node';
import { getCellRecProp, getSelectionRectangle } from './utils';

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

    onMounted(() => {
      if (workspace.value) {
        const canvas = createMockPcCanvas();

        console.log('create graph', canvas);

        const graph = new Graph({
          container: workspace.value,
          autoResize: true,
          history: true,
          width: canvas.attrs.width,
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
          },
          embedding: {
            enabled: true,
            frontOnly: false,
            findParent({ node, view }) {
              const bbox = node.getBBox();

              return this.getNodes().filter((node: PcNode) => {
                const data = node.getData<PcNode['data']>();
                if (data && data.type === ElementType.Container) {
                  const targetBBox = node.getBBox();
                  view.cell.toFront({ deep: true });

                  return bbox.isIntersectWithRect(targetBBox);
                }

                return false;
              });
            }
          }
        });

        props.drawer.setGraph(graph);

        const nodes = canvas.children?.map(child => createX6PcFormNode(child));

        if (nodes) {
          graph.addNodes(nodes);
        }

        // bind cell contextmenu event
        graph.on('cell:contextmenu', ({ cell, e }) => {
          graph.cleanSelection();
          graph.select(cell);
        });
      }
    });

    return {
      workspace,
      contextmenu
    };
  },

  render() {

    return (
      <div>
        <div ref="workspace" v-contextmenu:contextmenu></div>

        <v-contextmenu ref="contextmenu">
          <v-contextmenu-item onClick={() => copyNodes(this.drawer.graph)}>
            copy
          </v-contextmenu-item>
          <v-contextmenu-item onClick={() => cutNodes(this.drawer.graph)}>
            cut
          </v-contextmenu-item>
          <v-contextmenu-item onClick={() => pasteNodes(this.drawer.graph)}>
            paste
          </v-contextmenu-item>
          <v-contextmenu-item type="danger" icon={<DeleteFilled />} onClick={() => removeNode(this.drawer.graph)}>
            delete
          </v-contextmenu-item>
        </v-contextmenu>
      </div>
    );
  }
});