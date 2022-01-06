import { BasicDrawer } from "./drawer";
import { BasicElement } from "./element";

export declare interface BasicClipBoard {
  clips: {
    elements: BasicElement[];
    type: 'cut' | 'copy';
  } | undefined;

  isEmpty(): boolean;

  copy(drawer: BasicDrawer, options?: { useLocalStorage?: boolean; deep?: boolean; }): void;
  cut(drawer: BasicDrawer, options?: { useLocalStorage?: boolean; deep?: boolean; }): void;

  paste(drawer: BasicDrawer, parent: string | undefined, options?: {
    nodeProps?: (element: BasicElement) => Partial<BasicElement['attrs']>;
    deep?: boolean;
  }): BasicElement[] | undefined;
}