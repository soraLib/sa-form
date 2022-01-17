import { App } from 'vue';

export default {
  install: function(app: App, options?: { containment?: boolean }) {
    const containment = options?.containment ? true : false ?? false;

    const getViewportSize = function() {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      return {
        width,
        height
      };
    };

    const mounted = function(el: HTMLDivElement) {
      const dlg = el.getElementsByClassName('el-dialog')[0] as HTMLElement & { offsetX: number; offsetY: number };
      const header = el.getElementsByClassName('el-dialog__header')[0] as HTMLElement;
      header.style.userSelect = 'none';
      header.style.cursor = 'move';
      header.classList.add('active:bg-gray-100', 'transition', 'ease-in', 'duration-300');

      dlg.offsetX = 0;
      dlg.offsetY = 0;

      const move = function(e: MouseEvent) {
        let left = e.pageX - dlg.offsetX;
        let top = e.pageY - dlg.offsetY;
        if (containment) {
          // Constrains left & top
          left = Math.max(left, 0);
          top = Math.max(top, 0);
          // Constrains right & bottom
          const viewport = getViewportSize();
          left = Math.min(left, viewport.width - dlg.offsetWidth);
          top = Math.min(top, viewport.height - dlg.offsetHeight);
        }
        dlg.style.margin = '0px';
        dlg.style.left = left + 'px';
        dlg.style.top = top + 'px';
      };

      const up = function() {
        removeEventListener('mousemove', move);
        removeEventListener('mouseup', up);
      };

      const down = function(e: MouseEvent) {
        dlg.offsetX = e.pageX - dlg.offsetLeft;
        dlg.offsetY = e.pageY - dlg.offsetTop;
        addEventListener('mousemove', move);
        addEventListener('mouseup', up);
      };

      header.addEventListener('mousedown', down);
    };

    app.directive('dialog-drag', {
      mounted
    });
  }
};
