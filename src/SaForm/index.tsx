/** sa-form entry */

import { defineComponent, reactive } from 'vue'

import { LAYOUTS } from './config'

import SaFormHeader from './layout/header'
import SaFormStencil from './layout/stencil'
import SaFormProperty from './layout/property'
import SaFormFooter from './layout/footer'
import SaFormLayer from './layout/layer'
import type { ILayout } from './config'
import type { GraphType } from './graph'
import type { PropType } from 'vue'

import './styles/index.scss'

export default defineComponent({
  props: {
    type: {
      required: true,
      type: String as PropType<GraphType>,
    },
    id: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const layout = reactive(LAYOUTS[props.type]()) as unknown as ReturnType<
      ILayout[keyof ILayout]
    >

    const SaFormWorkspace = layout.workspace

    return () => (
      <section key={layout.graph.canvas.attrs.id} class="flex flex-col h-full">
        <header>
          <SaFormHeader
            toolkits={layout.toolkits}
            graph={layout.graph}
            class="sa-bg"
          />
        </header>

        <main class="mt-1 flex flex-grow gap-1 h-full overflow-auto">
          <section>
            <SaFormStencil
              stencil={layout.stencil}
              graph={layout.graph}
              class="sa-bg h-full"
            />
          </section>

          <SaFormLayer class="shrink-0" graph={layout.graph} />

          <main class="flex item-center flex-col grow overflow-auto">
            <section class="sa-bg workspace-bg grow">
              <SaFormWorkspace
                class="workspace w-full h-full"
                graph={layout.graph}
              />
            </section>
            <SaFormFooter class="sa-bg mt-1" graph={layout.graph} />
          </main>

          <SaFormProperty
            class="sa-property sa-bg shrink-0"
            graph={layout.graph}
            controller={layout.controller}
          />
        </main>
      </section>
    )
  },
})
