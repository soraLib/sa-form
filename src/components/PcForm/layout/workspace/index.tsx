import { Graph } from '@antv/x6';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { ElementType } from '../../../element';
import { PcDrawer } from '../../drawer';
import { createMockPcCanvas } from './mock';
import { createX6PcFormNode, PcNode } from './node';
import { getCellRecProp, getSelectionRectangle } from './utils';

export default defineComponent({
  name: 'SaPcFormRender',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    }
  },

  setup(props) {
    const workspace = ref(null);

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
          rotating: {
            enabled: true,
            grid: 15
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

      }
    });

    return {
      workspace
    };
  },

  render() {

    return (
      <div ref="workspace"></div>
    );
  }

});