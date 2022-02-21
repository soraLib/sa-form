import { BasicDrawer, DrawerType } from './drawer';
import { HeaderTool } from './layout/header';
import { NativeStencil, SideStencil } from './layout/sidebar';
import { PcDrawer } from './PcForm/drawer';
import { DefineComponent, PropType } from 'vue';

import { PcHeaderOptions } from './PcForm/layout/header';
import { getPcSideStencil } from './PcForm/layout/side';
import PcWorkspace from './PcForm/layout/workspace';
import { ElementType } from './element';
import { SaPlugin, SaPluginLayout } from './plugin';
import { PcPlugin, pcPluginValueChange } from './PcForm/plugin';
import { SaFormDisplay } from '.';
const PcComponents = import.meta.glob('./PcForm/controller/*/index.tsx');

const createPcFormConfig = (display: SaFormDisplay) => ({
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
  side: getPcSideStencil(display),
  workspace: PcWorkspace,
  controller: {
    plugins: PcPlugin,
    valueChange: pcPluginValueChange,
    components: PcComponents
  }
});

export type SaController = {
  plugins: SaPluginLayout,
  valueChange: Function;
  components: {
    [key: NonNullable<SaPlugin['dialog']>['component']]: () => Promise<any>
  }
}

export type ILayout = {
  [key in DrawerType]: (display: SaFormDisplay) => {
    drawer: BasicDrawer;
    header: HeaderTool[];
    side: SideStencil | NativeStencil;
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
  'PcForm': (display: SaFormDisplay) => createPcFormConfig(display)
};