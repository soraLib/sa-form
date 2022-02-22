import { findNode, findTreeNode } from 'sugar-sajs';
import { defineComponent, PropType } from 'vue';
import { setDataTransfer } from '../../../../../utils/drag';
import { PcDrawer } from '../../../../drawer';
import { PcElement } from '../../../../element';

import ElementRenderer from './renderer/element-renderer';

export default defineComponent({
  name: 'NativeWorkspace',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    }
  },
  setup(props) {
    // drag
    function onDragover(event: DragEvent) { setDataTransfer(event, 'dropEffect', 'copy'); }
    function onDrop(event: DragEvent) {
      setDataTransfer(event, 'dropEffect', 'copy');

      const elementMessage = event.dataTransfer?.getData('element');

      if (!elementMessage) {
        console.error('[Sa warn]：Event dataTransfer\'s \'element\' data is not existed but it\'s necessary.');

        return;
      }

      let dropTarget: HTMLElement | null = event.target as HTMLElement;

      while (dropTarget && !dropTarget.id && dropTarget.parentElement) {
        dropTarget = dropTarget.parentElement;
      }

      const targetId = dropTarget.id;
      const parent = findNode(props.drawer.canvas, (el) => el.attrs.id === targetId);

      const attrs = JSON.parse(elementMessage);

      const dropElement = new PcElement({
        parent,
        attrs: {
          ...attrs,
          id: props.drawer.getNextId(),
          offsetX: event.offsetX,
          offsetY: event.offsetY
        }
      });

      props.drawer.addChild(dropElement, parent);
    }

    return {
      onDrop,
      onDragover
    };
  },
  render() {
    return (
      <div
        class="bg-slate-100 w-fit relative"
        onDrop={this.onDrop}
        onDragover={this.onDragover}
      >
        <ElementRenderer drawer={this.drawer} element={this.drawer.canvas} />
      </div>
    );
  }
});