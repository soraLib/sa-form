/** element types */ // TODO: split pc types
export enum ElementType {
  /** pc form canvas */
  Canvas = 'pc canvas',
  /** pc form button */
  Button = 'pc button',
  /** pc form container */
  Container = 'pc container',
  /** extra element type */
}

/** basic element attributes */
export interface BasicElementAttributes {
  /** element type */
  type: ElementType;
  /** unique id */
  id: string;
  /** unique name */
  name: string;
  /** offset X to parent element */
  offsetX: number;
  /** offset Y to parent element */
  offsetY: number;
  /** element width `px` */
  width: number;
  /** element height `px` */
  height: number;
}

/** basic element */
export interface BasicElement {
  parent: BasicElement | undefined;
  children?: BasicElement[];
  attrs: BasicElementAttributes;
}
