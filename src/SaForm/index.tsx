/** sa-form entry */

import { defineComponent, PropType, reactive } from 'vue'
import { GraphType } from './graph'

import { ILayout, LAYOUTS } from './config'

import SaFormHeader from './layout/header'
import SaFormSidebar from './layout/sidebar'
import SaFormController from './layout/properties-controller'

import { ElScrollbar } from 'element-plus'

import './styles/index.scss'

export default defineComponent({
  props: {
    type: {
      required: true,
      type: String as PropType<GraphType>
    },
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const layout = reactive(LAYOUTS[props.type]()) as unknown as ReturnType<ILayout[keyof ILayout]>

    const SaFormWorkspace = layout.workspace

    return () => (
      <section class="flex flex-col">
        <header>
          <ElScrollbar>
            <SaFormHeader options={layout.header} graph={layout.graph} class="sa-bg" />
          </ElScrollbar>
        </header>

        <main class="mt-1 flex flex-grow">
          <aside>
            <SaFormSidebar stencil={layout.side} graph={layout.graph} class="sa-bg h-full" />
          </aside>

          <main class="flex-grow justify-center sa-bg mx-1 overflow-auto">
            <SaFormWorkspace graph={layout.graph} />
          </main>

          <aside class="w-64 sa-bg shrink-0">
            <SaFormController graph={layout.graph} controller={layout.controller} />
          </aside>
        </main>
      </section>
    )
  }
})