import { Cell, Graph } from '@antv/x6';
import { findNode } from 'sugar-sajs';
import { SaFormDisplay } from '..';
import { BasicDrawer } from '../drawer';
import { BasicElement, BasicElementAttributes } from '../element';

/**
 * return next unique id
 */
export function getNextId(element: BasicElement): string {
  const nextId = getMaxId(element);
  const nextIdNumber = Number(nextId);

  return nextIdNumber ? (nextIdNumber + 1).toString() : '1';

  function getMaxId(element: BasicElement): string {
    const nextId = element.attrs.id;
    let childId = '';

    if (element.children?.length) {
      for (const child of element.children) {
        const childNextId = getMaxId(child);

        const childIdNumber = Number(childId);
        const childNextIdNumber = Number(childNextId);

        if (childIdNumber && childNextIdNumber) {
          childId = Math.max(childIdNumber, childNextIdNumber).toString();
        }

        if (childNextIdNumber) childId = childNextId;
      }
    }

    const childIdNumber = Number(childId);
    const nextIdNumber = Number(nextId);

    if (childIdNumber && nextIdNumber) {
      return Math.max(childIdNumber, nextIdNumber).toString();
    }

    if (childIdNumber) return childId;

    return nextId;
  }
}

/** create element instance by x6 cell */
export function createElementByCell(cell: Cell, Con: new (config: BasicElement) => BasicElement, { canvas }: BasicDrawer): BasicElement {
  const parentId = cell.parent?.data.id;

  return new Con({
    attrs: cell.data,
    parent: { ... (parentId ? findNode(canvas as any /** TODO: */, node => node.attrs.id === parentId) ?? canvas : canvas) },
    children: [] // TODO:
  });
}

/** select x6 graph cell */
export function setGraphSelected(id: string, graph: Graph): void;
export function setGraphSelected(ids: string[], graph: Graph): void;
export function setGraphSelected(arg: string | string[], graph: Graph) {
  const ids = Array.isArray(arg) ? arg : [arg];
  const preSelected = graph.getSelectedCells().filter(cell => !ids.includes(cell.data.id));

  for (const id of ids) {
    if (!graph.isSelected(id)) {
      graph.select(id);
    }
  }

  // unselect other selected cells
  for (const cell of preSelected) {
    graph.unselect(cell);
  }
}

export function isElementAttribute(attr: string, elem: BasicElement): attr is keyof BasicElementAttributes {
  return Reflect.has(elem.attrs, attr);
}

export function isGraphExisted(graph: Graph | undefined, display: SaFormDisplay): graph is Graph {
  return graph !== undefined && display === 'x6';
}