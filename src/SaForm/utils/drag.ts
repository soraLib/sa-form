
export function setDataTransfer<T extends keyof DataTransfer>(event: DragEvent, key: T, value: DataTransfer[T], prevent = true) {
  event = event || window.event;
  prevent && event.preventDefault();
  event.dataTransfer && (event.dataTransfer[key] = value);
}

export function isMouseEvent(event: MouseEvent | TouchEvent): event is MouseEvent {
  return event.type.includes('mouse');
}