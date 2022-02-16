import { HeaderTool } from '../../../layout/header';
import { PcDrawer } from '../../drawer';

export const PcHeaderOptions: HeaderTool[] = [{
  title: 'undo',
  icon: <i class="iconfont iconchexiao1"></i>,
  click: (drawer: PcDrawer) => drawer.undo()
}, {
  title: 'redo',
  icon: <i class="iconfont iconhuifu1"></i>,
  click: (drawer: PcDrawer) => drawer.redo()
}];