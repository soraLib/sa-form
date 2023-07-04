import { PcGraph } from './PcForm/graph'

import { PcHeaderOptions } from './PcForm/layout/header'
import { getNativeSideStencil } from './PcForm/layout/side'
import PcWorkspace from './PcForm/layout/workspace'
import { ElementType } from './element'
import { PcPlugin, pcPluginValueChange } from './PcForm/plugin'
import type { Component, PropType } from 'vue'
import type { NativeStencil } from './layout/sidebar'
import type { HeaderTool } from './layout/header'
import type { BasicGraph, GraphType } from './graph'
import type { SaPlugin, SaPluginLayout } from './plugin'
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
      y: 0,
    },
  }),
  header: PcHeaderOptions,
  side: getNativeSideStencil(),
  workspace: PcWorkspace as any,
  controller: {
    plugins: PcPlugin,
    valueChange: pcPluginValueChange,
    components: PcComponents,
  },
})

export type SaController = {
  plugins: SaPluginLayout
  valueChange: (...args: any[]) => void
  components: {
    [key: NonNullable<SaPlugin['dialog']>['component']]: () => Promise<any>
  }
}

export type ILayout = {
  [key in GraphType]: () => {
    graph: BasicGraph
    header: HeaderTool[]
    side: NativeStencil
    workspace: Component<{
      graph: {
        required: true
        type: PropType<PcGraph>
      }
    }>
    controller: SaController
  }
}

export const LAYOUTS: ILayout = {
  PcForm: () => createPcFormConfig(),
}
