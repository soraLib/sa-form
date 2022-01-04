import { HeaderTool } from '../../../layout/header';

export const PcHeaderOptions: HeaderTool[] = [{
  title: 'undo',
  icon: <span>undo</span>,
  click: (drawer) => drawer.graph?.undo()
}, {
  title: 'redo',
  icon: <span>redo</span>,
  click: (drawer) => drawer.graph?.redo()
}];