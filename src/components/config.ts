import { BasicDrawer, DrawerType } from './drawer';
import { HeaderTool } from './layout/header';
import { SideTool } from './layout/sidebar';
import { PcDrawer } from './PcForm/drawer';
import { ComponentOptionsMixin, ComponentPublicInstance, defineComponent, DefineComponent, PropType, VNode } from 'vue';

import { PcHeaderOptions } from './PcForm/layout/header';
import { PcSideOptions } from './PcForm/layout/side';
import PcWorkspace from './PcForm/layout/workspace';
import { BasicElement } from './element';

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
  side: PcSideOptions,
  workspace: PcWorkspace
});

type ILayout = {
  [key in DrawerType]: () => {
    header: HeaderTool[];
    drawer: BasicDrawer;
    side: SideTool[];
    workspace: DefineComponent<{
      canvas: {
          required: true;
          type: PropType<BasicElement>;
      };
    }, {}, any>
  }
}

export const LAYOUTS: ILayout = {
  'PcForm': () => createPcFormConfig()
};