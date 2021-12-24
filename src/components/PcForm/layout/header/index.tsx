import { HeaderTool } from '../../../layout/header';

export const PcHeaderOptions: HeaderTool[] = [{
  title: 'undo',
  icon: <span>undo</span>,
  click: (drawer) => console.log('undo', drawer.graph?.undo())
}, {
  title: 'redo',
  icon: <span>redo</span>,
  click: (drawer) => console.log('redo', drawer.graph?.redo())
}];