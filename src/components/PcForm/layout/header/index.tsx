import { HeaderTool } from '../../../layout/header';
import { PcDrawer } from '../../drawer';

export const PcHeaderOptions: HeaderTool[] = [{
  title: 'undo',
  icon: <span>undo</span>,
  click: (drawer: PcDrawer) => drawer.undo()
}, {
  title: 'redo',
  icon: <span>redo</span>,
  click: (drawer: PcDrawer) => drawer.redo()
}];