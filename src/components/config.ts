import { BasicDrawer, DrawerType } from './drawer';
import { HeaderTool } from './layout/header';
import { SideTool } from './layout/sidebar';
import { PcDrawer } from './PcForm/drawer';
import { DefineComponent, PropType } from 'vue';

import { PcHeaderOptions } from './PcForm/layout/header';
import { PcSideOptions } from './PcForm/layout/side';
import PcWorkspace from './PcForm/layout/workspace';
import { ElementType } from './element';
import { SaPluginLayout } from './Plugin';
import { PcPlugin, pcPluginValueChange } from './PcForm/plugin';

const createPcFormConfig = () => ({
  drawer: new PcDrawer({
    attrs: {
      type: ElementType.Canvas,
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
  workspace: PcWorkspace,
  controller: {
    plugins: PcPlugin,
    valueChange: pcPluginValueChange
  }
});

export type SaController = {
  plugins: SaPluginLayout,
  valueChange: Function;
}

export type ILayout = {
  [key in DrawerType]: () => {
    drawer: BasicDrawer;
    header: HeaderTool[];
    side: SideTool[];
    workspace: DefineComponent<{
      drawer: {
        required: true,
        type: PropType<PcDrawer>
      };
    }, {}, any>,
    controller: SaController;
  }
}

export const LAYOUTS: ILayout = {
  'PcForm': () => createPcFormConfig()
};