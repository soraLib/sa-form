/** sa-form entry */

import { defineComponent, PropType, reactive } from 'vue'
import { GraphType } from './graph'

import { ILayout, LAYOUTS } from './config'

import SaFormHeader from './layout/header'
import SaFormSidebar from './layout/sidebar'
import SaFormController from './layout/properties-controller'
import SaFormFooter from './layout/footer'

import { NScrollbar } from 'naive-ui'

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
      <section class="flex flex-col h-full">
        <header>
          <SaFormHeader options={layout.header} graph={layout.graph} class="sa-bg" />
        </header>

        <main class="mt-1 flex flex-grow h-full">
          <aside>
            <SaFormSidebar stencil={layout.side} graph={layout.graph} class="sa-bg h-full" />
          </aside>

          <main class="justify-center sa-bg mx-1 flex flex-col grow">
            <section class="workspace-bg overflow-auto grow">
              <SaFormWorkspace class="workspace" graph={layout.graph} />
            </section>
            <SaFormFooter graph={layout.graph} />
          </main>

          <aside class="w-64 sa-bg shrink-0">
            <SaFormController graph={layout.graph} controller={layout.controller} />
          </aside>
        </main>
      </section>
    )
  }
})