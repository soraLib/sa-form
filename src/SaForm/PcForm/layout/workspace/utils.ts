import { PcElement } from '../../element';

export function getSelectionRectangle(cells: PcElement[]) {
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

export function getCellRecProp(cell: PcElement) {
  return {
    position: { x: cell.attrs.offsetX, y: cell.attrs.offsetY },
    size: { width: cell.attrs.width, height: cell.attrs.height }
  };
}