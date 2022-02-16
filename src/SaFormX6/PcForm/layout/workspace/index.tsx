import { Cell, Graph, JQuery, Node } from '@antv/x6';
import { computed, defineComponent, h, onMounted, PropType, Ref, ref, ShallowRef, shallowRef } from 'vue';
import { PcDrawer } from '../../drawer';
import { createMockPcCanvas } from './mock';
import { createPcNode, PcNode } from './nodes';
import { getCellRecProp, getSelectionRectangle, PcCell } from './utils';

import { DeleteFilled } from '@element-plus/icons-vue';
import { copyNodes, cutNodes, pasteNodes, removeNodes } from './graph';
import { chain } from 'sugar-sajs';
import { ElementType } from '../../../element';

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
    const parent: ShallowRef<Cell | undefined> = shallowRef();

    onMounted(() => {
      if (workspace.value) {
        const canvas = createMockPcCanvas();

        console.log('create graph', canvas);

        const graph = new Graph({
          container: workspace.value,
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
            movable: true
          },
          embedding: {
            enabled: true,
            validate: ({ parent, child }) => {
              if (child.parent === parent) {
                return true;
              }

              if (parent.data.type === ElementType.Container && !graph.hasCell(child)) {
                return true;
              }

              return false;
            }
          },
          resizing: true,
          translating: {
            restrict(view) {
              const cell = view.cell;
              const selection = view.graph.selection;

              if (cell.isNode()) {
                const parent = cell.getParent();
                if (parent) {
                  const parentBox = parent.getBBox();

                  if (selection?.cells?.length) {
                    const rec = getSelectionRectangle(selection.cells);
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

                if (selection?.length) {
                  const rec = getSelectionRectangle(selection.cells);
                  const prop = getCellRecProp(cell);

                  return {
                    x: prop.position.x - rec.x,
                    y: prop.position.y - rec.y,
                    width: canvas.attrs.width - (rec.width - prop.size.width),
                    height: canvas.attrs.height - (rec.height - prop.size.height)
                  };
                }
              }

              return {
                x: 0,
                y: 0,
                width: canvas.attrs.width,
                height: canvas.attrs.height
              };
            }
          }
        });

        chain(props.drawer).setGraph(graph).setCanvas(canvas);

        const nodes = canvas.children?.map(child => createPcNode(child));

        if (nodes) {
          graph.addNodes(nodes);
        }

        graph.on('blank:mousedown', () => {
          graph.cleanSelection();
          contextmenu.value.hide();
        });

        graph.on('blank:contextmenu', ({ e }) => {
          graph.cleanSelection();
          parent.value = undefined;
          contextmenuEvent.value = e;
          contextmenu.value.show(e.originalEvent);
        });

        graph.on('cell:mousedown', ({ cell }: { cell: PcNode }) => {
          cell.toFront({ deep: true });
          contextmenu.value.hide();
        });

        graph.on('cell:contextmenu', ({ cell, e }) => {
          if (!graph.isSelected(cell)) {
            graph.cleanSelection();
            graph.select(cell);
          }

          parent.value = cell;
          contextmenuEvent.value = e;
          contextmenu.value.show(e.originalEvent);
        });

        graph.on('selection:changed', ({ selected }) => {
          selectedCells.value = selected;

          props.drawer.setSelected(selected.map(cell => cell.data.id));

          if (selected.length > 1) {
            graph.disableSnapline();
          } else {
            graph.enableSnapline();
          }
        });

        let movedCells: Node<Node.Properties>[] = [];

        graph.on('node:moved', ({ cell }) => {
          if (props.drawer.selected.length > 1 && props.drawer.selected.some(el => el.attrs.id === cell.id)) { // move selected cells
            movedCells.push(cell);

            if (movedCells.length === props.drawer.selected.length) { // update elements data at last in order to create one record only
              props.drawer.updateElemsData(
                movedCells.map(cell => {
                  const { x, y } = cell.position();

                  return {
                    id: cell.id,
                    data: {
                      offsetX: x,
                      offsetY: y
                    }
                  };
                })
              );

              movedCells = [];
            }
          } else { // move single unselected cell
            const { x, y } = cell.position();
            props.drawer.updateElemData(cell.id, {
              offsetX: x,
              offsetY: y
            });

            props.drawer.setSelected(cell.id);
          }
        });

        graph.on('node:resized', ({ cell }) => {
          const { width, height } = cell.size();

          props.drawer.updateElemData(cell.data.id, {
            width: width,
            height: height
          });
        });
      }
    });

    const graphContextmenu = computed(() => {
      if (selectedCells.value.length) {
        return (
          <>
            <v-contextmenu-item onClick={() => copyNodes(props.drawer)}>
              copy
            </v-contextmenu-item>
            <v-contextmenu-item onClick={() => cutNodes(props.drawer)}>
              cut
            </v-contextmenu-item>
            <v-contextmenu-item onClick={() => pasteNodes(contextmenuEvent.value, parent.value, props.drawer)}>
              paste
            </v-contextmenu-item>
            <v-contextmenu-item type="danger" icon={<DeleteFilled />} onClick={() => removeNodes(props.drawer)}>
              delete
            </v-contextmenu-item>
          </>
        );
      }

      return (
        <v-contextmenu-item onClick={() => pasteNodes(contextmenuEvent.value, undefined, props.drawer)}>
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