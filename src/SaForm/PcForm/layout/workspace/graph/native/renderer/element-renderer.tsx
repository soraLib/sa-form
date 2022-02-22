import { CSSProperties, defineComponent, PropType } from 'vue';
import { PcDrawer } from '../../../../../drawer';
import { PcElement } from '../../../../../element';
import { createStyle } from './style';

import ElementRenderer from './element-renderer';

import './element.scss';
import { getSelectionRectangle } from '../../../utils';
import { isMouseEvent } from '../../../../../../utils/drag';
import { ElementType } from '../../../../../../element';
import { setObjectValues } from 'sugar-sajs';
import { PcRecord } from '../../../../../record';
import { BasicRecordType } from '../../../../../../record';

type First<T extends string> = T extends `${infer S1}${infer S2}` ? S1 : never;
type Last<T extends string> = T extends `${infer S1}${infer S2}` ? S2 : never;
const stickSize = 8;
const sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'] as const;
let currentStick: [First<typeof sticks[number]>, Last<typeof sticks[number]>] | [] = [];
const styleMapping = {
  y: {
    t: 'top',
    m: 'marginTop',
    b: 'bottom'
  },
  x: {
    l: 'left',
    m: 'marginLeft',
    r: 'right'
  }
} as const;
const stickDrag = false;
const stickStartStatus = {
  mouseX: 0,
  mouseY: 0,
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0
};
const limits = {
  minLeft: null,
  maxLeft: null,
  minRight: null,
  maxRight: null,
  minTop: null,
  maxTop: null,
  minBottom: null,
  maxBottom: null
};
function vdrStick(stick: typeof sticks[number]) {
  const stickStyle: CSSProperties = {
    width: `${stickSize}px`,
    height: `${stickSize}px`
  };
  stickStyle[styleMapping.y[stick[0] as First<typeof sticks[number]>]] = `${stickSize / -2}px`;
  stickStyle[styleMapping.x[stick[1] as Last<typeof sticks[number]>]] = `${stickSize / -2}px`;

  return stickStyle;
}

