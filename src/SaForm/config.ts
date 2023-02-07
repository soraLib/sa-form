import { BasicGraph, GraphType } from './graph'
import { HeaderTool } from './layout/header'
import { NativeStencil } from './layout/sidebar'
import { PcGraph } from './PcForm/graph'
import { DefineComponent, PropType } from 'vue'

import { PcHeaderOptions } from './PcForm/layout/header'
import { getNativeSideStencil } from './PcForm/layout/side'
import PcWorkspace from './PcForm/layout/workspace'
import { ElementType } from './element'
import { SaPlugin, SaPluginLayout } from './plugin'
import { PcPlugin, pcPluginValueChange } from './PcForm/plugin'
const PcComponents = import.meta.glob('./PcForm/controller/*/index.tsx')

const createPcFormConfig = () => ({
  graph: new PcGraph({
    attrs: {
      type: ElementType.Canvas,
      id: '1',
      name: 'Pc Form Demo',
      width: 800,
      height: 600,
      x: 0,
      y: 0
    }
  }),
  header: PcHeaderOptions,
  side: getNativeSideStencil(),
  workspace: PcWorkspace,
  controller: {
    plugins: PcPlugin,
    valueChange: pcPluginValueChange,
    components: PcComponents
  }
})

export type SaController = {
  plugins: SaPluginLayout,
  valueChange: Function
  components: {
    [key: NonNullable<SaPlugin['dialog']>['component']]: () => Promise<any>
  }
}

export type ILayout = {
  [key in GraphType]: () => {
    graph: BasicGraph
    header: HeaderTool[]
    side: NativeStencil
    workspace: DefineComponent<{
      graph: {
        required: true,
        type: PropType<PcGraph>
      }
    }, {}, any>,
    controller: SaController
  }
}

export const LAYOUTS: ILayout = {
  'PcForm': () => createPcFormConfig()
}