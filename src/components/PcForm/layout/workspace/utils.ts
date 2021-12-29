import { Cell, Graph, Rectangle } from '@antv/x6';
import { PcElement } from '../../element';

export interface PcCell extends Cell {
  data: PcElement['attrs'];
}

export function getSelectionRectangle(cells: Cell[]): Rectangle.RectangleLike {
  const prop = getCellRecProp(cells[0]);

  let minOffsetX = prop.position.x;
  let maxOffsetX = prop.position.x + prop.size.width;

  let minOffsetY = prop.position.y;
  let maxOffsetY = prop.position.y + prop.size.height;

  cells.forEach(cell => {
    const prop = getCellRecProp(cell);

    if (prop.position.x < minOffsetX) {
      minOffsetX = prop.position.x;
    }

    if (maxOffsetX < prop.position.x + prop.size.width) {
      maxOffsetX = prop.position.x + prop.size.width;
    }

    if (prop.position.y < minOffsetY) {
      minOffsetY = prop.position.y;
    }

    if (maxOffsetY < prop.position.y + prop.size.height) {
      maxOffsetY = prop.position.y + prop.size.height;
    }
  });

  return {
    x: minOffsetX,
    y: minOffsetY,
    width: maxOffsetX - minOffsetX,
    height: maxOffsetY - minOffsetY
  };
}

export function getCellRecProp(cell: PcCell) {
  return {
    position: cell.getProp<{x: number; y: number}>('position'),
    size: cell.getProp<{width: number; height: number}>('size')
  };
}