export default defineComponent({
  name: 'ElementRenderer',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    },
    element: {
      required: true,
      type: Object as PropType<PcElement>
    }
  },

  setup(props) {
    function stickDown(stick: typeof sticks[number], event: MouseEvent | TouchEvent) {
      // this.stickDrag = true;
      stickStartStatus.mouseX = isMouseEvent(event) ? event.pageX : event.touches[0].pageX;
      stickStartStatus.mouseY = isMouseEvent(event) ? event.pageY : event.touches[0].pageY;
      stickStartStatus.width = props.element.attrs.width;
      stickStartStatus.height = props.element.attrs.height;
      stickStartStatus.offsetX = props.element.attrs.offsetX;
      stickStartStatus.offsetY = props.element.attrs.offsetY;

      // @ts-expect-error split to tuple
      currentStick = stick.split('');
      addStickMoveListener();
      event.stopPropagation();
    }
    function stickMove(event: MouseEvent | TouchEvent) {
      const pageX = isMouseEvent(event) ? event.pageX : event.touches[0].pageX;
      const pageY = isMouseEvent(event) ? event.pageY : event.touches[0].pageY;

      const delta = {
        x: (stickStartStatus.mouseX - pageX),
        y: (stickStartStatus.mouseY - pageY)
      };

      const resizeElement = props.element;

      switch (currentStick[0]) {
        case 'b':
          delta.y = -delta.y;
          break;

        case 't': {
          const nextOffsetY = stickStartStatus.offsetY - delta.y;
          if (nextOffsetY < 0 || (!resizeElement.attrs.height && delta.y < 0)) {
            return;
          }
          resizeElement.attrs.offsetY = nextOffsetY;

          break;
        }

        case 'm':
          delta.y = 0;
          break;
      }

      switch (currentStick[1]) {
        case 'r':
          delta.x = -delta.x;

          break;

        case 'l': {
          const nextOffsetX = stickStartStatus.offsetX - delta.x;
          if (nextOffsetX < 0 || (!resizeElement.attrs.width && delta.x < 0)) {
            return;
          }
          resizeElement.attrs.offsetX = nextOffsetX;
          break;
        }

        case 'm':
          delta.x = 0;
          break;
      }

      resizeElement.attrs.width = stickStartStatus.width + delta.x;
      resizeElement.attrs.height = stickStartStatus.height + delta.y;

      resizeElement.attrs.width = resizeElement.attrs.width < 0 ? 0 : resizeElement.attrs.width;
      resizeElement.attrs.height = resizeElement.attrs.height < 0 ? 0 : resizeElement.attrs.height;

      const maxWidth = resizeElement.parent!.attrs.width - resizeElement.attrs.offsetX;
      const maxHeight = resizeElement.parent!.attrs.height - resizeElement.attrs.offsetY;

      if (resizeElement.type === ElementType.Container && resizeElement.children?.length) {
        const rect = getSelectionRectangle(resizeElement.children);

        resizeElement.attrs.width = resizeElement.attrs.width > rect.width + rect.x ? resizeElement.attrs.width : rect.width + rect.x;
        resizeElement.attrs.height = resizeElement.attrs.height > rect.height + rect.y ? resizeElement.attrs.height : rect.height + rect.y;
      } else {
        resizeElement.attrs.width = resizeElement.attrs.width > maxWidth ? maxWidth : resizeElement.attrs.width;
        resizeElement.attrs.height = resizeElement.attrs.height > maxHeight ? maxHeight : resizeElement.attrs.height;
      }
    }
    function stickUp(event: Event) {
      const record = new PcRecord({
        time: new Date(),
        type: BasicRecordType.Attr,
        data: [{
          id: props.element.attrs.id,
          prev: {
            width: stickStartStatus.width,
            height: stickStartStatus.height
          },
          next: {
            width: props.element.attrs.width,
            height: props.element.attrs.height
          }
        }]
      });
      props.drawer.addRecord(record);

      setObjectValues(stickStartStatus, {
        mouseX: 0,
        mouseY: 0,
        width: 0,
        height: 0,
        offsetX: 0,
        offsetY: 0
      });
      removeStickMoveListener();
    }
    function addStickMoveListener() {
      document.documentElement.addEventListener('mousemove', stickMove);
      document.documentElement.addEventListener('mouseup', stickUp);
      document.documentElement.addEventListener('mouseleave', stickUp);

      document.documentElement.addEventListener('touchmove', stickMove);
      document.documentElement.addEventListener('touchend touchcancel', stickUp, true);
      document.documentElement.addEventListener('touchstart', stickUp);
    }
    function removeStickMoveListener() {
      document.documentElement.removeEventListener('mousemove', stickMove);
      document.documentElement.removeEventListener('mouseup', stickUp);
      document.documentElement.removeEventListener('mouseleave', stickUp);

      document.documentElement.removeEventListener('touchmove', stickMove);
      document.documentElement.removeEventListener('touchend touchcancel', stickUp, true);
      document.documentElement.removeEventListener('touchstart', stickUp, true);
    }

    function isFirstSelected() {
      return props.drawer.selected[0] === props.element;
    }
    type MoveStatus = {
      totalMoveX: number;
      totalMoveY: number;
      moveX: number;
      _startX: number;
      _endX: number;
      moveY: number;
      _startY: number;
      _endY: number;
      finalOffsetX: number;
      finalOffsetY: number;
    }
    function onMouseDown(event: MouseEvent) {
      props.drawer.setSelected(props.element);

      if (!props.element.parent) return; // skip resize canvas

      const status: MoveStatus = {
        totalMoveX: 0,
        totalMoveY: 0,
        moveX: 0,
        _startX: event.clientX,
        _endX: 0,
        moveY: 0,
        _startY: event.clientY,
        _endY: 0,
        finalOffsetX: 0,
        finalOffsetY: 0
      };
      function moveCb(event: MouseEvent) {
        elementMove(status, event);
      }

      const MOVE_START_TIME = new Date();
      document.addEventListener('mousemove', moveCb);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveCb);
        elementMoveOver(status, event, MOVE_START_TIME);
      }, { once: true });

      event.stopPropagation();
    }
    function elementMove(status: MoveStatus, event: MouseEvent) {
      status._endX = event.clientX;
      status.moveX = status._endX - status._startX;

      status._endY = event.clientY;
      status.moveY = status._endY - status._startY;

      status._startX = event.clientX;
      status._startY = event.clientY;

      status.finalOffsetX = props.element.attrs.offsetX + status.moveX;
      status.finalOffsetY = props.element.attrs.offsetY + status.moveY;

      const lockOffsetX = props.element.attrs.offsetX;
      const lockOffsetY = props.element.attrs.offsetY;

      // Limit the offset of the element to ensure its always inside the parent element
      props.drawer.updateElemData(props.element, {
        offsetX: status.finalOffsetX < 0 ? 0
          : status.finalOffsetX + props.element.attrs.width > props.element.parent!.attrs.width
            ? props.element.parent!.attrs.width - props.element.attrs.width : status.finalOffsetX,
        offsetY : status.finalOffsetY < 0 ? 0
          : status.finalOffsetY + props.element.attrs.height > props.element.parent!.attrs.height
            ? props.element.parent!.attrs.height - props.element.attrs.height : status.finalOffsetY
      }, false);

      status.totalMoveX += (props.element.attrs.offsetX - lockOffsetX);
      status.totalMoveY += (props.element.attrs.offsetY - lockOffsetY);
    }
    function elementMoveOver(status: MoveStatus, event: MouseEvent, MOVE_START_TIME: Date) {
      const MOVE_END_TIME = new Date();
      const duration = MOVE_END_TIME.getTime() - MOVE_START_TIME.getTime();

      // skip when not moved
      if (status.totalMoveX || status.totalMoveY) {
        if (duration > 200) { // debounce
          props.drawer.addRecord(new PcRecord({
            time: new Date(),
            type: BasicRecordType.Attr,
            data: [{
              id: props.element.attrs.id,
              prev: {
                offsetX: status.finalOffsetX - status.totalMoveX,
                offsetY: status.finalOffsetY - status.totalMoveY
              },
              next: {
                offsetX: status.finalOffsetX,
                offsetY: status.finalOffsetY
              }
            }]
          }));
        } else {
          props.drawer.updateElemData(props.element, {
            offsetX: props.element.attrs.offsetX - status.totalMoveX,
            offsetY : props.element.attrs.offsetY - status.totalMoveY
          }, false);
        }
      }
    }

    return () => (
      <div
        id={props.element.attrs.id}
        style={createStyle(props.element)}
        class="native-element"
        onMousedown={onMouseDown}
      >

        {
          /* resizer, only active in canvas */
          props.element.parent && isFirstSelected() && (
            <div class="vdr">
              {
                sticks.map(stick =>
                  <div
                    class={`vdr-stick vdr-stick-${stick}`}
                    key={stick}
                    style={vdrStick(stick)}
                    onMousedown={event => stickDown(stick, event)}
                    onTouchstart={event => stickDown(stick, event)}
                  />)
              }
            </div>
          )
        }

        {props.element.parent && props.element.attrs.name}

        {
          props.element.children?.length
          && props.element.children.map(ele =>
            <ElementRenderer drawer={props.drawer} element={ele} />)
        }
      </div >
    );
  }
});
