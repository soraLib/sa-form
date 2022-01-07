import { cloneDeep } from "lodash-es";
import { findNode, setObjectValues } from "sugar-sajs";
import { BasicClipBoard } from "../clipboard";
import { PcDrawer } from "./drawer";
import { PcElement } from "./element";
import { createPcNode } from "./layout/workspace/node";

export class PcClipBoard implements BasicClipBoard {
  clips: {
    elements: PcElement[];
    type: 'cut' | 'copy';
  } | undefined = undefined;

  isEmpty(clip = this.clips): clip is undefined {
    return !this.clips?.elements.length; 
  }

  copy(drawer: PcDrawer, options?: { useLocalStorage?: boolean, deep?: boolean }) {
    this.clips = {
      elements: cloneDeep(drawer.selected), // TODO: options
      type: 'copy'
    };
  }

  cut(drawer: PcDrawer, options?: { useLocalStorage?: boolean }) {
    this.clips = {
      elements: cloneDeep(drawer.selected), // TODO: options
      type: 'cut'
    };
  }

  paste(drawer: PcDrawer, parent = drawer.canvas.attrs.id, options?: {
    nodeProps?: (element: PcElement) => Partial<PcElement['attrs']>;
    deep?: boolean;
  }): PcElement[] | undefined {
    if(this.isEmpty(this.clips) || !drawer.graph) return;

    const parentElement = findNode(drawer.canvas, n => n.attrs.id === parent);

    if(!parentElement) return;

    const newPasteElements = this.clips.elements.map(ele => {
      const paste = new PcElement({ ...ele, parent: parentElement });

      if(options?.nodeProps) {
        setObjectValues(paste.attrs, options.nodeProps(ele));
      }

      return paste;
    });

    console.log('newPasteElements', newPasteElements)

    const cells = newPasteElements.map(ele => createPcNode(ele));
    const parentCell = parent ? drawer.graph.getCellById(parentElement.attrs.id) : undefined;

    if(parentCell) {
      for(const cell of cells) {
        cell.setParent(parentCell);
      }
  
      parentCell.setChildren(cells);
    }
    
    console.log('cells', cells)
    drawer.graph.addNodes(cells);
  }
}