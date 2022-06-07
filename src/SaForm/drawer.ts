import { BasicElement } from './element';
import { BasicRecordStore } from './record';

export type DrawerType =
  /** pc form */
  'PcForm'
  /** app form */
  // 'AppForm' |
  /** flow form */
  // 'Flow' |
  /** print form */
  // 'Print';

/** basic drawer */
export interface BasicDrawer {
  /** drawer type */
  type: DrawerType;
  /** drawer canvas, contain all elements here */
  canvas: BasicElement;
  /** record store */
  history: BasicRecordStore;
  /** current selected elements */
  selected: BasicElement[];
  /** div container */
  containter?: HTMLDivElement;

  getNextId(): string;
  updateElemData(id: string, data: Partial<BasicElement['attrs']>, needRecord?: boolean): BasicElement | undefined;
  updateElemData(element: BasicElement, data: Partial<BasicElement['attrs']>, needRecord?: boolean): BasicElement | undefined;
}
