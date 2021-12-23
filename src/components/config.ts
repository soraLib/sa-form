import { BasicDrawer, DrawerType } from './drawer';
import { HeaderTool } from './layout/header';
import { SideTool } from './layout/sidebar';
import { PcDrawer } from './PcForm/drawer';

import { PcHeaderOptions } from './PcForm/layout/header';
import { PcSideOptions } from './PcForm/layout/side';

const createPcFormConfig = () => ({
  drawer: new PcDrawer({
    attrs: {
      id: '1',
      name: 'Pc Form Demo',
      width: 800,
      height: 600,
      offsetX: 0,
      offsetY: 0
    }
  }),
  header: PcHeaderOptions,
  side: PcSideOptions
});

type ILayout = {
  [key in DrawerType]: () => {
    header: HeaderTool[];
    drawer: BasicDrawer;
    side: SideTool[];
  }
}

export const LAYOUTS: ILayout = {
  'PcForm': () => createPcFormConfig()
};