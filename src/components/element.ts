/** element types */
export enum ElementType {
  /** pc form canvas */
  Canvas,
  /** pc form button */
  Button,

  /** extra element type */
}

/** basic element attributes */
export interface BasicElementAttributes {
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
  type: ElementType;
  parent: BasicElement | undefined;
  children?: BasicElement[];
  attrs: BasicElementAttributes;
}
