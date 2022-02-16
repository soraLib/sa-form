import { Graph, Node } from '@antv/x6';
import { chain } from 'sugar-sajs';
import { ElementType } from '../../../../../element';
import { PcDrawer } from '../../../../drawer';
import { PcElement } from '../../../../element';
import { createPcNode, PcNode } from '../../nodes';
import { getSelectionRectangle, getCellRecProp } from '../../utils';

export function createX6Graph(el: HTMLElement, canvas: PcElement, drawer: PcDrawer) {
  const graph = new Graph({
    container: el,
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

  chain(drawer).setGraph(graph).setCanvas(canvas);

  const nodes = canvas.children?.map(child => createPcNode(child));

  if (nodes) {
    graph.addNodes(nodes);
  }

  graph.on('blank:mousedown', () => {
    graph.cleanSelection();
  });

  graph.on('blank:contextmenu', ({ e }) => {
    graph.cleanSelection();
  });

  graph.on('cell:mousedown', ({ cell }: { cell: PcNode }) => {
    cell.toFront({ deep: true });
  });

  graph.on('cell:contextmenu', ({ cell, e }) => {
    if (!graph.isSelected(cell)) {
      graph.cleanSelection();
      graph.select(cell);
    }
  });

  graph.on('selection:changed', ({ selected }) => {
    drawer.setSelected(selected.map(cell => cell.data.id));

    if (selected.length > 1) {
      graph.disableSnapline();
    } else {
      graph.enableSnapline();
    }
  });

  let movedCells: Node<Node.Properties>[] = [];

  graph.on('node:moved', ({ cell }) => {
    if (drawer.selected.length > 1 && drawer.selected.some(el => el.attrs.id === cell.id)) { // move selected cells
      movedCells.push(cell);

      if (movedCells.length === drawer.selected.length) { // update elements data at last in order to create one record only
        drawer.updateElemsData(
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
      drawer.updateElemData(cell.id, {
        offsetX: x,
        offsetY: y
      });

      drawer.setSelected(cell.id);
    }
  });

  graph.on('node:resized', ({ cell }) => {
    const { width, height } = cell.size();

    drawer.updateElemData(cell.data.id, {
      width: width,
      height: height
    });
  });
}