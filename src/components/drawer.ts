import { Graph } from '@antv/x6';
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
  record: BasicRecordStore;
  /** current selected elements */
  selected: BasicElement[];
  /** drawer x6 graph instance */
  graph: Graph | undefined;
}
